const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const isProEnv = process.env.NODE_ENV === 'production';
// 开发环境通过参数关闭ts报错解决报错导致项目不能运行调试 eg:npm run serve-easy
const isClosetsError = process.env.VUE_APP_CLOSE_TS_ERROR === 'true' && !isProEnv;
const isNeedGzip = true;
const CDN = {
    css: [],
    js: [
        'https://cdn.aqara.com/cdn/common/mainland/static/js/index-3.1.4.js',
        'https://cdn.aqara.com/cdn/common/mainland/static/js/ui-plus-1.0.2-beta.54.js',
        'https://cdn.aqara.com/cdn/common/mainland/static/js/store-4.0.0.js',
        'https://cdn.aqara.com/cdn/common/mainland/static/js/router-4.0.0.js',
        'https://cdn.aqara.com/cdn/common/mainland/static/js/i18n-9.1.6.js',
        'https://cdn.aqara.com/cdn/common/static/axios/0.19.2/axios.min.js',
    ],
    externals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'vue-i18n': 'VueI18n',
        axios: 'axios',
    },
};

// TerserPlugin配置
const terserConfig = new TerserPlugin({
    terserOptions: {
        // 自动删除console.log
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
        },
    },
    parallel: true,
});
// CompressionWebpackPlugin配置
const compressionConfig = new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    // 对超过10k的数据压缩
    threshold: 10240,
    // 压缩率小于这个值的资源才会被处理
    minRatio: 0.8,
    // 不删除源文件
    deleteOriginalAssets: false,
});

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static',
    // 生产环境去除source map构建
    productionSourceMap: false,
    // 编译警告cls
    lintOnSave: !isProEnv,
    configureWebpack: (config) => {
        if (isProEnv) {
            config.externals = CDN.externals;
            config.plugins.push(terserConfig);
        }
        if (isProEnv && isNeedGzip) {
            config.plugins.push(compressionConfig);
        }
    },
    chainWebpack: (config) => {
        // extensions
        config.resolve.extensions
            .clear()
            .merge(['.tsx', '.ts', '.js', '.jsx', '.vue', '.json', '.less', '.scss']);

        // alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('utils', resolve('src/utils'))
            .set('service', resolve('src/service'))
            .set('views', resolve('src/views'));

        // 禁用prefetch
        config.plugins.delete('prefetch');

        // 生产环境禁用fork-ts-checker
        if (isProEnv || isClosetsError) {
            config.plugins.delete('fork-ts-checker');
        }

        // Appends variables to all less files
        // https://github.com/yenshih/style-resources-loader
        config.module
            .rule()
            .test(/\.less$/)
            .use(['style-loader', 'css-loader', 'less-loader'])
            .loader('style-resources-loader')
            .options({
                patterns: resolve('src/assets/css/var.less'),
                injector: 'append',
            })
            .end();

        // Loads files as base64 encoded URL
        config.module
            .rule('images')
            .test(/\.(png|jpg|gif)$/)
            .use('url-loader')
            .loader('url-loader')
            .tap((options) => Object.assign(options, { limit: 10240 }))
            .end();

        // 生产环境注入cdn
        if (isProEnv) {
            config.plugin('html').tap((args) => {
                args[0].cdn = CDN;
                return args;
            });
        }
    },
    // 抽取分离CSS文件
    css: {
        extract: isProEnv,
        sourceMap: true,
    },
    devServer: {
        // host: 'local.aqara.cn',
        // disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://uc-test.aqara.cn/user/center/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};
