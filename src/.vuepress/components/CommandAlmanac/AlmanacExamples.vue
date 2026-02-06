<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useGameAssets } from './useGameAssets';
import type { GameCommand } from './data';

const props = defineProps<{
  locale: 'zh' | 'en';
  command: GameCommand;
}>();

const { getIconPath } = useGameAssets();

// === 💡 灯箱 (Lightbox) 逻辑 ===
const activeIndex = ref<number | null>(null);

const openLightbox = (index: number) => {
  activeIndex.value = index;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

const closeLightbox = () => {
  activeIndex.value = null;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

const nextImage = (e?: Event) => {
  e?.stopPropagation();
  if (activeIndex.value === null || !props.command.gallery) return;
  activeIndex.value = (activeIndex.value + 1) % props.command.gallery.length;
};

const prevImage = (e?: Event) => {
  e?.stopPropagation();
  if (activeIndex.value === null || !props.command.gallery) return;
  activeIndex.value = (activeIndex.value - 1 + props.command.gallery.length) % props.command.gallery.length;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (activeIndex.value === null) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown);
  }
});

const currentGalleryItem = computed(() => {
  if (activeIndex.value === null || !props.command.gallery) return null;
  return props.command.gallery[activeIndex.value];
});
</script>

<template>
  <div class="examples-wrapper section-panel" v-if="command.example || (command.gallery && command.gallery.length > 0)">
    <div class="panel-title">
      {{ locale === 'zh' ? '使用演示 (Examples)' : 'Usage Demo' }}
    </div>

    <div v-if="command.example" class="example-box">
      <div class="box-label">Code / Usage:</div>
      <div class="code-block">
        <span class="prompt">&gt;</span> {{ command.example }}
      </div>
    </div>

    <div v-if="command.gallery && command.gallery.length > 0" class="gallery-grid">
      <div
          v-for="(item, index) in command.gallery"
          :key="index"
          class="gallery-item"
          @click="openLightbox(index)"
      >
        <div class="img-wrapper">
          <!--
            修改点 1: 添加 data-zoomable="false"
            这是一个常见的约定，告诉 VitePress/Medium-zoom 等插件忽略此图片
          -->
          <img
              :src="getIconPath(item.src)"
              class="no-zoom"
              alt="Demo Thumbnail"
              loading="lazy"
              data-zoomable="false"
          >
          <div class="zoom-hint">🔍</div>
        </div>
        <div class="caption-text">{{ item.caption[locale] }}</div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="activeIndex !== null && currentGalleryItem" class="lightbox-overlay" @click="closeLightbox">

        <button class="close-btn" @click.stop="closeLightbox">×</button>

        <div class="lightbox-content" @click.stop>
          <button class="nav-btn prev" @click="prevImage" v-if="command.gallery!.length > 1">❮</button>

          <div class="main-display">
            <!-- 这里的图片需要允许交互，所以样式里不需要 pointer-events: none -->
            <img
                :src="getIconPath(currentGalleryItem.src)"
                class="no-zoom"
                alt="Full Preview"
            >
            <div class="lightbox-caption">
              {{ currentGalleryItem.caption[locale] }}
              <span class="counter">{{ activeIndex + 1 }} / {{ command.gallery!.length }}</span>
            </div>
          </div>

          <button class="nav-btn next" @click="nextImage" v-if="command.gallery!.length > 1">❯</button>
        </div>

      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.section-panel {
  background: var(--alm-bg-panel);
  border: 1px solid var(--alm-border);
  border-radius: 8px; padding: 25px;
}
.panel-title {
  font-size: 1.1rem; font-weight: bold; color: var(--alm-accent);
  border-bottom: 1px solid var(--alm-border); padding-bottom: 10px; margin-bottom: 20px;
}
.box-label { font-size: 0.8rem; color: var(--alm-text-dim); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }

.code-block {
  background: var(--alm-code-bg); color: var(--alm-code-text);
  padding: 15px; border-radius: 6px; font-family: monospace;
  border: 1px solid var(--alm-border); margin-bottom: 25px;
  word-break: break-all; white-space: pre-wrap;
  .prompt { color: var(--alm-accent); margin-right: 10px; font-weight: bold; }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.gallery-item {
  cursor: pointer;
  &:hover .img-wrapper {
    border-color: var(--alm-accent);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  &:hover .zoom-hint { opacity: 1; }

  .img-wrapper {
    position: relative;
    border: 2px solid var(--alm-border);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0,0,0,0.1);
    aspect-ratio: 16/9;
    transition: all 0.2s;

    img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;

      /* === 修改点 2: 核心修复 === */
      /* 让图片本身不响应鼠标事件，点击事件会直接传给父级 .gallery-item */
      /* 这样外部的图片放大插件（通常监听 img 标签）就捕捉不到点击， */
      /* 而你的 openLightbox（在父级 div 上）依然可以正常工作。 */
      pointer-events: none;
    }

    .zoom-hint {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem; color: white;
      text-shadow: 0 0 10px black;
      opacity: 0; transition: opacity 0.2s;
      pointer-events: none;
    }
  }

  .caption-text {
    margin-top: 8px;
    font-size: 0.9rem;
    color: var(--alm-text);
    text-align: center;
    line-height: 1.4;
  }
}

.lightbox-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99999;
  display: flex; justify-content: center; align-items: center;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease-out;
}

.lightbox-content {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 1200px; padding: 0 20px;
  position: relative;
}

.main-display {
  flex: 1;
  display: flex; flex-direction: column; align-items: center;
  max-width: 100%;

  img {
    max-width: 100%; max-height: 80vh;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    border: 1px solid #333;
    pointer-events: auto; /* 确保大图可以响应右键保存等 */
  }

  .lightbox-caption {
    margin-top: 15px;
    color: #fff;
    font-size: 1.1rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 20px;

    .counter {
      margin-left: 10px;
      font-size: 0.8rem;
      opacity: 0.6;
      border-left: 1px solid rgba(255,255,255,0.3);
      padding-left: 10px;
    }
  }
}

.close-btn {
  position: absolute; top: 20px; right: 30px;
  background: none; border: none; color: white;
  font-size: 3rem; cursor: pointer; z-index: 100000;
  opacity: 0.7; transition: 0.2s;
  &:hover { opacity: 1; transform: scale(1.1); }
}

.nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none; color: white;
  font-size: 2rem; cursor: pointer;
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  &:hover { background: var(--alm-accent); color: #000; }
  flex-shrink: 0; margin: 0 20px;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 768px) {
  .nav-btn { position: absolute; top: 50%; margin: 0; width: 40px; height: 40px; font-size: 1.5rem; }
  .prev { left: 10px; }
  .next { right: 10px; }
  .lightbox-content { padding: 0; }
  .img-wrapper { aspect-ratio: auto; }
}
</style>