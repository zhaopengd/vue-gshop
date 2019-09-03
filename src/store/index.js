/* 
vuex最核心管理对象store
*/
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

// 声明使用vue插件
Vue.use(Vuex)
export default new Store({
  mutations,
  actions,
  getters,

  // 配置应用中所有的功能相关的配置
  modules: {// vuex 多模块变成
    msite: msite, // key 为标识
    user: user,
    shop: shop
  }
})

/* 
vuex管理的总state的结构: 
  {
    msite: {}, // msite {}为子状态数据
    user: {}, // user
    shop: {}, // shop
  }

*/
