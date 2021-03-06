import { RouteTree } from '../types';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layout/Index.vue');
const Home = () => import('@/views/special-level-1/Home.vue');
const Add = () => import('@/views/special-level-1/Add.vue');
const Edit = () => import('@/views/special-level-1/Edit.vue');

export default <RouteTree[]>[
    {
        path: '/special-level',
        redirect: '/special-level/home',
        component: Layout,
        code: 'special-level-home',
        index: 5,
        meta: {
            hiddenPage: true,
            title: '一级菜单子级隐藏',
        },
        children: [
            {
                path: 'home',
                name: 'special-level-home',
                component: Home,
                meta: {
                    title: '一级菜单子级隐藏',
                    icon: 'icon-zizhuzujianku',
                },
            },
            {
                path: 'add',
                code: 'special-level-add',
                name: 'special-level-add',
                component: Add,
                meta: {
                    title: '新增',
                    onHidden: true,
                },
                hidden: true,
            },
            {
                path: 'edit',
                code: 'special-level-edit',
                name: 'special-level-edit',
                component: Edit,
                meta: {
                    title: '编辑',
                    onHidden: true,
                },
                hidden: true,
            },
        ],
    },
];
