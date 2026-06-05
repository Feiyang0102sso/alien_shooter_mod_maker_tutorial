# VuePress Theme Hope 主页配置规范

本指南用于指导如何配置与编写符合 VuePress Theme Hope 主题规范的**项目主页**与**档案主页**。

---

## ⚠️ 核心防错约束

1. **绝对路径约束**
   主页 Frontmatter 中配置的所有媒体/图片路径（如 `heroImage`, `bgImage`, `avatar` 等）都**无法**被打包器追踪。
   - **绝对禁止**使用相对路径（如 `./logo.png`, `../assets/bg.png`）。
   - **必须**使用相对站点的绝对路径（如 `/logo.png`）或完整的 URL 链接（如 `https://example.com/logo.png`）。

2. **亮点卡片配置互斥**
   在 `highlights` 数组的每一个亮点章节（Section）中：
   - 亮点列表使用 `highlights` 属性，网格特性列表使用 `features` 属性。
   - **两者只得设其一**。严禁在同一个章节对象中同时配置 `highlights` 和 `features`。

3. **布局启用标识**
   - **项目主页**：必须设置 `home: true`。
   - **档案主页**：必须设置 `portfolio: true`。若是站点的主页面，建议同时设置 `home: true`。

---

## 一、项目主页 (Project Home) 配置

### 1. 基础配置
- `home`: `true` (必填)
- `title`: 页面标题（类型：`string`），用于面包屑导航等。
- `heroText`: 主标题（类型：`string | false`）。设为 `""` 或 `false` 可隐藏默认的站点标题。
- `tagline`: 副标题/说明文字（类型：`string | false`）。
- `heroImage`: 主页 Logo 路径（类型：`string`，必须为绝对路径/URL）。
- `heroImageDark`: 深色模式主页 Logo 路径（类型：`string`，可选）。
- `heroAlt`: Logo 的替代文字（类型：`string`）。
- `heroFullScreen`: 是否全屏显示 Hero 区域（类型：`boolean`，默认 `false`）。
- `heroStyle` / `heroImageStyle` / `bgImageStyle`: CSS 样式（支持 `string` 或 `Record<string, string>` 对象）。

### 2. 背景图配置
- `bgImage`: 背景图片路径（必须为绝对路径/URL）。
- `bgImageDark`: 深色模式背景图片路径（可选）。

### 3. 操作按钮 (`actions`)
一个对象数组，每个元素包含：
- `text`: 按钮文字。
- `link`: 链接（可以是绝对路径或完整外链）。
- `type`: 按钮类型（支持 `"primary" | "default"`，默认 `"default"`）。
- `icon`: 图标类名或路径。

### 4. 亮点与功能展示 (`highlights`)
一个对象数组，每个对象代表一个卡片章节：
- `header`: 章节标题（支持 HTML 字符串）。
- `description`: 章节描述（支持 HTML 字符串）。
- `color`: 章节的文字颜色。
- `image` / `imageDark`: 章节大图 / 深色模式大图。
- `bgImage` / `bgImageDark`: 章节背景图 / 深色模式背景图。
- `bgImageStyle`: 背景图样式。
- **内容项列表（两者仅能选其一配置）**：
  - **亮点方式 (`highlights`)**：对象数组。
    - 列表类型 `type`: `"order"` (有序), `"un-order"` (无序，默认) 或 `"no-order"`。
    - 内容项字段：`title`（标题，支持 HTML）、`details`（细节）、`icon`（图标类名或路径）、`link`（链接）。
  - **特性方式 (`features`)**：对象数组。
    - 内容项字段：`title`（标题）、`details`（细节）、`icon`（图标类名或路径）、`link`（链接）。

### 5. 旧版功能列表 (`features` - 根层)
如果不想使用复杂的 `highlights` 章节，可以在根层配置简单的 `features` 数组（元素包含 `title`, `details`, `icon`, `link`）。

---

## 二、档案主页 (Portfolio Home) 配置

### 1. 基础配置
- `portfolio`: `true` (必填)
- `home`: `true` (建议在作为主页时配置)
- `name`: 姓名（类型：`string`）。
- `titles`: 头衔列表（类型：`string[]`，如 `["Fullstack Developer", "Designer"]`）。
- `avatar`: 头像路径（必须为绝对路径/URL）。
- `avatarDark`: 深色模式头像路径（类型：`string`）。
- `avatarStyle` / `avatarAlt`: 头像 CSS 样式 / alt 替代文字。
- `welcome`: 欢迎语句（类型：`string`，默认 `'👋 Hi there, I am'`）。

### 2. 社交媒体链接 (`medias`)
一个对象数组，每个元素包含：
- `name`: 媒体名称。
- `icon`: 字体图标类名。
- `link`: 社交主页链接。

### 3. 内容展示模式 (`content`)
- `content`: `"portfolio"` (使用档案样式渲染 Markdown, 默认) | `"doc"` (使用普通文档样式渲染 Markdown) | `"none"` (不渲染 Markdown，只留头部信息)。

---

## 三、示例代码

### 1. 项目主页 Frontmatter 示例
```markdown
---
home: true
title: 主页
heroText: Antigravity Code
tagline: 探索智能编程的引力边缘
heroImage: /logo.png
bgImage: /bg.png
actions:
  - text: 开始使用
    link: /guide/get-started.html
    type: primary
    icon: play
  - text: GitHub
    link: https://github.com/example/antigravity
    type: default
    icon: github
highlights:
  - header: 核心突破
    highlights:
      - title: 自动化编程
        details: 智能感知上下文并自动补全核心代码段
      - title: 多文件重构
        details: 支持跨文件边界的代码重构与一致性更改
  - header: 丰富生态与扩展
    features:
      - title: 插件 A
        details: 负责高效的数据同步
        icon: rotate
        link: /guide/plugins/a.html
---
```

### 2. 档案主页 Frontmatter 示例
```markdown
---
portfolio: true
home: true
name: 李明
avatar: /images/avatar.jpg
titles:
  - 开源贡献者
  - 高级前端专家
welcome: 你好，我是
medias:
  - name: GitHub
    icon: github
    link: https://github.com/liming
  - name: Email
    icon: envelope
    link: mailto:liming@example.com
content: doc
---
```
