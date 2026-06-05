# VuePress Theme Hope 代码块高级配置与增强语法

本指南用于指导如何配置与书写 VuePress Theme Hope 的高级代码块特性，包括**行号控制**、**代码行高亮/标记**、**Shiki Twoslash 交互式类型悬浮窗**、**代码选项卡**、**代码演示**、**在线沙盒**以及**外部文件导入**。

---

## 一、代码块内置控制 (行号/折叠/标题)

### 1. 行号控制
你可以通过在代码块首行添加标记来覆盖全局配置，甚至自定义起始行号。
- **启用行号**：```` ```ts :line-numbers ````
- **禁用行号**：```` ```ts :no-line-numbers ````
- **自定义起始行号**：```` ```ts :line-numbers=10 ````（使行号从 `10` 开始递增）

### 2. 代码行折叠
适合展示极长的配置文件或源文件，折叠多余代码以保持排版整洁。
- **启用折叠**（默认从第 15 行开始折叠）：```` ```ts :collapsed-lines ````
- **自定义折叠起点**：```` ```ts :collapsed-lines=25 ````
- **禁用折叠**：```` ```ts :no-collapsed-lines ````

### 3. 代码块标题
通过 `title="文件名"` 在代码块顶部渲染一个精美的标题栏。
- **语法**：```` ```ts title="config/theme.ts" ````

---

## 二、Shiki 标记与特殊行注释

Shiki 高亮器支持通过特殊的行注释，在渲染后的页面上自动为特定行/词生成对应样式，避免在 Markdown 中硬编码样式。

### 1. 行高亮/范围高亮
- **行高亮标记**：在代码行末尾加上 `// [!code highlight]`。
- **元信息声明高亮**（传统方式）：在代码块首行声明高亮行号，如 ```` ```ts {4,7-10} ```` 会高亮第 4 行以及第 7 至 10 行。

### 2. 代码行聚焦 (Focus)
使非聚焦行变暗，让读者的视线聚焦于特定行。
- **语法**：在行末尾加上 `// [!code focus]`。

### 3. 代码差异展示 (Diff)
适合展示版本更改、新增或删除的代码。
- **添加行**：在行末尾加上 `// [!code ++]`
- **删除行**：在行末尾加上 `// [!code --]`

### 4. 警告与错误级别标记
在行下方或行背景添加特定警告/错误高亮颜色。
- **警告行**：在行末尾加上 `// [!code warning]`
- **错误行**：在行末尾加上 `// [!code error]`

### 5. 关键词/词高亮
- **注释标记法**：在代码行上一行或代码块首添加 `// [!code word:限制字]` 可以将代码块内所有匹配的单词高亮。
- **正则声明法**：在首行使用斜杠包裹词，如 ```` ```js /Hello/ ````，将高亮代码中所有的 "Hello"。

---

## 三、Shiki Twoslash 交互式类型浮窗 (Twoslash)

**Shiki Twoslash** 是 Shiki 高亮器与 TypeScript 编译器的深度集成。当用户在渲染后的页面上将鼠标悬停在变量、属性或函数名上时，会**弹出一个小窗口**，展示该项的 TypeScript 类型定义和文本文档，极大提升代码块的阅读体验。

### 1. 启用语法
在代码块声明语言时，附加 `twoslash` 标记：
````md
```ts twoslash
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    attrs: true, // 悬停在 attrs 上时，页面会自动弹窗显示其 TS 类型声明
  },
});
```
````

### 2. 常用的 Twoslash 行内语法

在 `twoslash` 代码块中，可以使用特定的注释指令进行交互：

- **常驻类型查询 (`// ^?`)**：在变量名下一行以 `^` 对齐并附带 `?`，会在代码渲染后在下方生成常驻的类型提示框。
  ```ts twoslash
  const message = "Hello Twoslash";
  message.split(" ");
  //      ^?
  ```
- **指定报错忽略 (`// @errors: 错误代码`)**：如果代码块内有类型错误，TS 编译器在构建时默认会抛出异常中断打包。需要使用该指令声明预期的 TS 错误号。
  ```ts twoslash
  // @errors: 2540
  const user = { name: "Tom" } as const;
  user.name = "Jerry"; // 报错：Cannot assign to 'name' because it is a read-only property.
  ```
- **完全忽略错误 (`// @noErrors`)**：忽略该代码块中所有的 TS 编译类型报错，适合书写草稿或不完整代码。
  ```ts twoslash
  // @noErrors
  const broken: number = "not a number";
  ```

