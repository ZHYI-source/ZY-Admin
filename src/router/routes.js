/**
 * 在主框架内显示
 * 路由配置说明
 * {
      path: '/dir-demo-info',    // 页面地址（唯一）
      name: 'dir-demo-info',     // 页面名称（唯一）
      hidden: false,              // 隐藏（不展示在侧边栏菜单）
      meta: {
          title: '用户管理',       // 页面标题
          icon: 'yonghuguanli',  // 页面图标
          cache: true,          // 页面是否进行缓存 默认true
          link: false,           // 页面是否是外链 默认false
          frameSrc: false,       // 页面是否是内嵌 默认false
          requiresAuth: true,   // 页面是否是需要登录 默认true
          perms: [               // 页面的操作的权限列表
              'sys:user:list',   // 查询
              'sys:user:create', // 增加
              'sys:user:update', // 更新
              'sys:user:delete', // 删除
          ],
      },
      component: () => import('@/views/sys/user/dir-user-info.vue'),// 懒加载页面组件
   }
 *
 */
const frameIn = [
    {
        path: '/',
        redirect: {name: 'index'},
        component: () => import('@/layout/index.vue'),
        /*************************************************************************************/
        /********************children 最多 再加一级children  否则侧边栏体验不好*********************/
        /*************************************************************************************/
        children: [
            {
                path: '/index',
                name: 'index',
                meta: {
                    cache: true,
                    title: '首页',
                    icon: 'shouye',
                    requiresAuth: true,
                },
                component: () => import('@/views/home/index.vue'),
            },
            {
                path: '/echart',
                name: 'echart',
                meta: {
                    cache: true,
                    title: '图表地图',
                    requiresAuth: true,
                },
                children:[
                    {
                        path: '/guizhouMap',
                        name: 'guizhouMap',
                        meta: {
                            cache: true,
                            title: '贵州地图',
                            requiresAuth: true,
                        },
                        component: () => import('@/views/demo/echarts/guizhou.vue'),
                    },
                    {
                        path: '/chinaMap',
                        name: 'chinaMap',
                        meta: {
                            cache: true,
                            title: '中国地图',
                            requiresAuth: true,
                        },
                        component: () => import('@/views/demo/echarts/china.vue'),
                    },
                    {
                        path: '/worldMap',
                        name: 'worldMap',
                        meta: {
                            cache: true,
                            title: '世界地图',
                            requiresAuth: true,
                        },
                        component: () => import('@/views/demo/echarts/world.vue'),
                    },
                    {
                        path: '/line',
                        name: 'line',
                        meta: {
                            cache: true,
                            title: '折线图',
                            requiresAuth: true,
                        },
                        component: () => import('@/views/demo/echarts/line.vue'),
                    },
                    {
                        path: '/pie',
                        name: 'pie',
                        meta: {
                            cache: true,
                            title: '饼图',
                            requiresAuth: true,
                        },
                        component: () => import('@/views/demo/echarts/pie.vue'),
                    },
                ]

            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    cache: true,
                    title: '富文本编辑器',
                    requiresAuth: true,
                },
                children:[
                    {
                        path: '/Tinymce',
                        name: 'Tinymce',
                        meta: {
                            cache: true,
                            title: 'Tinymce',
                            requiresAuth: true,
                        },
                        component: () => import('@/components/Tinymce/index.vue'),
                    },
                    {
                        path: '/Vditor',
                        name: 'Vditor',
                        meta: {
                            cache: true,
                            title: 'Vditor',
                            requiresAuth: true,
                        },
                        component: () => import('@/components/Vditor/index.vue'),
                    },
                    {
                        path: '/VMdEditor',
                        name: 'VMdEditor',
                        meta: {
                            cache: true,
                            title: 'Markdown',
                            requiresAuth: true,
                        },
                        component: () => import('@/components/VMdEditor/index.vue'),
                    }
                ]

            },
            {
                path: '/sys',
                name: 'sys',
                meta: {
                    title: '系统管理',
                    icon: 'shezhi',
                    requiresAuth: true,
                },
                children: [
                    {
                        path: '/dir-user-info',
                        name: 'dir-user-info',
                        meta: {
                            title: '用户管理',
                            icon: 'yonghuguanli',
                            requiresAuth: true,
                            perms: [
                                'sys:user:list',
                                'sys:user:create',
                                'sys:user:update',
                                'sys:user:delete',
                            ],
                        },
                        component: () => import('@/views/sys/user/dir-user-info.vue'),
                    },
                    {
                        path: '/dir-roles-info',
                        name: 'dir-roles-info',
                        meta: {
                            title: '角色管理',
                            icon: 'caidanguanli',
                            requiresAuth: true,
                            perms: [ //页面的操作的权限
                                'sys:roles:list',
                                'sys:roles:create',
                                'sys:roles:update',
                                'sys:roles:delete',
                            ],
                        },
                        component: () => import('@/views/sys/roles/dir-roles-info.vue'),
                    },
                    {
                        path: '/dir-icon-info',
                        name: 'dir-icon-info',
                        meta: {
                            title: '图标列表',
                            requiresAuth: true,
                            icon: 'shezhi',
                        },
                        component: () => import('@/views/sys/icon/dir-icon-info.vue'),
                    },
                ]
            },
            {
                path: 'frame',
                name: 'frame',
                meta: {
                    frameSrc: 'http://blog.zhouyi.run/#/',
                    title: '博客主页',
                    requiresAuth: true,
                    icon: 'wailian_icon',
                },
                component: () => import('@/views/sys/frame/dir-frame-info.vue'),
            },
            {
                path: 'https://gitee.com/Z568_568',
                meta: {
                    link: true,
                    title: '源码',
                    requiresAuth: true,
                    icon: 'github'
                },
            },

            // 重定向页面 必须保留
            {
                path: '/redirect/:path(.*)/:_origin_params(.*)?',
                name: 'Redirect',
                hidden: true,//不展示在侧边栏菜单
                meta: {
                    title: '重定向',
                },
                component: () => import('@/views/sys/function/redirect'),
            },
        ]
    },
]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
        },
        component: () => import('@/views/sys/login/dir-login-info.vue'),
    }
]

/**
 * 错误页面
 */
const errorPage = [
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401.vue'),
        meta: {
            title: '401',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
            title: '404',
        },
    }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
]
