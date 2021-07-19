<template>
    <div style="padding: 30px;">
        父级页面1
        <el-button type="primary" @click="toUpdate(1)" style="margin-left: 15px;">新增1</el-button>
        <el-button type="primary" @click="toUpdate(2)" style="margin-left: 15px;">编辑1</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        toUpdate(type) {
            const path =
                type === 1 ? '/special-level-2/home1/add1' : '/special-level-2/home1/edit1';
            this.$router.push(path);
        },
    },
};
</script>
