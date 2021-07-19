import request, { AjaxType, AjaxData, PlianObj } from './xhr';

export default function ajax<T>(
    url: string,
    type: AjaxType,
    data: AjaxData | PlianObj,
    headers: PlianObj = {}
): Promise<T> {
    return new Promise((resolve, reject) => {
        request({
            action: url,
            type,
            data,
            headers,
            onSuccess: (res) => {
                resolve(res);
            },
            onProgress: (e) => {
                resolve(e);
            },
            onError: (err, response) => {
                const errorInfo = { err, response };
                reject(errorInfo);
            },
        });
    });
}
