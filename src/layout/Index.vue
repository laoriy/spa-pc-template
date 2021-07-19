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
import { mapState } from 'vuex';
import { StoreLib } from '@/@types/store.d';
import { defineComponent } from 'vue';
import Breadcrumb from './components/bread-crumb/Index.vue';
import { Navbar, Sidebar, AppMain } from './components';
import ResizeMixin from './mixin/ResizeHandler.vue';

export default defineComponent({
    name: 'Layout',
    extends: ResizeMixin,
    computed: {
        ...mapState(['app', 'settings']),
        sidebar(): StoreLib.Sidebar {
            return this.app.sidebar;
        },
        device(): StoreLib.deviceType {
            return this.app.device;
        },
        fixedHeader(): boolean {
            return this.settings.fixedHeader;
        },
        classObj(): object {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile',
            };
        },
    },
    components: {
        Navbar,
        Sidebar,
        Breadcrumb,
        AppMain,
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
        },
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
