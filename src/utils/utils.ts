type PlianObj = Record<string, any>;

const has = Object.prototype.hasOwnProperty;

export const isUndefined = (value: any): boolean => value === undefined;
export const isNull = (value: any): boolean => value === null;
export const hasOwn = (obj: Record<string, any>, key: string) => has.call(obj, key);
/**
 * 按对象数组某属性值对数组进行排序的比较函数
 * @param prop 排序属性
 * @param type 排序类型，1为升序，-1为降序
 */
export const compareByProp = (prop: string, type = 1) =>
    function compareBack(a: PlianObj, b: PlianObj) {
        const val1 = a[prop];
        const val2 = b[prop];
        if (type === -1) {
            return val2 - val1;
        }
        return val1 - val2;
    };
export const formartQueryURL = (url: string, query: PlianObj): string => {
    const { entries } = Object;
    let paramStr = '';

    for (const [key, value] of entries(query)) {
        if (
            isNull(value) ||
            isUndefined(value) ||
            Number(value) === 0 ||
            (typeof value === 'string' && value.trim().length === 0) ||
            (value && typeof value !== 'object')
        ) {
            paramStr += `${key}=${value}&`;
        }
    }
    paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'));

    return paramStr.length > 0 ? `${url}?${paramStr}` : url;
};

export const getQueryParam = (): PlianObj => {
    const search = decodeURI(window.location.search);
    if (search.length === 0) return {};

    const queryURL = search.substring(1);
    const queryList = queryURL.split('&');
    const param: PlianObj = {};

    for (let i = 0; i < queryList.length; i += 1) {
        const [first, second] = queryList[i].split('=');
        param[first] = second;
    }

    return param;
};

type RequestType = 'get' | 'post' | 'put' | 'delete';
type ResType<T> = {
    code: number;
    msg: string | null;
    result: T;
};
type Request = {
    [key in RequestType]: <T>(
        url: string,
        params: Record<string, any>,
        config?: Record<string, any>,
        isProgress?: Boolean
    ) => Promise<ResType<T>>;
} & { [key: string]: Function };
type RecordObj = Record<string, any>;
type ReqPathWrapper = {
    [key in RequestType]: string[];
} & { [key: string]: RecordObj };
type ApiPathWrapper = {
    [key in RequestType]: RecordObj;
} & { [key: string]: RecordObj };

export class GenerateFetch {
    private reqPath: Partial<ApiPathWrapper> = (null as any) as Partial<ApiPathWrapper>;

    private ajax: Partial<Request> = (null as any) as Partial<Request>;

    constructor(apiMap: Partial<ApiPathWrapper>, ajax: Partial<Request>) {
        this.reqPath = this.getReqPath(apiMap);
        this.ajax = ajax;
        this.fetchData = this.fetchData.bind(this);
    }

    private getReqPath(apiMap: Partial<ApiPathWrapper>) {
        const reqPath: Partial<ReqPathWrapper> = {};
        const reqType = Object.keys(apiMap);
        reqType.forEach((type) => {
            reqPath[type] = Object.values(apiMap[type] as {});
        });
        return reqPath;
    }

    public fetchData<T>(
        reqURL: string,
        params: RecordObj,
        config = {},
        isProgress = false
    ): Promise<ResType<T>> {
        for (const [reqMethod, reqURLList] of Object.entries(this.reqPath)) {
            if ((reqURLList as any[]).includes(reqURL)) {
                return (this.ajax as any)[reqMethod](reqURL, params, config, isProgress);
            }
        }
        return Promise.reject();
    }
}
