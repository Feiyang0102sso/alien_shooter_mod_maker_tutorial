import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/download/",
  {
    text: "孤胆枪手1",
    icon: "biohazard",
    prefix: "/zh/as1/",
    children: [
      {
        text: "地图编辑器",
        icon: "map",
        prefix: "map-editor/",
        children: ["as_me_launch", "as_me_build"],
      },
    ],
  },
  {
    text: "孤胆枪手2",
    icon: "skull",
    prefix: "/zh/as2/",
    children: [
      {
        text: "地图编辑器",
        icon: "map",
        prefix: "map-editor/",
        children: ["me_basic_teleport", "me_basic_mask", "me_basic_enemy_generator.md", "me_basic_npc.md"],
      },

      {
        text: "任务编辑器",
        icon: "map",
        prefix: "quest_editor/",
        children: ["quest_editor"],
      },

      {
        text: "LGC 脚本",
        icon: "map",
        prefix: "lgc_script/",
        children: ["lgc_basic_quest", "lgc_delayed_teleport"],
      },
    ],


  },
]);
