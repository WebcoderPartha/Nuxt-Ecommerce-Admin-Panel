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
      :modules="[SwiperAutoplay, SwiperPagination]"
      class="mySwiper"
      
    >
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="/assets/img/banner.jpg" alt=""></swiper-slide>
    </swiper>
  </template>
  <script setup>

  </script>
  