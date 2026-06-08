# HTML Annotation System — Embedding PRD Annotations into Prototypes

> 将 design.md 的 Annotation Block 转换为 HTML 页面上的交互式注释面板，让评审者无需翻阅文档即可看到每个组件的 PRD 规格。

---

## 1. When to Use

HTML 注释面板适用于以下场景：

| 条件 | 说明 |
|------|------|
| 已有 HTML 原型 | 交互原型已构建，需要在同一页面上叠加注释 |
| 组件数 ≥ 3 | 组件数量少时直接贴 design.md 更高效 |
| 评审需要多方参与 | PM/Dev/UI/Tester 需在同一页面上交叉验证 |

**如不满足上述条件，跳过 HTML 注释生成，保持纯 markdown 输出即可。**

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  页面区域                                                    │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │  组件 Section             │  │  📋 触发按钮              │  │
│  │  (stats-row / toolbar /  │  │  (hover可见/始终可见)      │  │
│  │   table-container)       │  │                            │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                        │                     │
│                                        ▼                     │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           注释侧边面板 (slide-in from right)           │    │
│  │  ┌────────────────────────────────────────────────┐  │    │
│  │  │  C01 @StatsCardRow L2              [✕]        │  │    │
│  │  ├────────────────────────────────────────────────┤  │    │
│  │  │  [📊 统计] [⚡ 批量] [📋 表格] [📋 添加] ...  │  │    │
│  │  ├────────────────────────────────────────────────┤  │    │
│  │  │  DESCRIPTION                                  │  │    │
│  │  │  展示 3 张统计卡片...                         │  │    │
│  │  │  States: normal / zero                        │  │    │
│  │  │                                                │  │    │
│  │  │  TRIGGER                                      │  │    │
│  │  │  页面加载 → 计算 publishers 数组...           │  │    │
│  │  │                                                │  │    │
│  │  │  BEHAVIOR                                     │  │    │
│  │  │  内部流量主 = count(type=internal)             │  │    │
│  │  │  └── 占比分母为0时 → 显示 "0.0%"              │  │    │
│  │  │                                                │  │    │
│  │  │  UI STYLE / UI STATE / DISMISS                │  │    │
│  │  └────────────────────────────────────────────────┘  │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### 2.1 组成部分

| 组件 | 职责 | 说明 |
|------|------|------|
| **注释数据** | 存储从 design.md 提取的注释内容 | JS 对象，每个 key 对应一个组件 |
| **触发按钮** | 提供注释面板的入口 | inline 按钮(组件区右上角) + header 按钮(全局) |
| **注释面板** | 展示完整的 PRD 注释内容 | 右侧滑入，带导航标签切换 |
| **遮罩层** | 点击外部关闭面板 | 半透明背景，z-index 9999 |

### 2.2 交互流程

```
用户点击 📋 按钮
  → toggleAnnot(key)
    → 面板滑入 (right: -420px → 0, 300ms ease)
    → 解析 ANNOTATIONS[key]
    → 渲染 title (C01 @StatsCardRow L2)
    → 渲染 body (DESCRIPTION + 各 blocks)
    → 高亮对应的导航标签和触发按钮
  → 点击导航标签 → 切换注释
  → 点击 ✕ / 遮罩层 / ESC → closeAnnot()
```

---

## 3. Data Format — 从 design.md Annotation Block 到 JS 对象

### 3.1 转换规则

每个 design.md 的 Annotation Block 转换为一个 JS 条目：

```
design.md Annotation Block                    JS ANNOTATIONS entry
─────────────────────────────                  ────────────────────
§2.1 @StatsCardRow L2         ────→           stats: {
  |   trigger: 页面加载...                        id: 'C01',
  |   behavior: 内部=count(...)                  name: '@StatsCardRow',
  |   style: 白色背景...                          level: 'L2',
  |   state: normal/zero                         desc: '展示 3 张统计卡片...',
  |   timing: ≤100ms                             states: 'normal / zero',
  |   dismiss: 数据变更...                        blocks: [
  └── title字段 → lines数组列表                      { title: 'Trigger', lines: [...] },
                                                    { title: 'Behavior', lines: [...] },
                                                    ...
                                                  ]
                                               }
```

### 3.2 完整 JS 数据结构

