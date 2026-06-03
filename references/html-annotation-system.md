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

### 2.1 Components

| Component | Responsibility | Notes |
|-----------|---------------|-------|
| **Annotation Data** | Store annotations extracted from design.md | JS object, one key per component |
| **Trigger Buttons** | Entry point for annotation panel | Inline (component area) + Header (global) |
| **Annotation Panel** | Display full annotation content | Slide-in from right with nav tabs |
| **Overlay** | Close panel on outside click | Semi-transparent, z-index 9999 |

### 2.2 Interaction Flow

```
User clicks 📋 button
  → toggleAnnot(key)
    → Panel slides in (right: -420px → 0, 300ms ease)
    → Parse ANNOTATIONS[key]
    → Render title (C01 @StatsCardRow L2)
    → Render body (DESCRIPTION + blocks)
    → Highlight corresponding nav tab and trigger button
  → Click nav tab → switch annotation
  → Click ✕ / overlay / ESC → closeAnnot()
```

---

## 3. Data Format — From design.md Annotation Block to JS Object

### 3.1 Conversion Rule

Each design.md Annotation Block converts to one JS entry:

```javascript
const ANNOTATIONS = {
  componentKey: {
    id: 'C01',
    name: '@ComponentName',
    level: 'L2',
    desc: 'Component responsibility description',
    states: 'normal / error',
    blocks: [
      { title: 'Trigger', lines: ['condition 1', 'condition 2'] },
      { title: 'Behavior', lines: ['behavior 1', '  ├── branch A', '  └── branch B'] },
      { title: 'API', lines: ['GET /api/resource → 200: {...}'] },
      { title: 'UI Style', lines: ['white background, 1px border'] },
      { title: 'UI State', lines: ['normal: ...', 'error: ...'] },
      { title: 'Timing', lines: ['200ms slideDown, 3s display'] },
      { title: 'Dismiss', lines: ['click outside, ESC'] }
    ]
  }
};
```

### 3.2 Field Mapping

| design.md Annotation Field | JS blocks.title | Notes |
|---------------------------|-----------------|-------|
| `[Dev] trigger:` | `'Trigger'` | One line per trigger condition |
| `[Dev·Tester] behavior:` | `'Behavior'` | Tree indentation preserved |
| `[API]` | `'API'` | Request/response structure |
| `[UI] placement:` | `'Placement'` | Position description |
| `[UI] style:` | `'UI Style'` | Visual details |
| `[UI] state:` | `'UI State'` | One line per state |
| `[UI] timing:` | `'Timing'` | Animation params |
| `[UI] responsive:` | `'Responsive'` | Responsive strategy |
| `[Tester] state:` | `'Tester State'` | Test perspective |
| `[Dev] dismiss:` | `'Dismiss'` | Close conditions |
| `[Permission]` | `'Permission'` | Access control |

### 3.3 Tree Indentation Convention

```javascript
'  ├── condition A → result A'    ← 2 spaces + ├── prefix
'  └── condition B → result B'    ← 2 spaces + └── prefix
```

Rendered as `&nbsp;&nbsp;&nbsp;&nbsp;├── ` in HTML.

---

## 4. Component Mapping — Trigger Button Layout

### 4.0 Prerequisite: Component Enumeration

Before placing trigger buttons, the component enumeration must be complete (see `annotation-templates.md` §8 Step 8a). Trigger buttons should only be placed on enumerated components — no omissions, no phantom items.

### 4.1 Trigger Button Placement Rules

Each component must have **at least 1 trigger button**. Buttons must be within the component's visual boundary, ≤ 8px from component edge.

| Component Type | Trigger Position | HTML Structure |
|---------------|-----------------|----------------|
| Page-level (stats cards) | Container top-right, ≤ 8px from edge | Container: `class="annot-section"` + `position: relative` |
| Toolbar / action bar | Toolbar top-right, inline with action buttons | Inline trigger (22px circle) |
| Data table | Table container top-right, ≤ 8px from edge | Container `position: relative` |
| Modal header | Header title right, inline with close button | 26px circle button, flex layout |
| Form section | Form area top-right | Inline trigger (22px circle) |
| Detail page block | Block title row right | Inline trigger |
| Page header | h1 title right, inline with ⓘ icon | 28px circle button |

