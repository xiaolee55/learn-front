<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    props: {
        probeType: {
            type : Number,
            default: 3   //3表示不节流方式
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {     //用以refresh  scroll，防止滚动条不滚动
                type: Array,
                default: null
        },
        listenScroll: {     //是否监听滚动
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout(()=>{
            this._initScroll()
        },20)
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper){
                return 
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })

            if(this.listenScroll){
                let me = this
                this.scroll.on('scroll',(pos) => {      //派发事件，当监听到scroll改变时就触发里面的事件，pos即位置
                    me.$emit('scroll',pos)
                })
            }
        },
        enable() {
            this.scroll&&this.scroll.enable()
        },
        disable() {
            this.scroll&&this.scroll.disable()
        },
        refresh() {
            this.scroll&&this.scroll.refresh()
        },

       scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
       scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
        data () {  
            /*需要传入data参数才能保证scroll组件有效，
            否则组件加载时slot中的数据还未渲染完成，导致DOM没有被撑开，滚动不了*/
            setTimeout(()=>{
                this.refresh()
            },20)
        }
    }
}
</script>