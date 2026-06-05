# VuePress Theme Hope 站点安全与特色扩展功能配置规范

本指南用于指导如何配置 VuePress Theme Hope 的站点特色功能，包含**文章加密**、**全局弹窗公告**、**防复制版权保护**、**背景水印**以及**图片灯箱相册**。

---

## 一、文章与目录密码加密 (Encrypt)

主题支持对特定文件夹、特定页面甚至全站进行访问加密。

### ⚠️ 核心安全性限制
由于 VuePress 是静态站点生成器，**未解密前，文章内容只是在前端被 CSS/DOM 隐藏，访问者仍可以从网页源代码中提取明文**。请绝对不要用该功能存放任何涉及核心机密的信息。

### 1. 局部加密配置
在主题选项中，通过 `encrypt.config` 字典进行配置。键名为匹配的路径，值可以为单个密码字符串、密码数组，或者包含 `password` 与提示信息的 `hint` 对象。

*   **配置实例**：
    ```ts twoslash title=".vuepress/theme.ts"
    import { hopeTheme } from "vuepress-theme-hope";

    export default hopeTheme({
      encrypt: {
        config: {
          // 这会加密 /guide/ 目录下的所有文章，配置两个均可解密的密码，并附带提示
          "/guide/": {
            password: ["1234", "5678"],
            hint: "请输入本教程的解锁密码",
          },
          // 只加密 /config/page.html 单个页面
          "/config/page.html": "only_one_pass",
        },
      },
    });
    ```

### 2. 全局加密配置
全站阻断，只有输入密码才允许进入。设置 `encrypt.global: true` 并在 `encrypt.admin` 中设置全局主密码：
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  encrypt: {
    global: true,
    admin: {
      password: "admin_password",
      hint: "全站主访问密码",
    },
  },
});
```

---

## 二、全局公告通知弹窗 (Notice)

在用户访问站点时弹出精致的公告弹窗，支持针对不同路径配置多条公告。

### 1. 配置项定义
在主题选项的 `plugins.notice` 中定义一个公告对象数组：
- `path` / `match` (必填)：匹配的路由前缀或正则表达式。
- `title` (必填)：公告标题，支持 HTML 字符串。
- `content` (必填)：公告详细正文，支持 HTML 字符串。
- `actions`: 选项按钮数组。包含：`text` (按钮名)、`link` (跳转链接，可选)、`type` (`"primary" | "default"`，可选)。
- **显示控制属性**：
  - `showOnce` (`boolean`，默认 `false`)：设为 `true` 时，用户关闭过一次后，下次重新访问时不会再次弹出。
  - `confirm` (`boolean`，默认 `false`)：强制关闭。右侧没有关闭叉号，用户必须点击 actions 中的某个按钮才能关闭通知。
  - `fullscreen` (`boolean`，默认 `false`)：全屏毛玻璃遮罩覆盖，强制置于屏幕中央显示。

### 2. 配置实例
```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    notice: [
      {
        path: "/",
        title: "📢 站点重要更新",
        content: "我们已经完成了 2.0 架构的升级，带来了极速的代码块悬浮窗加载功能！",
        fullscreen: true,
        confirm: true,
        showOnce: true,
        actions: [
          {
            text: "立即体验",
            link: "/guide/get-started.html",
            type: "primary",
          },
          { text: "我知道了" },
        ],
      },
    ],
  },
});
```

---

## 三、版权保护、网页水印与图片灯箱 (Copyright & Watermark & PhotoSwipe)

### 1. 版权与防拷贝插件 (Copyright)
控制复制行为，防止劳动成果被随意剽窃。
*   **开启配置**：
    ```ts title=".vuepress/theme.ts"
    export default hopeTheme({
      plugins: {
        copyright: {
          global: true, // 全局启用版权保护，防止任意复制
          author: "Mr.Hope",
          license: "MIT",
          triggerLength: 50, // 复制超过 50 字时强制自动追加版权信息
        },
      },
    });
    ```

### 2. 全局防拷贝背景水印 (Watermark)
为整站背景平铺一层难以篡改的水印。
*   **开启配置**：
    ```ts title=".vuepress/theme.ts"
    export default hopeTheme({
      plugins: {
        watermark: {
          global: true, // 全局开启水印
          content: "我的官方文档 | 内部使用", // 水印内容
          opacity: 0.1, // 水印透明度
        },
      },
    });
    ```

### 3. 图片灯箱放大相册 (PhotoSwipe)
使文档内包含的所有图片，点击后自动弹出专业的相册，支持捏合缩放、滑动切换和分享。
*   **开启配置**：在 `plugins.photoSwipe` 属性中启用：
    ```ts title=".vuepress/theme.ts"
    export default hopeTheme({
      plugins: {
        // 开启 PhotoSwipe 图片放大画廊插件
        photoSwipe: true,
      },
    });
    ```