### 4.2 Trigger Button HTML

```html
<!-- Inline trigger -->
<div class="stats-row annot-section">
  <button class="annot-trigger" data-annot="stats" onclick="toggleAnnot('stats')"
          title="查看 PRD 注释">📋</button>
  <!-- Original component content -->
</div>

<!-- Header trigger (always visible) -->
<div class="page-header-actions">
  <button class="btn btn-annot-toggle" onclick="toggleAnnot('stats')"
          title="查看 PRD 注释">📋 PRD 注释</button>
</div>
```

### 4.3 Navigation Tabs

Annotation panel shows nav tabs for all annotation modules:

```html
<button class="annot-nav-btn" onclick="toggleAnnot('stats')">📊 统计卡片</button>
<button class="annot-nav-btn" onclick="toggleAnnot('batch')">⚡ 批量操作</button>
<button class="annot-nav-btn" onclick="toggleAnnot('table')">📋 数据表格</button>
```

**Icon + Short Name Reference:**

| Component | Emoji | Short Name |
|-----------|-------|------------|
| StatsCard | 📊 | 统计卡片 |
| BatchDropdown | ⚡ | 批量操作 |
| PublisherTable | 📋 | 数据表格 |
| AddExistingModal | 📋 | 添加已有 |
| CreatePublisherForm | ➕ | 新建 |
| AddMediaModal | 📱 | 添加媒体 |
| SearchableSelect | 🔍 | 搜索选择 |
| BatchConfirmModal | ⚠️ | 确认弹窗 |
| Toast | 🔔 | 通知 |
| PageTitleInfo | ℹ️ | 标题说明 |
| PublisherDetail | 📄 | 详情页 |
| DetailEditForm | ✏️ | 编辑表单 |
| MediaManage | 📺 | 媒体管理 |
| NoteEditor | 📝 | 备注编辑 |
| TransferOwner | ↔️ | 归属交接 |
| OperationLog | 📋 | 操作日志 |

---

## 5. Integration Steps

### Step 1: Prepare Annotation Data

Extract from design.md Annotation Blocks into `ANNOTATIONS` JS object:
1. Enumerate all `@ComponentName` components in design.md §2
2. Create one key per component (English short identifier)
3. Extract id / name / level / desc / states
4. Split each annotation field into `{ title, lines }` blocks
5. Preserve tree indentation

### Step 2: Inject CSS

Copy the CSS template (§6.1) into prototype `<style>`.

### Step 3: Inject HTML Structure

Insert before `</body>`:
- Overlay div
- Panel div (header + nav + body)
- Each trigger button

### Step 4: Add Trigger Buttons

For each page-level component container, add `.annot-section` class and 📋 trigger button. Add header PRD button.

### Step 5: Inject JS

Copy JS template (§6.2) into `<script>`. Verify:
- `ANNOTATIONS` contains all components
- `toggleAnnot()` and `closeAnnot()` defined
- `keys` array order matches nav tabs
- `escapeHtml()` exists

### Step 6: Verify

- [ ] All enumerated components have trigger buttons
- [ ] Each trigger button within component visual boundary, ≤ 8px spacing
- [ ] Header 📋 button → panel slides in, shows first annotation
- [ ] Nav tabs → switch annotations
- [ ] Inline 📋 buttons → open panel at correct annotation
- [ ] ✕ / overlay / ESC → close panel
- [ ] Panel content complete, no empty blocks
- [ ] `data-annot` attribute matches `ANNOTATIONS` key
- [ ] Back-propagation done (any prototype corrections synced to design.md)

---

## 6. Complete Template Library

### 6.1 CSS Template

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

