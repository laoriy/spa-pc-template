import Cookies from 'js-cookie';
import { MutationTree, ActionTree } from 'vuex';
import { StoreLib } from '@/@types/store.d';

const state: StoreLib.AppState = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
    },
    // 设备类型
    device: 'desktop',
};

const mutations: MutationTree<StoreLib.AppState> = {
    TOGGLE_SIDEBAR(status) {
        status.sidebar.opened = !status.sidebar.opened;
        status.sidebar.withoutAnimation = false;
        if (status.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
    },
    CLOSE_SIDEBAR(status, withoutAnimation: boolean) {
        Cookies.set('sidebarStatus', 0);
        status.sidebar.opened = false;
        status.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE(status, device: StoreLib.deviceType) {
        status.device = device;
    },
};

const actions: ActionTree<StoreLib.AppState, unknown> = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    // 处理设备类型为mobile
    closeSideBar({ commit }, { withoutAnimation }: StoreLib.Sidebar) {
        commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({ commit }, device: StoreLib.deviceType) {
        commit('TOGGLE_DEVICE', device);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
