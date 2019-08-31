/* 
包含n个接口请求函数的模块
每个函数返回的都是promise
*/
import ajax from './ajax'
// 1. 根据经纬度获取位置详情 作为函数使用

export const reqAddress = (longitude, latitude) =>
  ajax({
    method: 'GET', // 可省  默认GET
    url: `/position/${longitude},${latitude}` // params 参数
  })

// 2. 获取食品分类 作为对象使用

export const reqCategorys = ajax.get('/index_category') //没有参数 所以不写

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
    }
  })



console.log(reqAddress(40.10038,116.36867))