/* Inline trigger (modals, toolbars) */
.annot-trigger-inline {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid #d1d5db; background: #fff;
  cursor: pointer; font-size: 11px; line-height: 1;
  box-shadow: 0 1px 3px rgba(0,0,0,.08); opacity: 0.85;
  transition: opacity .2s ease, background .2s ease;
  vertical-align: middle; margin-left: 6px;
}
.annot-trigger-inline:hover { background: #eff6ff; border-color: #2563eb; }
.annot-trigger-inline.active {
  opacity: 1; background: #2563eb; border-color: #2563eb;
  color: #fff;
}

/* Header trigger */
.annot-trigger-header {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid #d1d5db; background: #fff;
  cursor: pointer; font-size: 13px; line-height: 1;
  box-shadow: 0 1px 3px rgba(0,0,0,.08); opacity: 0.85;
  transition: opacity .2s ease, background .2s ease;
}
.annot-trigger-header:hover { background: #eff6ff; border-color: #2563eb; }
.annot-trigger-header.active {
  opacity: 1; background: #2563eb; border-color: #2563eb;
  color: #fff;
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

### 6.2 JS Template

```javascript
// ============================================
// PRD Annotation Data
// ============================================
const ANNOTATIONS = {
  // Each key maps to one component
  stats: {
    id: 'C01',
    name: '@StatsCardRow',
    level: 'L2',
    desc: '展示 3 张统计卡片',
    states: 'normal / zero',
    blocks: [
      { title: 'Trigger', lines: ['页面加载 → updateStats()'] },
      { title: 'Behavior', lines: [
        '卡片一 = 内部流量主数量（type 为"内部"）',
        '卡片二 = 总流量主数量（全部）',
        '卡片三 = 活跃内部流量主数量（type 为"内部"且状态为"开启"）'
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
  document.querySelectorAll('.annot-trigger, .annot-trigger-inline, .annot-trigger-header')
    .forEach(b => b.classList.remove('active'));
  document.querySelectorAll('[data-annot="' + key + '"]')
    .forEach(b => b.classList.add('active'));

  // Update panel title
  document.getElementById('annotTitle').textContent = data.id + ' ' + data.name + ' ' + data.level;

  // Open panel + overlay
  document.getElementById('annotOverlay').classList.add('open');
  document.getElementById('annotPanel').classList.add('open');

  // Update nav buttons
  document.querySelectorAll('.annot-nav-btn').forEach(b => b.classList.remove('active'));
  var navBtns = document.querySelectorAll('.annot-nav-btn');
  var keys = Object.keys(ANNOTATIONS);
  var idx = keys.indexOf(key);
  if (idx >= 0 && navBtns[idx]) navBtns[idx].classList.add('active');

  // Render body
  renderAnnotBody(data);
}

function closeAnnot() {
  currentAnnot = null;
  document.getElementById('annotOverlay').classList.remove('open');
  document.getElementById('annotPanel').classList.remove('open');
  document.querySelectorAll('.annot-nav-btn, .annot-trigger, .annot-trigger-inline, .annot-trigger-header')
    .forEach(b => b.classList.remove('active'));
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
                  .replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
}

// Close on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && currentAnnot) closeAnnot();
});
```

### 6.3 HTML Structure Template

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
    <button class="annot-nav-btn" onclick="toggleAnnot('stats')">📊 统计卡片</button>
    <button class="annot-nav-btn" onclick="toggleAnnot('batch')">⚡ 批量操作</button>
    <!-- More nav buttons -->
  </div>
  <div class="annot-body" id="annotBody">
    <!-- Rendered by renderAnnotBody() -->
  </div>
</div>
```

---

## 7. Cost-Benefit Guide

| Prototype Complexity | Recommended Approach | Estimated Cost |
|---------------------|-------------------|----------------|
| 1-2 components | Skip HTML annotation, reference design.md directly | 0 |
| 3-5 page-level components | Header button + nav tabs only, no inline triggers | ~50 lines |
| 5-10 components with modals | Full: header + inline triggers + nav tabs | ~200 lines |
| 10+ components with complex interactions | Full + custom icons | ~300 lines |

**Bottom line**: >3 components → embed. Fixed template cost (~200 lines), but review efficiency gains significantly (reviewers don't switch between page and documents).

---

## 8. Back-Propagation

When corrections are made during HTML annotation generation or review, they must propagate back through the document chain:

```
HTML prototype correction
  → Step 1: Sync to design.md Annotation Block
  → Step 2: Sync to tasks.md acceptance criteria
  → Step 3: Sync to proposal.md if requirement changes
```

Mark with `[BP]` tag in commit messages for traceability.