```javascript
const ANNOTATIONS = {
  componentKey: {              // 唯一 key，供 onclick 引用
    id: 'C01',                 // 组件编号 (与 design.md 组件总览表一致)
    name: '@ComponentName',    // 组件名 (与 design.md §2.x 标题一致)
    level: 'L2',               // 注释等级 L1/L2/L3
    desc: '组件职责描述',       // 一句话说明 (来自 design.md 的 Responsibility 列)
    states: 'normal / error',  // 状态列表 (来自 design.md 的 State 列)
    blocks: [                  // 注释块列表 (来自 Annotation Block 各字段)
      {
        title: 'Trigger',      // 字段名，渲染为大写标题
        lines: [               // 行列表，每行渲染为一个 .annot-line
          '触发条件 1',
          '触发条件 2'
        ]
      },
      {
        title: 'Behavior',
        lines: [
          '行为描述 1',
          '  ├── 分支行为 A',   // 树形缩进用 ├── 和 └── 前缀
          '  └── 分支行为 B'
        ]
      }
    ]
  }
};
```

### 3.3 字段提取对照表

| design.md Annotation Block 字段 | -> JS blocks.title | 说明 |
|--------------------------------|-------------------|------|
| `[Dev] trigger:` | `'Trigger'` | 展开为 lines 数组，每行一个触发条件 |
| `[Dev·Tester] behavior:` | `'Behavior'` | 行为描述，树形缩进保留 |
| `[UI] placement:` | `'Placement'` | 位置描述 |
| `[UI] style:` | `'UI Style'` | 可视化细节，颜色/间距/字体 |
| `[UI] state:` | `'UI State'` | 状态描述，每行一个状态 |
| `[UI] timing:` | `'Timing'` | 动画时间参数 |
| `[UI] responsive:` | `'Responsive'` | 响应式策略 |
| `[Tester] state:` | `'Tester State'` | 测试视角的状态验证路径 |
| `[Dev] dismiss:` | `'Dismiss'` | 关闭条件 |

### 3.4 树形缩进约定

Behavior 和 State 中常用树形结构表示条件分支：

```
'  ├── 条件A → 结果A'     ← 2空格 + ├── 前缀
'  └── 条件B → 结果B'     ← 2空格 + └── 前缀
```

渲染时自动转换为 `&nbsp;&nbsp;&nbsp;&nbsp;├── ` 以保持缩进。

---

## 4. Component Mapping — 触发按钮布局

### 4.0 前置条件：组件枚举与类型映射

在放置 trigger 按钮之前，必须先完成组件枚举和类型映射（参见 `annotation-templates.md` §9 Step 8a）：

- 列出页面所有交互组件
- 映射每个组件到类型（T1-T11），确定字段结构
- 声明嵌套关系（父子组件的 context 引用）
- 确保无遗漏、无幽灵项

触发按钮只应在枚举清单中的组件上放置。清单外的不放置，清单内的不遗漏。

### 4.1 触发按钮放置规则

每个组件必须有至少 1 个 trigger 按钮。按钮必须在组件的可视边界内，与组件边缘间距 ≤ 8px（视觉上"贴紧"）。

| 组件类型 | 触发按钮位置 | HTML 结构要求 |
|----------|-------------|---------------|
| 页面级组件 (统计卡片) | 组件容器右上角，距容器边缘 ≤ 8px | 容器添加 `class="annot-section"` 和 `position: relative` |
| 工具栏/操作栏 | 工具栏右上角，与操作按钮同行 | 按钮后添加 inline trigger（22px 圆形） |
| 数据表格 | 表格容器右上角，距容器边缘 ≤ 8px | 容器添加 `position: relative` |
| 弹窗/Modal header | header 标题右侧，与关闭按钮同行 | 26px 圆形按钮，flex 布局居中 |
| 表单区块 | 表单区域右上角 | inline trigger（22px 圆形） |
| 详情页区块 | 区块标题行右侧 | inline trigger，与编辑按钮同行 |
| 页面 header | h1 标题右侧，与 ⓘ 图标同行 | 28px 圆形按钮 |

### 4.2 触发按钮 HTML

```html
<!-- 组件 inline 触发 -->
<div class="stats-row annot-section">
  <button class="annot-trigger" data-annot="stats" onclick="toggleAnnot('stats')"
          title="查看 PRD 注释">📋</button>
  <!-- 原有组件内容 -->
</div>

<!-- 页面 header 常驻触发 -->
<div class="page-header-actions">
  <button class="btn btn-annot-toggle" onclick="toggleAnnot('stats')"
          title="查看 PRD 注释">📋 PRD 注释</button>
</div>
```

