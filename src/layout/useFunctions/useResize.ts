import { onBeforeMount, onBeforeUnmount, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/index';

const { body } = document;
const WIDTH = 992;

export default function useResize() {
    const route = useRoute();
    const store = useStore();

    const device = computed(() => store.state.app.device);
    const sidebar = computed(() => store.state.app.sidebar);
    const $_isMobile = () => {
        const rect = body.getBoundingClientRect();
        return rect.width - 1 < WIDTH;
    };
    const $_resizeHandler = () => {
        if (!document.hidden) {
            const isMobile = $_isMobile();
            store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

            if (isMobile) {
                store.dispatch('app/closeSideBar', { withoutAnimation: true });
            }
        }
    };

    watch(route, () => {
        if (device.value === 'mobile' && sidebar.value.opened) {
            store.dispatch('app/closeSideBar', { withoutAnimation: false });
        }
    });

    onBeforeMount(() => {
        window.addEventListener('resize', $_resizeHandler);
    });

    onMounted(() => {
        const isMobile = $_isMobile();
        if (isMobile) {
            store.dispatch('app/toggleDevice', 'mobile');
            store.dispatch('app/closeSideBar', { withoutAnimation: true });
        }
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', $_resizeHandler);
    });

    return {
        device,
        sidebar,
    };
}
