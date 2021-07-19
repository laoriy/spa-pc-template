import { ref, reactive, watch } from 'vue';

export default (step: number = 1, initCount: number = 0) => {
    const count = ref(initCount);
    const object = reactive({ introduce: 'Composition API Use' });

    const addCount = () => {
        count.value += step;
    };
    const reduceCount = () => {
        count.value -= step;
    };
    const setIntroduce = (introduce: string) => {
        object.introduce = introduce;
    };

    watch(count, (curCount, prevCount) => {
        console.log(`self watch ----> old value: ${prevCount} --- new value: ${curCount}`);
    });

    return {
        count,
        object,
        addCount,
        reduceCount,
        setIntroduce,
    };
};
