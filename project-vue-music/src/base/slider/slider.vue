<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
    data () {
        return {
            dots: [],      //轮播图数量的A点
            currentPageIndex: 0  //表示当前是第几页，用以高亮点
        }
    },
    props: {
        loop: {     //是否循环
            type: Boolean,
            default: true
        },
        autoPlay: { //是否自动播放
            type: Boolean,
            default: true
        },
        interval: { //切换间隔时间
            type: Number,
            default: 4000
        }
    },
    mounted () {
        //网页刷新一般是17ms，加setTimeout是为了保证DOM已经渲染
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()

            if(this.autoPlay) {
                this._play()
            }
        }, 20)
        
        //如果屏幕大小发生变化，则宽度需要重新设置
        window.addEventListener('resize', () => {
            if(!this.slider) {
                return 
            }
            this._setSliderWidth(true)
            //不刷新会导致拖动失效，因为此时的slider对象的宽高等数据没有更新 
            //但是不能从电脑端到手机端的转换，转换依旧是有问题的。
            this.slider.refresh()
        }) 
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    methods: {
        _setSliderWidth(isResize){
            //获取需要轮播的列表的所有元素
            this.children = this.$refs.sliderGroup.children
            
            let width = 0
            //获取slier父容器的宽度
            let sliderWidth = this.$refs.slider.clientWidth

            for(let i=0;i<this.children.length;i++) {
                let child = this.children[i]
                // 给每个子元素添加规定的样式
                addClass(child,'slider-item')
                //设置每个子元素的宽度和父容器的原始宽度一样，因为宽度是根据父元素动态变化，所以不能直接DOM操作
                child.style.width = sliderWidth + 'px'
                //计算sliderGroup的总宽度，即n个子元素之和
                width += sliderWidth
            }
            if(this.loop&&!isResize) {
                /*如果有循环就要在首元素a和末尾元素b分别克隆b1和a1，然后切换时视觉上就能达成无缝，切换结束再把元素置为真正的a/b
                ，为了达成无缝切换，即宽度增加2个sliderWidth*/
                width += 2*sliderWidth
            }
            this.$refs.sliderGroup.style.width = width +'px'
        },
        _initDots(){
            this.dots = new Array(this.children.length)
        },
        _initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
                scrollX:true,
                scrollY:false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: 0.3,  //滑动到下一张图的百分之多少时才切换图片
                    speed: 400
                }
            })

            //滑动结束后触发的事件
            this.slider.on('scrollEnd',() => {
                let pageIndex = this.slider.getCurrentPage().pageX
                 this.currentPageIndex = pageIndex

                if(this.autoPlay){
                    clearTimeout(this.timer) 
                    this._play()
                }
            })
        },
        _play(){        //自动播放
            let pageIndex = this.currentPageIndex + 1

            this.timer = setTimeout(()=>{
                this.slider.next()
            },this.interval)
        }
    },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>