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
      myChart: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const vm = this
    this.myChart = echarts.init(document.getElementById('map'))
    getMapData().then(res => {
      echarts.registerMap('hubei', res.data)
      this.myChart.setOption({
        title: {
          text: '湖北省地图',
          x: 'center'
        },
        geo: {
          map: 'hubei'
        }
      })
    })

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
  methods: {},
  filters: {}
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 100%;
}
</style>