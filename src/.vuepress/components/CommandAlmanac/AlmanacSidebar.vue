<script setup lang="ts">
import type { GameCommand } from './data';

defineProps<{
  locale: 'zh' | 'en';
  commands: GameCommand[];
  currentId: string;
}>();

const emit = defineEmits<{
  (e: 'select', cmd: GameCommand): void;
}>();
</script>

<template>
  <div class="cmd-sidebar">
    <div class="sidebar-header">
      {{ locale === 'zh' ? '命令列表' : 'Command List' }}
      <span class="count">({{ commands.length }})</span>
    </div>

    <div class="list-container">
      <div
          v-for="cmd in commands"
          :key="cmd.id"
          class="cmd-item"
          :class="{ active: currentId === cmd.id }"
          @click="emit('select', cmd)"
      >
        <span class="cmd-text">{{ cmd.id }}</span>
      </div>

      <div v-if="commands.length === 0" class="empty-state">
        {{ locale === 'zh' ? '无结果' : 'No result' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cmd-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: rgba(0,0,0,0.2); /* 侧边栏深色背景 */
  border-right: 1px solid var(--alm-border);
  display: flex; flex-direction: column;
  max-height: 80vh;
}

.sidebar-header {
  padding: 15px; font-weight: bold; text-align: center;
  border-bottom: 1px solid var(--alm-border);
  color: var(--alm-text-dim);
  background: rgba(255,255,255,0.03);

  flex-shrink: 0;
  .count { font-size: 0.8em; opacity: 0.7; margin-left: 5px; }
}

.list-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  &::-webkit-scrollbar { width: 6px; }
  //&::-webkit-scrollbar-thumb { background: var(--alm-border); border-radius: 3px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4); /* 稍微明显的颜色 */
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
}

.cmd-item {
  /* 还原块状风格 */
  display: block;
  padding: 12px 15px;
  margin-bottom: 10px; /* 卡片间隙 */
  background-color: rgba(255, 255, 255, 0.05); /* 默认微透背景 */
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  /* 长文本换行处理 */
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  line-height: 1.4;

  /* 字体 */
  font-family: 'Consolas', monospace;
  font-weight: 600;
  color: var(--alm-text);
  font-size: 0.9rem;

  /* 交叉配色：偶数行颜色稍微不同 */
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.02);
  }

  &:hover {
    transform: translateX(4px);
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* 选中态：还原图片中的黄色背景、黑色文字 */
  &.active {
    background-color: var(--alm-accent) !important; /* 金色 */
    color: #1a0b2e !important; /* 深色文字，形成高对比 */
    font-weight: 800;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.5); /* 辉光 */
    border: none;
    transform: scale(1.02);
  }
}

.empty-state { padding: 30px; text-align: center; color: var(--alm-text-dim); }
</style>