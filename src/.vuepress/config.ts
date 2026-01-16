import { defineUserConfig } from "vuepress";

import theme from "./theme.js";


export default defineUserConfig({

  base: "/alien_shooter_mod_maker_tutorial/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "孤胆枪手 MOD 教程",
      description: "孤胆枪手 MOD 教程",
    },
  },

  theme,

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/as_main.ico",
      },
    ],
  ],


  // Enable it with pwa
  // shouldPrefetch: false,
});
