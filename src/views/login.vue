<template>
  <div class="login-box">
    <div class="login">
      <h2>后台管理系统</h2>
      <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="dataForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!loading" class="login-btn" @click="submitForm('dataForm')">登陆</el-button>
          <el-button v-else class="login-btn" :loading="loading">登陆中</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    login
  } from '@/api/user'
  export default {
    components: {},
    props: {},
    data() {
      return {
        dataForm: {
          name: 'admin',
          password: 'admin'
        },
        rules: {
          name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        },
        loading: false
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            login({
              name: this.dataForm.name,
              password: this.dataForm.password
            }).then(res => {
              if(res.code === 0) {
                this.loading = false
                this.$router.push({
                  path: '/'
                })
                this.$store.commit('common/updateHasLogin', true)
                this.$store.commit('common/updateName', this.dataForm.name)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    filters: {}
  }

</script>
<style scoped lang="scss">
  .login-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      width: 500px;
      border: 1px solid #ccc;
      padding: 30px;
      border-radius: 4px;
      background: #fff;

      h2 {
        text-align: center;
        padding-bottom: 10px;
      }

      .login-btn {
        width: 100%;
        height: 40px;
        background: #1acd7e;
        border: none;
        outline: none;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

</style>
