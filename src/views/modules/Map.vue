<template>
  <div class="wrapper">
    <div id="map" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getMapData } from '@/api/echarts'
import resize from './mixins/index'
export default {
  components: {},
  mixins: [resize], // 这个地方进行混入
  props: {},
  data() {
    return {
      chartData: null,
      myChart: null,
      timer: null,
      index: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const vm = this
    this.myChart = echarts.init(document.getElementById('map'))
    this.myChart.showLoading()
    getMapData().then(res => {
      this.myChart.hideLoading()
      this.chartData = res.data
      // 1.registerMap
      echarts.registerMap('hubei', res.data)
      // 2.给每个区随机产生一点数据(悬浮提示显示的就是该数据)
      let data = res.data.features.map(item => {
        return {
          name: item.properties.name,
          value: Math.round(Math.random() * 100)
        }
      })
      // 3.初始图表
      this.myChart.setOption({
        title: {
          text: '湖北省地图',
          x: 'center'
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,1)', //提示标签背景颜色
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: 'GDP',
            type: 'map',
            map: 'hubei',
            data: data,
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: { color: '#c71585' } //省份标签字体颜色
              },
              emphasis: {
                show: true, //对应的鼠标悬浮效果
                textStyle: {
                  color: '#800080',
                  fontSize: 18
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5, //区域边框宽度
                borderColor: '#009fe8', //区域边框颜色
                areaColor: '#ffefd5' //区域颜色
              },
              emphasis: {
                borderWidth: 0.5,
                borderColor: '#4b0082',
                areaColor: '#ffdead'
              }
            }
          }
        ]
      })
    })
    // 4.自动轮播
    this.timer = setInterval(this.autoPlay, 1000)
    // 5.鼠标移入-停止轮播
    this.myChart.on('mouseover', params => {
      clearInterval(this.timer)
      this.myChart.dispatchAction({
        type: 'downplay', // 取消高亮
        seriesIndex: 0
      })
      this.myChart.dispatchAction({
        type: 'highlight', // 高亮
        seriesIndex: 0,
        dataIndex: params.dataIndex // 让当前这个高亮
      })
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: params.dataIndex // 让当前这个显示tooltip
      })
    })
    // 6.鼠标移除-开启轮播
    this.myChart.on('mouseout', params => {
      this.timer = setInterval(this.autoPlay, 1000)
    })
    // 7.resize
    window.addEventListener(
      'resize',
      function() {
        vm.myChart.resize()
      },
      false
    )
  },
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
  methods: {
    autoPlay() {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.index
      })
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.index
      })
      this.index++
      if (this.index === this.chartData.features.length) {
        this.index = 0
      }
    }
  },
  filters: {}
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 100%;
}
</style>