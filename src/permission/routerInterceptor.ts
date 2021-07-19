import store from '@/store';
import { getToken } from '@/service/utils/auth';
import getPageTitle from '@/utils/getPageTitle';
import { RouteRecordNormalized, Router, RouteRecordRaw } from 'vue-router';

interface Next {
    (to?: any): void;
}

// router whitelist
const whiteList = ['/login'];

const redirectToHome = function redirectToHomePath(next: Next) {
    // filter no access routes
    const accessRoutes = store.getters.addRoutes.filter((route: RouteRecordNormalized) => {
        const { meta: { noAceess = false } = {} } = route;
        return !noAceess;
    });
    const [{ redirect = '' }] = accessRoutes;
    const path = redirect.length > 0 ? redirect : '/error/403';
    next({ path });
};

// router interceptor
const routerInterceptor = function routerJumpInterceptor(router: Router) {
    router.beforeEach(async (to, _from, next) => {
        // set page title
        const { title } = to.meta;
        document.title = getPageTitle(title);

        // determine whether the user has logged in
        const hasToken = getToken();

        if (hasToken) {
            // whether need to recirect the path '/' to 'home path'
            const isRedirectToHome = store.state.settings.isRedirectToHome || false;

            if (to.path.indexOf('/login') !== -1) {
                if (isRedirectToHome) {
                    redirectToHome(next);
                } else {
                    next({ path: '/' });
                }
            } else {
                const hasMenus = store.getters.menus && store.getters.menus.length > 0;
                if (hasMenus) {
                    next();

                    // redirect special path
                    const isNoAceess = to.meta.noAceess || false;
                    const singleReg = /^\/(\S*?)\/$/;
                    if (to.path === '/' && isRedirectToHome) {
                        redirectToHome(next);
                    } else if (to.path !== '/' && to.matched.length === 0) {
                        // When the page does not exist, jump to the 404 page
                        next({ path: '/error/404' });
                    } else if (isNoAceess) {
                        // Control illegal jump directly to the router
                        next({ path: '/error/403' });
                    } else if (singleReg.test(to.path)) {
                        // When the page is refreshed, if the router path is a single path, the path needs to be rewritten.
                        // Such as: '/introduce/' to '/introduce'
                        const rewritePath = to.path.replace(
                            singleReg,
                            (_match: string, p1: string) => `/${p1}`
                        );
                        next({ path: rewritePath });
                    }
                } else {
                    try {
                        // get user menus
                        const { menus } = await store.dispatch('user/getUserMenus');

                        // get user access operate
                        await store.dispatch('user/getUserOperators');

                        // generate accessible routes map based on menus
                        const accessRoutes = await store.dispatch(
                            'permission/generateRoutes',
                            menus
                        );
                        accessRoutes.forEach((route: RouteRecordRaw) => {
                            // dynamically add accessible routes
                            // router.addRoutes has deprecated https://router.vuejs.org/zh/api/#router-addroutes
                            router.addRoute(route);
                        });

                        // hack method to ensure that addRoutes is complete
                        // set the replace: true, so the navigation will not leave a history record
                        next({ ...to, replace: true });
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('user/resetToken');
                        console.log(error);
                        next({ path: '/login' });
                    }
                }
            }
        } else if (whiteList.indexOf(to.path) !== -1) {
            // has no token, in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next({ path: '/login' });
        }
    });
};

export { routerInterceptor };
