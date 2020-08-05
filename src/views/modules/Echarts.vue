<template>
  <div class="wrapper">
    <div class="query">
      年:&nbsp;
      <el-select v-model="date" placeholder="请选择" @change="chagneDate">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <v-chart ref="chart" width="100%" height="100%" />
  </div>
</template>

<script>
import VChart from '@/components/chart/index'
import { getTemperatureData } from '@/api/echarts'
export default {
  components: {
    VChart
  },
  props: {},
  data() {
    return {
      date: '',
      options: [],
      chartData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    for (let i = 2010; i <= 2020; i++) {
      this.options.push(i)
    }

    // 初始化图表
    this.initChart()
  },
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
  methods: {
    initChart() {
      this.$refs['chart'].showLoading()
      getTemperatureData().then(res => {
        this.$refs['chart'].hideLoading()
        this.chartData = {
          title: {
            text: `全国用电量分析图`,
            x: 'center'
          },
          xAxis: {
            name: '月份',
            type: 'category',
            data: res.data.xData
          },
          yAxis: {
            name: '度',
            type: 'value'
          },
          grid: {
            top: '100px'
          },
          series: [
            {
              data: res.data.yData,
              type: 'bar',
              showBackground: true,
              itemStyle: {
                color: '#e6cf4e'
              },
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ]
        }
        this.$refs['chart'].initChart(this.chartData)
      })
    },
    chagneDate() {
      this.initChart()
    }
  },
  filters: {}
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 100%;
  position: relative;
  .query {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 88;
  }
}
</style>
