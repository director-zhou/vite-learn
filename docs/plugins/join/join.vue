<template>
  <div class="mm" v-if="show">
    <img :src="$withBase('/weixin.jpeg')" alt="">
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route)
  },
  computed: {
    show() {
      return this.$route.path.indexOf('depedency') >=0 
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
