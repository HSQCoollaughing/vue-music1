<template>
  <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in swiperSlides" :key="item.id">
        <a class="item-slider" :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'carrousel',
    props: ['swiperSlides'],
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop : true,
          autoplay:true,
        },
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped >
    .item-slider {
      display: block;
      text-decoration: none;
      width: 100%;
      overflow: hidden;
    }
    .item-slider img {
      vertical-align: middle;
      width: 100%;
      background: #E7E7E7;
    }

</style>
