<template>
  <div class="wrapper">
    <button type="button" @click="getData">收集数据</button>
    <div class="container">
      <div class="item" v-for="(item, index) in form.list" :key="index">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item>
            <el-button typ="primary" @click="add">新增</el-button>
            <el-button type="info" @click="copy(item)">复制</el-button>
            <el-button type="warning" @click="del(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="item.age"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        ruleForm: {
          name: undefined,
          age: undefined
        },
        rules: {},
        form: {
          list: []
        }
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      //进行j深度拷
      this.form.list.push(JSON.parse(JSON.stringify(this.ruleForm)))
    },
    activated() {},
    deactivated() {},
    updated() {},
    destroyed() {},
    methods: {
      add() {
        this.form.list.push(JSON.parse(JSON.stringify(this.ruleForm)))
      },
      copy(item) {
        this.form.list.push(JSON.parse(JSON.stringify(item)))
      },
      del(index) {
        // 只剩下一个的时候禁止j删除
        if(this.form.list.length === 1) return
        this.form.list.splice(index, 1)
      },
      getData() {
        console.log(this.form.list)
      }
    },
    filters: {}
  }

</script>
<style scoped lang="scss">
  .wrapper {
    .container {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .item {
    width: 400px;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
  }

</style>
