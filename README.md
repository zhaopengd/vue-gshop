# **day01**

### 静态页面布局

### 动态显示字体图标高亮

1. 类名确定 但是有没有不确定 **动态绑定类名** 路由组件  **$route.path**  数据代理 上面不需要用this

   ```js
   <a href="javascript:;" class="guide_item" :class="{on:$route.path==='/msite'}">//true则添加类名
   ```

**点击时实现路由跳转**

1. 编程式实现跳转  **需要下载 core-js 包**

   - 添加点击事件goTo  参数为路径
   - 定义事件回调 接收路径参数
   - this.$route

   **注：$route 下面的参数为 path query params meta 。 而编程式路由导航 是使用路由的实例router**  

   ```js
   注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push('路径')。
   
   react 中是使用 this.props.history.push('路径')
   ```

### 实现每个组件的静态页面

# day02

### 单独拆分头部组件 （一般组件）

- css样式
- title插值  props 接收
- 左右不分定义成插槽
- 全局注册头部组件
- 替换其他组件中的头部组件 传入title 并应用插槽

**Login组件**

- 静态布局
- 配置路由(routes.js)

**以上配置好所有路由 静态页面 组件 应用插槽抽离Header**

**封装ajax请求函数模块**

- ajax---> 请求拦截器
- index--->请求函数

**请求拦截器**   回调函数接受一个配置函数  并将配置返回

```js
对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
axios.interceptors.request.use(config => {

    return config
})
```

**注 ： 只有post 请求存在参数问题 有可能后台不接受JSON格式   POST请求体参数 用data GET用 地址 ？ 传参  或者用 params传参**

**响应拦截器** 成功的回调接收一个response参数 失败的回调接收 error 统一处理错误

**根据经纬获取位置**

- 定义请求函数

**注 ： 以对象形式发送axios GET请求**

```js
// 方法一
axios.get('/user', {
    params: {
        ID: 12345
    }
})
// 方法二 地址携带参数
axios.get('/user?ID=12345')
```

​     	**以函数形式发送GET请求**

```js
//方法一地址栏携带参数 
export const reqAddress = (longitude, latitude) =>
ajax({
    method: 'GET', // 可省  默认GET
    url: `/position/${longitude},${latitude}` // params 参数
})
// 方法二 
export const reqShops = (longitude, latitude) =>
ajax({
    url: '/shops',
    params:{  // 第二种传递参数方式params     
        longitude,
        latitude
    }
})
```

**以对象形式发送POST请求**

```js
export const reqAddRole = (roleName) => ajax.post('/add', {roleName})
```

**以函数形式**

```js
ajax({ //配置对象  
    method:'post',
    url:BASE+'/login', 
    data:{ 
        username,
        password
    } z 
})
```



**设置默认请求 路径    ajaxi.js 中**

 `axios.defaults.baseURL = 'http://localhost:4000'` 

**配置代理解决请求跨域**

```js
// 2 版本脚手架在 config/index.js 中 proxyTable
// 3 版本脚手架新建 vue.config.中
module.exports = {
    devServer: {
        proxy: 'http://localhost:4000'
    }
}
// 或者
module.exports = {
    devServer: {
        proxy: {
            '/api': {// 以 /api开头  需要在请求地址前面都加 /api
                target: '<url>',// 目标地址
                changeOrigin: true //支持跨域
                pathRewrite: {
                '^/api/old-path': '', // 重写地址 请求时在把 /api 去掉或者改变

            },
        },
    }
}
}
```

# day03

**引入Vuex**

- 创建store 注册 store 、

- mutations中修改状态

  ```js
  // ES2015 风格
  [RECEIVE_ADDRESS](state, address) {
      state.address = address
  },
  ```

- actions中间接修改 发送异步请求 然后 commit

  ```js
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
  ```

- App中分发actions

  ```js
  mounted() {
      this.$store.dispatch('getAddress')
  },
  ```

- Msite中获取数据

  ```js
  computed: {
      ...mapState(['address'])
  },
   // 官网写法
   computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
      ])
  ```

