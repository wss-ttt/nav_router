<template>
  <div class="wrapper"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      timer: null,
      notifyPromise: Promise.resolve()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.doNotify()
    this.doNotify2()
    // this.doNotify3()
    // this.doNotify4()
    // this.doNotify5()
  },
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
  methods: {
    doNotify() {
      for (let i = 0; i < 10; i++) {
        this.$notify({
          title: '你的弹窗',
          message: '右下角弹出的消息' + i,
          position: 'bottom-right'
        })
      }
    },
    doNotify2() {
      for (let i = 0; i < 20; i++) {
        this.timer = setTimeout(() => {
          this.$notify({
            title: '你的弹窗',
            duration: 3000,
            message: '右下角弹出的消息' + i,
            position: 'bottom-right'
          })
        }, 300 * i)
      }
    },
    doNotify3() {
      for (let i = 0; i < 20; i++) {
        this.notifyPromise = this.notifyPromise.then(() => {
          this.$notify({
            title: '你的弹窗',
            duration: 3000,
            message: '右下角弹出的消息' + i,
            position: 'bottom-right'
          })
        })
      }
    },
    async doNotify4() {
      for (let i = 0; i < 10; i++) {
        await this.$notify({
          title: '你的弹窗',
          duration: 3000,
          message: '右下角弹出的消息' + i,
          position: 'bottom-right'
        })
      }
    },
    doNotify5() {
      this.$notify({
        title: '你的弹窗',
        duration: 3000,
        message: '右下角弹出的消息',
        position: 'bottom-right'
      })

      this.$nextTick(() => {
        this.$notify({
          title: '你的弹窗',
          duration: 3000,
          message: '右下角弹出的消息',
          position: 'bottom-right'
        })
      })
    }
  },
  filters: {}
}
</script>
<style scoped>
</style>