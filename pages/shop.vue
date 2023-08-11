<template>
    <div class="max-w-[1200px] mx-auto py-1">
        <div class="text-center py-2 my-2 border border-slate-300 mb-4">
            <h2 class="text-2xl">Shop</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0">
            <!-- Product Item -->
            <div class="shadow-md shadow-gray-300 group rounded-md pb-4" v-if="allProduct?.products.length > 0"
        v-for="(hProduct, hinx) in allProduct?.products" :key="hinx">
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
          <h2 class="text-sm font-semibold h-14 text-neutral-500 px-2">{{ hProduct.name.substring(0, 50) + '...' }}</h2>
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
            <!-- End Product Item -->
        </div>

        <!-- Pagination -->
        <div>
          <FrontendPagination :total="total" :per_page="perPage" @paginate="paginateHandler" />
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'ecommerce'
})
useHead({
    title: 'Shop'
})

//=============== Default Value for Take product ==============
const perPage = ref(20)
const skip = ref(0)
const total = ref(0)
//=============== Default Value for Take product =============

//================== Default  Page 1 Data ===================== //
const allProduct = useState(() => [])
const { data: getData } = await useFetch("/api/frontend/shop/getproductpaginate", {
    method: "POST",
    body: {
      take: perPage.value,
      skip: skip.value
    }
})
allProduct.value = getData
total.value = allProduct.value.total

//================== Default  Page 1 Data ===================== //

//============== Pagination Handler ================
const paginateHandler = async (skip) => {
  const { data: pagiData } = await useFetch("/api/frontend/shop/getproductpaginate", {
    method: "POST",
    body: {
      take: perPage.value,
      skip: skip
    }
  })
  allProduct.value = pagiData
}
//============== Pagination Handler ================

</script>

<style lang="scss" scoped></style>