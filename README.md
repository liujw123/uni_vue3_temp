# uni-app vue3(vite) template

这是一个基于 uni-app + vue3 + vite 的小程序模板
对常用的功能进行了封装，方便快速开发。
后续会持续修改和完善。
以微信小程序作为示例

## vite.config.js

1. envs 目录
    - 在这个目录下定义环境变量信息
    - 测试 .env.development / 正式 .env.production
    - 在代码中通过 `import.meta.env` 访问环境变量（目前抖音小程序获取不了）
2. tools 目录
    - 在这个目录下定义工具函数
    - json-editor 编译阶段修改 json 文件，支持读取注释

## src 目录

**src\pages\index\index.vue** 这里有使用示例

1. api
    - index.js 在这定义 api 接口
        ex: `export const login = params => server.post({ url: '/Admino/login', ...params }); // 登录`
    - server.js 这里定义请求方法
        - 引入了 [uni-ajax](https://uniajax.ponjs.com/)
        - 定义拦截和错误处理
2. styles
    - iconfonts.scss 这里定义 [iconfont](https://www.iconfont.cn/) 字体图标
    - methods.scss 这里定义一些通用的样式方法
    - uni.scss 这里的样式会全局引用

3. utils
    - calculation.js 计算方法，解决精度丢失
    - index.js 常用工具函数
    - polish.js 平台函数封装