import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用插件
Vue.use(VueRouter)
// 创建路由器 暴露出器 供入口文件使用
export default new VueRouter({
  mode: 'history',
  // 所有路由
  routes
})
