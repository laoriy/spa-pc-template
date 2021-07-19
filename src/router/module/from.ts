import { RouteTree } from '../types';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layout/Index.vue');
const RouterGuide = () =>
    import(/* webpackChunkName: 'router-guide' */ '@/views/router-guide/Index.vue');

export default <RouteTree[]>[
    {
        path: '/router',
        redirect: '/router/guide',
        component: Layout,
        code: 'routerSetting',
        index: 1,
        children: [
            {
                // 路由显示对应 form/index，只需显示 /from，path设为 ''
                path: 'guide',
                name: 'RouterGuide',
                component: RouterGuide,
                meta: {
                    title: '路由配置',
                    icon: 'icon-zujian',
                },
            },
        ],
    },
];
