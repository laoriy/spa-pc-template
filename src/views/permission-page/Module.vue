<template>
    <div style="margin: 30px;">
        <h2>元素权限：</h2>
        <div v-if="hasOperator('product-edit')" style="padding: 30px 0;">
            <span>已授权</span>
        </div>
        <div v-else style="padding: 30px 0;">
            <span>尚未授权</span>
            <p>您尚未授权该模块权限，无法查看当前的内容。</p>
        </div>
    </div>
</template>

<script lang="ts">
import { StoreLib } from '@/@types/store.d';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModulePermission',
    computed: {
        hasOperator() {
            return this.$store.getters.hasOperator as StoreLib.HasOperator;
        },
    },
});
</script>
