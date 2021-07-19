export interface LoginRes {
    token: string;
    introduction: string;
    avatar: string;
    name: string;
}

interface MenuItem {
    id: number;
    parentId: number;
    code: string;
    name: string;
    sysTypeId: number;
    levelId: number;
    url: string | null;
}

export interface MenusRes {
    result: MenuItem[];
}

interface ResourcesItem {
    code: string;
    name: string;
    id: number;
    type: number;
}

export interface ResourcesRes {
    result: ResourcesItem[];
}
