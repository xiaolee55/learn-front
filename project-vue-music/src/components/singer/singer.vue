<template>
    <div class="singer" ref="singer"> 
        <list-view @select="selectSinger" :data="singers"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
    data () {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        selectSinger(singer){   
            this.$router.push({ //点击歌手名称，二级路由跳转到歌手页面
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList(){
            getSingerList().then((res)=>{
                if(res.code === ERR_OK){
                    this.singers=this._normalizeSinger(res.data.list )
                }
            })
        },
        _normalizeSinger(list) {
            let map = {
                //创建热门歌手对象，返回数据的前HOT_SINGER_LEN条就是热门歌手
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item,index) => {
                if(index< HOT_SINGER_LEN) {
                    //将前HOT_SINGER_LEN条数据存入hot属性中，hot属性也是对象
                    map.hot.items.push(new Singer(item.Fsinger_mid,item.Fsinger_name))
                }
                const key = item.Findex
                //如果该字母对应的属性不存在，则创建
                if(!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                //根据键名直接找到map对象中对应的属性，并将其归入该属性下的items中
                map[key].items.push(new Singer(item.Fsinger_mid,item.Fsinger_name))
            })
            //为了得到有序列表，我们需要处理 map
            let hot = []
            let ret = []
            for(let key in map) {
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)) { 
                    ret.push(val)
                } else if(val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    },
    components: {
        ListView
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
