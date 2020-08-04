<template>
  <div class="wrapper">
    <div class="query">
      <el-form :inline="true" :model="dataForm">
        <el-form-item label="审批人">
          <el-input v-model="dataForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="openDialog">新增</el-button>
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

    <!-- 新增和修改 -->
    <el-dialog :title="title" :visible.sync="open" width="30%">
      <el-form ref="dataForm2" :model="dataForm2" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="dataForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="dataForm2.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="dataForm2.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button type="button" class="btn" @click="cancel">取消</button>
        <button type="button" class="btn" @click="submitForm">确定</button>
      </div>
    </el-dialog>
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
      dataForm2: {}, // 新增和修改
      list: [],
      title: '', // 弹出框的标题
      open: false // 新增和修改弹出框的显示和隐藏
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
      })
        .then(() => {
          // 这里需要return 也就是返回的时要给Promise对象
          return removeUser({ id: id })
        })
        .then(() => {
          this.getList()
          this.$message.success('删除成功')
        })
    },
    handleUpdate() {},
    query() {
      this.getList()
    },
    openDialog() {
      this.open = true
      this.title = '新增'
    },
    cancel() {
      this.open = false
    },
    submitForm() {
      
    }
  },
  filters: {}
}
</script>
<style scoped lang="scss">
</style>