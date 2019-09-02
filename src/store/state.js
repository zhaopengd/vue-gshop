// 包含 n 个状态属性的对象

export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
  user:{} ,// 当前登录用户对象
  toke:localStorage.getItem('token_key'), // 当前登录用户对应的token（不能设置为空串  要不然上来覆盖了）
}
