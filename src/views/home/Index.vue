<template>
    <div class="dashboard-container">
        <div class="dashboard-text">欢迎: {{ name }}</div>
        <p class="dashboard-text" style="color: #ff0000;">
            在您开发项目前，请务必读完每个菜单模块介绍！
        </p>
        <div class="block">
            <h4>国际化多语言 ：</h4>
            <div class="picker">
                <el-date-picker v-model="value1" type="date"></el-date-picker>
                {{ $t('welcomeHome') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import MixinDemo from '@/mixin/Demo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    extends: MixinDemo,
    name: 'Dashboard',
    computed: {
        ...mapGetters(['name']),
    },
    data() {
        return {
            value1: '',
        };
    },
    created() {
        this.ok();
    },
});
</script>

<style lang="less" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
.block {
    padding: 15px;
}
.picker {
    padding: 15px 0;
    font-size: 16px;
}
</style>
