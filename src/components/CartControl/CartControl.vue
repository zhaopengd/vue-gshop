<template>
  <div class="cartcontrol">
    <div
      class="iconfont icon-remove_circle_outline"
      v-if="food.count>0"
      @click="updateFoodCount(false)"
    ></div>
    <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object // 此处props 传过来的是对象  这就是props的缺点，在子组件中可以修改父组件的数据
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
</style>
