<template>
    <div style="padding: 30px;">
        父级页面
        <el-button type="primary" @click="toUpdate(1)" style="margin-left: 15px;">新增</el-button>
        <el-button type="primary" @click="toUpdate(2)" style="margin-left: 15px;">编辑</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        toUpdate(type) {
            const path = type === 1 ? '/special-level/add' : '/special-level/edit';
            this.$router.push(path);
        },
    },
};
</script>
