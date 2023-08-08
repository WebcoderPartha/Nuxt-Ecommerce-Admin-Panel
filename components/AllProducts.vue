<template>
  <div class="mb-10">
    <div class="text-center py-2 my-2 border border-slate-300 mb-4">
      <h2 class="text-2xl">All Products</h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0">
      <!-- Product Item -->
      <div class="shadow-md shadow-gray-300 group rounded-md" v-if="allProduct?.length > 0"
        v-for="(hProduct, hinx) in allProduct" :key="hinx">

        <div class="relative overflow-hidden">
          <!-- <img
            class="hover:scale-125 duration-300"
            :src="hProduct.image"
            alt=""
          /> -->
          <nuxt-img :src="hProduct.image" class="group-hover:scale-110 duration-300" loading="lazy" />
          <span v-if="hProduct.discount !== '0'"
            class="bg-[#79bc62] text-xs w-16 text-center text-white font-semibold absolute px-3 py-1 rounded-sm top-6 left-4">-{{
              hProduct.discount }}%</span>
        
          <Icon v-if="hProduct.wishlist?.productId === hProduct.id && authUser?.user?.role === 'customer'"
            @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
            :class="` text-red-700 duration-300 cursor-pointer group-hover:right-4 text-3xl p-1 rounded-full bg-[#79bc62] hover:text-red-600 absolute top-8 -right-16`" />
          <Icon v-else @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
            :class="` text-white duration-300 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-8 -right-16`" />
          <Icon  @click="$emit('addToCart', hProduct.id)" name="ri:shopping-basket-fill"
            :class="` text-white duration-500 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-20 -right-16`" />
            <NuxtLink :to="`/product/${hProduct.slug}`" class="group-hover:bottom-0 absolute -bottom-10 duration-300 bg-[#79bc62] w-full text-center py-2 text-white font-semibold">Product Detail</NuxtLink>
        </div>
        <div class="text-center flex flex-col gap-4 py-2">
          <NuxtLink :to="`/product/${hProduct.slug}`">

            <h2 class="text-sm h-14">{{ hProduct.name.substring(0, 50) + '...' }}</h2>
            <div class="flex flex-col gap-2" v-if="hProduct.discount !== '0'">
              <!-- <span class="line-through text-red-600 text-sm">BDT {{ hProduct.regular_price }}</span> BDT {{ hProduct.discount_price }} -->
              <span class="font-extrabold text-neutral-600">BDT {{ hProduct.regular_price }}</span>
              <div class="flex w-36 gap-3 px-1 justify-center mx-auto text-[#00a88a] bg-[#e5fffa]">
                <Icon class="text-[16px] font-semibold mt-[5px]" name="ph:credit-card-duotone" />
                <span class=" font-extrabold">BDT {{ hProduct.discount_price }}</span>
              </div>
            </div>

            <p class="text-base font-extrabold text-neutral-600" v-else>
              BDT {{ hProduct.regular_price }}
            </p>
          </NuxtLink>
        </div>

<!-- 
        <div class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col">
          <button @click="$emit('addToCart', hProduct.id)"
            class="bg-red-500 text-white md:px-2 py-1 rounded-md mb-3 md:mb-0">
            Add to Cart
          </button>
          <button class="bg-yellow-500 text-white md:px-2 py-1 rounded-md">
            Buy Now
          </button>
        </div> -->
      </div>
      <!-- End Product Item -->

    </div>
  </div>
</template>

<script setup>

const { data: authUser } = useAuth()
// Get All Product
const allProduct = useHomeAllProduct()
// end Get All Product

// Define Add to cart event
const emit = defineEmits(['addToCart', 'addWishlist'])

// Add to wishlist Handler
const wishlistHandler = async (product_id) => {
  emit('addWishlist', product_id)

}
  // Add to wishlist Handler


</script>

<style lang="scss" scoped></style>