### 4.3 导航标签

注释面板打开后，顶部显示 6 个导航标签，对应所有注释模块。标签使用简短中文名：

```html
<button class="annot-nav-btn" onclick="toggleAnnot('stats')">📊 统计卡片</button>
<button class="annot-nav-btn" onclick="toggleAnnot('batch')">⚡ 批量操作</button>
<button class="annot-nav-btn" onclick="toggleAnnot('table')">📋 数据表格</button>
<button class="annot-nav-btn" onclick="toggleAnnot('addExisting')">📋 添加已有</button>
<button class="annot-nav-btn" onclick="toggleAnnot('createNew')">➕ 新建</button>
<button class="annot-nav-btn" onclick="toggleAnnot('addMedia')">📱 添加媒体</button>
```

**icon + 短名推荐对照**：

| 组件 | Emoji | 推荐短名 |
|------|-------|----------|
| StatsCard | 📊 | 统计卡片 |
| BatchDropdown | ⚡ | 批量操作 |
| PublisherTable | 📋 | 数据表格 |
| AddExistingModal | 📋 | 添加已有 |
| CreatePublisherForm | ➕ | 新建 |
| AddMediaModal | 📱 | 添加媒体 |
| SearchableSelect | 🔍 | 搜索选择 |
| BatchConfirmModal | ⚠️ | 确认弹窗 |
| Toast | 🔔 | 通知 |

---

## 5. Integration Steps

将 HTML 注释系统集成到现有原型中，按以下步骤操作：

### Step 1: 准备注释数据

从 design.md 的 Annotation Block 提取数据，按 §3 格式构造 `ANNOTATIONS` 对象：

1. 遍历 design.md §2 中所有 `@ComponentName` 组件
2. 为每个组件创建一个 key（英文简短标识）
3. 提取 id / name / level / desc / states
4. 将每个 Annotation 字段拆分为 `{ title, lines }` 块
5. 保留树形缩进

### Step 2: 注入 CSS

将附录「完整 CSS」复制到原型 `<style>` 末尾。关键参数：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| 面板宽度 | 400px | 侧边面板宽度 |
| 动画时长 | 300ms | 面板滑入时长 |
| z-index | 10000 | 面板层级 |
| 触发按钮默认透明度 | 0.85 | hover 时变为 1.0 |

### Step 3: 注入 HTML 结构

在 `</body>` 前插入：

```html
<!-- 遮罩层 -->
<div class="annot-overlay" id="annotOverlay" onclick="closeAnnot()"></div>
<!-- 注释面板 -->
<div class="annot-panel" id="annotPanel">
  <div class="annot-header">
    <h3 id="annotTitle">PRD 注释</h3>
    <button class="annot-close" onclick="closeAnnot()">✕</button>
  </div>
  <div class="annot-nav" id="annotNav">
    <!-- 导航标签 -->
  </div>
  <div class="annot-body" id="annotBody">
    <!-- 由 JS 渲染 -->
  </div>
</div>
```

### Step 4: 添加触发按钮

为每个页面级组件容器添加 `.annot-section` class 和 📋 触发按钮（见 §4.2）。

在页面 header 添加常驻「📋 PRD 注释」按钮。

### Step 5: 注入 JS

将附录「完整 JS」复制到 `<script>` 末尾。确保：

- `ANNOTATIONS` 对象包含所有组件数据
- `toggleAnnot()` 和 `closeAnnot()` 函数定义正确
- `keys` 数组顺序与导航标签一致
- `escapeHtml()` 函数存在（防止 XSS）

### Step 6: 验证

- [ ] 组件枚举清单中的所有组件都已放置 trigger 按钮（无遗漏）
- [ ] 每个 trigger 按钮在其组件可视边界内，间距 ≤ 8px
- [ ] 点击 header「📋 PRD 注释」按钮 → 面板滑入，显示第一个组件注释
- [ ] 点击导航标签 → 切换对应组件注释
- [ ] 点击 inline 📋 按钮 → 打开面板并定位到对应组件的注释
- [ ] 点击 ✕ / 遮罩层 / ESC → 面板关闭
- [ ] 面板内容完整，无空白 block，无 HTML 转义问题
- [ ] 触发按钮 `data-annot` 属性与 `ANNOTATIONS` key 一致
- [ ] Back-propagation 已完成（如有修正 → design.md 已同步更新）

