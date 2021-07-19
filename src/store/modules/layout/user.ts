import api, { urlMap } from '@/service/api/access';
import { getToken, setToken, removeToken } from '@/service/utils/auth';
import { resetRouter } from '@/router/index';
import { LoginRes, MenusRes, ResourcesRes } from '@/store/types';
import { MutationTree, ActionTree } from 'vuex';
import { StoreLib } from '@/@types/store.d';

interface DefaultState {
    (): StoreLib.UserState;
}

const getDefaultState: DefaultState = () => ({
    token: getToken(),
    name: '',
    avatar: '',
    menus: [],
    operatorList: [],
});

const state: StoreLib.UserState = getDefaultState();

const mutations: MutationTree<StoreLib.UserState> = {
    RESET_STATE(status) {
        Object.assign(status, getDefaultState());
    },
    SET_TOKEN(status, token: string) {
        status.token = token;
    },
    SET_NAME(status, name: string) {
        status.name = name;
    },
    SET_AVATAR(status, avatar: string) {
        status.avatar = avatar;
    },
    SET_MENUS(status, menus: any[]) {
        status.menus = menus;
    },
    SET_OPERATORS(status, opList: any[]) {
        status.operatorList = opList;
    },
};

const actions: ActionTree<StoreLib.UserState, unknown> = {
    // user login
    login({ commit }, userInfo: any) {
        const { username, password } = userInfo;
        return new Promise<void>((resolve, reject) => {
            api<LoginRes>(urlMap.login, {
                username: username.trim(),
                password,
            })
                .then(({ result }) => {
                    const { name, avatar, token } = result;
                    commit('SET_NAME', name);
                    commit('SET_AVATAR', avatar);
                    commit('SET_TOKEN', token);
                    setToken(token);
                    resolve();
                })
                .catch((error) => reject(error));
        });
    },

    // get user menus
    getUserMenus({ commit }) {
        return new Promise((resolve, reject) => {
            api<MenusRes>(urlMap.menu_list, {})
                .then(({ result = [] }) => {
                    if (!result || (<any>result).length === 0) {
                        reject(new Error('Access menus must be a non-null array.'));
                    }
                    commit('SET_MENUS', result);
                    resolve({ menus: result });
                })
                .catch((error) => reject(error));
        });
    },

    // get user access operate
    getUserOperators({ commit }) {
        return new Promise((resolve, reject) => {
            api<ResourcesRes>(urlMap.resources_list, {})
                .then(({ result = [] }) => {
                    commit('SET_OPERATORS', result);
                    resolve({ operators: result });
                })
                .catch((error) => reject(error));
        });
    },

    // user logout
    logout({ commit }) {
        return new Promise<void>((resolve, reject) => {
            api<null>(urlMap.logout, {})
                .then(() => {
                    // must remove token first
                    removeToken();
                    resetRouter();
                    commit('RESET_STATE');
                    resolve();
                })
                .catch((error) => reject(error));
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise<void>((resolve) => {
            // must remove token first
            removeToken();
            commit('RESET_STATE');
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
