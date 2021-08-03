<template>
    <div class="app-navbar">
        <hamburger
            class="hamburger-container"
            :is-active="sidebar.opened"
            @toggleClick="toggleSideBar"
        />

        <div class="navbar-right">
            <el-dropdown class="navbar-right-avatar">
                <div class="avatar">
                    <el-avatar v-if="avatar" size="small" :src="avatar"></el-avatar>
                    <el-avatar v-else size="small" icon="el-icon-user-solid"></el-avatar>
                    <span style="margin-left: 8px;">{{ name }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <i class="el-icon-coin"></i>
                            <span>个人中心</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="logout">
                            <i class="el-icon-eleme"></i>
                            <span>退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown class="navbar-right-lang">
                <span style="font-size: 28px;">
                    <i class="el-icon-basketball"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-coin" @click.native="toggleLang('zh-cn')">
                            简体中文
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-eleme" @click.native="toggleLang('en')">
                            英文
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StoreLib } from '@/@types/store.d';
import Hamburger from './hamburger/Index.vue';

export default defineComponent({
    name: 'Navbar',
    computed: {
        name(): string {
            return (this.$store.getters as StoreLib.UserState).name;
        },
        sidebar(): StoreLib.Sidebar {
            return (this.$store.getters as StoreLib.AppState).sidebar;
        },
        avatar(): string {
            return (this.$store.getters as StoreLib.UserState).avatar;
        },
    },
    components: {
        Hamburger,
    },
    methods: {
        toggleLang(langType: string) {
            this.$i18n.locale = langType;
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        async logout() {
            await this.$store.dispatch('user/logout');
            this.$router.push('/login');
        },
    },
});
</script>

<style lang="less">
.app-navbar {
    height: @navbarHeight;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);

    .hamburger-container {
        float: left;
        padding: 21px 24px 0 24px;
        height: 100%;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .navbar-right {
        float: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: @navbarHeight;
        padding-right: 20px;

        .navbar-right-avatar,
        .navbar-right-lang {
            margin-left: 20px;
            cursor: pointer;
        }

        .navbar-right-avatar .avatar {
            display: flex;
            align-items: center;
        }
    }
}
</style>
