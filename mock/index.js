/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');

const data = Mock.mock({
    'items|30': [
        {
            id: '@id',
            title: '@sentence(10, 20)',
            'status|1': ['published', 'draft', 'deleted'],
            author: 'name',
            display_time: '@datetime',
            pageviews: '@integer(300, 5000)',
        },
    ],
});

Mock.mock('http://uc-dev.aqara.cn/user/login', () => ({
    code: 0,
    msg: '登录成功',
    result: {
        token: 'f520588352419918.600777165750730753',
        introduction: 'I am a super administrator',
        avatar: 'https://cdn.cnbj2.fds.api.mi-img.com/cdn/repair/760590043895233.png',
        name: 'Super Admin',
    },
}));

Mock.mock('http://uc-dev.aqara.cn/user/menus', () => ({
    code: 0,
    msg: null,
    result: [
        {
            id: 1464,
            parentId: 0,
            code: 'routerSetting',
            name: 'RouterSetting',
            sysTypeId: 10,
            levelId: 1,
            url: null,
        },

        {
            id: 1467,
            parentId: 0,
            code: 'permission',
            name: 'Permission',
            sysTypeId: 10,
            levelId: 1,
            url: null,
        },
        {
            id: 1469,
            parentId: 1467,
            code: 'button',
            name: 'Button',
            sysTypeId: 10,
            levelId: 2,
            url: null,
        },
        {
            id: 1470,
            parentId: 1467,
            code: 'module',
            name: 'Module',
            sysTypeId: 10,
            levelId: 2,
            url: null,
        },

        {
            id: 1570,
            parentId: 0,
            code: 'nested',
            name: 'Nested',
            sysTypeId: 10,
            levelId: 1,
            url: null,
        },
        {
            id: 1471,
            parentId: 1570,
            code: 'm-1',
            name: 'm-1',
            sysTypeId: 10,
            levelId: 2,
            url: null,
        },

        {
            id: 1701,
            parentId: 1471,
            code: 'm-1-1',
            name: 'm-1-1',
            sysTypeId: 10,
            levelId: 3,
            url: null,
        },

        {
            id: 1702,
            parentId: 1471,
            code: 'm-1-2',
            name: 'm-1-2',
            sysTypeId: 10,
            levelId: 3,
            url: null,
        },
        // { id: 1801, parentId: 1702, code: 'm-1-2-1', name: 'm-1-2-1', sysTypeId: 10, levelId: 4, url: null },
        {
            id: 1802,
            parentId: 1702,
            code: 'm-1-2-2',
            name: 'm-1-2-2',
            sysTypeId: 10,
            levelId: 4,
            url: null,
        },

        {
            id: 1703,
            parentId: 1471,
            code: 'm-1-3',
            name: 'm-1-3',
            sysTypeId: 10,
            levelId: 3,
            url: null,
        },

        {
            id: 1472,
            parentId: 1570,
            code: 'm-2',
            name: 'm-2',
            sysTypeId: 10,
            levelId: 2,
            url: null,
        },
        {
            id: 1900,
            parentId: 0,
            code: 'special-level-home',
            name: 'special-level-home',
            sysTypeId: 10,
            levelId: 1,
            url: null,
        },
        {
            id: 1910,
            parentId: 0,
            code: 'special-level-2',
            name: 'special-level-2',
            sysTypeId: 10,
            levelId: 1,
            url: null,
        },
    ],
}));

Mock.mock('http://uc-dev.aqara.cn/resources/list', () => ({
    code: 0,
    msg: null,
    result: [
        { code: 'product-list', name: '产品列表', id: 2, type: 2 },
        { code: 'product-edit', name: '产品编辑', id: 2, type: 2 },
    ],
}));

Mock.mock('http://uc-dev.aqara.cn/user/logout', () => ({
    code: 0,
    msg: '退出成功',
    data: null,
}));

Mock.mock('http://uc-dev.aqara.cn/user/list', () => ({
    code: 0,
    msg: '',
    data: data.items,
}));