---

## 6. Complete Template Library

### 6.1 CSS 模板

```css
/* ============================================
   PRD Annotation System
   ============================================ */

/* Trigger Buttons */
.annot-trigger {
  position: absolute; top: 8px; right: 8px; z-index: 10;
  width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid #d1d5db; background: #fff;
  cursor: pointer; font-size: 13px; line-height: 26px; text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,.08); opacity: 0.85;
  transition: opacity .2s ease, background .2s ease;
}
.annot-trigger:hover { background: #eff6ff; border-color: #2563eb; }
.annot-trigger.active {
  opacity: 1; background: #2563eb; border-color: #2563eb;
  color: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,.2);
}
.annot-section { position: relative; }
.annot-section:hover .annot-trigger { opacity: 1; }

/* Header Toggle Button */
.btn-annot-toggle { font-size: 12px !important; padding: 5px 12px !important; }
.btn-annot-toggle.active {
  background: #2563eb !important; color: #fff !important;
  border-color: #2563eb !important;
}

/* Overlay */
.annot-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.3); opacity: 0; pointer-events: none;
  transition: opacity .3s ease;
}
.annot-overlay.open { opacity: 1; pointer-events: auto; }

/* Panel */
.annot-panel {
  position: fixed; top: 0; right: -420px; width: 400px; height: 100vh;
  background: #fff; box-shadow: -4px 0 20px rgba(0,0,0,.12);
  z-index: 10000; transition: right .3s ease;
  display: flex; flex-direction: column;
}
.annot-panel.open { right: 0; }

/* Panel Header */
.annot-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #e5e7eb;
}
.annot-header h3 { font-size: 15px; font-weight: 600; color: #111827; }
.annot-close {
  width: 28px; height: 28px; border: none; background: #f3f4f6;
  border-radius: 50%; cursor: pointer; font-size: 16px; line-height: 28px;
  text-align: center; color: #6b7280;
}
.annot-close:hover { background: #e5e7eb; }

/* Navigation */
.annot-nav {
  display: flex; gap: 6px; flex-wrap: wrap;
  padding: 10px 20px; border-bottom: 1px solid #f3f4f6;
}
.annot-nav-btn {
  font-size: 11px; padding: 4px 10px; border-radius: 12px;
  border: 1px solid #e5e7eb; background: #fff; cursor: pointer;
  color: #6b7280; transition: all .2s ease;
}
.annot-nav-btn:hover { border-color: #2563eb; color: #2563eb; }
.annot-nav-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; }

/* Body */
.annot-body { flex: 1; overflow-y: auto; padding: 16px 20px; }
.annot-section-title {
  font-size: 12px; font-weight: 600; color: #6b7280;
  text-transform: uppercase; letter-spacing: .5px;
  margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #f3f4f6;
}
.annot-line { font-size: 13px; line-height: 1.7; color: #374151; margin-bottom: 2px; }
.annot-label { color: #9ca3af; font-weight: 600; min-width: 80px; display: inline-block; }
.annot-block { margin-bottom: 16px; }

/* Responsive */
@media (max-width: 480px) {
  .annot-panel { width: 100%; right: -100%; }
}
```

### 6.2 JS 模板

