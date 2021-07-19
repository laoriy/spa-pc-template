import { GetterTree } from 'vuex';
import { StoreLib } from '@/@types/store.d';

const getters: GetterTree<StoreLib.AppGetters, unknown> = {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    menus: (state) => state.user.menus,
    operators: (state) => state.user.operatorList,
    hasOperator: (state) => (queryCode: string) => {
        if (!state.user.operatorList || state.user.operatorList.length === 0) {
            return false;
        }
        return (
            state.user.operatorList
                .map((item: Record<string, any>) => item.code)
                .indexOf(queryCode) > -1
        );
    },
    allRoutes: (state) => state.permission.routes,
    addRoutes: (state) => state.permission.addRoutes,
};

export default getters;
