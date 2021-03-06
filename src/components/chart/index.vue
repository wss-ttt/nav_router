<template>
  <div :id="id" class="chart" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import uuidv1 from 'uuid/v1'
import echartsSettings from '@/echarts-settings'
const { loading } = echartsSettings
import resize from './mixins/index' // 也可以用这个文件
export default {
  components: {},
  mixins: [resize], // 这个地方进行混入
  props: {
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      id: '',
      oBox: null, // 保存dom元素
      myChart: null, // 保存echarts实例
      hasData: false // true:说明有数据 false:说明没有数据
    }
  },
  computed: {},
  watch: {},
  created() {
    this.id = uuidv1() // 保证id是唯一的
  },
  mounted() {
    // 1.获取dom元素
    this.oBox = document.getElementById(this.id)
    // 2.实例化echarts
    this.myChart = echarts.init(this.oBox)
  },
  activated() {
  },
  deactivated() {},
  updated() {},
  destroyed() {
    if (!this.myChart) {
      return
    }
    // 1.销毁echarts实例对象
    this.myChart.dispose()
    this.myChart = null
    // 2.移除resize事件(因为这个事件是全局的)
    window.removeEventListener('resize', this.chartResize) 
  },
  methods: {
    initChart(option) {
      // 1.判断myChart实例是否存在,不存在的话重新实例化
      if (!this.myChart) {
        this.myChart = echarts.init(this.oBox)
      }
      // 2.判断是否有数据
      this.hasData = !this.isEmptyObject(option)
      // 3.有数据的情况
      if (this.hasData) {
        // 1.先清空数据
        this.myChart.clear()
        // 2.初始化数 显示图表
        this.myChart.setOption(option)
        // 3.图表自适应
        /* window.addEventListener('resize', () => {
          // 这个代码不严谨，必须还得加一层判断，只有当前页面是激活的，
          // 如果触发了resize事件，才去执行它的回调函数
          // 如果当前页面不是激活的，不执行它的回调函数
          // this.myChart && this.myChart.resize()

          // 所以这个地方还需要this.activatedFlag进行判断一次
          this.activatedFlag && this.myChart && this.myChart.resize()
        }) */

        window.addEventListener('resize', this.chartResize)

        // 注意这个地方不能使用window.onresize进行绑定事件,如果存在多个该图表组件,就只能绑定一个回调函数,
        // 后面的会覆盖掉前面的回调函数
      } else {
        // 4.没有数据的情况
        this.oBox.removeAttribute('_echarts_instance_')
        this.oBox.innerHTML =
          '<div class="no-data" style="text-align:center;font-size:30px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-weight: bold;">暂无数据</div>'
        // 同时 把myChart 置为空对象
        this.myChart = null
      }
    },
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0
    },
    setInit(option) {
      // 1.判断myChart实例是否存在
      this.myChart || (this.myChart = echarts.init(this.oBox))
      this.myChart.clear()
      this.myChart.setOption(option)
      this.myChart.resize()
    },
    showLoading() {
      // 1.判断myChart实例是否存在
      this.myChart || (this.myChart = echarts.init(this.oBox))
      this.myChart.showLoading(loading)
    },
    hideLoading() {
      // 1.判断myChart实例是否存在
      this.myChart || (this.myChart = echarts.init(this.oBox))
      this.myChart.hideLoading()
    },
    // 图表重绘方法
    chartResize() {
      this.activatedFlag && this.myChart && this.myChart.resize()
    }
  },
  filters: {}
}
</script>
<style scoped>
.chart {
  position: relative;
}
</style>
