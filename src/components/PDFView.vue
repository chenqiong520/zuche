<template>
  <div class="pdf_view">
    <x-header :left-options="{backText: ''}">参保证明</x-header>
    <canvas v-for="page in pages" :id="'the-canvas' + page" :key="page">
    </canvas>
    <div class="download" @click="saveImg">下载</div>
    <a download="cbzm.png" id="save_img"> </a>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import {XHeader} from 'vux'
export default {
  name: 'PDFView',
  components: {XHeader},
  data () {
    return {
      pages: 0,
      pdfDoc: null,
      timeOutEvent: 0
    }
  },
  mounted () {
    this.loadFile('http://218.76.8.53:58080/htds/flexPaper/swf/2018071913334022438270.pdf')
  },
  methods: {
    saveImg () {
      let mycanvas = document.getElementById('the-canvas1')
      let saveImg = document.getElementById('save_img')
      var image = mycanvas.toDataURL('image/png')
      saveImg.href = image
      saveImg.click()
    },
    loadFile (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      })
    },
    renderPage (num) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    }
  }
}
</script>

<style scoped>
  .download {
    position: absolute;
    right: 0;
    top: 50%;
    background: rgba(0, 0, 0, 0.5);
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    width: 50px;
    border-radius: 50%;
  }
</style>
