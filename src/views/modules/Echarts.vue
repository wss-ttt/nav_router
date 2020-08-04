<template>
  <div class="wrapper">
    <v-chart ref="chart" width="100%" height="100%" />
  </div>
</template>

<script>
  import VChart from '@/components/chart/index'
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
      this.chartData = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
      this.$refs['chart'].initChart(this.chartData)
    },
    activated() {},
    deactivated() {},
    updated() {},
    destroyed() {},
    methods: {},
    filters: {}
  }

</script>
<style scoped lang="scss">
  .wrapper {
    height: 100%;
  }
</style>
