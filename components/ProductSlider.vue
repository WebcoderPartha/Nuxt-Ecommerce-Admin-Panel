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
        <div class="border rounded-md p-1 group">
            <div class="relative overflow-hidden">
              <nuxt-img
                class="hover:scale-125 duration-300"
                :src="product.image" preload/>
                <span
            class="bg-blue-400 group-hover:right-2 text-xs text-white absolute px-3 py-1 rounded-md top-2 duration-200 -right-16"
            >New</span>
            <Icon @click="wishlistHandler(product.id)" name="heroicons-solid:heart"
            :class="`${product?.wishlist && 'text-red-700'} cursor-pointer group-hover:right-4 text-2xl hover:text-red-600 hover:duration-0 text-white absolute top-10 duration-300 -right-16`"
            />
            </div>
            <div class="text-center flex flex-col gap-4">
              <NuxtLink :to="`/product/${product.slug}`">
                <h2 class="text-sm">{{ product.name.substring(0, 30)+'..' }}</h2>
                <p class="text-base font-extrabold" v-if="product.discount !== '0'">
                  <span class="line-through text-red-600 text-sm">BDT {{ product.regular_price }}</span> BDT {{ product.discount_price }} 
                </p>
                <p class="text-base font-extrabold" v-else>
                  BDT {{ product.regular_price }} 
                </p>
              </NuxtLink>
            </div>
          <div
            class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col"
          >
            <button @click="addToCart(product.id)"
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


  // custom Event
  const emit = defineEmits(['addToCart', 'addWishlist'])
  const addToCart = (id) => {
    emit('addToCart', id)
  }

  // Wishlist Handler 
  const wishlistHandler = (product_id) => {
    emit('addWishlist', product_id)
  }
  


</script>
