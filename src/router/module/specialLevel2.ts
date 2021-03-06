import { RouteTree } from '../types';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layout/Index.vue');
const Root1 = () => import('@/views/special-level-2/Root1.vue');
const Home1 = () => import('@/views/special-level-2/Home1.vue');
const Add1 = () => import('@/views/special-level-2/Add1.vue');
const Edit1 = () => import('@/views/special-level-2/Edit1.vue');
const Home2 = () => import('@/views/special-level-2/Home2.vue');

export default <RouteTree[]>[
    {
        path: '/special-level-2',
        redirect: '/special-level-2/home1',
        component: Layout,
        code: 'special-level-2',
        index: 6,
        alwaysShow: true,
        meta: {
            icon: 'icon-zizhuzujianku',
            title: '多级菜单子级隐藏',
        },
        children: [
            {
                path: 'home1',
                code: 'special-level-2-home1',
                component: Root1,
                meta: {
                    title: 'home1',
                    hiddenPage: true,
                },
                children: [
                    {
                        path: '',
                        component: Home1,
                        meta: {
                            title: 'home1',
                        },
                    },
                    {
                        path: 'add1',
                        component: Add1,
                        code: 'special-level-2-add1',
                        name: 'special-level-2-add1',
                        meta: {
                            title: 'add1',
                            onHidden: true,
                            activeMenu: '/special-level-2/home1',
                        },
                        hidden: true,
                    },
                    {
                        path: 'edit1',
                        component: Edit1,
                        code: 'special-level-2-edit1',
                        name: 'special-level-2-edit1',
                        meta: {
                            title: 'edit1',
                            onHidden: true,
                        },
                        hidden: true,
                    },
                ],
            },
            {
                path: 'home2',
                code: 'special-level-2-home2',
                name: 'special-level-2-home2',
                component: Home2,
                meta: {
                    title: 'home2',
                },
            },
        ],
    },
];
