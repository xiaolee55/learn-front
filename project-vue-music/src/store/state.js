import {playMode} from 'common/js/config'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],   //播放列表
    sequenceList: [],  //顺序/随机播放列表
    mode: playMode.sequence,
    currentIndex: -1  //当前播放的是哪首歌 
}

export default state