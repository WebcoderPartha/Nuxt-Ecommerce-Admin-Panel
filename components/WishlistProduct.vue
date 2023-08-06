<template>
  <div
    class="border group rounded-md p-1"
    v-if="wishlist?.length > 0"
    v-for="(hProduct, hinx) in wishlist"
    :key="hinx"
  >
    <div class="relative overflow-hidden">
      <nuxt-img
        :src="hProduct.product.image"
        class="group-hover:scale-125 duration-300"
        loading="lazy"
      />
     
    </div>
    <div class="text-center flex flex-col gap-4">
      <NuxtLink :to="`/product/${hProduct.product.slug}`">
        <h2 class="text-sm">
          {{ hProduct.product.name.substring(0, 30) + "..." }}
        </h2>
        <p class="text-base font-extrabold" v-if="hProduct.product.discount !== '0'">
          <span class="line-through text-red-600 text-sm"
            >BDT {{ hProduct.product.regular_price }}</span
          >
          BDT {{ hProduct.product.discount_price }}
        </p>

        <p class="text-base font-extrabold" v-else>
          BDT {{ hProduct.product.regular_price }}
        </p>
      </NuxtLink>
    </div>

    <div
      class="flex md:items-center md:flex-row md:justify-center mt-4 mb-4 px-3 flex-col"
    >
      <Icon name="ic:baseline-delete" @click="$emit('rmvWishlist', hProduct.product.id)" class="text-red-500 text-2xl cursor-pointer"/>
    </div>
  </div>

</template>

<script setup>
  
  
  const {wishlist} = defineProps(['wishlist'])
  const emit = defineEmits(['rmvWishlist'])
    
</script>

<style lang="scss" scoped></style>
