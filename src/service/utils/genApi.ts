import ajax from './ajax';

export default class GenApiInstance {
    urlObject: ApiWrapper = {
        get: {},
        post: {},
    };

    constructor(urlObj: ApiWrapper) {
        this.urlObject = urlObj;
        this.api = this.api.bind(this);
    }

    api<T>(urlProp: string, params: Record<string, any>, config = {}): Promise<ResType<T>> {
        const { get: urlGet, post: urlPost } = this.urlObject;
        let url = urlGet[urlProp];

        if (url && url.length > 0) {
            return ajax.get<T>(url, params, config);
        }

        url = urlPost[urlProp];
        return ajax.post<T>(url, params, config);
    }

    /**
     * { room_check: 'V1.0/home/check' } => { room_check: 'room_check' }
     * 平铺对象，并且将键值对象转为键键对象
     */
    getFlattenObj(urlObj: ApiWrapper) {
        const obj = urlObj;
        const flattenObj = { ...obj.get, ...obj.post };

        const keys = Object.keys(flattenObj);
        const keysMap = Object.create(null);
        keys.forEach((key) => {
            keysMap[key] = key;
        });

        return keysMap;
    }
}