---

## 四、代码选项卡 (Code Tabs)

用于将不同语言、不同环境下的同类代码组合到一个标签页组（Tabs）中，方便读者点击切换展示。

### 1. 开启配置
在主题选项中配置 `markdown.codeTabs`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用代码选项卡支持
    codeTabs: true,
  },
});
```

### 2. 语法格式
使用 `::: code-tabs#自定义唯一Id` 容器包裹。每一项使用 `@tab 标签名` 或 `@tab:active 默认激活的标签名` 指令，后面紧跟代码块：
````md
::: code-tabs#shell

@tab pnpm
```bash
pnpm add -D vuepress-theme-hope
```

@tab yarn
```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm
```bash
npm i -D vuepress-theme-hope
```

:::
````

---

## 五、代码演示 (Code Demo)

允许在 Markdown 页面中直接渲染 HTML/CSS/JS、Vue 或 React 代码并产生在线预览和演示，同时支持一键跳转到 CodePen、JSFiddle 等平台。

### 1. 开启配置
在主题选项中配置 `markdown.demo`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用代码演示支持
    demo: true,
  },
});
```

### 2. 语法格式
根据代码演示的框架类型，包含三种常用容器：

*   **普通 HTML/JS/CSS 演示 (`::: normal-demo`)**
    可以在容器中放入 `html`, `js`, `css` 三个代码块：
    ````md
    ::: normal-demo 动态点击演示
    ```html
    <button id="btn">点击我</button>
    ```
    ```js
    document.getElementById("btn").addEventListener("click", () => {
      alert("Hello World");
    });
    ```
    ```css
    button {
      padding: 10px 20px;
      background: #3eaf7c;
      color: white;
      border: none;
    }
    ```
    :::
    ````

*   **Vue 组件演示 (`::: vue-demo`)**
    可以在容器中放入一个完整的 `.vue` 单文件组件代码块：
    ````md
    ::: vue-demo 计数器演示
    ```vue
    <template>
      <button @click="count++">Count is: {{ count }}</button>
    </template>
    <script setup>
    import { ref } from 'vue';
    const count = ref(0);
    </script>
    ```
    :::
    ````

*   **React 组件演示 (`::: react-demo`)**
    可以在容器中放入一个 JSX 格式的 React 组件代码块。

---

## 六、交互式 Playgrounds (在线演练沙盒)

通过轻量级在线沙盒（内嵌 `<iframe>` 演练场）或者基于 `@vue/repl` 的完整 IDE，给读者提供一个可以直接在浏览器里改代码、看效果的运行环境。

### 1. 开启配置
在主题选项中配置 `markdown.vuePlayground` 或 `markdown.playground`：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 开启 Vue Playground (基于 @vue/repl)
    vuePlayground: true,
  },
});
```

### 2. 语法格式
使用 `::: vue-playground 演练场标题` 容器。
内部使用指令控制多文件结构：
- `@file 文件名` 指令紧跟该文件的代码块。
- `@import` 指令紧跟用于配置外部依赖的导入映射（Import Map）JSON 块。
- `@setting` 指令配置沙盒的参数（如 `showCompileOutput` 编译输出等）。

````md
::: vue-playground 动态演练场
@file App.vue
```vue
<script setup>
import { ref } from "vue";
const text = ref("修改这里的值");
</script>
<template>
  <input v-model="text" />
  <p>{{ text }}</p>
</template>
```
:::
````

---

## 七、外部源代码文件导入 (`@code`)

直接在 Markdown 中引用磁盘上的真实源文件，以非侵入方式把全部或部分代码渲染为高亮代码块。这能确保代码库的真实代码与文档保持完全同步。

### 1. 语法格式
使用 `@[code 语言{高亮行} title="显示的文件名"](文件路径)` 的语法。

*   **完整文件导入**：
    `@[code ts title="theme.ts"](@source/.vuepress/theme.ts)`
    
*   **导入特定行范围**：
    `@[code ts{2-5} title="theme.ts" {1-10}](@source/.vuepress/theme.ts)` —— 后面的 `{1-10}` 指定只导入并渲染源文件中的前 10 行代码。

### 2. ⚠️ 路径规范
- 强烈建议使用 `@source` 别名定位项目源码的根目录（如 `@source/.vuepress/theme.ts`），从而避免由于部署或缓存目录迁移导致的路径读取错误。
- 也可以使用 `@src` 别名。
