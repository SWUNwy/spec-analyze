#!/bin/bash
# spec-analyze 项目初始化脚本
# 用法: ./scripts/init.sh /path/to/project

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="${1:-.}"

echo "==> 初始化 spec-analyze 到: $PROJECT_DIR"

# 1. 创建目录结构
mkdir -p "$PROJECT_DIR/docs/"{specs,analysis,research}

echo "==> 创建: docs/{specs,analysis,research}"

# 2. 创建 .gitignore
if [ ! -f "$PROJECT_DIR/.gitignore" ]; then
  cat > "$PROJECT_DIR/.gitignore" << 'EOF'
# spec-analyze
docs/analysis/*.local.md
EOF
  echo "==> 创建: .gitignore"
fi

echo ""
echo "==> 完成！"
echo ""
echo "下一步："
echo "  1. 将 spec-analyze SKILL.md 加载到 CLAUDE.md"
echo "  2. 在 docs/specs/ 中创建方案文档"
echo "  3. 使用交互式分析流程推进"