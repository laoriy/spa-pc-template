<template>
    <div class="intro">
        <h1 style="text-align: center;">{{ msg }}</h1>
        <section>
            <h2>一、项目文件结构</h2>
            <pre>
            | -- mock
                | -- index.js dev环境mock数据

            | -- public
                | -- index.html 入口html文件

            | -- src
                | -- assets 静态资源
                    | -- css 样式
                        | -- common 通用样式
                        | -- iconfont icon字体
                        | -- ......   
                        | -- var.less项目样式变量
                    | -- img 图片、icon
                    | -- js 静态js(ts)配置

                | -- components 自定义Vue公共组件

                | -- directives Vue指令
                    | -- index.ts 配置文件

                | -- locale 国际化
                    | -- lang 项目语言变量包(默认中英文)
                        | -- en-US.ts
                        | -- zh-CN.ts
                    | -- index.ts 配置文件

                | -- mixin Vue混入

                | -- permission 权限拦截
                    | -- requestInterceptor.ts 请求拦截
                    | -- routerInterceptor.ts 路由拦截
                    | -- index.ts   

                | -- plugins 功能配置
                    | -- directives.ts 全局指令
                    | -- mittBus.ts mitt事件配置
                    | -- i18n.ts 国际化配置
                    | -- chart.ts 图表库引入，采用按需引入方式
                    | -- index.ts     

                | -- router  Vue-Router配置
                    | -- module 路由模块
                        | -- xxx xxx模块路由
                        | -- xxx.ts 
                        | -- index.ts 自动获取各模块路由
                    | -- index.ts 路由配置文件

                | -- service Http服务
                    | -- api 项目请求接口
                        | -- xxx.ts xxx请求模块对象
                        | -- types.ts 请求模块对象类型推断声明文件
                    | -- utils 请求模块插件
                        | -- ajax.ts 请求封装   
                        | -- ......       

                | -- store Vuex配置
                    | -- module store模块
                    | -- index.ts store配置文件          

                | -- types TS类型声明
                    | -- shims-lib.d.ts 项目插件声明
                    | -- shims-tsx.d.ts Vue使用tsx语法声明
                    | -- shims-vue.d.ts Vue生态插件语法声明
                    | -- vue-prototype.d.ts 项目自定义Vue属性声明

                | -- utils 项目插件
                    | -- ajax 原生ajax请求
                        | -- index.ts
                        | -- xhr.ts
                    | -- base64ToFile.ts base64字符串转文件流
                    | -- deepMerge.ts 深合并对象
                    | -- compare.ts 对象数组排序compare
                    | -- urlToBase64.ts 图片url转base64字符串
                    | -- ......

                | -- views 项目页面
                    | -- xxx页面
                        | -- xxx.vue

                | -- App.vue 视图主入口

                | -- main.ts 项目主入口文件

            | -- tests 项目单元测试文件

            | -- .browserslistrc 项目目标浏览器的范围

            | --  .editorconfig 编译器配置(vscode)

            | --  .env.development 开发环境的环境变量

            | --  .env.test 测试环境的环境变量

            | --  .env.production 生产环境的环境变量

            | --  .eslintignore eslint代码检查忽略

            | --  .eslintrc.js eslint代码检查配置

            | --  .gitignore git提交忽略

            | --  babel.config.js 项目babel转码配置

            | --  jest.config.js 项目单元测试配置

            | --  package.json 项目依赖

            | --  tsconfig.json 项目ts代码编译配置

            | --  vue.config.js 项目webpack配置
      </pre
            >
        </section>

        <section>
            <h2>二、项目规范说明</h2>
            <p style="padding: 15px;">
                <span>如果你还不熟悉相关规范，请猛击：</span>
                <a
                    target="_blank"
                    href="https://confluence.aqara.com/pages/viewpage.action?pageId=22357287"
                >
                    前端规范
                </a>
            </p>
        </section>

        <section>
            <h2>三、其他</h2>
            <section>
                <h3>
                    1、vue-next 组合式api介绍（
                    <a href="#/nested/m-2">栗子</a>
                    ）
                </h3>
                <pre>
            如：xxx.vue页面文件：
            <code>
                ...
                import { computed, watch, onMounted, reactive,reactiveNumber } from 'vue';
                import userCount from './userCount';
                ...
                setup() {
                    const { count, ...restProps } = userCount(2);
                    const reactiveNumber = ref(0);
                    const reactiveObj = reactive({ value: '134' });

                    watch(count, (curCount, prevCount) => {
                        console.log(`use watch ---> old value: ${prevCount} --- new value: ${curCount}`);
                    });

                    const countComputed = computed(() => count.value * count.value);

                    onMounted(() => {
                        console.log('page mounted');
                    });

                    return {
                        count,
                        reactiveObj,
                        reactiveNumber,
                        countComputed,
                        ...restProps,
                    };
                },
                ...
            </code>
            </pre>
                <h3>
                    2、eventBus使用（
                    <a href="#/nested/m-1/m-1-2/m-1-2-2">栗子</a>
                    ）
                </h3>
                <pre>
                
                如：lightSwitch事件绑定和监听：
            <code>
                ...
                // xxx.vue组件监听事件和解绑事件lightSwitch
                ...
                    created() {
                        this.emitter.on('lightSwitch', (type) => {
                            this.lightSw = type;
                        });
                    },
                    beforeUnmount() {
                        this.emitter.off('lightSwitch');
                    },
                ...
                // xxx.vue组件触发lightSwitch
                ...
                    changeLight(type: string) {
                        this.emitter.emit('lightSwitch', type);
                    },
                ...
            </code>
             this 实例上绑定的全局emitter默认是单例模式，如果不想使用该模式，可以单独引入使用
              <code>
                ...
                // xxx.ts 创建一个emitter实例
                ...
                   import { Subscribe } from '@/plugins/emitter'
                   const emitter = new Subscribe()
                   export default emitter;
                ...
            </code>
            </pre>
                <h3>3、国际化使用</h3>
                <pre>
          如：xxx.vue页面文件，{{}}绑定的变量替换为使用当前语言变量，如替换为<code>$t('Home')</code>。
        </pre
                >
                <h3>
                    4、echarts使用,建议使用按需引入(
                    <a href="#/nested/m-1/m-1-1">栗子</a>
                    )
                </h3>
                <pre>
          如：xxx.vue页面文件：
           <code>
              ...
              import Chart from '@/plugins/chart';
              import { GridComponent } from 'echarts/components';
              import { LineChart } from 'echarts/charts';
              ...
              mounted() {
                const option = {
                  xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          data: [820, 932, 901, 934, 1290, 1330, 1320],
                          type: 'line'
                      }
                  ],
                };

                const dom = document.getElementById('chart');
                this.instance = new Chart({
                    dom,
                    chartList: [GridComponent, LineChart],
                });
                this.instance.setOption(option);
            }
            ...
          </code>
        </pre>
                <h3>5、regxp + iview/Element表单验证使用</h3>
                <pre>
          如：xxx.vue页面文件，使用iview/Element表单组件，引入regxp验证对象并配置表单rules属性对象如下：
          <code>
            ...
            &lt;Form :rules="rule"&gt;
            ...
            import { validatePhone } from '@/utils/regxp';
            ...
            data() {
              return {
                rule: {
                  phone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                  ],
                },
              }
            }
            ...
          </code>
        </pre>
                <h3>6、请求模块使用</h3>
                <pre>
          如：xxx.vue页面，引入与之对应的module并调用：
          <code>
            ...
            import { logout } from '@/service/module/access';
            ...
            created() {
              logout().then(
                  (res) => {
                      console.log(res);
                  },
                  (err) => {
                      console.log(err);
                  }
              );
            }
            ...
          </code>
        </pre>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    name: 'introduce',
    data() {
        return {
            msg: '项目介绍',
        };
    },
};
</script>

<style lang="less">
.intro {
    width: 800px;
    margin: 0 auto;
    background-color: #f2f2f2;
}
</style>
