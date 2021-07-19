<template>
    <div class="box">
        component one：
        <el-button @click="changeLight('on')" type="primary">turn on light</el-button>
        <el-button @click="changeLight('off')" type="primary">turn off light</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        changeLight(type: string) {
            this.emitter.emit('lightSwitch', type);
        },
    },
});
</script>
<style lang="less" scoped>
.box {
    border: 1px solid orangered;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    width: 400px;
}
</style>
