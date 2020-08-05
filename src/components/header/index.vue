<template>
  <header>
    <!--左边-->
    <div class="header-left">
      <!--折叠按钮-->
      <div class="collapse-btn" @click="sidebarFold = !sidebarFold">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">后台管理系统</div>
    </div>
    <!--右边-->
    <div class="header-right">
      <!--全屏按钮-->
      <div class="fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" placement="bottom" :content="fullscreen?'取消全屏':'全屏'">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!--消息中心-->
      <div class="btn-bell">
        <el-tooltip effect="dark" :content="message?`有${message}条未读信息`:`消息中心`">
          <i class="el-icon-bell"></i>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
      </div>
      <!--用户图像-->
      <div class="user-avator">
        <!--<img src="../../assets/img/img.jpg">-->
        <img src="~@/assets/img/img.jpg" />
      </div>
      <!--个人中心-->
      <div class="user-name">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="#">
              <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
            </a>
            <a href="#">
              <el-dropdown-item command="仓库地址">仓库地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken } from '@/utils/auth.js'
export default {
  name: '',
  data() {
    return {
      message: 2, // 消息中心
      fullscreen: false // 控制全屏文字的切换 "全屏"||"取消全屏"
    }
  },
  computed: {
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold
      },
      set(val) {
        this.$store.commit('common/updateSidebarFold', val)
      }
    },
    ...mapState({
      name: state => state.common.name
    })
  },
  created() {
    window.addEventListener('keydown', this.quit)
  },
  beforeDestory() {
    window.removeEventListener('keydown', this.quit)
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    },
    handleFullScreen() {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    signOut() {
      this.$confirm('确定要进行[退出]操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.清除登录用户的信息
        removeToken()
        sessionStorage.removeItem('name')
        this.$store.commit('common/updateName', '')
        // 2.回到登录页面去
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
header {
  height: 50px;
  background-color: #006F69;
  color: #fff;
  font-size: 22px;
  .header-left {
    float: left;
    display: flex;
    align-items: center;
    height: 50px;
    .collapse-btn {
      padding: 0 15px;
    }
    .logo {
    }
  }
  .header-right {
    float: right;
    display: flex;
    align-items: center;
    height: 50px;
    /*全屏*/
    .fullscreen {
    }
    /*消息中心*/
    .btn-bell {
      margin-left: 20px;
      position: relative;
      .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
      }
    }
    /*用户图像*/
    .user-avator {
      margin-left: 20px;
      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    /*个人中心*/
    .user-name {
      margin-left: 20px;
      margin-right: 20px;
      .el-dropdown-link {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>