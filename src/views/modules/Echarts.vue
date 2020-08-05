<template>
  <div class="wrapper">
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
        chartData: {
        }
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$refs['chart'].showLoading()
      getTemperatureData().then(res => {
        this.$refs['chart'].hideLoading()
        this.chartData = {
          title: {
            text: '全国温度趋势图',
            x: 'center'
          },
          xAxis: {
            name: '月份',
            type: 'category',
            data: res.data.xData
          },
          yAxis: {
            name: '温度(C°)',
            type: 'value'
          },
          series: [{
            data: res.data.yData,
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: '#e6cf4e'
            },
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        }
        this.$refs['chart'].initChart(this.chartData)
      })
    },
    activated() {},
    deactivated() {},
    updated() {},
    destroyed() {},
    methods: {
    },
    filters: {}
  }

</script>
<style scoped lang="scss">
  .wrapper {
    height: 100%;
  }
</style>
