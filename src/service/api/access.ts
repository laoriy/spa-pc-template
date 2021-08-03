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

export const urlMap = { ...apis.get, ...apis.post };
export default new GenerateFetch(apis, ajax).fetchData;
