<template>
  <div class="mb-10">
    <div
      class="text-center py-2 my-2 border border-slate-300 mb-4"
    >
      <h2 class="text-2xl">All Products</h2>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0"
    >
      <!-- Product Item -->
      <div class="border group rounded-md p-1" v-if="allProduct?.length > 0" v-for="(hProduct, hinx) in allProduct" :key="hinx">
      
        <div class="relative overflow-hidden">
          <!-- <img
            class="hover:scale-125 duration-300"
            :src="hProduct.image"
            alt=""
          /> -->
          <nuxt-img :src="hProduct.image" class="group-hover:scale-125 duration-300" loading="lazy" />
          <span
            class="bg-blue-400 group-hover:right-2 text-xs text-white absolute px-3 py-1 rounded-md top-2 duration-200 -right-16"
            >New</span>
            <!-- <Icon @click="wishlistHandler(hProduct.id)"  name="heroicons-solid:heart"
            :class="`${hProduct.wishlist?.productId === hProduct.id  && 'text-red-700'} cursor-pointer group-hover:right-4 text-2xl hover:text-red-600 hover:duration-0 text-white absolute top-10 duration-300 -right-16`"
            /> -->
            <Icon v-if="hProduct.wishlist?.productId === hProduct.id && authUser?.user?.role === 'customer'" @click="wishlistHandler(hProduct.id)"  name="heroicons-solid:heart"
            :class="` text-red-700 cursor-pointer group-hover:right-4 text-2xl hover:text-red-600 hover:duration-0 absolute top-10 duration-300 -right-16`"
            />
            <Icon v-else @click="wishlistHandler(hProduct.id)"  name="heroicons-solid:heart"
            :class="` text-white cursor-pointer group-hover:right-4 text-2xl hover:text-red-600 hover:duration-0 absolute top-10 duration-300 -right-16`"
            />
        </div>
        <div class="text-center flex flex-col gap-4">
          <NuxtLink :to="`/product/${hProduct.slug}`">
          <h2 class="text-sm">{{ hProduct.name.substring(0,30)+'...' }}</h2>
          <p class="text-base font-extrabold" v-if="hProduct.discount !== '0'">
            <span class="line-through text-red-600 text-sm">BDT {{ hProduct.regular_price }}</span> BDT {{ hProduct.discount_price }} 
          </p>
    
          <p class="text-base font-extrabold" v-else>
            BDT {{ hProduct.regular_price }} 
          </p>
        </NuxtLink>
        </div>
      
   
        <div
          class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col"
        >
          <button @click="$emit('addToCart', hProduct.id)"
            class="bg-red-500 text-white md:px-2 py-1 rounded-md mb-3 md:mb-0"
          >
            Add to Cart
          </button>
          <button class="bg-yellow-500 text-white md:px-2 py-1 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
      <!-- End Product Item -->

    </div>
  </div>
</template>

<script setup>

  const {data:authUser} = useAuth()
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
