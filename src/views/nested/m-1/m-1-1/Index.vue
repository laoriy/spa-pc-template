<template>
    <div style="padding:30px;">
        <h3>m-1-1</h3>
        <p>This is part one of Module One！</p>
        <p>
            echarts推荐按需引入
            <a
                href="https://echarts.apache.org/zh/tutorial.html#ECharts%205%20%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97"
            >
                详见echarts5升级指南
            </a>
        </p>
        <canvas id="chart" width="500" height="300"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chart from '@/plugins/chart';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';

export default defineComponent({
    data() {
        return {
            instance: null,
        };
    },
    mounted() {
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                },
            ],
        };
        const dom = document.getElementById('chart');
        this.instance = new Chart({
            dom,
            chartList: [GridComponent, LineChart],
        });
        this.instance.setOption(option);
    },
});
</script>
