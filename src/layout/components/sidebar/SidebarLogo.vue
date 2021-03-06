<template>
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 v-else class="sidebar-title">{{ title }}</h1>
            </router-link>

            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 class="sidebar-title">{{ title }}</h1>
            </router-link>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StoreLib } from '@/@types/store.d';

export default defineComponent({
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        settings(): StoreLib.SettingsState {
            return this.$store.state.settings;
        },
        title(): string {
            return this.settings.title;
        },
        logo(): string {
            return this.settings.sidebarLogoURL;
        },
    },
});
</script>

<style lang="less">
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: @navbarHeight;
    line-height: @navbarHeight;
    background: #002140;
    padding-left: @menu-left;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            line-height: @navbarHeight;
            font-size: 18px;
            vertical-align: middle;
        }
    }

    &.collapse {
        padding-left: @menu-left / 2;
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>
