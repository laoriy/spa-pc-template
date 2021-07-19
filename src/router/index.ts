import { createRouter, createWebHashHistory, Router } from 'vue-router';

import whiteList from './whiteList';

type mixinRouter = Router & { matcher: string };

const initRouter = () =>
    createRouter({
        history: createWebHashHistory(),
        scrollBehavior: () => ({ left: 0, top: 0 }),
        // @ts-ignore
        routes: whiteList,
    });

const router = initRouter();

// reset router https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = initRouter();
    (router as mixinRouter).matcher = (newRouter as mixinRouter).matcher;
}

export default router;
