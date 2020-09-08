<template>
  <div class="wrapper">
    世界上有三样东西是别人抢不走的
    <br />1.读进大脑里的书
    <br />2.藏进心中的梦想
    <br />3.吃进胃里的食物
    <br />...所以，要做一个有梦想的 、爱读书的吃货
    <hr />
    <canvas id="cvs" width="400px" height="400px"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      canvas: '',
      ctx: '',
      x: '',
      y: '',
      r: 36,
      n: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.canvas = document.getElementById('cvs')
    this.ctx = this.canvas.getContext('2d')
    // 坐标系扩大2倍
    this.ctx.scale(2, 2)
    this.x = 40
    this.y = 40
    // 绘制一个圆
    // this.drawCircle()
    // 绘制一个描边矩形
    // this.drawStrokeRect()
    // 绘制一个填充矩形
    // this.drawFillRect()
    // 使用rect方法绘制矩形
    // this.drawRect()
    this.drawRect2()
  },
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
  methods: {
    drawCircle() {
      // 开始路径
      this.ctx.beginPath()
      this.ctx.lineWidth = 10
      this.ctx.strokeStyle = '#EEF0F5'
      // 绘制一个圆
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      this.ctx.stroke()
      // 闭合路径
      this.ctx.closePath()
    },
    drawText(n) {
      this.ctx.font = '20px Arial'
      this.ctx.fillStyle = '#49f'
      this.ctx.fillText(n.toFixed(0) + '%', this.x - 20, this.y + 10)
    },
    // 绘制描边矩形
    drawStrokeRect() {
      this.ctx.strokeStyle = 'red'
      this.ctx.strokeRect(10, 10, 150, 100)
    },
    // 绘制填充矩形
    drawFillRect() {
      this.ctx.fillStyle = '#1acd7e'
      this.ctx.fillRect(10, 10, 150, 100)
    },
    // 使用rect方法绘制描边矩形
    drawRect() {
      this.ctx.rect(0, 0, 100, 100)
      this.ctx.stroke()
    },
    // 使用rect绘制填充矩形
    drawRect2() {
      this.ctx.rect(0, 0, 100, 100)
      this.ctx.fillStyle = '#1acd7e'
      this.ctx.fill()
    }
  },
  filters: {}
}
</script>
<style scoped>
</style>