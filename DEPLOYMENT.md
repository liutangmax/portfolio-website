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

### 步骤 1: 创建 GitHub 仓库
⚠️ **重要：必须先完成此步骤，否则推送会失败！**

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名建议使用：`personal-portfolio` 或 `portfolio-website`
4. 设置为 Public（公开仓库，GitHub Pages 免费版需要）
5. **不要**勾选 "Add a README file"、"Add .gitignore"、"Choose a license"（因为本地已有）
6. 点击 "Create repository"
7. 复制仓库的 HTTPS URL（格式：`https://github.com/yourusername/your-repo-name.git`）

**参考示例：** 可以参考这个作品集网站仓库的结构：`https://github.com/liutangmax/portfolio-website`

### 步骤 2: 连接本地仓库到 GitHub
```bash
# 添加远程仓库（替换为你刚才复制的实际仓库地址）
git remote add origin https://github.com/yourusername/your-repo-name.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

如果推送失败，请检查：
- GitHub 仓库是否已创建
- 仓库地址是否正确
- 是否有推送权限

### 步骤 3: 部署到 GitHub Pages
```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

### 步骤 4: 配置 GitHub Pages
1. 在 GitHub 仓库中，进入 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages"
4. 等待几分钟后访问：`https://yourusername.github.io/your-repo-name`

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