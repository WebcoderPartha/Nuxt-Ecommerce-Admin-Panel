<template>
  <div>
    <div v-for="category in sliderProduct" :key="category.id" class="my-10">


      <div class="text-center py-2 my-2 border border-slate-300 mb-4">
        <h2 class="text-2xl">{{ category.name }}</h2>
      </div>
      <swiper :slidesPerView="4"   :navigation="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }" :breakpoints="{
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
    slidesPerView: 4,
    spaceBetween: 10,
  },
}" :spaceBetween="4" :grabCursor="true" :modules="[SwiperAutoplay,SwiperNavigation]" class="homeSwiper">
        <!-- Product Item -->
        <swiper-slide v-if="category?.product?.length > 0" v-for="(hProduct, idx) in category?.product.slice(0,8)" :key="idx" class="m-2">
          <div class="shadow-md shadow-gray-300 group rounded-md pb-4">
            <div class="relative overflow-hidden">
              <nuxt-img :src="hProduct.image" class="group-hover:scale-110 duration-300" loading="lazy" />
              <span v-if="hProduct.discount !== '0'"
                class="bg-[#79bc62] text-xs w-16 text-center text-white font-semibold absolute px-3 py-1 rounded-sm top-6 left-4">-{{
                  hProduct.discount }}%</span>

              <Icon v-if="hProduct.wishlist?.productId === hProduct.id && authUser?.user?.role === 'customer'"
                @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
                :class="` text-red-700 duration-300 cursor-pointer group-hover:right-4 text-2xl p-1 rounded-full bg-[#79bc62] hover:text-red-600 absolute top-8 -right-16`" />
              <Icon v-else @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
                :class="` text-white duration-300 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-8 -right-16`" />
              <Icon @click="$emit('addToCart', hProduct.id)" name="ri:shopping-basket-fill"
                :class="` text-white duration-500 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-20 -right-16`" />
              <NuxtLink :to="`/product/${hProduct.slug}`"
                class="group-hover:bottom-0 absolute -bottom-10 duration-300 bg-[#79bc62] w-full text-center py-2 text-white font-semibold">
                Product Detail</NuxtLink>
            </div>
            <div class="text-center flex flex-col gap-1 mt-2">
              <h2 class="text-sm font-semibold h-14 text-neutral-500 px-2">{{ hProduct.name.substring(0, 50) + '...' }}
              </h2>
              <div class="flex flex-col gap-2" v-if="hProduct.discount !== '0'">
                <!-- <span class="line-through text-red-600 text-sm">BDT {{ hProduct.regular_price }}</span> BDT {{ hProduct.discount_price }} -->
                <span class="font-extrabold text-neutral-600">BDT {{ hProduct.regular_price }}</span>
                <div class="flex w-36 gap-3 px-1 justify-center mx-auto text-[#00a88a] bg-[#e5fffa]">
                  <Icon class="text-[16px] font-semibold mt-[5px]" name="ph:credit-card-duotone" />
                  <span class=" font-extrabold">BDT {{ hProduct.discount_price }}</span>
                </div>
              </div>

              <p class="text-base font-extrabold text-neutral-600 mt-8" v-else>
                BDT {{ hProduct.regular_price }}
              </p>
            </div>
            <div class="flex gap-1 w-24 mx-auto">
              <span class="text-yellow-400">
                <Icon name="tabler:star-filled" />
              </span>
              <span class="text-yellow-400">
                <Icon name="tabler:star-filled" />
              </span>
              <span class="text-yellow-400">
                <Icon name="tabler:star-filled" />
              </span>
              <span class="text-yellow-400">
                <Icon name="tabler:star-filled" />
              </span>
              <span class="text-yellow-400">
                <Icon name="tabler:star-filled" />
              </span>
            </div>
          </div>
        </swiper-slide>
        <!-- End Product Item -->


      </swiper>

    </div>
  </div>
</template>
<script setup>

const { data: authUser } = useAuth()
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
<style>
.homeSwiper .swiper-button-prev, .homeSwiper .swiper-button-next {
    background: #79bc62 !important;
    width: 30px !important;
    height: 30px !important;
    border-radius: 50% !important;
    color:#fff
}
.homeSwiper .swiper-button-prev:after, .homeSwiper .swiper-button-next:after {
    font-size: small;
}
</style>
