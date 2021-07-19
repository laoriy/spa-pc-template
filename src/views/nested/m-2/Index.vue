<template>
    <div class="text">
        <h4>m-2:{{ object.introduce }}</h4>

        <h3 style="padding:15px 10px">1.count example:</h3>
        <p style="padding:0 20px 10px">
            count value：{{ count }}，
            <br />
            countComputed value(count * count)：{{ countComputed }}
        </p>
        <div style="padding:0 20px 10px">
            <el-button @click="addCount" type="success">add count</el-button>
            <el-button @click="reduceCount" type="primary">reduce count</el-button>
        </div>

        <h3 style="padding:15px 10px">2.operatorArr example：</h3>
        <div style="padding:15px 10px">
            <el-button type="primary" @click="operatorArr1">
                arr[0].obj.desc = xx
            </el-button>
            <el-button type="primary" @click="operatorArr2">
                arr[1] = xx
            </el-button>
            <el-button type="primary" @click="operatorArr3">
                arr.push
            </el-button>
            <ul style="padding:10px 20px">
                <li>
                    The value of optionsArr[0].obj.desc：
                    <span>{{ optionsArr[0].obj.desc }}</span>
                </li>
                <li>
                    The value of optionsArr[0]：
                    <span>{{ optionsArr[0] }}</span>
                </li>
                <li>
                    optionsArr.length：
                    <span>{{ optionsArr.length }}</span>
                </li>
                <li>
                    The value of optionsArr：
                    <span>{{ optionsArr }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, watch, onMounted, reactive, defineComponent } from 'vue';
import userCount from './userCount';

const optionArr = [{ label: 'options0', value: 0, obj: { desc: 'this is optionsArr.obj.desc' } }];

export default defineComponent({
    setup() {
        const optionsArr = reactive(optionArr);
        const { count, ...restProps } = userCount(2);

        watch(count, (curCount, prevCount) => {
            console.log(`use watch ---> old value: ${prevCount} --- new value: ${curCount}`);
        });

        const countComputed = computed(() => count.value * count.value);

        onMounted(() => {
            console.log('page mounted');
        });

        return {
            count,
            optionsArr,
            countComputed,
            ...restProps,
        };
    },
    mounted() {
        console.log(this);
    },
    methods: {
        operatorArr1() {
            this.optionsArr[0].obj.desc = 'desc changed';
            console.log(this.optionsArr[0]);
        },
        operatorArr2() {
            this.optionsArr[1] = { label: 'options1', value: 1, obj: { desc: '' } };
        },
        operatorArr3() {
            this.optionsArr.push({ label: 'options1', value: 1, obj: { desc: '' } });
        },
    },
});
</script>

<style lang="less" scoped>
.text {
    font-size: 16px;
}
ul li span {
    font-weight: 600;
}
</style>
