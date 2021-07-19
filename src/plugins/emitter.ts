import mitt, { Emitter } from 'mitt';

type Handler<T = any> = (event?: T) => void;

type EventType = string | symbol;

/**
 * 事件发布订阅
 */
export class Subscribe {
    private emitter: Emitter<any>;

    constructor() {
        this.emitter = mitt();
    }

    /**
     * 订阅事件
     */
    public on<T = any>(type: EventType, handler: Handler<T>) {
        this.emitter.on(type, handler);
    }

    /**
     * 取消订阅事件
     */
    public off<T = any>(type: EventType, handler?: Handler<T>) {
        this.emitter.off(type, handler);
    }

    /**
     * 触发订阅事件
     */
    public emit<T = any>(type: EventType, event?: T) {
        this.emitter.emit(type, event);
    }

    /**
     * 删除所有订阅事件
     * 单例`singletonEmitter`不推荐使用，会清除所有事件
     */
    public clearAll() {
        this.emitter.all.clear();
    }
}

/**
 * 单例事件发布订阅
 */
const singletonEmitter = ((() => {
    let instance: Subscribe;

    return () => {
        if (instance) return instance;

        instance = new Subscribe();
        return instance;
    };
})() as any) as { new (): Subscribe };

export default singletonEmitter;
