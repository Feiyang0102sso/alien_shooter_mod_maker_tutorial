# VuePress Theme Hope 自定义组件使用与语法规范

本指南用于指导如何在 VuePress 站点中开发、注册自定义 Vue 组件，并安全地在 Markdown 文档中进行导入和使用。

---

## 一、自定义组件的两种注册与导入方式

在 Markdown 中使用自定义组件可以使页面展现极其丰富的功能。VuePress 支持全局注册与局部导入。

### 1. 全局注册组件 (全局可用，开箱即用)
适用于在文档中频繁使用的组件，免去在每个 Markdown 文件中重复导入的麻烦。

*   **实现步骤**：
    创建客户端配置文件 `.vuepress/client.ts` (或 `client.js`)：
    ```ts title=".vuepress/client.ts"
    import { defineClientConfig } from "vuepress/client";
    import MyComponent from "./components/MyComponent.vue";

    export default defineClientConfig({
      enhance({ app }) {
        // 全局注册组件，名称为 'MyComponent'
        app.component("MyComponent", MyComponent);
      },
    });
    ```
*   **在 Markdown 中直接使用**：
    ```md
    <MyComponent />
    ```

### 2. 局部导入组件 (按需加载，性能更佳)
对于仅在特定页面使用的重型组件，建议采用局部导入。

*   **⚠️ 核心路径规范 (绝对禁止使用相对路径)**：
    因为 Markdown 文件会被编译为 Vue 单文件组件 (SFC) 并缓存于 `.vuepress/.temp/pages` 临时目录中，**相对路径导入（如 `./MyComponent.vue` 或 `../components/MyComponent.vue`）是完全无效的，会导致打包编译失败**。
*   **正确方式 1：使用 `@source` 别名**
    `@source` 别名指向项目的源码根目录：
    ```md title="example.md"
    <MyComponent />

    <script setup>
    // 使用 @source 别名安全引用组件
    import MyComponent from "@source/components/MyComponent.vue";
    </script>
    ```
*   **正确方式 2：在 `config.ts` 中自定义 alias**
    ```ts title=".vuepress/config.ts"
    import { defineUserConfig } from "vuepress";
    import { getDirname, path } from "vuepress/utils";

    const __dirname = getDirname(import.meta.url);

    export default defineUserConfig({
      alias: {
        "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
      },
    });
    ```
    然后在 Markdown 中使用自定义别名导入：
    ```md
    <MyComponent />

    <script setup>
    import MyComponent from "@MyComponent";
    </script>
    ```

---

## 二、特色 `component` 代码块语法

VuePress Theme Hope 扩展了 Markdown 的语法，支持通过类似配置文件的代码块方式优雅地配置并使用已全局注册的组件（如 `VPCard`），而无需书写繁杂的 HTML/Vue 标签。

### 1. 开启配置
首先在主题选项的 `markdown` 属性中启用 `component` 特性：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用 component 代码块支持
    component: true,
  },
});
```

### 2. Markdown 使用语法
支持 **YAML** (推荐) 和 **JSON** 两种数据格式来传递 Props 参数：

*   **YAML 格式 (推荐)**
    ````md
    ```component VPCard
    title: 标题文字
    desc: 这是卡片的详细描述，非常优雅
    logo: /assets/image/logo.png
    link: https://example.com
    background: rgba(253, 230, 138, 0.15)
    ```
    ````

*   **JSON 格式**
    ````md
    ```component VPCard
    {
      "title": "标题文字",
      "desc": "这是卡片的详细描述，非常优雅",
      "logo": "/assets/image/logo.png",
      "link": "https://example.com",
      "background": "rgba(253, 230, 138, 0.15)"
    }
    ```
    ````

*   **等价的常规 Vue 写法**：
    上面的代码块会被自动转换为：
    ```html
    <VPCard
      title="标题文字"
      desc="这是卡片的详细描述，非常优雅"
      logo="/assets/image/logo.png"
      link="https://example.com"
      background="rgba(253, 230, 138, 0.15)"
    />
    ```
