/* 
axios函数封装

1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)--请求拦截器
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/
import axios from 'axios'
import qs from 'qs'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断axios请求参数 是否为POST请求 并且data请求体参数存在
  if (methosd.toUpperCase() === 'POST' && data instanceof Object) {
    // 转化为 urlencode形式
    config.data = qs.stringify(data)
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
    // 统一处理错误
    alert('请求异常' + error.message)
    // 中断promise链 pending状态 让外面的请求只处理成功的不处理失败的
    return new Promise(() => {})
  }
)

export default axios
