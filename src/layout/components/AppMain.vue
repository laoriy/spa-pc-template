<template>
    <div class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" :key="key" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path;
        },
    },
});
</script>

<style lang="less">
.app-main {
    height: calc(100vh - @navbarHeight - @breadcrumbHeight);
    width: 100%;
    position: relative;
    overflow: auto;
    padding: 20px;
    background: #f4f5f8;
}

.fixed-header + .app-main {
    padding-top: @navbarHeight;
}

/* fix css style bug in open el-dialog */
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
