import { shallowMount } from '@vue/test-utils';
import Introduce from '@/views/introduce/Index.vue';

describe('Intro.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Introduce, {
            props: { msg },
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
