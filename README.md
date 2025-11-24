# Demo - Vue.js 多功能演示项目

这是一个基于Vue 2.6的多功能演示项目，集成了多种前端技术和功能模块，包括3D图形、文件处理、用户界面组件等。

## 🚀 技术栈

### 核心框架
- **Vue 2.6.11** - 主框架
- **Vue Router 3.2.0** - 路由管理
- **Vuex 3.4.0** - 状态管理

### UI组件库
- **Element UI 2.15.13** - 主要UI组件库
- **iView 3.5.4** - 辅助UI组件
- **minireset.css 0.0.6** - CSS重置

### 功能库
- **Three.js 0.118.3** - 3D图形渲染
- **Axios 0.19.2** - HTTP请求
- **GSAP 3.3.4** - 动画库
- **XLSX 0.18.2** - Excel文件处理
- **lay-excel 1.7.6** - Excel操作增强
- **JSZip 3.7.1** - ZIP文件处理
- **file-saver 2.0.2** - 文件下载

### 开发工具
- **Vue CLI 4.4.0** - 构建工具
- **ESLint 6.7.2** - 代码规范
- **Sass 1.94.1** - CSS预处理器
- **cz-customizable 6.2.0** - Git提交规范化

## 📱 页面功能详解

### 1. 首页 - 分页表格测试 (`/`)
**文件位置**: `src/views/paged-table-test.vue`

**功能特点**:
- ✅ 使用自定义的`h-paged-table`组件实现分页功能
- ✅ 支持动态数据加载，从`video.json`文件读取数据
- ✅ 可配置分页大小（10, 33, 100条）
- ✅ 展示视频列表信息（标题、简介、缩略图、视频链接）

### 2. 3D演示页面 (`/three`)
**文件位置**: `src/views/Three.vue`

**功能特点**:
- 🎮 集成Three.js创建3D场景
- 🎲 渲染一个旋转的蓝色立方体
- 📱 自适应容器大小
- ⚡ 使用`requestAnimationFrame`实现流畅动画

### 3. 登录页面 (`/login`)
**文件位置**: `src/views/Login.vue`

**功能特点**:
- 🌍 多语言支持（中文繁体）
- 🏳️ 国家/地区选择功能
- ✅ 表单验证（邮箱格式、密码长度）
- 👁️ 密码显示/隐藏切换
- 🎠 轮播图展示
- 📱 二维码下载提示
- 🏆 ISO认证标识展示
- 🔐 集成登录API调用

### 4. 头像上传页面 (`/uploadHead`)
**文件位置**: `src/views/UploadHead.vue`

**功能特点**:
- 📤 图片上传和预览功能
- ⭕ 圆形头像裁剪工具
- 🔍 图片缩放控制（滑块调节）
- 🖱️ 拖拽移动图片位置
- 🔄 自定义`v-repeat-click`指令实现长按连续点击
- 📋 支持JPEG、PNG、BMP格式

### 5. 打字练习页面 (`/typing`)
**文件位置**: `src/views/Typing/Typing.vue`

**功能特点**:
- ⌨️ 实时打字练习和校验
- 🎹 键盘可视化显示
- 👆 手指位置指导
- ❌ 错误标记和修正提示
- 📜 自动滚动到当前字符
- ⬅️ 支持退格键删除
- 📊 打字速度和准确率统计

**子组件**:
- `src/views/Typing/Keyboard.vue` - 虚拟键盘组件

### 6. 视频配置生成器 (`/config`)
**文件位置**: `src/views/createVideoConfig/index.vue`

**功能特点**:
- ➕ 动态添加/删除视频配置项
- 🖼️ 缩略图上传和管理
- 📝 配置项包含：标题、视频链接、国家列表、简介、翻译
- 📦 一键生成ZIP压缩包
- 📁 包含JSON配置文件和缩略图文件夹
- 🎯 浮动按钮组（添加、下载）

### 7. 事件监听测试 (`/listenersTest`)
**文件位置**: `src/views/listenersTest/index.vue`

**功能特点**:
- 🔄 父子组件事件通信测试
- 🎨 装饰器模式测试（代码中注释了防抖和日志装饰器）
- 🔄 组件生命周期和事件处理演示

### 8. Excel导出测试 (`/xlsxTest`)
**文件位置**: `src/views/xlsxTest/xlsxTest.vue`

**功能特点**:
- 📊 Excel文件导出功能
- 📦 ZIP文件打包下载
- 🔄 Service Worker注册和管理
- 🎨 支持自定义Excel样式和合并单元格

## 🛠️ 工具函数和配置文件深入分析

### 1. HTTP请求封装
**文件位置**: `src/libs/request.js`

**功能特点**:
- 🌐 基于Axios封装的HTTP客户端
- ⚠️ 统一的错误处理机制
- 📦 响应拦截器，返回`[data, error, response]`格式
- 📡 支持GET和POST方法
- ⏰ 120秒超时设置
- 🚫 禁用浏览器缓存

### 2. 登录API模块
**文件位置**: `src/api/login.js`

**功能特点**:
- 🔗 统一的API端点管理
- 🔐 包含登录、验证码、登出、头像获取接口
- 🌐 RESTful风格的API设计

### 3. 自定义Webpack插件
**文件位置**: `plugin/staticCountPlugin.js`

