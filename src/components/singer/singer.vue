<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import ListView from '../../base/listview/listview'
  import Singer from 'common/js/singer'
  import * as singerApi from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer);
      },
      // 获取歌手数据
      _getSingerList() {
        singerApi.getSingerList().then((res) => {
          if(res.code === ERR_OK) {
            this.singers = this._normallizeSinger(res.data.list);
          }
        })
      },

      // 格式化歌手数据
      _normallizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
            // 封装Singer对象
            let singer = new Singer(item.Fsinger_mid, item.Fsinger_name);
            // 封装热门数据
            if (index < HOT_SINGER_LEN) {
              map.hot.items.push(singer);
            }
            const key = item.Findex;
            if(!map[key]){
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(singer)
        })

        // 为了得到有序列表，需要处理map
        let hot = [];
        let ret = [];
        for(let key in map) {
          let val = map[key];
          if(val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if(val.title === HOT_NAME) {
            hot.push(val);
          }
        }

        // 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });

        return hot.concat(ret);
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
