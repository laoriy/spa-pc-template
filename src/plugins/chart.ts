import * as echarts from 'echarts/core';
import { use, EChartsType } from 'echarts/core';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

type PlianObj = Record<string, any>;
type RendererType = 'canvas' | 'svg';
type ArrayGeneric<T> = T extends Array<infer K> ? K : T;
type ChartsExtension = ArrayGeneric<Parameters<typeof use>[0]>;

interface InitObj {
    dom: HTMLElement;
    theme?: object | string;
    chartList: ChartsExtension[];
    opts?: {
        devicePixelRatio?: number;
        renderer?: RendererType;
        width?: number;
        height?: number;
    };
}

class BaseChart {
    /**
     * 图表实例对象
     */
    public instance: EChartsType;

    constructor(options: InitObj) {
        const { dom, theme, opts, chartList } = options;
        echarts.use([...chartList, CanvasRenderer]);
        this.instance = echarts.init(dom, theme, opts);
    }

    /**
     * 设置图表状态
     * @param option 图表状态对象
     * @param notMerge 是否不跟之前设置的 option 进行合并，默认合并，即false
     */
    public setOption(option: PlianObj, notMerge?: boolean): void {
        this.instance.setOption(option, notMerge);
    }

    /**
     * 改变图表尺寸
     * @param w 宽
     * @param h 高
     */
    public resize(w: number, h: number): void {
        this.instance.resize({ width: w, height: h });
    }

    /**
     * 设置图表事件
     * @param eventType 事件类型
     * @param fn 事件回调
     */
    public setEvent(eventType: string, callback: (params?: PlianObj) => void): void {
        this.instance.on(eventType, callback);
    }

    /**
     * 清除图表
     */
    public clear(): void {
        this.instance.clear();
    }
}

export default BaseChart;
