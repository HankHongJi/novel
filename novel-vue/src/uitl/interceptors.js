import axios from 'axios'
import { Toast } from 'vant';
import init from '@/service/init'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading(config, true)
    return config;
    
    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        loading(response.config, false)
        return response;
    }, function (error) {
        loading(error.config, false)
        Toast('出错了');
        // 对响应错误做点什么
        return Promise.reject(error);
});

function loading(config, blean){
    if(!config.noLoading){
        blean ? init.loadingCount++ : init.loadingCount--;
    }
}

export default axios