// import { FlattenObject, GeneratorApi } from 'aqara-lib';
import { GenerateFetch } from 'aqara-lib';
import ajax from '../utils/ajax';

const apis = {
    get: {
        menu_list: '/user/menus',
        resources_list: '/resources/list',
    },
    post: {
        login: '/user/login',
        logout: '/user/logout',
    },
};

// const apiInstance = new GeneratorApi(apis, ajax);
// type FlattenType = FlattenObject<typeof apis>;
export const urlMap = { ...apis.get, ...apis.post };
export default new GenerateFetch(apis, ajax).fetchData;

// // 导出api，apiUrl对象，提供类型推断
// export default apiInstance.api;
// export const urlMap: FlattenType = apiInstance.getFlattenObj(apis);
