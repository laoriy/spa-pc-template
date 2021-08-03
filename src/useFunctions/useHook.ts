import { onMounted } from 'vue';

export default function useHooks() {
    const hello = () => {
        console.log('hello hooks');
    };
    const ok = (): boolean => {
        console.log('hooks ok call!');
        return true;
    };
    onMounted(() => {
        hello();
    });
    return {
        hello,
        ok,
    };
}
