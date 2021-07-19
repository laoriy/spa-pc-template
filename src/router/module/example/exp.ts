import { RouteTree } from '../../types';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layout/Index.vue');
const Button = () => import(/* webpackChunkName: 'example' */ '@/views/permission-page/Button.vue');
const Module = () => import(/* webpackChunkName: 'example' */ '@/views/permission-page/Module.vue');

export default <RouteTree[]>[
    {
        path: '/permission',
        component: Layout,
        // 控制面包屑点击时跳转子路由
        redirect: '/permission/button',
        code: 'permission',
        index: 3,
        name: 'Permission',
        alwaysShow: true,
        meta: {
            title: '元素权限',
            icon: 'icon-zizhuzujianku',
        },
        children: [
            {
                path: 'button',
                code: 'button',
                name: 'Button',
                component: Button,
                meta: {
                    title: '按钮权限',
                    icon: 'icon-tubiao1',
                    showBreadcrumb: false,
                },
            },
            {
                path: 'module',
                code: 'module',
                name: 'Module',
                component: Module,
                meta: {
                    title: '模块权限',
                },
            },
        ],
    },
];
