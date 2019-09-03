<template>
  <div>
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  },
  components: {
    // 局部注册组件  全局注册组件的话在哪里都可以用
    FooterGuide
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped></style>
