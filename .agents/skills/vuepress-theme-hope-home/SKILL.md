---
name: vuepress-theme-hope-home
description: 帮助编写、优化或生成符合 VuePress Theme Hope 主题规范的站点主页或主页 README.md。当用户需要设计或配置项目首页（README.md）、设置 hero 标题与副标题（heroText, tagline）、配置主页动作按钮（actions）、添加亮点展示章节（highlights）、使用旧版功能特性卡片（features）、或者启用并配置作品集/档案（portfolio）页面时，必须使用此 skill 进行配置指导。同时，当用户需要配置 Markdown 中的高级代码块属性（如代码高亮、行聚焦、Shiki 标记、Shiki Twoslash 悬浮框/交互式类型弹窗）或开发/引入自定义 Vue 组件（通过别名引入、component 代码块语法）时，也必须使用此 skill 进行处理。当用户需要配置文本排版增强（提示容器、GFM 警告、Attrs 自定义属性、文字高亮与剧透、包含文件 @include）、文本图表（Markmap 思维导图、Mermaid、Chart.js、ECharts）、Markdown 幻灯片（RevealJS PPT 容器）或站点安全扩展（密码加密、公告弹窗、版权保护防复制、背景水印、灯箱 PhotoSwipe）时，也必须使用此 skill 进行指导和验证。
---

# VuePress Theme Hope 配置与增强语法 Skill 调度总控

本 Skill 作为总入口，负责在处理 VuePress Theme Hope 站点的各种主页配置、代码块增强、自定义组件引入、文本排版、图表与 RevealJS 幻灯片、站点安全与公告、以及内置高级媒体交互组件等任务时，引导你读取最匹配的详细技术参考手册。

---

## 🎯 任务分类与引导（使用说明）

当用户提出具体的 VuePress 站点设计与 Markdown 编写请求时，**你必须首先识别当前问题属于哪一类，并立即使用 `view_file` 工具读取相对应的分项参考指南**：

### 1. 主页 YAML Frontmatter 与布局设计
- **适用场景**：配置 `README.md` 作为站点的主展示页、配置主标题 (`heroText`)、副标题 (`tagline`)、动作按钮 (`actions`)、亮点展示卡片 (`highlights`)、旧版特性列表 (`features`) 或创建个人档案/作品集主页 (`portfolio`)。
- **需要读取的文件**：
  [homepage.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/homepage.md)

### 2. 代码块高级渲染与交互式弹窗 (Twoslash)
- **适用场景**：在代码块中配置行号、自动折叠、设置标题 (`title="filename"`)、高亮特定行、聚焦特定行 (`// [!code focus]`)、标记代码差异 (`// [!code ++]`)，或者利用 `twoslash` (即 ```` ```ts twoslash ````) 实现**鼠标悬停/点击代码行弹出交互式类型定义小窗口**。
- **需要读取的文件**：
  [code-enhancements.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/code-enhancements.md)

### 3. 自定义组件开发与局部导入
- **适用场景**：全局注册自定义组件 (通过 `.vuepress/client.ts`)；在 Markdown 中直接导入局部组件 (通过 `<script setup>`) 并解决**相对路径失效、必须使用 `@source` 别名**的报错；以及在 Markdown 中使用扩展的 ````component 组件名 ```` 代码块直接传递 YAML/JSON 参数 Props 的高级语法。
- **需要读取的文件**：
  [custom-components.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/custom-components.md)

### 4. Markdown 样式与文本排版增强
- **适用场景**：配置文本的排版元素，如提示容器 (`::: tip`)、GFM 警告引用块 (`> [!NOTE]`)、自定义属性挂载 (`{attrs}`)、荧光文本高亮与点击剧透文本 (`==mark==` / `!!spoiler!!`)，以及外部 Markdown 文档片段的嵌入 (`<!-- @include -->`)。
- **需要读取的文件**：
  [markdown-enhancements.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/markdown-enhancements.md)

### 5. 思维导图、各种图表与 RevealJS 幻灯片 PPT 制作
- **适用场景**：使用纯文本快速在 Markdown 页面绘制 `markmap` 思维导图、`mermaid` 流程图/时序图、`echarts` 和 `chart` 数据图表、`plantuml` 图形；以及使用 `::: revealjs` 容器直接把 Markdown 编译为可以在线演示的 PPT 幻灯片。
- **需要读取的文件**：
  [charts-and-revealjs.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/charts-and-revealjs.md)

### 6. 站点级安全与特色扩展功能
- **适用场景**：配置页面及路径的加密 (`encrypt`)；配置进入站点或匹配路径时的全局弹窗公告 (`notice`)；开启版权拷贝保护机制 (`copyright`)、整站平铺背景防拷贝水印 (`watermark`)、以及点击图片自动触发灯箱放大相册交互 (`photo-swipe`)。
- **需要读取的文件**：
  [site-features.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/site-features.md)

### 7. 内置高级媒体与交互组件
- **适用场景**：在 Markdown 中嵌入 B 站视频 (`<BiliBili />`)、YouTube 视频 (`<YouTube />`)；使用 VidStack 音视频播放器播放普通/流媒体链接 (`<VidStack />`)；在文档里直接浏览预览 PDF 文件 (`<PDF />`)；或嵌入 CodePen、StackBlitz 在线代码演练场，展示 SiteInfo 站点卡片。
- **需要读取的文件**：
  [built-in-components.md](file:///E:/aa%20internet%20download/vuepress-theme-hope-main/.agents/skills/vuepress-theme-hope-home/references/built-in-components.md)

---

## ⚠️ 终极防错黄金法则（必须时刻牢记）

无论执行哪类任务，都必须遵循以下底线：
1. **主页图片绝对禁止相对路径**：`heroImage`, `bgImage`, `avatar` 等路径必须是绝对路径（如 `/logo.png`）或 URL。
2. **Markdown 局部导入组件禁止相对路径**：必须通过 `@source` 别名（如 `@source/components/Comp.vue`）或 `alias` 中配置的别名导入，不能使用 `./` 或 `../`。
3. **亮点卡片属性互斥**：亮点卡片组里，亮点列表 (`highlights`) 与特性网格 (`features`) 在同一个卡片章节中只得存在其一，不得并存。
4. **加密密码只得使用字符串**：配置 `encrypt.config` 或 `encrypt.admin` 密码时只能使用字符串，数字 `1234` 与 `"1234"` 的哈希是不相同的。
5. **激活内置组件**：使用音视频、PDF、CodePen 等内置高级组件前，必须确认它们已在 `theme.ts` 的 `plugins.components.components` 数组中添加，且 VidStack 组件需要安装 `vidstack@next` 依赖包。
