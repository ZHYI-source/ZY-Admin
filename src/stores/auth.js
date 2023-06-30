import {defineStore} from 'pinia';
import {useRouter} from 'vue-router';
import {useDbStore} from './db.js'
import dbUtils from '../libs/util.strotage.js'
import {notification} from 'ant-design-vue';
import {useTabsStore} from './tabs';


export const useAuthStore = defineStore('auth', () => {
    let router = useRouter()
    const db = useDbStore();
    // 重置tabs
    let tabStore = useTabsStore()

    async function logout() {
        // 执行退出登录逻辑，例如清除用户凭证和重置用户状态等
        // ...
        // 重置tabs
        tabStore.resetTabs()
        // 清除所有缓存
        db.removeAllInfo()

        // 导航到登录页或其他适当的页面
        await router.replace('/login');

    }

    async function login(value) {
        // 执行登录逻辑
        // ...
        // 先清除缓存
        dbUtils.clear()
        // 存储用户信息和权限等
        dbUtils.set('userInfo', {
            ...value,
            nickname: value.username,
            avatar: 'http://zhouyi.run:5222/api/public/admin/getFiles?id=5d38c26acf509bdcab4f8c677ce90088.png&&mimetype=image/png'
        })
        dbUtils.set('token', '123456789')

        // 需要根据用户单独从后端那权限表
        let perms = {
            admin: ['*'],
            test: [
                'sys:user:list',
                'sys:user:create',
                'sys:user:update',
                'sys:user:delete',
            ],
        }


        await setPerm(perms[value.username])

        notification.success({
            message: '登录成功',
            description: `欢迎回来: ${value.username}`,

        });
        // 导航到登录页或其他适当的页面
        await router.replace('/');
    }

    // 获取用户的角色权限列表数据 并且存储本地
    async function setPerm(value) {
        dbUtils.set('perms', value)
    }

    return {
        setPerm,
        logout,
        login,
    };

})
