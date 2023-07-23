<template>
    <swiper
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
        }"
      :modules="modules"
      class="mySwiper"
      
    >
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
  
    import 'swiper/css/pagination';
  
  
  
    // import required modules
    import { Pagination, Autoplay } from 'swiper/modules';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {
          modules: [Pagination, Autoplay],
        };
      },
    };
  </script>
  