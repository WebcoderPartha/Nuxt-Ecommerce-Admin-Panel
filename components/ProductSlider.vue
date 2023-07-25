<template>
  <div>
    <div
      class="text-center py-2 my-2 shadow-md shadow-purple-300 bg-purple-400 mb-4"
    >
      <h2 class="text-2xl text-white font-semibold">Featuer Products</h2>
    </div>
    <swiper
      :slidesPerView="4"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '320': {
          slidesPerView: 1,
          spaceBetween: 4,
        },
        '640': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }"
      :spaceBetween="4"
      :grabCursor="true"
      :modules="[SwiperAutoplay]"
      class="mySwiper"
    >
      <!-- Product Item -->
      <swiper-slide v-if="sliderProduct?.length > 0" v-for="(product, idx) in sliderProduct" :key="idx">
        <div class="border rounded-md p-1">
          <div class="relative overflow-hidden">
            <nuxt-img
              class="hover:scale-125 duration-300"
              :src="product.image" preload/>
            <span
              class="bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0"
              >New</span
            >
          </div>
          <div class="text-center">
            <h2 class="text-xl">Product Name</h2>
            <p class="text-base">
              <span class="line-through text-red-600 text-sm">$246</span> $246
            </p>
          </div>
          <div
            class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col"
          >
            <button
              class="bg-red-500 text-white md:px-2 py-1 rounded-md mb-3 md:mb-0"
            >
              Add to Cart
            </button>
            <button class="bg-yellow-500 text-white md:px-2 py-1 rounded-md">
              Buy Now
            </button>
          </div>
        </div>
      </swiper-slide>
        <!-- End Product Item -->

      
    </swiper>
    <!-- {{ ok }} -->
  </div>
</template>
<script setup>
  const sliderProduct = useHomeSliderProduct()
  const {data:sliderPt} = await useFetch('/api/frontend/home/sliderproduct', {method: 'GET'})
  sliderProduct.value = sliderPt 

</script>
