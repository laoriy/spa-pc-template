import { createStore } from 'vuex';

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

export default createStore({
    modules,
    getters,
});
