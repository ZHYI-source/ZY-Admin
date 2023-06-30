import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
    // 配置 baseURL、headers、timeout 等
    // baseURL: '/api',
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前可以进行一些处理，例如设置 token、添加请求头等
        config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMzYTQwM2M5NGU3NjRlNmEyNjc3NDMiLCJ1c2VybmFtZSI6IuiKkuaenOW_q-mAnyIsImVtYWlsIjoiMTg0MDM1NDA5MkBxcS5jb20iLCJpYXQiOjE2ODE3ODE5NDEsImV4cCI6MTY4MjA0MTE0MX0.G-VdL-tUrefOhF56p2ucYAswCTYEYg9N0nq3A2p8OAE';

        return config;
    },
    (error) => {
        return Promise.reject();
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 在接收到响应数据之前可以进行一些处理，例如解析响应数据、错误处理等
        // const data = response.data;
        // console.log(response)

        // 响应数据是有效的 JSON 格式，继续处理
        return Promise.resolve(response.data);
    },
    (error) => {
        // 统一处理错误
        return handleRequestError(error)
    }
);

// 统一处理错误
const handleRequestError = (error) => {
    // 进行错误处理
    if (error.response) {
        // 服务器响应错误
        let status = error.response.status

        // 在这里可以进行错误处理逻辑，例如弹出错误提示、记录错误日志等
        switch (status) {
            case 400:
                // console.error('参数校验失败:', error.response.data.message);
                return Promise.reject(error.response.data.message ?? '参数json解析失败');
            case 401:
                console.error('未授权:', error.response.data.message);
                break
            case 404:
                console.error('接口不存在:', error.response.data.message);
                break
            case 500:
                console.error('服务器内部错误:', error.response.data.message);
                break
            default:
                console.error('服务器响应错误:', error.response.data);
        }

    } else if (error.request) {
        // 请求未收到响应
        console.error('请求未收到响应:', error.request);
        // 在这里可以进行错误处理逻辑，例如弹出错误提示、记录错误日志等
    } else {
        // 请求配置出错
        console.error('请求配置出错:', error.message);
        // 在这里可以进行错误处理逻辑，例如弹出错误提示、记录错误日志等
    }
}

// 封装请求方法
class AxiosService {
    constructor() {
        if (AxiosService.instance) {
            return AxiosService.instance;
        }
        AxiosService.instance = this;
    }

    // GET 请求
    get(url, params = null) {
        return instance.request({
            method: 'get',
            url,
            params,
        });
    }

    // POST 请求
    post(url, data = null, params = null) {
        return instance.request({
            method: 'post',
            url,
            data,
            params,
        });
    }

    // PUT 请求
    put(url, data = null, params = null) {
        return instance.request({
            method: 'put',
            url,
            data,
            params,
        });
    }

    // DELETE 请求
    delete(url, params = null) {
        return instance.request({
            method: 'delete',
            url,
            params,
        });
    }

}

// 创建 AxiosService 实例
const axiosService = new AxiosService();

// 导出实例化后的 AxiosService 对象
export default axiosService;
