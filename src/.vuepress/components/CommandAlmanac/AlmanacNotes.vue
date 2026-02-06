<script setup lang="ts">
import type { GameCommand } from './data';

defineProps<{
  locale: 'zh' | 'en';
  command: GameCommand;
}>();
</script>

<template>
  <div
      class="notes-wrapper section-panel"
      v-if="command.remarks && command.remarks[locale] && command.remarks[locale].length > 0"
  >
    <div class="panel-title">
      {{ locale === 'zh' ? '备注 (Remarks)' : 'Remarks' }}
    </div>

    <div class="notes-content">
      <ul class="notes-list">
        <li v-for="(line, index) in command.remarks[locale]" :key="index">
          {{ line }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--alm-border);
  border-radius: 12px; padding: 25px;
  height: auto;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--alm-accent);
  border-bottom: 1px solid var(--alm-border);
  padding-bottom: 10px; margin-bottom: 20px;
}

.notes-content {
  font-size: 0.95rem;
  color: var(--alm-text);
  line-height: 1.6;
}

.notes-list {
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
    word-break: break-word; /* 防止备注溢出 */
    white-space: normal;

    &::marker {
      color: var(--alm-accent);
    }
  }
}
</style>