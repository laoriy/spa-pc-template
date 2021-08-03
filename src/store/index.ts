import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { StoreLib } from '@/@types/store.d';

import { InjectionKey } from 'vue';
import getters from './getters';

const moduleFiles = require.context('./modules', true, /\.(ts|js)$/);
const modules = moduleFiles.keys().reduce((moduleObj: Record<string, any>, filePath: string) => {
    const reg = /^\.\/index\.(ts|js)$/;
    if (reg.test(filePath)) {
        return {};
    }

    const dir = filePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const [moduleName] = dir.split('/').slice(-1);
    moduleObj[moduleName] = moduleFiles(filePath).default;
    return moduleObj;
}, {});
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<StoreLib.State>> = Symbol();
// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key);
}

export default createStore<StoreLib.State>({
    modules,
    getters,
});
