<template>
    <div class="mb-10 max-w-[1200px] mx-auto">
      <div
        class="text-center py-2 my-2 shadow-md shadow-purple-300 bg-purple-400 mb-4"
      >
        <h2 class="text-2xl">{{ catgoryProduct.name }}</h2>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0"
      >
        <!-- Product Item -->
        <div class="border rounded-md p-1" v-if="catgoryProduct?.products?.length > 0" v-for="(hProduct, hinx) in catgoryProduct?.products" :key="hinx">
          <NuxtLink :to="`/product/${hProduct.slug}`">
            <div class="relative overflow-hidden">
              <!-- <img
                class="hover:scale-125 duration-300"
                :src="hProduct.image"
                alt=""
              /> -->
              <nuxt-img :src="hProduct.image" class="hover:scale-125 duration-300" loading="lazy" />
              <span
                class="bg-blue-400 text-white absolute px-3 py-1 rounded-md top-0 right-0"
                >New</span
              >
            </div>
            <div class="text-center flex flex-col gap-4">
              <h2 class="text-sm">{{ hProduct.name.substring(0,30)+'...' }}</h2>
              <p class="text-base font-extrabold" v-if="hProduct.discount !== '0'">
                <span class="line-through text-red-600 text-sm">BDT {{ hProduct.regular_price }}</span> BDT {{ hProduct.discount_price }} 
              </p>
              <p class="text-base font-extrabold" v-else>
                BDT {{ hProduct.regular_price }} 
              </p>
            </div>
          </NuxtLink>
          <div
            class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col"
          >
            <button @click="addToCartHandler(hProduct.id)"
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

definePageMeta({
    layout:'ecommerce'
})
    const categorySlug = useRoute().params.slug
    const catgoryProduct = useHomeCatProduct()
    const {data:catpt, refresh} = await useFetch('/api/frontend/category/categoryproduct', {
        method: 'POST',
        body: {
            slug: JSON.stringify(categorySlug.toString)
        }
    })
    catgoryProduct.value = catpt
    console.log(catpt)
    useHead({
        title: catgoryProduct.value.name
    })


    const addcart = useCarts()
if(process.client){
    addcart.value = JSON.parse(localStorage.getItem('cart')) || []
}

// =============== Add To cart ===============//
const addToCartHandler =  async (id) => {
    const {data:cartProduct } = await useFetch(`/api/frontend/product/${id}`, {
        method: 'GET'
    })
 
    const addData = {
        id: cartProduct.value.id,
        name: cartProduct.value.name,
        price: (cartProduct.value.discount === '0') ? cartProduct.value.regular_price : cartProduct.value.discount_price,
        quantity: 1,
        total: (cartProduct.value.discount === '0') ? cartProduct.value.regular_price : cartProduct.value.discount_price
    }

    const getCartData = JSON.parse(localStorage.getItem('cart')) || []
    const foundCartItem = getCartData.find(item => item.id === id)

    if(foundCartItem){

        for (let i = 0; i < getCartData.length; i++) {
            if (getCartData[i].id === foundCartItem.id) {
                getCartData[i] = {
                    id: foundCartItem.id,
                    name: foundCartItem.name,
                    price: foundCartItem.price,
                    quantity: foundCartItem.quantity + 1,
                    total: foundCartItem.price * (foundCartItem.quantity + 1)
                }
                localStorage.setItem('cart', JSON.stringify(getCartData));
            }
        }

    }else{
        getCartData.push(addData)
        localStorage.setItem('cart', JSON.stringify(getCartData))
        addcart.value = JSON.parse(localStorage.getItem('cart'))
 
    } 
}

// =============== Add To cart ===============//


</script>

<style lang="scss" scoped>

</style>