<script setup lang="ts">
import { useGameAssets } from './useGameAssets';
import type { GameCommand, GameVersion } from './data';

const props = defineProps<{
  locale: 'zh' | 'en';
  command: GameCommand;
  versions: GameVersion[];
}>();

const { getIconPath } = useGameAssets();

const checkSupport = (verId: string) => {
  return props.command.supportedVersions.includes(verId);
};
</script>

<template>
  <div class="properties-wrapper">
    <div class="info-card section-panel">
      <div class="card-header">
        <h3 class="cmd-title">{{ command.id }}</h3>
      </div>
      <p class="cmd-desc">{{ command.description[locale] }}</p>

      <div class="version-compatibility">
        <span class="label">{{ locale === 'zh' ? '支持版本:' : 'Versions:' }}</span>
        <div class="ver-badges">
          <template v-for="ver in versions" :key="ver.id">
            <div
                v-if="checkSupport(ver.id)"
                class="ver-badge-static"
                :title="ver.name"
                :style="{ backgroundImage: `url(${getIconPath(ver.icon)})` }"
            ></div>
          </template>
        </div>
      </div>
    </div>

    <div class="params-card section-panel" v-if="command.params.length > 0">
      <div class="panel-title">{{ locale === 'zh' ? '属性参数 (Properties)' : 'Properties' }}</div>
      <div class="params-table">
        <div class="thead">
          <div class="th name">Var</div>
          <div class="th desc">{{ locale === 'zh' ? '属性值 / 说明' : 'Value / Description' }}</div>
        </div>
        <div class="tbody">
          <div v-for="(p, i) in command.params" :key="i" class="tr">
            <div class="td name">{{ p.name }}</div>
            <div class="td desc">{{ p.desc[locale] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.properties-wrapper { display: flex; flex-direction: column; gap: 20px; }

.section-panel {
  /* 恢复面板的深色玻璃质感 */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--alm-border);
  border-radius: 12px; padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.card-header {
  margin-bottom: 15px;
  .cmd-title {
    margin: 0;
    font-size: 2rem;
    color: var(--alm-accent); /* 金色标题 */
    font-family: 'Times New Roman', serif; /* 还原截图中的衬线体感觉 */
    font-weight: bold;
    word-break: break-all; /* 允许长ID换行 */
    line-height: 1.2;
  }
}
.cmd-desc {
  color: var(--alm-text);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.version-compatibility {
  display: flex; flex-direction: column; gap: 10px;
  .label { font-size: 1rem; color: var(--alm-text-dim); }
  .ver-badges { display: flex; gap: 15px; }
  .ver-badge-static {
    width: 60px; height: 40px;
    background-position: center; background-repeat: no-repeat; background-size: contain;
    cursor: default; opacity: 0.9;
  }
}

.panel-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--alm-accent);
  border-bottom: 1px solid var(--alm-border);
  padding-bottom: 10px; margin-bottom: 20px;
}

.params-table {
  font-size: 0.95rem;
  .thead, .tr { display: grid; grid-template-columns: 80px 1fr; gap: 20px; padding: 12px 0; }
  .thead {
    font-weight: bold;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: var(--alm-text-dim);
  }
  .tr { border-bottom: 1px solid rgba(255,255,255,0.05); }

  .td.name {
    font-family: monospace;
    font-weight: bold;
    color: var(--alm-accent); /* 变量名金色高亮 */
  }

  .td {
    /* 允许表格内容换行 */
    word-break: break-word;
    white-space: normal;
    line-height: 1.5;
  }
}
</style>