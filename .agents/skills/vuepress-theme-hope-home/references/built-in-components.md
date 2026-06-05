# VuePress Theme Hope 内置高级组件配置与使用规范

本指南用于指导如何启用并正确在 Markdown 中书写 VuePress Theme Hope 的内置高级组件，包括**音视频播放器**、**PDF查看器**、**在线演示嵌入**、**分享与外部站点信息卡片**。

---

## 一、激活内置组件插件

在 VuePress 站点中，大部分媒体和交互组件由 `vuepress-plugin-components` 提供。你需要在主题选项的 `plugins.components` 中明确添加你想使用的组件名称数组：

```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    components: {
      // 声明需要启用的内置组件
      components: [
        "Badge",       // 徽章
        "BiliBili",    // B站视频嵌入
        "YouTube",     // YouTube 嵌入
        "VidStack",    // 高级音视频播放器
        "PDF",         // PDF 阅读器
        "CodePen",     // CodePen 演示
        "StackBlitz",  // StackBlitz 演示
        "SiteInfo",    // 外部站点信息卡片
        "Share",       // 社交媒体分享按钮
        "VPCard",      // 卡片组件
        "VPBanner",    // 横幅组件
      ],
    },
  },
});
```

---

## 二、音视频媒体播放组件

### 1. BiliBili 视频嵌入 (`<BiliBili />`)
直接在 Markdown 中插入 B 站视频播放器窗口。
*   **常用属性**：
    - `bvid` (必填，除非填 aid/cid)：B 站视频的 BV 号（如 `"BV1kt411o7C3"`）。
    - `title`：视频标题。
    - `page` (默认 `1`)：视频分 P。
    - `autoplay` (`boolean`，默认 `false`)：是否自动播放。
    - `ratio` (默认 `16 / 9`)：播放器长宽比。
*   **语法示例**：
    ```md
    <BiliBili bvid="BV1kt411o7C3" />
    ```

### 2. VidStack 高级音视频播放器 (`<VidStack />`)
VidStack 是官方推荐的音视频播放组件（替代了旧版的 VideoPlayer）。支持普通 MP4/MP3、HLS (m3u8) 流式视频及外链。
*   **⚠️ 安装前置依赖**：需要在项目中安装 `vidstack@next`：
    ```bash
    pnpm add -D vidstack@next
    ```
*   **常用属性**：
    - `src` (必填)：视频/音频的链接。**路径绝对禁止使用相对路径**，必须是绝对路径（如 `/assets/video.mp4`）或完整 URL。
    - `poster`：视频封面图路径（必须是绝对路径/URL）。
    - `title`：音视频标题。
    - `tracks`：字幕和章节轨配置（VTT 格式）。
*   **语法示例**：
    ```md
    <!-- 普通 MP4 视频播放器 -->
    <VidStack src="https://files.vidstack.io/sprite-fight/720p.mp4" poster="https://files.vidstack.io/sprite-fight/poster.webp" />

    <!-- 嵌入 YouTube 视频 -->
    <VidStack src="youtube/_cMxraX_5RE" title="YouTube 演示" />

    <!-- 本地音频播放器 -->
    <VidStack src="/assets/audio/sample.mp3" title="背景音乐" />
    ```

---

## 三、文档与在线编辑器嵌入组件

### 1. PDF 浏览器 (`<PDF />`)
直接在 Markdown 页面中以精美的阅读器样式直接渲染并预览 PDF 文件。
*   **属性**：
    - `url` (必填)：PDF 文件的路径。**必须是绝对路径或完整 URL**。
*   **语法示例**：
    ```md
    <PDF url="https://example.com/spec.pdf" />
    ```

### 2. CodePen & StackBlitz 在线编辑器
无需跳转，直接把外部的代码沙盒嵌入到文档中展示。
*   **语法示例**：
    ```md
    <!-- 嵌入 CodePen -->
    <CodePen link="https://codepen.io/tutsplus/pen/yLyreM" />

    <!-- 嵌入 StackBlitz -->
    <StackBlitz id="vitejs-vite-4s8hnd" />
    ```

---

## 四、分享、横幅与信息展示卡片

### 1. 社交分享组件 (`<Share />`)
在文章底部或指定位置渲染一组一键分享当前页面至主流社交媒体的按钮。
*   **语法示例**：
    ```md
    <Share />
    ```

### 2. 外部站点卡片 (`<SiteInfo />`)
以漂亮的卡片形式展示友情链接或参考站点的元信息。
*   **属性**：
    - `title` (必填)：站点标题。
    - `desc`：站点描述。
    - `logo`：Logo 路径。
    - `link` (必填)：站点链接。
*   **语法示例**：
    ```md
    <SiteInfo title="VuePress Theme Hope" desc="一个具有强大功能的 vuepress 主题✨" logo="https://theme-hope-assets.vuejs.press/logo.svg" link="https://theme-hope.vuejs.press/" />
    ```
