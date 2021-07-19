<template>
    <div class="app-error">
        <img class="error-logo" src="../../assets/img/500.png" alt="error" />
        <div class="error-container">
            <div class="error-title">500</div>
            <div class="error-content">抱歉，服务器出错了</div>
            <el-button type="primary" @click="backToHome">
                返回首页
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error500',
    methods: {
        backToHome() {
            this.$router.push('/');
        },
    },
};
</script>
