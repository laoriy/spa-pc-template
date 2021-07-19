<script lang="ts">
import { defineComponent } from 'vue';

const { body } = document;
// refer to Bootstrap's responsive design
const WIDTH = 992;

export default defineComponent({
    watch: {
        $route() {
            // @ts-ignore:
            if (this.device === 'mobile' && this.sidebar.opened) {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
            }
        },
    },
    methods: {
        $_isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - 1 < WIDTH;
        },
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile();
                this.$store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

                if (isMobile) {
                    this.$store.dispatch('app/closeSideBar', { withoutAnimation: true });
                }
            }
        },
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler);
    },
    mounted() {
        const isMobile = this.$_isMobile();
        if (isMobile) {
            this.$store.dispatch('app/toggleDevice', 'mobile');
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: true });
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler);
    },
});
</script>
