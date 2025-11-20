import request from '@/libs/request';
const LOGIN_CONFIG = {
    LOGIN_URL: 'company/security/v1/account/login',
    CODE_URL: 'company/security/v1/captcha',
    LOGOUT_URL: 'company/security/v1/account/logout',
    AVATAR_URL: 'company/self/installer/v1/avatar'
};
/**
 * 获取数据库备份的状态
 * @param type ‘1’备份  ‘2’还原
 * @param options
 */
export default {
    login(params) {
        return request.post(LOGIN_CONFIG.LOGIN_URL, params, {hasErrorHandle: false});
    },
    getCode(params) {
        return request.post(LOGIN_CONFIG.CODE_URL, params);
    },
    logout() {
        return request.post(LOGIN_CONFIG.LOGOUT_URL);
    },
    getAvatar() {
        return request.post(LOGIN_CONFIG.AVATAR_URL);
    }
};
