// src/components/Almanac/useGameAssets.ts
import { computed } from 'vue';

// 你的基础路径配置
const BASE_URL = '/alien_shooter_mod_maker_tutorial/';

export function useGameAssets() {
    // 获取图片完整路径
    const getIconPath = (filename: string) => {
        if (!filename) return '';
        // 替换双斜杠以防万一
        return `${BASE_URL}command_pic/${filename}`.replace('//', '/');
    };

    // 图片加载失败的通用处理
    const handleImgError = (e: Event) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'inline-block';
        target.style.width = '40px'; // 稍微大一点方便看
        target.style.height = '40px';
        target.style.border = '2px solid #e74c3c';
        target.style.borderRadius = '4px';
        target.alt = '❌ ERR';
    };

    return {
        getIconPath,
        handleImgError
    };
}