<template>
  <div class="wrapper">
    <div class="query">
      <el-form :inline="true" :model="dataForm">
        <el-form-item label="审批人">
          <el-input v-model="dataForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, removeUser } from '@/api/user.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      dataForm: {
        name: ''
      },
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList()
  },
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
  methods: {
    getList() {
      getUserList().then(res => {
        this.list = res.data
      })
    },
    handleDelete(row) {
      const id = row.id
      this.$confirm('是否删除当前数据', '警告', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        // 这里需要return 也就是返回的时要给Promise对象
        return removeUser({id: id})
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      })
    },
    handleUpdate() {}, 
    onSubmit() {
      this.getList()
    }
  },
  filters: {}
}
</script>
<style scoped lang="scss">
</style>