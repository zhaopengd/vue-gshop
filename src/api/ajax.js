/* 
axios函数封装

1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)--请求拦截器
4. 如果需要携带token的请求，从state中取出token
    - 没有token 不发请求，直接进入失败的流程
    - 有token ，添加到请求头中：Authorization=token
5. 
*/
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui'
import store from '../store'
import router from '../router'
// 设置所有请求默认路径 后面就不用添加了   你就往8080发请求就行  代理给你转发到4000
axios.defaults.baseURL = 'http://localhost:8080'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断axios请求参数 是否为POST请求 并且data请求体参数存在
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    // 转化为 urlencode形式
    config.data = qs.stringify(data)
  }
  // 如果需要携带token的请求，从state中取出token

  if (config.headers.needToken) {
   // const token = store.state.token
   const token = store.state.user.token
    /*  - 没有token 不发请求，直接进入失败的流程 */
    if (!token) {
      const error = new Error('没有token，不能发送请求')
      error.status = 401 // 401 请求的资源不存在 （token过期）
      throw error
    } else {
      // - 有token ，添加到请求头中：Authorization=token
      config.headers['Authorization'] = token
    }
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 让成功的结果不是response,而是response.data
    return response.data
  },
  error => {
    const { response, status, message } = error
    // 没发请求前失败了（需要token 但是没有token）
    if (!response) {
      if (status === 401) {
        if (router.currentRoute.path !== './login') {
          // 提示
          Toast(message)
          // 跳转到登录页面
          router.replace('/login')
        }
      }
    } else {
      const status = response.status  // 响应状态码
      // 发了请求发现token过期了
      if (status === 401) {
        if (router.currentRoute.path !== './login') {
          Toast(response.data.message)
          //退出登录
          store.dispatch('logout')
          // 跳转到登录页面
          router.replace('/login')
        }
      } else if (status === 404) {
        //请求的资源不存在
        Toast('请求资源不存在')
      } else {
        Toast('请求错误' + message)
      }
    }
    // 统一处理错误
 //   alert('请求异常' + error.message)
    // 中断promise链 pending状态 让外面的请求只处理成功的不处理失败的
    return new Promise(() => {})
  }
)

export default axios
