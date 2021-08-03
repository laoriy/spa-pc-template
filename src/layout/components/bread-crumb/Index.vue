<template>
    <el-breadcrumb class="app-breadcrumb" :class="{ active: isShowBreadcrumb }" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <template v-if="breadcrumbClickable">
                    <span
                        class="no-redirect"
                        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                        :style="{ color: index == levelList.length - 1 ? activeColor : '' }"
                    >
                        {{ item.meta.title }}
                    </span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </template>
                <span
                    class="no-redirect"
                    v-else
                    :style="{ color: index == levelList.length - 1 ? activeColor : '' }"
                >
                    {{ item.meta.title }}
                </span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { compile } from 'path-to-regexp';
import { StoreLib } from '@/@types/store.d';

interface Breadcrumb {
    name?: string;
    path?: string;
    redirect?: string;
    meta: {
        title?: string;
        showBreadcrumb?: boolean;
        hiddenPage?: boolean;
        onHidden?: boolean;
    };
    parent?: Breadcrumb;
}

export default defineComponent({
    name: 'AppBreadcrumb',
    data() {
        return {
            levelList: [] as Breadcrumb[],
            activeColor: 'rgba(0, 0, 0, 0.65)',
        };
    },
    computed: {
        settings(): StoreLib.SettingsState {
            return this.$store.state.settings;
        },
        breadcrumbClickable(): boolean {
            return this.settings.clickableBreadcrumb;
        },
        isShowBreadcrumb(): boolean {
            return this.levelList.length > 0;
        },
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        },
    },
    methods: {
        getBreadcrumb() {
            // 过滤非 `meta` 及 `meta.title`
            let matched: Breadcrumb[] = (this.$route.matched as Array<Breadcrumb>).filter(
                (item: Breadcrumb) => item.meta && item.meta.title && !item.meta.hiddenPage
            );

            // 是否要固定第一级面包屑为Home
            if (this.settings.isSetHomeBreadcrumb) {
                const [first] = matched;
                if (!this.isHomeRouter(first)) {
                    const homeBreadcrumb: Breadcrumb[] = [{ path: '/', meta: { title: '首页' } }];
                    matched = homeBreadcrumb.concat(matched);
                }
            }

            // 面包屑显示取当前页面路由记录meta.showBreadcrumb字段
            const currPage = matched.slice(-1);
            const [
                {
                    meta: { title = '', showBreadcrumb = true, onHidden = false },
                    parent = {
                        meta: {},
                    },
                },
            ] = currPage.length > 0 ? currPage : [{ meta: {}, parent: { meta: {} } }];

            // 处理当前父路由下子路由有隐藏页面
            if (parent.meta && parent.meta.hiddenPage && onHidden) {
                matched.splice(-1, 0, parent);
            }

            this.levelList = (title && showBreadcrumb ? matched : []) as Breadcrumb[];
        },
        isHomeRouter(route: Breadcrumb) {
            let name = route && route.name;
            if (!name) {
                return false;
            }
            if (typeof name === 'string') {
                name = name.trim();
            }
            return name.toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
        },
        pathCompile(path: string) {
            // 解决面包屑支持path为:id方式
            const { params } = this.$route;
            const toPath = compile(path);
            return toPath(params);
        },
        handleLink(item: Breadcrumb) {
            const { redirect, path = '' } = item;
            if (redirect) {
                this.$router.push(redirect).catch(() => {});
                return;
            }
            this.$router.push(this.pathCompile(path)).catch(() => {});
        },
    },
    created() {
        this.getBreadcrumb();
    },
});
</script>

<style lang="less">
@normalColor: rgba(0, 0, 0, 0.45);

.app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    padding-left: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
    background: #fff;
    transition: padding 0.2s ease-in-out;

    .el-breadcrumb__separator {
        color: @normalColor;
    }

    .no-redirect {
        color: @normalColor;
        cursor: text;
    }

    /* 可点击样式 */
    .el-breadcrumb__item a {
        color: @normalColor;
        font-weight: normal;

        &:hover {
            color: #1890ff;
        }
    }

    &.active {
        padding-top: 15px;
        padding-bottom: 15px;
        transition: padding 0.2s ease-in-out;
    }
}
</style>
