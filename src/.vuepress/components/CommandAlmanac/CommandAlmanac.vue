<script setup lang="ts">
import { ref, computed } from 'vue';
// 假设 data.ts 也在同级目录
import { versions, commands, type GameCommand } from './data';

import AlmanacHeader from './AlmanacHeader.vue';
import AlmanacSidebar from './AlmanacSidebar.vue';
import AlmanacProperties from './AlmanacProperties.vue';
import AlmanacNotes from './AlmanacNotes.vue';
import AlmanacExamples from './AlmanacExamples.vue';

const props = defineProps<{ locale?: 'zh' | 'en'; }>();
const currentLang = computed(() => props.locale || 'zh');
const searchQuery = ref('');
const selectedVersionFilter = ref<string | null>(null);
const currentCommand = ref<GameCommand | undefined>(undefined); // 初始化为 undefined，等待排序后自动选择或手动选择

const filteredCommands = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  // 1. 先进行筛选 (Search + Version)
  const filtered = commands.filter(cmd => {
    const matchSearch =
        cmd.id.toLowerCase().includes(query) ||
        cmd.description[currentLang.value].toLowerCase().includes(query);
    const matchVersion = selectedVersionFilter.value
        ? cmd.supportedVersions.includes(selectedVersionFilter.value)
        : true;
    return matchSearch && matchVersion;
  });

  // 对筛选后的结果进行字母排序 (A-Z)
  return filtered.sort((a, b) => a.id.localeCompare(b.id));
});

// 监听筛选结果变化，如果没有当前选中的指令，默认选中排序后的第一个
// (为了防止列表排序变动后右侧显示错乱)
import { watch } from 'vue';
watch(filteredCommands, (newVal) => {
  if (newVal.length > 0 && (!currentCommand.value || !newVal.find(c => c.id === currentCommand.value?.id))) {
    currentCommand.value = newVal[0];
  } else if (newVal.length === 0) {
    currentCommand.value = undefined;
  }
}, { immediate: true });

const handleSelect = (cmd: GameCommand) => { currentCommand.value = cmd; };
const handleVersionToggle = (verId: string) => { selectedVersionFilter.value = selectedVersionFilter.value === verId ? null : verId; };
</script>

<template>
  <div class="almanac-wrapper" id="pvz-almanac-wrapper">
    <AlmanacHeader
        :locale="currentLang"
        :search-query="searchQuery"
        @update:searchQuery="val => searchQuery = val"
        :selected-version="selectedVersionFilter"
        :versions="versions"
        @toggleVersion="handleVersionToggle"
    />

    <div class="almanac-body">
      <AlmanacSidebar
          :locale="currentLang"
          :commands="filteredCommands"
          :current-id="currentCommand?.id || ''"
          @select="handleSelect"
      />

      <div class="cmd-content" v-if="currentCommand">
        <AlmanacProperties
            :locale="currentLang"
            :command="currentCommand"
            :versions="versions"
        />

        <AlmanacNotes
            :locale="currentLang"
            :command="currentCommand"
        />

        <AlmanacExamples
            :locale="currentLang"
            :command="currentCommand"
        />
      </div>

      <div v-else class="cmd-content empty-content">
        <p>{{ currentLang === 'zh' ? '请选择一个指令' : 'Please select a command' }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* === 🎨 配色系统：支持浅色/深色切换 === */

#pvz-almanac-wrapper {
  /* --- ☀️ 默认: 白天模式 (浅雅薰衣草) --- */
  --alm-bg-main: #fcfaff;         /* 背景：接近白色的淡紫 */
  --alm-bg-panel: #ffffff;        /* 面板：纯白或极淡紫 */
  --alm-bg-sidebar: rgba(108, 92, 231, 0.03); /* 侧边栏：透明紫 */
  --alm-bg-hover: #e0dcfc;        /* 悬停高亮 */
  --alm-bg-input: #ffffff;        /* 输入框背景 */

  --alm-border: #dcd6e8;          /* 边框：灰紫色 */
  --alm-text: #483469;            /* 文字：深李子色 */
  --alm-text-dim: #847996;        /* 弱化文字 */
  --alm-text-inverse: #ffffff;    /* 反色文字 (用于深色高亮背景上) */

  --alm-accent: #9b59b6;          /* 强调色：紫水晶 (Active状态背景) */
  --alm-accent-glow: rgba(155, 89, 182, 0.4); /* 辉光色 */

  --alm-code-bg: #f4f1fa;
  --alm-code-text: #5e35b1;

  --alm-header-grad: linear-gradient(180deg, #ece9fc 0%, #fcfaff 100%);
  --alm-shadow: 0 4px 12px rgba(108, 92, 231, 0.1);

  /* 基础容器样式 */
  font-family: "Noto Sans SC", sans-serif;
  background-color: var(--alm-bg-main);
  color: var(--alm-text);
  border: 1px solid var(--alm-border);
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: var(--alm-shadow);
  display: flex; flex-direction: column;
}

/* --- 🌙 黑暗模式适配 (Magic Dark) --- */
/* 当 html 或 body 有 dark 类，或者 data-theme="dark" 时生效 */
:root.dark #pvz-almanac-wrapper,
[data-theme="dark"] #pvz-almanac-wrapper {
  --alm-bg-main: #1a0b2e;         /* 深邃紫 */
  --alm-bg-panel: rgba(255, 255, 255, 0.05); /* 玻璃质感面板 */
  --alm-bg-sidebar: rgba(0, 0, 0, 0.2);
  --alm-bg-hover: rgba(255, 255, 255, 0.1);
  --alm-bg-input: rgba(0, 0, 0, 0.3);

  --alm-border: #4a3b69;          /* 暗紫边框 */
  --alm-text: #e0d4f7;            /* 浅紫文字 */
  --alm-text-dim: #9a8bbd;
  --alm-text-inverse: #1a0b2e;    /* 金色背景上的黑色文字 */

  --alm-accent: #FFD700;          /* 金色强调 (深色背景下高亮) */
  --alm-accent-glow: rgba(255, 215, 0, 0.5);

  --alm-code-bg: #000000;
  --alm-code-text: #a29bfe;

  --alm-header-grad: linear-gradient(90deg, #1a0b2e 0%, #2d1b4e 100%);
  --alm-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* 布局 */
.almanac-body {
  display: flex;
  min-height: 600px;
}

.cmd-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 20px;
  /* 确保右侧背景跟随变量 */
  background: var(--alm-bg-main);
}

.empty-content {
  justify-content: center; align-items: center;
  color: var(--alm-text-dim);
}

@media (max-width: 768px) {
  .almanac-body { flex-direction: column; height: auto; }
  .cmd-content { padding: 15px; }
}
</style>