<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const progressBarWidth = 16
    export default {
      props: {
        percent: {
          type: Number,
          default: 0
        }
      },
      created() {
        this.touch = {}

      },
      methods: {
        progressTouchStart(e) {
          this.touch.initiated = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e) {
          if(!this.touch.initiated)
            return
          const deltaX = e.touches[0].pageX - this.touch.startX
          //防止拖的距离超出总进度条，所以当超出总进度条时则将长度置为进度条总长度
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBarWidth
          ,Math.max(0,this.touch.left + deltaX))
          this._offset(offsetWidth)
        },
        progressTouchEnd(e) {
          this.touch.initiated = false
          this._triggerPercent()
        },
        progressClick(e) {
          const rect = this.$refs.progressBar.getBoundingClientRect()
          const offsetWidth = e.pageX - rect.left
          this._offset(offsetWidth)
          this._triggerPercent()
        },
        _triggerPercent() {
          const barWidth = this.$refs.progressBar.clientWidth - progressBarWidth
          const percent = this.$refs.progress.clientWidth/barWidth
          this.$emit('percentChange',percent)
        },
        _offset(offsetWidth) {
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
        }
      },
      watch: {
        percent(newPercent) {
          if(newPercent >= 0 && !this.touch.initiated){ //当有歌曲且没有拖动时执行，否则拖动后又会返回
            const barWidth = this.$refs.progressBar.clientWidth - progressBarWidth
            const offsetWidth = newPercent * barWidth
            this._offset(offsetWidth)
          }
        }
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>