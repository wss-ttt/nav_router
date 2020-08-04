<template>
  <div class="wrapper">
    <div class="query">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="审批人">
          <el-input v-model="queryParams.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="form.age"></el-input>
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
  import {
    getUserList,
    removeUser,
    getUserInfo,
    editUser,
    addUser
  } from '@/api/user.js'
  export default {
    components: {},
    props: {},
    data() {
      return {
        queryParams: { // 查询参数
          name: ''
        },
        form: {}, // 新增和修改
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
            return removeUser({
              id: id
            })
          })
          .then(() => {
            this.getList()
            this.$message.success('删除成功')
          })
      },
      query() {
        this.getList()
      },
      handleAdd() {
        this.open = true
        this.title = '新增'
      },
      async handleUpdate(row) {
        const id = row.id
        const res = await getUserInfo({
          id: id
        })
        this.form = res.data
        this.title = '修改'
        this.open = true
      },
      cancel() {
        this.reset()
        this.open = false
      },
      reset() {
        this.form = {}
        this.$refs['form'].resetFields();
      },
      submitForm() {
        if(this.form.id !== undefined) {
          // 修改操作
          editUser(this.form).then(res => {
            if(res.code === 0) {
              this.getList()
              this.$message.success('修改成功')
              this.open = false
            } else {
              this.$message.error('修改失败,请重试')
              this.open = false
            }
          }).catch(error => {
            this.$message.error('请求异常,请重试')
            this.open = false
          })
        } else {
          // 新增操作
          addUser(this.form).then(res => {
            if(res.code === 0) {
              this.getList()
              this.$message.success('添加成功')
              this.open = false
            } else {
              this.$message.error('添加事变,请重试')
              this.open = false
            }
          }).catch(error => {
            this.$message.error('请求异常,请重试')
            this.open = false
          })
        }
      }
    },
    filters: {}
  }

</script>
<style scoped lang="scss">
</style>
