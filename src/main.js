import Vue from 'vue'
import { Button } from 'mint-ui'

import './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import loading from './common/img/loading.gif'

Vue.use(VueLazyload, { // 内部自定义了一个全局指令: lazy
  loading
})
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button) // 名字可以写 Button 但是不太好 内部给你定义好了 mt-button
// 提示
Vue.config.productionTip = false

/* new Vue({
  el:'#app',
  components:{
    App
  },
  template:'<App/>'
})
 */
new Vue({
  // el: '#app',
  render: h => h(App),
  router, // 配置路由器
  store
}).$mount('#app')
