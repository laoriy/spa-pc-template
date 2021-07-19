// see: https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js
import { hasOwn } from 'aqara-lib';

export type AjaxType = 'post' | 'put';

export type PlianObj = Record<string, any>;

export type AjaxData =
    | string
    | Blob
    | Document
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>;

interface AjaxOption {
    action?: string;
    type?: AjaxType;
    withCredentials?: boolean;
    headers?: PlianObj;
    data?: AjaxData | PlianObj;
    onSuccess?: (p: any) => void;
    onError?: (p1: any, p2?: string) => void;
    onProgress?: (p: any) => void;
}

const getError = (action: string, type: AjaxType, xhr: XMLHttpRequest) => {
    const msg = `fail to ${type} ${action} ${xhr.status}'`;
    const err: PlianObj = new Error(msg);
    err.status = xhr.status;
    err.method = type;
    err.url = action;
    return err;
};

const getBody = (xhr: XMLHttpRequest) => {
    const text = xhr.responseText || xhr.response;
    if (!text) return text;

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};

export default function request(option: AjaxOption) {
    if (typeof XMLHttpRequest === 'undefined') return false;

    const xhr = new XMLHttpRequest();
    const { action } = option;
    const type = option.type || 'post';

    if (xhr.upload) {
        xhr.upload.onprogress = (e: PlianObj) => {
            if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
            }
            option.onProgress(e);
        };
    }

    xhr.onerror = (e) => {
        option.onError(e);
    };

    xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, type, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr));

        return true;
    };

    xhr.open(type, action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    // set the request header
    const headers = option.headers || {};
    for (const item in headers) {
        if (hasOwn(headers, item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }

    if (option.data) {
        if (Object.prototype.toString.call(option.data) === '[object File]') {
            // file type
            xhr.send(option.data as AjaxData);
        } else {
            // json type
            xhr.send(JSON.stringify(option.data));
        }
    }

    return true;
}
