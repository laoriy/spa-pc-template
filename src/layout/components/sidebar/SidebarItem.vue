<template>
    <div v-if="!item.hidden">
        <template
            v-if="
                hasOneShowingChild(item, item.children) &&
                    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                    !item.alwaysShow
            "
        >
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                >
                    <i v-if="getIcon(item)" :class="`iconfont menu-icon ${getIcon(item)}`"></i>
                    <template #title v-if="onlyOneChild.meta.title">
                        <span class="title" :class="getIcon(item) ? '' : 'single-txt'">
                            {{ onlyOneChild.meta.title }}
                        </span>
                    </template>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <item-cell
                    v-if="item.meta"
                    :title="item.meta.title"
                    :icon="item.meta && item.meta.icon"
                ></item-cell>
            </template>

            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            ></sidebar-item>
        </el-submenu>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import path from 'path';
import { isExternal } from '@/utils/validate';
import ItemCell from './SidebarItemCell.vue';
import AppLink from './SidebarLink.vue';

type PlianObj = Record<string, any>;

interface Path {
    path: string;
    children?: Path;
}

export default defineComponent({
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object as PropType<Path>,
            required: true,
        },
        isNest: {
            type: Boolean,
            default: false,
        },
        basePath: {
            type: String,
            default: '',
        },
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        // this.onlyOneChild = null;
        return {
            onlyOneChild: (null as any) as PlianObj,
        };
    },
    components: { ItemCell, AppLink },
    methods: {
        getIcon(item: any) {
            return this.onlyOneChild.meta.icon || (item.meta && item.meta.icon);
        },
        hasOneShowingChild(parent: PlianObj, children: any[] = []) {
            const showingChildren = children.filter((item: PlianObj) => {
                if (item.hidden) {
                    return false;
                }
                // Temp set(will be used if only has one showing child)
                this.onlyOneChild = item;
                return true;
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = {
                    ...parent,
                    path: '',
                    noShowingChildren: true,
                };
                return true;
            }

            return false;
        },
        resolvePath(routePath: string) {
            if (isExternal(routePath)) return routePath;
            if (isExternal(this.basePath)) return this.basePath;
            return path.resolve(this.basePath, routePath);
        },
    },
});
</script>
