<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 轮播图 -->
        <div v-if="recommends.length" class="slider-wrappr">
          <slider :swiperSlides="recommends"></slider>
        </div>

        <!-- 歌曲列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img @load="loadImage" width="60" height="60" v-lazy="item.imgUrl" >
              </div>
              <div class="text">
                <h2 class="name" v-html="item.songName"></h2>
                <p class="desc" v-html="item.albumName"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from '../../base/loading/loading'
  import Slider from '../../base/slider/slider'
  import * as recommendApi from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import Scroll from '../../base/scroll/scroll'

  export default {
    data() {
      return {
        recommends: [], // 轮播图
        discList: []    // 推荐歌曲
      }
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      // 获取轮播图
      _getRecommend() {
        recommendApi.getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      },

      // 获取歌曲列表
      _getDiscList() {
        recommendApi.getDiscList().then((res) => {
          let result = JSON.parse(res);
          if(result.retcode === '1') {
            result.songlist.forEach((item) => {
              var image_id = item.id,
                width = 300,
                pic = `http://imgcache.qq.com/music/photo/album_${width}/${image_id%100}/${width}_albumpic_${image_id}_0.jpg`;
              item.imgUrl = pic;
            });
          }

          this.discList = result.songlist;
        })
      },
      loadImage() {
        if(!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      }

    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .swiper-container
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
