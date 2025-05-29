// 引入 uni-ajax 模块 
// https://uniajax.ponjs.com/
import ajax from 'uni-ajax';
import Loading from './loading'
import { showModal, routeTo } from '@/utils/polish';
const loading = new Loading();

// 定义 pending 状态的 Promise，用于避免进入 catch 回调
const pending = new Promise(() => {})

// 创建请求实例
const server = ajax.create({
    // 初始配置
    baseURL: __API__,
    loading: 'loading...',
})

// 添加请求拦截器
server.interceptors.request.use(
    config => {
        let _token = uni.getStorageSync('token');
        if(_token)config.data.ustoken = _token;
        loading.show(config.loading);
        return config;
    },
    error => {
        console.error('server.interceptors.request error -> ', error);
        return Promise.reject(error);
    }
)

// 添加响应拦截器
server.interceptors.response.use(
    response => {
        loading.hide(response.config.loading);
        if(response?.data?.code === 0)return formatResponse(response);
        console.error(`get ${response?.config?.url} err -> `, response)
        // return errorHandle({
        //     Catch: response?.config?.catch || false,
        //     content: response?.data?.smsg ?? '请求失败',
        //     data: response,
        //     success: () => {
        //         // 登录超时
        //         if(response?.data?.error === '201')loginHandle();
        //         if(response?.data?.error === '704'&&response?.data?.smsg === 'ustoken不能为空')loginHandle();
        //     }
        // })
    },
    error => {
        loading.hide(error.config.loading);
        console.error('server.interceptors.response error -> ', error);
        // return errorHandle({
        //     Catch: error?.config?.catch || false,
        //     // 404 拦截 data 会存在错误信息
        //     content: error?.data ?? error?.errMsg ?? '请求失败',
        //     data: error,
        // })
    }
)

function formatResponse(response){
    let _data = response?.data?.data || null;

    return _data;
}

/**
 * 在有返回错误的拦截器里返回 pending 状态的 Promise
 *
 * 传值 config.catch 判断是否需要返回错误，如果是 true 返回错误信息，否则不返回。
 */
function errorHandle({ Catch = true, content = '', data = {}, success }) {
    console.error(`get ${data?.config?.url} err -> `, data)
    showModal({
        content: content || '请求失败',
        success: success
    })
    
    return Catch ? Promise.reject(data) : pending;
}

function loginHandle() {
    uni.removeStorageSync('token');
    routeTo(`/pages/login/index`, 'rL');
}


// 导出 create 创建后的实例
export default server;