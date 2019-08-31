import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import './api';

// 注册全局组件 
Vue.component('Header',Header)
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
  router // 配置路由器
}).$mount('#app')
