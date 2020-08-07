<template>
    <div class="http-404">
      <p class="info">
        对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        <br>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
      </p>
   </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
          
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    activated() {},
    deactivated() {},
    updated() {},
    destroyed() {},
    methods: {},
    filters: {}
  }
</script>
<style scoped lang="scss">
.http-404 {
  .info {
    width: 500px;
    margin: 200px auto 0;
    font-size: 20px;
  }
}
</style>