```javascript
// ============================================
// PRD Annotation Data
// ============================================
const ANNOTATIONS = {
  // 每个 key 对应一个组件，参考 §3 Data Format
  // 示例：
  stats: {
    id: 'C01',
    name: '@StatsCardRow',
    level: 'L2',
    desc: '展示 3 张统计卡片',
    states: 'normal / zero',
    blocks: [
      { title: 'Trigger', lines: ['页面加载 → updateStats()'] },
      { title: 'Behavior', lines: [
        '内部流量主 = count(type=internal)',
        '总流量主 = count(all)',
        '活跃流量主 = count(type=internal AND status=active)'
      ]},
      { title: 'Dismiss', lines: ['数据变更 → updateStats()'] }
    ]
  }
};

let currentAnnot = null;

// ============================================
// Annotation Panel Control
// ============================================
function toggleAnnot(key) {
  if (currentAnnot === key) { closeAnnot(); return; }
  currentAnnot = key;
  const data = ANNOTATIONS[key];
  if (!data) return;

  // Update inline trigger buttons
  document.querySelectorAll('.annot-trigger').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('[data-annot="' + key + '"]').forEach(b => b.classList.add('active'));
  var hdrBtn = document.querySelector('.btn-annot-toggle');
  if (hdrBtn) hdrBtn.classList.add('active');

  // Update panel title
  document.getElementById('annotTitle').textContent = data.id + ' ' + data.name + ' ' + data.level;

  // Open panel + overlay
  document.getElementById('annotOverlay').classList.add('open');
  document.getElementById('annotPanel').classList.add('open');

  // Update nav buttons
  document.querySelectorAll('.annot-nav-btn').forEach(b => b.classList.remove('active'));
  var navBtns = document.querySelectorAll('.annot-nav-btn');
  var keys = ['stats', 'batch', 'table', 'addExisting', 'createNew', 'addMedia'];
  var idx = keys.indexOf(key);
  if (idx >= 0 && navBtns[idx]) navBtns[idx].classList.add('active');

  // Render body
  renderAnnotBody(data);
}

function closeAnnot() {
  currentAnnot = null;
  document.getElementById('annotOverlay').classList.remove('open');
  document.getElementById('annotPanel').classList.remove('open');
  document.querySelectorAll('.annot-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.annot-trigger').forEach(b => b.classList.remove('active'));
  var hdrBtn = document.querySelector('.btn-annot-toggle');
  if (hdrBtn) hdrBtn.classList.remove('active');
}

// ============================================
// Annotation Body Renderer
// ============================================
function renderAnnotBody(data) {
  var body = document.getElementById('annotBody');
  var html = '';

  // Description block
  html += '<div class="annot-block"><div class="annot-section-title">DESCRIPTION</div>';
  html += '<div class="annot-line">' + escapeHtml(data.desc) + '</div>';
  html += '<div class="annot-line"><span class="annot-label">States:</span> '
        + escapeHtml(data.states) + '</div></div>';

  // Annotation blocks
  data.blocks.forEach(function(b) {
    html += '<div class="annot-block"><div class="annot-section-title">'
          + escapeHtml(b.title.toUpperCase()) + '</div>';
    b.lines.forEach(function(l) {
      var line = l.replace(/^  ├── /, '&nbsp;&nbsp;&nbsp;&nbsp;├── ')
                   .replace(/^  └── /, '&nbsp;&nbsp;&nbsp;&nbsp;└── ');
      html += '<div class="annot-line">' + line + '</div>';
    });
    html += '</div>';
  });

  body.innerHTML = html;
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Close on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && currentAnnot) closeAnnot();
});
```

### 6.3 HTML 结构模板

```html
<!-- Annotation Overlay -->
<div class="annot-overlay" id="annotOverlay" onclick="closeAnnot()"></div>

<!-- Annotation Panel -->
<div class="annot-panel" id="annotPanel">
  <div class="annot-header">
    <h3 id="annotTitle">PRD 注释</h3>
    <button class="annot-close" onclick="closeAnnot()">✕</button>
  </div>
  <div class="annot-nav" id="annotNav">
    <!-- 自动由 JS 从 ANNOTATIONS keys 生成？不，手动维护更可控 -->
    <button class="annot-nav-btn" onclick="toggleAnnot('stats')">📊 统计卡片</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('batch')">⚡ 批量操作</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('table')">📋 数据表格</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('addExisting')">📋 添加已有</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('createNew')">➕ 新建</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('addMedia')">📱 添加媒体</button>
  </div>
  <div class="annot-body" id="annotBody">
    <!-- 由 renderAnnotBody() 渲染 -->
  </div>
</div>
```

---

## 7. Cost-Benefit Guide

| 原型复杂度 | 推荐方案 | 预计成本 |
|-----------|---------|---------|
| 1-2 个组件 | 不嵌入，直接引用 design.md | 0 |
| 3-5 个页面级组件 | 只加 header 按钮 + 导航标签，不加 inline 触发 | ~50 行 |
| 5-10 个组件含弹窗 | 完整方案（header 按钮 + inline 触发 + 导航标签） | ~200 行 |
| 10+ 组件含复杂交互 | 完整方案 + 自定义 icon | ~300 行 |

**底线**：超过 3 个组件的原型建议嵌入 HTML 注释系统。成本固定（约 200 行模板代码），但评审效率提升显著（评审者无需在页面和文档间切换）。
