# 🚀 网站部署指南

您的个人作品集网站已经构建完成！以下是两种推荐的部署方式：

## 方案一：Vercel 部署（推荐）

### 步骤：
1. **访问 [Vercel官网](https://vercel.com)**
2. **使用GitHub账号登录**
3. **点击 "New Project"**
4. **导入您的GitHub仓库**（需要先将代码推送到GitHub）
5. **Vercel会自动检测到这是一个Vite项目并配置构建设置**
6. **点击 "Deploy" 完成部署**

### 优势：
- ✅ 全球CDN加速
- ✅ 自动HTTPS
- ✅ 每次代码更新自动重新部署
- ✅ 免费自定义域名

## 方案二：GitHub Pages 部署

### 前提条件：
1. 将代码推送到GitHub仓库
2. 确保仓库是公开的（或者有GitHub Pro账号）

### 部署步骤：
```bash
# 1. 构建项目（如果还没构建）
npm run build

# 2. 部署到GitHub Pages
npm run deploy
```

### 配置GitHub Pages：
1. 进入GitHub仓库设置
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 "gh-pages" 分支
5. 点击保存

## 🌐 访问地址

部署成功后，您将获得以下访问地址：

- **Vercel**: `https://your-project-name.vercel.app`
- **GitHub Pages**: `https://your-username.github.io/your-repo-name`

## 📱 网站功能

### 🎨 作品管理
- 访问 `/admin` 进入管理后台
- 默认密码：`admin123`
- 支持上传绘画作品和视频作品
- 可编辑标题、描述、分类和标签

### 🎯 自定义设置
- 修改网站标题和描述
- 设置社交媒体链接
- 深色/浅色主题切换

## 🔧 本地开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📞 技术支持

如果在部署过程中遇到问题：

1. **检查构建日志**：确保 `npm run build` 没有错误
2. **验证文件结构**：确保 `dist` 目录包含所有必要文件
3. **查看平台文档**：
   - [Vercel文档](https://vercel.com/docs)
   - [GitHub Pages文档](https://docs.github.com/en/pages)

## 🎉 恭喜！

您的个人作品集网站现在可以与全世界分享了！记得定期更新您的作品，让网站保持活力。