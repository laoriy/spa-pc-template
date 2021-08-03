<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="styles.menuBg"
                :text-color="styles.menuText"
                :unique-opened="false"
                :active-text-color="styles.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in allRoutes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                ></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StyleVar from '@/assets/css/var.less';
import { StoreLib } from '@/@types/store.d';
import Logo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'Siderbar',
    computed: {
        settings(): StoreLib.SettingsState {
            return this.$store.state.settings;
        },
        sidebar(): StoreLib.Sidebar {
            return this.$store.state.app.sidebar;
        },
        allRoutes(): StoreLib.Path[] {
            return this.$store.state.permission.routes;
        },
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo(): any {
            return this.settings.showSidebarLogo;
        },
        styles() {
            return StyleVar;
        },
        isCollapse(): any {
            return !this.sidebar.opened;
        },
    },
    components: { SidebarItem, Logo },
});
</script>
