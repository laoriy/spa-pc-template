import { createI18n } from 'vue-i18n'; // https://vue-i18n.intlify.dev/
// element语言变量
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';

// 项目语言变量
import localeEn from '../locale/lang/en-us';
import localeZh from '../locale/lang/zh-cn';

const messages = {
    en: {
        // el 这个属性很关键，一定要保证有这个属性，
        el: enLocale.el,
        // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        ...localeEn,
    },
    'zh-cn': {
        el: zhLocale.el,
        // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        ...localeZh,
    },
};

const i18n = createI18n({
    locale: 'zh-cn',
    messages,
    fallbackLocale: 'zh-cn',
});

export default i18n;
