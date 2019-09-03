/* 
包含n个用于间接修改状态数据的方法的对象
*/
import { reqAddress, reqShops, reqCategorys, reqAutoLogin } from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
} from './mutation-types'
export default {
  // 获取当前地址信息
  async getAddress({ commit, state }) {
    // 接收context 下面使用 context.commit
    // 1. 调用接口请求函数
    const { longitude, latitude } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      //2.有了结果 提交mutation
      commit(RECEIVE_ADDRESS, address)
    }
  },

  // 获取当前商品分类
  async getCategorys({ commit }, callback) {
    // 接收context 下面使用 context.commit
    // 1. 调用接口请求函数
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      //2.有了结果 提交mutation
      commit(RECEIVE_CATEGORYS, categorys)
      // 在commit之后执行callback
      typeof callback === 'function' && callback()
    }
  },

  // 获取商家列表
  async getShops({ commit, state }) {
    // 接收context 下面使用 context.commit
    // 1. 调用接口请求函数
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      //2.有了结果 提交mutation
      commit(RECEIVE_SHOPS, shops)
    }
  },

  // 保存user的同步 action、

  saveUser({ commit }, user) {
    // 取出token
    const token = user.token
    // 保存到 localStorage中
    localStorage.setItem('token_key', token)

    // 将token保存到state中
    commit(RECEIVE_TOKEN, { token })
    // 删除user 中的token（可以不删）
    delete user.token

    commit(RECEIVE_USER, { user }) // 有些人喜欢传过去一个对象
  },

  // 退出登录
  logout({ commit }) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },
  // 自动登录
  async autoLogin({ commit, state }) {// state 在大括号里面
    if (state.token) {
      const result = await reqAutoLogin()

      if (result.code === 0) {
        const user = result.data
        commit(RECEIVE_USER, { user })
      }
    }
  }
}
