# VuePress Theme Hope Markdown 排版与语法增强规范

本指南用于指导如何配置与书写 VuePress Theme Hope 的文本排版与语法增强特性，包括**提示容器**、**GFM 警告框**、**元素属性注入**、**文本高亮与剧透**、**选项卡**以及**文档切片导入**。

---

## 一、提示容器与警告框 (Hint & Alert)

提供高度醒目的块级排版样式，用于强调重要、警告或危险信息。

### 1. 提示容器 (Hint Containers)
*   **启用配置**：默认开启。
*   **语法格式**：使用 `::: 类型 [可选的标题文字]` 容器包裹：
    ```md
    ::: tip 成功小贴士
    这是一个常用的成功或一般小贴士容器。
    :::

    ::: warning 注意事项
    这是一个警告容器，提醒用户避坑。
    :::

    ::: danger 危险操作
    这是一个危险警告容器。
    :::

    ::: details 点击展开查看源码
    这里放置平时隐藏，点击后展开的内容。
    :::
    ```

### 2. GFM 警告框 (GitHub-styled Alerts)
*   **启用配置**：在主题选项的 `markdown` 属性中启用：
    ```ts title=".vuepress/theme.ts"
    export default hopeTheme({
      markdown: {
        alert: true,
      },
    });
    ```
*   **语法格式**：使用标准的 Blockquote 引用语法，配合特定的首行标记，完全兼容 GitHub 样式：
    ```md
    > [!NOTE]
    > 这是一条普通通知，用于提供背景信息。

    > [!TIP]
    > 这是一条小技巧，帮助更高效地完成任务。

    > [!IMPORTANT]
    > 这是非常核心的重要步骤，用户必须阅读。

    > [!WARNING]
    > 警告：这可能会导致非预期的副作用。

    > [!CAUTION]
    > 危险：高风险操作，请谨慎对待。
    ```

---

## 二、自定义元素属性注入 (Attributes)

允许在 Markdown 元素之后直接通过 `{}` 语法添加自定义的 HTML 属性（例如 CSS Class、ID、行内 Style 等），提供极强的定制能力。

### 1. 开启配置
在主题选项的 `markdown` 属性中启用 `attrs`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用自定义属性注入支持
    attrs: true,
  },
});
```

### 2. 语法格式
在任何元素（如标题、段落、图片、链接或行内代码）**紧随其后**添加 `{属性列表}`：

*   **为标题添加 ID 与自定义 Class**：
    ```md
    ## 我的自定义小标题 {#custom-title-id .theme-accent-header}
    ```
*   **为行内代码/文字添加行内 CSS 样式**：
    ```md
    这里是一段 `非常重要`{.highlight style="color: purple; font-weight: bold;"} 的提示。
    ```
*   **为链接配置新窗口打开与样式**：
    ```md
    [访问我的主页](https://example.com){target="_blank" class="home-link"}
    ```

---

## 三、文本高亮与点击剧透 (Mark & Spoiler)

*   **开启配置**：在主题选项的 `markdown` 属性中开启 `mark` 和 `spoiler`：
    ```ts title=".vuepress/theme.ts"
    export default hopeTheme({
      markdown: {
        mark: true,
        spoiler: true,
      },
    });
    ```

### 1. 文本高亮标记 (Mark)
- **语法**：使用双等号包裹。
- **效果**：文字会自动呈现荧光笔高亮背景。
  ```md
  这是一段 ==需要用荧光笔标记高亮== 的文字。
  ```

### 2. 点击剧透标记 (Spoiler)
- **语法**：使用双感叹号包裹。
- **效果**：文字默认被黑块遮挡，用户点击后才会消除黑块露出正文。
  ```md
  凶手其实是 !!那个侦探的助手!!。
  ```

---

## 四、文档切片导入与嵌套 (@include)

直接在一个 Markdown 文档中导入并嵌入另一个外部 Markdown 文件。支持导入整个文件，或仅仅导入其中的某一部分（切片）。

### 1. 开启配置
在主题选项的 `markdown` 属性中配置 `include`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 开启文件包含功能
    include: true,
  },
});
```

### 2. 语法格式
使用 `<!-- @include: 路径 -->` 的注释指令。

*   **整体导入文件**：
    ```md
    <!-- @include: @source/shared/intro.md -->
    ```
    *(强烈建议使用 `@source` 别名定位根目录)*。
    
*   **仅导入外部文件的特定锚点区域 (切片导入)**：
    在外部被导入的文件中，使用注释包裹特定区域，如：
    ```md title="shared/intro.md"
    <!-- #region section-a -->
    这是被 region 标记的核心段落。
    <!-- #endregion section-a -->
    ```
    在主文档中导入该区域：
    ```md title="README.md"
    <!-- @include: @source/shared/intro.md#section-a -->
    ```
