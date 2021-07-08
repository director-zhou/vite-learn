<template>
  <div class="mm" v-if="show">
    <img :src="$withBase('/weixin.jpeg')" alt="">
  </div>
</template>

<script>
export default {
  created() {
     this.clientWidth = document.documentElement.clientWidth
  },
  data() {
    return {
      clientWidth: 0
    }
  },
  computed: {
    show() {
      return this.$route.path.indexOf('depedency') >=0 && this.clientWidth >= 1300
    }
  }
}
</script>

<style lang="stylus" scoped>
.mm {
  position: fixed;
  top: 80px;
  right: -10px;
  >img {
    width: 200px;
  }
}
</style>
