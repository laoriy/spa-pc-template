import { RouteTree } from './types';

const Login = () => import(/* webpackChunkName: 'whiteList' */ '@/views/login/Index.vue');
const Page403 = () => import(/* webpackChunkName: 'whiteList' */ '@/views/error-page/403.vue');
const Page404 = () => import(/* webpackChunkName: 'whiteList' */ '@/views/error-page/404.vue');
const Page500 = () => import(/* webpackChunkName: 'whiteList' */ '@/views/error-page/500.vue');
const Introduce = () => import(/* webpackChunkName: 'whiteList' */ '@/views/introduce/Index.vue');

// Route white list

const Home = () => import(/* webpackChunkName: 'whiteList' */ '@/views/home/Index.vue');

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layout/Index.vue');

export default <RouteTree[]>[
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页',
                    icon: 'icon-tubiao1',
                },
            },
        ],
    },
    {
        path: '/introduce',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Introduce',
                component: Introduce,
                meta: {
                    title: '项目介绍',
                    icon: 'icon-dasan',
                },
            },
        ],
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'https://www.aqara.com',
                meta: {
                    title: '外链菜单',
                    icon: 'icon-niantie',
                },
            },
        ],
    },

    {
        path: '/login',
        component: Login,
        hidden: true,
    },
    {
        path: '/error',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '403',
                name: 'error-403',
                component: Page403,
                meta: {
                    title: 'error-403',
                    showBreadcrumb: false,
                },
            },
            {
                path: '404',
                name: 'error-404',
                component: Page404,
                meta: {
                    title: 'error-404',
                    showBreadcrumb: false,
                },
            },
            {
                path: '500',
                name: 'error-500',
                component: Page500,
                meta: {
                    title: 'error-500',
                    showBreadcrumb: false,
                },
            },
        ],
    },
];
