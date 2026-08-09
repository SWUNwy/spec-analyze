# 测试反模式（Testing Anti-Patterns）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

**何时加载：** 写或评审测试、宣称测试"覆盖"了行为之前。点名五种最常见的"通过却什么都没验证"的测试模式。

## 核心原则

断错东西的通过测试比没有测试更糟。没有测试意味着"未测试"。通过断言 mock 交互的测试意味着"已测试"——却没证明任何真实行为。评审者与代理信任绿勾，然后停止查看。

每个反模式包含一个门禁函数（Gate Function）——一个判定测试是真实还是戏剧化的问题。

## 五种反模式

### 反模式 1：测 mock 的行为而不是代码的

**症状：** 测试断言 mock 被以特定参数调用，却不检查调用返回了什么或系统如何表现。

```typescript
// ❌ Theatrical — asserts the mock, not the code
it('processes user', () => {
  const mockApi = { fetch: jest.fn().mockReturnValue({ id: 1 }) };
  processUser(mockApi);
  expect(mockApi.fetch).toHaveBeenCalledWith('/users/1');  // proves the call, not the result
});

// ✅ Real — asserts the code's observable behavior
it('processes user', () => {
  const mockApi = { fetch: jest.fn().mockReturnValue({ id: 1, name: 'Ada' }) };
  const result = processUser(mockApi);
  expect(result.displayName).toBe('Ada (#1)');  // proves the transformation
});
```

**为何失败：** 只要代码以正确参数调用 mock，测试就通过——即使代码随后忽略、误用或破坏了响应。破坏行为但保留调用形状的重构仍然绿。

**门禁函数：** "如果我把被测函数体删掉，换成 `return undefined`，这个测试还通过吗？"通过，就是戏剧化测试。

**修复：** 断言输出与状态变化，不要断言调用形状。mock 只用来喂测试无法用其他方式产生的输入。

### 反模式 2：生产类上的仅测试方法

**症状：** 生产代码长出只有测试文件在调用的方法、构造器或 setter。生产调用方走不同路径。

```typescript
// ❌ Test-only seam
class PaymentProcessor {
  private gateway: Gateway;

  constructor(gateway?: Gateway) {  // optional param only tests pass
    this.gateway = gateway ?? new RealGateway();
  }

  // test reads this directly
  getInternalState(): State { return this.state; }
}
```

**为何失败：** 生产与测试代码分叉。测试验证的是生产从不执行的路径——生产走 `new RealGateway()`；测试走注入的 mock。破坏生产路径的重构不被发现。

**门禁函数：** "仓库里有没有非测试代码调用这个方法、构造器重载或 setter？"没有，就是仅测试接缝。

**修复：** 优先为所有调用方做构造器注入，而不是可选注入。要观察内部状态，通过公开行为断言（输出、可观察副作用），而不是为测试开 getter。

### 反模式 3：不理解依赖就 mock

**症状：** mock 返回值图测试方便，而非真实依赖实际产生的值。测试绿；集成挂。

```typescript
// ❌ Mock invents a shape
const mockDb = { query: jest.fn().mockReturnValue({ rows: [{ id: 1 }] }) };

// ✅ Mock matches real contract
// Real Postgres returns { rows: [...] } — verified once, captured, replayed
const capturedResult = readFixture('db-user-query-result.json');
const mockDb = { query: jest.fn().mockReturnValue(capturedResult) };
```

**为何失败：** 被测代码正对照一个虚构验证。真实依赖改变形状时（新字段、不同错误格式、假设有值的地方是 null），测试仍绿，生产崩。

**门禁函数：** "这个 mock 值来自真实依赖的文档形状、捕获的响应，还是我发明的？"发明的值 = 未验证假设。

**修复：** 用捕获的 fixture（真实依赖记录一次，重放）。读依赖的真实契约——类型、错误模式、可空性——并编进 mock。集成测试至少一次覆盖同一路径。

### 反模式 4：不完整 mock——崩溃而非失败

**症状：** mock 只实现快乐路径用到的方法。其他方法抛错或返回 undefined。边界用例写不了，因为 mock 自己先崩。

```typescript
// ❌ Mock only knows fetch
const mockApi = {
  fetch: jest.fn(),
  // update, delete, subscribe — undefined
};

// Test for "what if update fails" can't run — update throws "not a function"
```

**为何失败：** 边界情况（错误路径、重试、回退）从没被测，因为 mock 无法表示它们。覆盖率显示快乐路径绿，而错误路径不可测。

**门禁函数：** "我能为被测代码调用的每个方法的错误路径写测试吗？"mock 无法表示任一被调用方法的失败，就是不完整。

**修复：** mock 必须实现完整接口，包括错误响应。用对意外调用抛错的默认 mock（大声暴露缺失方法），而不是返回 undefined。

### 反模式 5：集成测试当附属品

**症状：** 单元测试隔离测逻辑；集成测试被跳过、延后或每个功能只一条。重构过了单元测试，运行时崩。

**为何失败：** mock 只验证代码的内部逻辑，从不验证代码与依赖的正确组合。大多数生产 bug 在边界——序列化、查询形状、错误传播——正好是 mock 够不到的地方。

**门禁函数：** "对每个公开入口点，是否至少有一个测试端到端跑过真实依赖（或捕获契约假实现）？"任何入口点缺集成覆盖都是已知缺口，不是延期。

**修复：** 把集成测试当作承重墙，不是可选。每个公开入口点至少一条。捕获契约假实现（记录自真实依赖的响应）填补全集成与纯单元测试之间的空档。

## 横切门禁

写或评审任何测试后，跑统一门禁：

> 如果我把被测代码体删掉，换成 no-op 或常量，哪些测试会失败？

仍然通过的测试是戏剧化的。宣称覆盖前修复或删除它们。

## 严重度校准

| 严重度 | 标准 |
|---|---|
| Critical | 测试只断言 mock 调用形状；删掉被测代码仍绿 |
| Critical | 生产代码里生产调用方从不执行的仅测试接缝 |
| Important | mock 使用无法追溯到依赖契约的发明值 |
| Important | mock 无法表示被调用方法的错误路径 |
| Important | 公开入口点无集成覆盖 |
| Minor | mock 风格在代码库中不一致（风格，非正确性） |

## 参考

- `references/test-driven-development.md` — 基础 RED-GREEN-REFACTOR 循环
- `references/receiving-code-review.md` — 如何对待引用这些反模式的评审发现
