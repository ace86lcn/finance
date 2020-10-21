import axios from 'axios'
import QS from 'qs'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'

// 请求域名
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// 请求超时时间
axios.defaults.timeout = 15000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;        
        token && (config.headers[store.state.tokenName] = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    })

// 响应拦截器
axios.interceptors.response.use(    
    response => {  
        if(response.data.status === 100001) {
            Message({
                showClose: true,
                message: '请先登录',
                type: 'error'
            })
            store.commit('changeToken', '')    
            router.push('/login')
            return false
        }  
        // 请求错误，参数错误或不完整
        if(response.data.status === 100002) {
            Message({
                showClose: true,
                message: response.data.message,
                type: 'error'
            })
            return false
        }  
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {        
        if (error.response.status) {       
            switch (error.response.status) {               
                // 404请求不存在                
                case 404:             
                    Message({
                        showClose: true,
                        message: '网络请求不存在',
                        type: 'error'
                    })                         
                break;                
                case 500:        
                    Message({
                        showClose: true,
                        message: error.response.data.message ? error.response.data.message : '服务端错误',
                        type: 'error'
                    })                         
                break;               
                // 其他错误，直接抛出错误提示                
                default:                    
                    Message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    })          
            }            
            return Promise.reject(error.response);        
        }       
    }
);

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// 请求，并对请求方法进行判断
export default function request(api, params = {}, allData) {
    if(api.methods == 'post') {
        return new Promise((resolve, reject) => {         
            // axios.post(api.url, QS.stringify(params))    
            axios.post(api.url, params)       
            .then(res => {           
                if(!res.data.success) {
                    Message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })  
                } else {
                    resolve(res.data.data);    
                }
            })        
            .catch(err => {            
                reject(err.data)        
            })    
        });
    } else if(api.methods == 'get') {
        // 对传参处理，去除空参，视情况看是否需要
        // let postParams = {}
        // for(var i in params) {
        //     if(params[i]) {
        //         postParams[i] = params[i]
        //     }
        // }
        
        return new Promise((resolve, reject) =>{        
            axios.get(api.url, {            
                params: params        
            })        
            .then(res => {
                if(allData) {
                    resolve(res.data)
                    return false
                }     
                if(!res.data.success) {
                    Message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })  
                } else {
                    resolve(res.data.data);
                }      
            })        
            .catch(err => {         
                reject(err.data)    
            })    
        });
    }
}
