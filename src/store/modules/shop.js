/* 
	管理shop功能模块相关状态数据的vuex模块
  */
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutation-types'

import { reqGoods, reqRatings, reqInfo } from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] //购物车 food数组
}
const mutations = {
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [ADD_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count++
    } else {
      // 给 food 添加一个新的属性 属性名是count 值是1
      // 新添加的属性 不会有数据绑定
      // food.count = 1
      // 为响应式对象添加一个属性  // 属性名是字符串
      Vue.set(food, 'count', 1)

      // 添加到 购物车
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT](state, { food }) {
    if (food.count > 0) {
      food.count--
      // 一单数量减到 0  从购物车移除
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state) {
    // 将所有food的count置为0
    state.cartFoods.forEach(food => (food.count = 0))
    // 清除购物车中所有food
    state.cartFoods = []
  }
}
const actions = {
  // 异步获取商家信息
  async getInfo({ commit }, cb) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })

      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getRatings({ commit }, cb) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })

      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getGoods({ commit }, cb) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      typeof cb === 'function' && cb()
    }
  },

  // 更新food数量的actions
  updateFoodCount({ commit }, { isAdd, food }) {
    console.log(123)

    if (isAdd) {
      commit(ADD_FOOD_COUNT, { food })
    } else {
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
}
const getters = {
  /* 运行效率太低  每次数据改变都要遍历全部 */
  // 基于当前状态数据进行 计算的 都放到这里
  /*   cartFoods(state) { 
    const { goods } = state
    const arr = []
    goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count > 0) {
          arr.push(food)
        }
      })   
    })

    return arr
  } */

  // 总数量
  totalCount(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },

  // 总价格
  totalPrice(state) {
    return state.cartFoods.reduce(
      (pre, food) => pre + food.count * food.price,
      0
    )
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
