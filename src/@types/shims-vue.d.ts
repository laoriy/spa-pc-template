/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'js-cookie';

declare module 'path';

// element-ui国际化包
declare module 'element-plus/lib/locale/*';
declare module 'element-plus/lib/locale';

// css module :export变量
declare module '@/assets/css/var.less';

// vue filters
interface Filter {
    (param?: string | number): string | number;
}
declare type Vuefilters = Record<string, Filter>;

// vue directives
interface Directive {
    name: string;
    handler: (...args: any) => void;
}
declare type VueDirectives = Record<string, Directive>;

// vue i18n value
declare type VueI18Value = any[] | { [key: string]: any };
