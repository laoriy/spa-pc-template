// 自定义指令
import { addClass } from '@/utils/addClass';
import { DirectiveBinding, Directive } from 'vue';

const stopPropagationFn = (event: Event) => {
    event.stopImmediatePropagation();
};

type PlianObj = Record<string, any>;
interface directiveObject {
    name: string;
    handler: Directive;
}

// 按钮权限控制
const buttonOperator = {
    name: 'operator',
    handler: {
        created(el: HTMLElement, binding: DirectiveBinding) {
            const { value, instance } = binding;
            if (!instance?.$store.getters.hasOperator(value)) {
                el.addEventListener('click', stopPropagationFn, true);
            }
        },
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            const { value, instance } = binding;
            if (!instance?.$store.getters.hasOperator(value)) {
                (el as PlianObj).disabled = true;
                addClass(el, 'is-disabled');
            }
        },
        beforeUnmount(el: HTMLElement) {
            el.removeEventListener('click', stopPropagationFn, true);
        },
    },
};

const directiveArr: Array<directiveObject> = [buttonOperator];

export default directiveArr;