**动态显示Shops页面**

- Msite 中可以分发action  

- Shops中 ...mapState

- 动态显示数据

- 星星抽离组件

- 注册全局组件

- Shops中应用星星组件

- Shops中把评分传给星星组件

- 依据评分动态显示星星

  1. shops将分数和尺寸传入start组件
  2. star根据分数 生成一个 类名数组 通过计算属性 生成星星

  ```js
  computed: {
      starClasses() {
          const { score } = this
          const scoreInteger = Math.floor(score)
          const arr = []  // 注意push的顺序
          for (let i = 0; i < scoreInteger; i++) {
              arr.push('on')
          }
          if (score * 10 - scoreInteger * 10 >= 5) {
              arr.push('half')
          }
          while (arr.length < 5) {
              arr.push('off')
          }
          return arr
      }
  }
  // 遍历数组 绑定类名
  <span class="star-item" v-for="(c, index) in starClasses" :key="index" :class="c"></span>
  ```

**三种方法解决轮播失效问题**

1. watch + nextTick()
2. callback + nextTick() 在分发actions时候传入回调函数 该回调函数在commit之后执行
3. 利用dispatch()返回的promise

   ```js
watch: {
    // 更新状态数据 ==> 立即同步调用监视的回调函数 ==> 异步更新界面
    categorys() {
        // categorys状态数据更新了
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
            // 回调函数在界面更新之后执行
            new Swiper('.swiper-container', {
                loop: true, 
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        })
    }
}, 
   ```

```js
// 分发actions 时候传入callback 在actions中commit之后执行callback
mounted() {
    this.$store.dispatch('getShops')
    this.$store.dispatch('getCategorys', () => {
        //知道categorys变化了
        this.$nextTick(() => {
            new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        })
    })
},
```



```js
async mounted() {
    this.$store.dispatch('getShops')
    await this.$store.dispatch('getCategorys')
    new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        }
    })
},
```



# day04

### **Login组件_前台交互**

1. 2种登录方式的切换

   - 通过模拟数据 loginWay的 布尔值 动态设置类名  on 来控制显示隐藏

2. 手机号验证

   - 表单数据收集

   - 通过计算属性 正则匹配手机号(返回的布尔值) 动态显示类名以及 禁用按钮是否显示

   - 按钮一旦禁用 一切类名以及事件都不会生效

     ```js
     // 电话号码 正确  以及数字 = 0 时候 都是禁用的
     :disabled="!isRightPhone || computeTime >0 "
     ```

     

   - 添加对应类名的文字颜色样式

   - 获取验证码 添加点击事件alert 发送请求------->阻止form表单的默认行为

3. 倒计时

   - 数据驱动视图----->开始准备好  后面只要数据改变了  视图就会改变
   - 设置数据 computeTime button内容插值语法 内部 三元 判断显示内容(>0显示倒计时)
   - 点击或去验证码 将computeTime  设置一个最大值 然后慢慢减少 至0 
   - 一旦到了0, 清除定时器 

4. 密码显示/隐藏切换

   - 设置状态 isShowPwd  动态显示输入框 type 类型  （内部三元  注意是 字符串）
   - 添加点击事件 点击切换  isShowPwd  
   - 三元 动态添加类名 on 或 off 
   - 小圆点 添加类名 right ---> 与isShowPwd  同步
   - 给小圆点添加 过度样式
   - 文本内容 通过三元 判断 isShowPwd  

5. 前台表单验证

   - 应用 vee-validate 插件 读文档 自己解决

### Login组件 前后台交互功能

1. 一次性图形验证码

   - 实现点击图片，重新发送请求

   - 绑定点击事件 点击时重新指定 src属性 
   - 绑定ref ----->为了获取节点
   - 地址需要 ? +time 保证每次不一样，要不然不发送请求

2. 一次性短信验证码

3. 手机号和短信验证码登录

4. 用户名、密码、图形验证码登录

5. 自动登录(token)

