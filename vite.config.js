import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import { updateJsonFileField } from './tools/json-editor.js';
// https://vitejs.dev/config/
/**
 * 命令行加入 `--mode` 后接参数 development/production
 * @param {String} mode  development/production
*/
export default defineConfig(({ mode = 'development' }) =>{
    // 加载envs目录下的环境变量文件
    const env = loadEnv(mode, './envs');
    console.log('current mode:', mode);
    // 修改 manifest.json 中的 mp-weixin.appid 字段
    const manifestPath = path.resolve(__dirname, 'src/manifest.json');
    updateJsonFileField(manifestPath, ['mp-weixin', 'appid'], env.VITE_WEIXIN_APPID);
    return {
        plugins: [
            uni(),
        ],
        // 注入全局变量
        define: {
            __API__: JSON.stringify(env.VITE_API_BASE),
        },
        // 修复控制台出现 Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0 的问题
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api']
                }
            }
        }
    }
})