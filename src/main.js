import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
