#!/usr/bin/env sh

# 自动部署脚本  

# 构建
npm run docs:build
# 导航到构建输出目录
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 推到你仓库的 master 分支
git push -f main:gh-pages git@github.com:director-zhou/vite-learn.git