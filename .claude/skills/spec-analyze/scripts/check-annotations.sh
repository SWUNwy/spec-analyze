#!/bin/bash
# 注释质量检查脚本
# 验证 proposal/design/tasks 文档中的注释完整性
# 用法: ./scripts/check-annotations.sh docs/specs/proposal.md

set -e

TARGET="${1:-.}"
PASS=0
FAIL=0
WARN=0

red()   { echo -e "\033[0;31m$1\033[0m"; }
green() { echo -e "\033[0;32m$1\033[0m"; }
yellow(){ echo -e "\033[1;33m$1\033[0m"; }

check() {
  local file="$1"
  local name
  name=$(basename "$file")

  # 1. 检查 L1 注释（trigger-behavior-dismiss）
  if grep -qE '<!--\s*(trigger|behavior|dismiss)' "$file" 2>/dev/null; then
    green "  [PASS] $name: 包含 L1 注释"
    PASS=$((PASS+1))
  else
    yellow "  [WARN] $name: 未发现 L1 注释（trigger/behavior/dismiss）"
    WARN=$((WARN+1))
  fi

  # 2. 检查 L2 注释（placement/style/state/timing）
  if grep -qE '<!--\s*(placement|style|state|timing)' "$file" 2>/dev/null; then
    green "  [PASS] $name: 包含 L2 注释"
    PASS=$((PASS+1))
  else
    yellow "  [WARN] $name: 未发现 L2 注释（placement/style/state/timing）"
    WARN=$((WARN+1))
  fi

  # 3. 检查 L3 注释（accessibility/responsive/i18n）
  if grep -qE '<!--\s*(accessibility|responsive|i18n)' "$file" 2>/dev/null; then
    green "  [PASS] $name: 包含 L3 注释"
    PASS=$((PASS+1))
  else
    yellow "  [WARN] $name: 未发现 L3 注释（accessibility/responsive/i18n）"
    WARN=$((WARN+1))
  fi

  # 4. 检查组件类型标注（T1-T11）
  if grep -qE '<!--\s*T[1-9][0-9]?\s*-->' "$file" 2>/dev/null; then
    green "  [PASS] $name: 包含组件类型标注"
    PASS=$((PASS+1))
  else
    yellow "  [WARN] $name: 未发现组件类型标注（T1-T11）"
    WARN=$((WARN+1))
  fi

  # 5. 检查未闭合的 HTML 注释
  local unclosed
  unclosed=$(grep -c '<!--' "$file" 2>/dev/null || true)
  local closed
  closed=$(grep -c '-->' "$file" 2>/dev/null || true)
  if [ "$unclosed" -ne "$closed" ]; then
    red "  [FAIL] $name: HTML 注释未闭合（$unclosed 开启, $closed 闭合）"
    FAIL=$((FAIL+1))
  else
    green "  [PASS] $name: HTML 注释格式正确"
    PASS=$((PASS+1))
  fi
}

echo "spec-analyze 注释质量检查"
echo "========================"
echo ""

if [ -f "$TARGET" ]; then
  check "$TARGET"
elif [ -d "$TARGET" ]; then
  find "$TARGET" -name '*.md' | while IFS= read -r f; do
    check "$f"
  done
else
  # 递归查找所有 md 文件
  find "$TARGET" -name '*.md' 2>/dev/null | while IFS= read -r f; do
    check "$f"
  done
fi

echo ""
echo "---"
echo "通过: $PASS  失败: $FAIL  警告: $WARN"