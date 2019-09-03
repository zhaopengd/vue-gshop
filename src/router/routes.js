/* 路由配置模块 */
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'

import Goods from '../pages/Shop/Goods/Goods.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
import NotFound from '../pages/NotFound/NotFound.vue'
export default [
  {
    path: '/msite',
    component: MSite, // 组件模块本身 或者 函数(必须返回包含模块的promise)
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: 'ratings',
        component: Ratings
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ],
    meta: {
      isShowFooter: true
    }
  },

  {
    path: '/', // 项目根路径
    redirect: '/msite'
  }
]
