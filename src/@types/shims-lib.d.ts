declare type ApiWrapper = {
    get: Record<string, string>;
    post: Record<string, string>;
};

declare type ResType<T> = {
    code: number;
    msg: string | null;
    result: T;
};
