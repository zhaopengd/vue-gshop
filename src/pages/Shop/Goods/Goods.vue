<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUL">
          <!-- current -->
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="good.name"
            @click="selectItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="right">
        <ul ref="rightUL">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="food in good.foods"
                :key="food.name"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food ref="food" :food="food" />
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import BSscroll from 'better-scroll'
import ShopCart from '../../../components/ShopCart/ShopCart'
import Food from '../../../components/Food/Food'
export default {
  data() {
    return {
      scrollY: 0, // 右侧 上下滑动距离 实时改变
      tops: [0, 5, 8, 12], // 右侧所有分类 li 的top 组成的数组 在列表显示之后统计一次即可
    food:{} // 需要显示的指定food
   }
  },

  mounted() {
    // 如果数据已经有了
    if (this.goods.length > 0) {
      // 解决了 切换 滑动失效问题
      this._initScorll()
      // li数组中 每一项距离最上面的距离
      this._initTops()
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),

    // 当前分类的下标  findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引
    currentIndex() {
      const { scrollY, tops } = this
      // 计算得到新的下标
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      )
      // 先比较 发现不同才保存
      if (index != this.index && this.leftScorll) {
        // eslint-disable-next-line
        this.index = index
        // 如果不同 则让左侧列表 滑动到 index 对应的 li
        const li = this.$refs.leftUL.children[index]
        this.leftScorll.scrollToElement(li, 500)
      }

      return index
    }
  },
  watch: {
    goods() {
      // 数据上来有了 你换别的再回来 他都没调用
      // goods 数据有了
      this.$nextTick(() => {
        // 以防万一
        this._initScorll()
        this._initTops()
      })
    }
  },
  methods: {
    // methods 中常常放时间回调  下划线为了区别
    _initScorll() {
      this.leftScorll = new BSscroll(this.$refs.left, {
        click: true // 分发自定义点击事件
      })
      this.rightScorll = new BSscroll(this.$refs.right, {
        click: true, // 分发自定义点击事件
        // 派发滚动事件
        // probeType: 2  // 触摸 实时分发
        //probeType: 3 //触摸 惯性 实时分发
        probeType: 1 // 触摸  频率低
        // 滑动分为触摸滑动 惯性滑动  编码滑动
      })

      // 给rightScorll 绑定scroll 的监听 --->better-scroll库
      this.rightScorll.on('scroll', ({ x, y }) => {
        console.log(y)
        this.scrollY = Math.abs(y)
      })
      // 由于 probeType: 1 触摸频率低 非实时 所以绑定end
      this.rightScorll.on('scrollEnd', ({ x, y }) => {
        console.log(y)
        this.scrollY = Math.abs(y)
      })
    },
    _initTops() {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.rightUL.children
      // 让一个维数组 去执行真数组的方法
      Array.prototype.forEach.call(lis, li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 更新tops数据状态
      this.tops = tops
      console.log(tops)
    },
    selectItem(index) {
      console.log(123)

      const top = this.tops[index] // 拿出来的都是正值

      // 立即更新scorllY值 (解决延迟问题 )
      this.scrollY = top
      // 让右侧列表滑动到对应位置
      this.rightScorll.scrollTo(0, -top, 500)
    },
    // 显示指定食物
    showFood(food) {
      this.food = food  //  必须更新数据 才会重新渲染组件
      // 显示 food 组件
      this.$refs.food.toggleShow()
    }
  },
  components: {
    ShopCart,
    Food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
