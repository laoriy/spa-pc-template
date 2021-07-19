// 推断出平铺对象
export type NonObjectPropKeys<T> = {
    [K in keyof T]: T[K] extends any[] ? K : T[K] extends object ? never : K;
}[keyof T];

export type NonObjectPicks<T> = Pick<T, NonObjectPropKeys<T>>;

export type ObjectPicks<T> = Pick<T, Exclude<keyof T, NonObjectPropKeys<T>>>;

export type Obj<T> = T extends object ? T : never;

export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends (k: infer I) => void
    ? I
    : never;

export type FlattenObjectKey<T> = {
    default: T extends object
        ? UnionToIntersection<Obj<T[keyof T]>> extends object
            ? NonObjectPicks<T> & FlattenObjectKey<ObjectPicks<T>[keyof ObjectPicks<T>]>
            : T
        : never;
    array: T;
}[T extends any[] ? 'array' : T extends object ? 'default' : never];

export type FlattenObject<T extends object> = NonObjectPicks<T> &
    UnionToIntersection<FlattenObjectKey<ObjectPicks<T>[keyof ObjectPicks<T>]>>;
