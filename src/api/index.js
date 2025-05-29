import server from './server';

// 公共
export const login = params => server.post({ url: '/admin/login', ...params }); // 登录