**功能特点**:
- 🔍 构建时自动扫描图片资源
- 📝 生成`static_list.json`文件，包含所有图片路径
- 🚀 便于前端动态加载静态资源

### 4. Service Worker配置
**文件位置**: `public/serviceWorker.js`

**功能特点**:
- 📱 实现离线缓存策略
- 🏆 缓存优先的网络请求策略
- 🔄 动态获取图片资源列表并缓存
- 📦 支持缓存版本管理（v1）
- 💾 自动缓存成功的网络请求

### 5. Excel导出工具
**文件位置**: `src/views/xlsxTest/exportMethod.js`

**功能特点**:
- 📊 基于lay-excel库的Excel文件生成
- 🔄 支持单元格合并
- 🎨 自定义样式设置
- 📦 ZIP文件打包功能
- 📋 支持多文件批量导出

## ⚙️ 配置文件详解

### 1. Vue配置文件
**文件位置**: `vue.config.js`

**功能特点**:
- 🔧 集成自定义静态资源统计插件
- 🌐 开发环境代理配置（指向内部服务器）
- 🚀 支持跨域请求

### 2. Git提交规范化配置
**文件位置**: `.cz-config.js`

**功能特点**:
- 📝 自定义中文提交类型（特性、修复、文档、风格、重构、性能、测试、工具、回滚）
- 🎯 支持自定义scope范围
- 📋 结构化的提交信息格式
- 🔗 支持关联issue关闭
- ✅ 提交前确认机制

**提交类型说明**:
- `特性`: 新功能开发
- `修复`: Bug修复
- `文档`: 文档变更
- `风格`: 代码风格调整（不影响逻辑）
- `重构`: 代码重构
- `性能`: 性能优化
- `测试`: 测试相关
- `工具`: 开发工具变动
- `回滚`: 代码回退

### 3. ESLint配置
**文件位置**: `.eslintrc.js`

**功能特点**:
- ✅ Vue.js Essential规则集
- 🎯 支持装饰器语法（legacyDecorators）
- 🚀 生产环境警告console和debugger
- 🔧 Babel解析器支持

### 4. 浏览器兼容性配置
**文件位置**: `.browserslistrc`

**功能特点**:
- 🌍 支持全球使用率>1%的浏览器
- 📱 支持最近2个版本
- 💪 排除已停止维护的浏览器

### 5. 样式配置
**文件位置**: `src/assets/my.css`

**功能特点**:
- 🎨 自定义Element UI主题色
- 🎭 图标字体配置
- 🔘 按钮样式重写和优化
- 📋 表单验证星号隐藏功能

## 🏗️ 项目架构特点

### 1. 模块化设计
- 📁 按功能模块划分目录结构
- 🧩 组件化开发，复用性强
- 🔗 API接口统一管理

### 2. 性能优化
- 📱 Service Worker实现离线缓存
- 🛤️ 路由懒加载
- 🖼️ 图片资源优化

### 3. 用户体验
- 📱 响应式设计，适配多端
- ✨ 丰富的交互动画
- ⚠️ 完善的错误处理

### 4. 开发体验
- 📏 ESLint代码规范
- 📝 Git提交规范化（commitizen）
- 🔄 热重载开发环境

## 🚀 快速开始

### 安装依赖
```bash
npm install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run serve
# 或
pnpm serve
```

### 构建生产版本
```bash
npm run build
# 或
pnpm build
```

### 代码检查
```bash
npm run lint
# 或
pnpm lint
```

## 🤖 自动化部署

项目配置了GitHub Actions自动工作流，实现代码推送到主分支时的自动构建和部署。

### 部署配置
- **触发条件**: 当代码推送到`main`或`master`分支时自动触发
- **部署目标**: GitHub Pages
- **构建环境**: Ubuntu Latest + Node.js 18.20.8 + pnpm
- **工作流文件**: `.github/workflows/deploy.yml`

### 部署流程
1. **代码检查**: 从GitHub仓库拉取最新代码
2. **环境准备**: 设置Node.js和pnpm环境
3. **依赖安装**: 执行`pnpm install`安装项目依赖
4. **项目构建**: 执行`pnpm run build`构建生产版本
5. **自动部署**: 将构建产物(`dist`目录)部署到GitHub Pages

### GitHub Pages访问
部署成功后，项目将自动发布到：
```
https://[username].github.io/[repository-name]/
```

### 部署权限配置
- 工作流中已配置`permissions: { contents: write }`
- 使用GitHub Actions自动生成的`GITHUB_TOKEN`进行认证
- 无需手动配置个人访问令牌

## 📝 提交规范

项目使用commitizen进行Git提交规范化，运行：
```bash
git commit
```

会自动触发交互式提交界面，按照提示选择提交类型和填写提交信息。

## 🎯 项目特色

这个项目展示了Vue.js在现代前端开发中的多种应用场景，从基础的表单处理到复杂的3D图形渲染，从文件操作到离线缓存，是一个功能丰富、技术全面的前端演示项目。特别适合用于：

- 🎓 Vue.js技术栈学习
- 💡 前端功能模块参考
- 🔧 开发最佳实践展示
- 🚀 项目架构设计参考

---

**注意**: 本项目为演示项目，部分功能使用的是测试数据和接口，实际使用时需要替换为真实的业务逻辑。
