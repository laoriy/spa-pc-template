<template>
    <div class="box">
        component two：
        <el-button :type="lightSw === 'on' ? 'success' : 'info'">light {{ lightSw }}</el-button>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const lightSw = ref('on');
        return {
            lightSw,
        };
    },
    created() {
        this.emitter.on('lightSwitch', (type) => {
            this.lightSw = type;
        });
    },
    beforeUnmount() {
        this.emitter.off('lightSwitch');
    },
});
</script>
<style lang="less" scoped>
.box {
    border: 1px solid orangered;
    border-radius: 5px;
    padding: 15px;
    width: 400px;
}
</style>
