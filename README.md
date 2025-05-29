# 图片压缩工具

这是一个功能强大的在线图片处理工具，提供图片压缩、格式转换、水印添加等功能，帮助用户快速处理图片。

## 功能特点

- 🖼️ 支持多种图片格式（JPG、PNG、WebP、GIF等）
- 📤 支持拖拽上传和点击上传
- 🎯 可调节压缩质量
- 👀 实时预览压缩效果
- 📥 一键下载压缩后的图片
- 📦 支持批量处理多张图片
- 🔄 图片格式转换（JPG、PNG、WebP、GIF等）
- 💧 图片水印添加（支持文字和图片水印）
- 📝 压缩历史记录（记录最近处理的图片）

## 技术栈

- Vue 3
- HTML5
- CSS3
- 响应式设计
- LocalStorage（用于存储历史记录）

## 项目结构

```
src/
├── components/        # 组件目录
│   ├── ImageUploader.vue    # 图片上传组件
│   ├── ImageCompressor.vue  # 图片压缩组件
│   ├── ImagePreview.vue     # 图片预览组件
│   ├── ImageConverter.vue   # 图片格式转换组件
│   ├── WatermarkAdder.vue   # 水印添加组件
│   └── HistoryList.vue      # 历史记录组件
├── assets/           # 静态资源
├── styles/           # 样式文件
├── utils/           # 工具函数
│   ├── imageProcessor.js    # 图片处理工具
│   ├── watermark.js        # 水印处理工具
│   └── storage.js          # 本地存储工具
└── App.vue          # 主应用组件
```

## 使用说明

1. 打开网站首页
2. 点击上传区域或将图片拖拽到上传区域
3. 选择需要的功能：
   - 压缩：选择压缩质量
   - 格式转换：选择目标格式
   - 水印：添加文字或图片水印
4. 等待处理完成
5. 预览处理效果
6. 点击下载按钮保存处理后的图片
7. 在历史记录中查看最近处理的图片

## 本地开发

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 部署说明

### 使用 Vercel 部署

1. 注册 [Vercel](https://vercel.com) 账号

2. 安装 Vercel CLI
```bash
npm install -g vercel
```

3. 登录 Vercel
```bash
vercel login
```

4. 部署项目
```bash
vercel
```

### 使用其他平台部署

1. 构建项目
```bash
npm run build
```

2. 将 `dist` 目录下的文件上传到您的服务器

3. 配置服务器以支持 HTML5 History 模式

## 开发计划

- [x] 项目初始化
- [x] 基础界面开发
- [x] 图片上传功能
- [x] 图片压缩功能
- [x] 图片格式转换功能
- [x] 水印添加功能
- [x] 历史记录功能
- [x] 预览功能
- [x] 下载功能
- [x] 响应式适配
- [x] 性能优化
- [x] 本地存储优化 