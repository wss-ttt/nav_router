<template>
  <div class="canvas">
    <canvas :id="'idname'+indexid" width="160" height="160" style="width:80px;height:80px;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      canvas: '',
      context: '',
      cirX: '',
      cirY: '',
      indexid: 2,
      rad: '',
      n: 1,
      speed: 150,
      r: 36,
      dataList: [1, 2, 3],
      percent: '25'
    }
  },
  mounted() {
    this.canvas = document.getElementById('idname2')
    this.context = this.canvas.getContext('2d')
    this.context.scale(2, 2)
    ;(this.cirX = 40), //this.canvas.width/ 2
      (this.cirY = 40), //this.canvas.height/ 2
      (this.rad = (Math.PI * 2) / 100)
    this.DreamLoading()
  },
  created() {},
  methods: {
    //通过后台获取整个列表的长度来绘图
    drawPic() {
      //dataList是后台获取的数据列表
      for (let i = 0; i < this.dataList.length; i++) {
        var idname = 'idname' + index
      }
    },
    //绘制最外层细圈
    writeCircle() {
      this.context.save() //save和restore可以保证样式属性只运用于该段canvas元素
      this.context.beginPath() //开始路径
      this.context.strokeStyle = '#EEF0F5' //设置边线的颜色
      this.context.lineWidth = 5
      this.context.arc(this.cirX, this.cirY, this.r, 0, Math.PI * 2, false) //画一个圆的路径
      this.context.stroke() //绘制边线
      //      this.context.restore();
      this.context.closePath()
    },
    //绘制文本
    writeText(n) {
      this.context.save()
      this.context.font = '20px Arial'
      this.context.fillStyle = '#49f' //字体颜色
      this.context.fillText(n.toFixed(0) + '%', this.cirX - 20, this.cirY + 10) //绘制实心
      //context.strokeStyle = "#49f";
      // context.strokeText(n.toFixed(0)+"%",cirX - 30 ,cirY +10); //绘制空心
      this.context.stroke()
      this.context.restore()
    },
    //绘制蓝色外圈
    writeBlue(n) {
      this.context.save()
      this.context.strokeStyle = '#23B1B4'
      this.context.lineWidth = 7
      this.context.lineCap = 'round'
      this.context.beginPath()
      this.context.arc(
        this.cirX,
        this.cirY,
        this.r,
        -Math.PI / 2,
        -Math.PI / 2 + this.rad * n,
        false
      )
      this.context.stroke()
      this.context.restore()
    },
    DreamLoading() {
      console.log(this.n)
      //清除所有，重新绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.writeCircle()
      this.writeText(this.n)
      this.writeBlue(this.n)
      //      if(this.n < 100 && this.n <= 60){
      if (this.n <= this.percent) {
        this.n = this.n + 0.4
      } else {
        return (this.n = 0)
      }
      // setTimeout(this.DreamLoading,this.speed);
      requestAnimationFrame(this.DreamLoading)
    }
  }
}
</script>