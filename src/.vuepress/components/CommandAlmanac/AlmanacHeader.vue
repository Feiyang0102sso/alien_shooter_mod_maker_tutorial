<script setup lang="ts">
import { useGameAssets } from './useGameAssets';
import type { GameVersion } from './data';

const props = defineProps<{
  locale: 'zh' | 'en';
  searchQuery: string;
  selectedVersion: string | null;
  versions: GameVersion[];
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'toggleVersion', id: string): void;
}>();

const { getIconPath } = useGameAssets();
</script>

<template>
  <div class="almanac-header">
    <div class="header-left">
      <h2 class="game-title">
        {{ locale === 'zh' ? '游戏内指令图鉴' : 'Command Almanac' }}
      </h2>
    </div>

    <div class="header-right">
      <div class="search-container">
        <input
            :value="searchQuery"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            type="text"
            :placeholder="locale === 'zh' ? '搜索命令 / ID...' : 'Search...'"
        >
        <span class="search-icon">🔍</span>
      </div>

      <div class="version-filters">
        <div
            v-for="ver in versions"
            :key="ver.id"
            class="ver-filter-btn"
            :class="{ active: selectedVersion === ver.id }"
            @click="emit('toggleVersion', ver.id)"
            :title="ver.name"
            :style="{ backgroundImage: `url(${getIconPath(ver.icon)})` }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.almanac-header {
  /* 使用深紫色渐变，还原图片风格 */
  background: var(--alm-header-grad);
  border-bottom: 2px solid var(--alm-border);
  padding: 15px 20px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;
}
.game-title {
  margin: 0;
  font-size: 1.8rem; /* 加大标题 */
  font-weight: 900;
  color: var(--alm-accent); /* 金色 */
  letter-spacing: 1px;
}

.header-right { display: flex; gap: 20px; align-items: center; }

.search-container {
  position: relative;
  input {
    background: rgba(0,0,0,0.3); /* 深色输入框背景 */
    border: 1px solid var(--alm-border);
    color: var(--alm-text);
    padding: 8px 35px 8px 15px;
    border-radius: 20px;
    outline: none; transition: 0.2s; width: 200px;

    &::placeholder { color: rgba(255,255,255,0.4); }
    &:focus { border-color: var(--alm-accent); box-shadow: 0 0 8px rgba(255, 215, 0, 0.3); }
  }
  .search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); opacity: 0.7; color: var(--alm-accent); }
}

.version-filters {
  display: flex; gap: 12px;
  .ver-filter-btn {
    width: 50px; height: 35px; /* 适中的按钮大小 */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    cursor: pointer;
    background-color: rgba(255,255,255,0.05);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: all 0.2s;

    &:hover { transform: scale(1.1); border-color: var(--alm-accent); }
    &.active {
      border: 2px solid var(--alm-accent);
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
      background-color: rgba(255, 215, 0, 0.1);
    }
  }
}
</style>