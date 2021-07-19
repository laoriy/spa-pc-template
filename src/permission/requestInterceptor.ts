import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const requestInterceptor = function httpRequestInterceptor() {
    // 环境切换
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

    // Add your code

    // 请求拦截
    axios.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            // Add your code
            console.log(config);
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 响应拦截
    axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            // Add your code
            console.log(error);
            Promise.reject(error);
        }
    );
};

export { requestInterceptor };
