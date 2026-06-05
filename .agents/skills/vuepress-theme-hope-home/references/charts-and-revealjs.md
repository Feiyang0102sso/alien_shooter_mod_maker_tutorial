# VuePress Theme Hope Markdown 图表与幻灯片制作规范

本指南用于指导如何配置与书写 VuePress Theme Hope 的图表增强语法和幻灯片（RevealJS）组件。

---

## 一、文本图表组件 (Mermaid / Markmap / PlantUML)

允许在 Markdown 中通过声明式文本直接绘制各种高质量的示意图。

### 1. 思维导图 (Markmap)
*   **开启配置**：`markdown.markmap: true`
*   **语法格式**：在 `markmap` 代码块内，以标准 Markdown 列表/标题结构组织内容，会被自动转为支持放缩、拖拽的动态脑图：
    ````md
    ```markmap
    # 语言学习
    ## 英语
    - 词汇
    - 语法
    ## 日语
    - 单词
    - 听力
    ```
    ````

### 2. Mermaid 流程图 & 时序图
*   **开启配置**：`markdown.mermaid: true`
*   **语法格式**：在 `mermaid` 代码块内直接书写 Mermaid DSL 代码：
    ````md
    ```mermaid
    graph TD
      A[开始] --> B(处理中)
      B --> C{是否成功?}
      C -- 是 --> D[成功页面]
      C -- 否 --> E[重试选项]
    ```
    ````

### 3. PlantUML 状态图与类图
*   **开启配置**：`markdown.plantuml: true`
*   **语法格式**：在 `plantuml` 代码块中以 `@startuml` 和 `@enduml` 包裹代码。

---

## 二、数据可视化图表 (ECharts / Chart.js)

通过配置 JSON 参数，在页面中无缝呈现高性能的动态图表。

### 1. 百度 ECharts 图表
*   **开启配置**：`markdown.echarts: true`
*   **语法格式**：在 `echarts` 代码块中以 JSON 格式编写 ECharts 配置选项：
    ````md
    ```echarts
    {
      "title": { "text": "用户活跃度" },
      "xAxis": {
        "data": ["周一", "周二", "周三", "周四", "周五"]
      },
      "yAxis": {},
      "series": [
        {
          "type": "bar",
          "data": [5, 20, 36, 10, 10]
        }
      ]
    }
    ```
    ````

### 2. Chart.js 图表
*   **开启配置**：`markdown.chartjs: true`
*   **语法格式**：在 `chart` 代码块中以 JSON 格式书写配置。

---

## 三、Markdown 制作 HTML 幻灯片 (RevealJS)

您可以直接在文档中把 Markdown 正文变为能够全屏演示的交互式 PPT 幻灯片。

### 1. 开启配置
在主题选项中配置 `markdown.revealjs: true`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用 RevealJS 幻灯片支持
    revealjs: true,
  },
});
```

### 2. 语法格式
使用 `::: revealjs [可选参数配置]` 容器。在容器内部：
- 使用 `---` 划分子幻灯片（通常为**水平分页**）。
- 使用 `--` 进行**垂直分页**。

*   **完整 PPT 实例**：
    ````md
    ::: revealjs

    # 第一页：Antigravity 介绍
    智能编程助手的全新引力边界

    ---

    # 第二页：核心优势
    - ⚡ **极致响应**
    - 🛡️ **安全沙盒**

    --

    ## 补充子页面
    这是垂直方向上的补充内容，通过向下按键访问。

    ---

    # 第三页：谢谢观看
    问与答环节

    :::
    ````

*   **自定义幻灯片主题与过渡效果**：
    可以在容器开头加入 YAML 形式的参数，指定过渡动画（如 `slide`, `fade`, `zoom`）和背景主题（如 `black`, `white`, `league`, `night`）：
    ````md
    ::: revealjs transition="zoom" theme="night"
    # 缩放转场效果页面
    背景主题为 night
    :::
    ````
