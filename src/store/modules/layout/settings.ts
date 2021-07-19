import layoutSettings from '@/layout/layout';
import { hasOwn } from 'aqara-lib';
import { MutationTree, ActionTree } from 'vuex';
import { StoreLib } from '@/@types/store.d';

const {
    title,
    fixedHeader,
    showSidebarLogo,
    sidebarLogoURL,
    isRedirectToHome,
    clickableBreadcrumb,
    isSetHomeBreadcrumb,
} = layoutSettings;

const state: StoreLib.SettingsState = {
    title,
    fixedHeader,
    showSidebarLogo,
    sidebarLogoURL,
    isRedirectToHome,
    clickableBreadcrumb,
    isSetHomeBreadcrumb,
};

const mutations: MutationTree<StoreLib.SettingsState> = {
    CHANGE_SETTING(status, { key, value }: StoreLib.SettingsState) {
        if (hasOwn(status, key)) {
            status[key] = value;
        }
    },
};

const actions: ActionTree<StoreLib.SettingsState, unknown> = {
    // 预留接口
    changeSetting({ commit }, data: StoreLib.SettingsState) {
        commit('CHANGE_SETTING', data);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
