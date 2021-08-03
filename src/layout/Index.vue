<template>
    <div :class="classObj" class="app-wrapper">
        <div
            v-if="device === 'mobile' && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <sidebar class="sidebar-container"></sidebar>

        <div class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar></navbar>
            </div>
            <breadcrumb :class="{ 'navbar-fixed-header': fixedHeader }"></breadcrumb>
            <app-main></app-main>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/index';
import Breadcrumb from './components/bread-crumb/Index.vue';
import { Navbar, Sidebar, AppMain } from './components';
import useResize from './useFunctions/useResize';

export default defineComponent({
    name: 'Layout',
    setup() {
        const { device, sidebar } = useResize();
        const store = useStore();

        const fixedHeader = computed(() => store.state.settings.fixedHeader);
        const classObj = computed(() => ({
            hideSidebar: !sidebar.value.opened,
            openSidebar: sidebar.value.opened,
            withoutAnimation: sidebar.value.withoutAnimation,
            mobile: device.value === 'mobile',
        }));

        const handleClickOutside = () => {
            store.dispatch('app/closeSideBar', { withoutAnimation: false });
        };
        return {
            classObj,
            fixedHeader,
            device,
            sidebar,
            handleClickOutside,
        };
    },
    components: {
        Navbar,
        Sidebar,
        Breadcrumb,
        AppMain,
    },
});
</script>

<style lang="less" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }

    &:after {
        content: '';
        display: table;
        clear: both;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - @sideBarWidth);
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - @sidebarFoldWidth);
}

.mobile .fixed-header {
    width: 100%;
}

.navbar-fixed-header {
    margin-top: @navbarHeight;
}
</style>
