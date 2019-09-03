/* 
包含n个接口请求函数的模块
每个函数返回的都是promise
*/
import ajax from './ajax'

// 1. 根据经纬度获取位置详情 作为函数使用

export const reqAddress = (longitude, latitude) =>
  ajax({
    method: 'GET', // 可省  默认GET
    url: `/position/${latitude},${longitude}` // params 参数
  })

// 2. 获取食品分类 作为对象使用

export const reqCategorys = () =>
  ajax.get('/index_category', {
    headers: {
      needToken: true
    }
  }) //没有参数 所以不写

// 3. 根据经纬度获取商铺列表 作为函数使用

export const reqShops = (
  { longitude, latitude } // 以对象形式传过来
) =>
  ajax({
    url: '/shops',
    params: {
      // 第二种传递参数方式
      longitude,
      latitude
    },
    headers: {
      needToken: true
    }
  })

// 4. 发送短信验证码
export const reqSendCode = phone =>
  ajax({
    method: 'GET',
    url: '/sendcode',
    params: { phone }
  })

// 5. 用户名密码登陆  由于参数多  所以我们就让他用对象传过来
export const reqPwdLogin = ({ name, pwd, captcha }) =>
  ajax({
    method: 'POST',
    url: '/login_pwd',
    data: {
      name,
      pwd,
      captcha
    }
  })

// 6. 手机号/短信登陆
export const reqSmsLogin = (phone, code) =>
  ajax({
    method: 'POST',
    url: '/login_sms',
    data: {
      phone,
      code
    }
  })

// 7. 自动登陆的请求

export const reqAutoLogin = () =>
  ajax({
    url: '/auto_login',
    headers: { needToken: true }
  })

export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')
