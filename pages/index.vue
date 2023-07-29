<template>
    <div class="max-w-[1200px] mx-auto">
        <Head>
            <Title>Biggest Ecommerce Website</Title>
        </Head>
        <!-- Category & Banner -->
        <div class="md:flex md:gap-2">
            <div class="bg-[#f3fee3] px-6 py-3 min-w-[300px] mx-auto hidden md:block">
               <h3 class="text-xl font-semibold">Categories</h3>
              <ul>
                <li class="py-3 border-b" v-for="(hmcat,idx) in homeCategories" :key="idx">
                    <NuxtLink :to="`/category/${hmcat.slug}`">
                        <div class="flex items-center justify-between">
                        <span class="text-sm">{{ hmcat.name }}</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
 
              </ul>
            </div>
            <div class=" flex-1">
               <div class="max-w-[891px]">
                <Slider />
               </div>
            </div>
        </div>

        <div class="ProductSlider my-6">
            <ProductSlider />
        </div>
        <!-- All Products -->
        <div class="allProduct">
            <AllProducts @addToCart="addToCartHandler" />
        </div>
    </div>
</template>

<script setup>


definePageMeta({
    layout:'ecommerce'
})

const homeCategories = useHomeCategories()
const {data:hmCategories, refresh} = await useFetch('/api/frontend/category/category', {method: 'GET'})
homeCategories.value = hmCategories


const addcart = useCarts()
if(process.client){
    addcart.value = JSON.parse(localStorage.getItem('cart')) || []
}
// Add To cart
const addToCartHandler =  async (id) => {
    const {data:cartProduct } = await useFetch(`/api/frontend/product/${id}`, {
        method: 'GET'
    })
    let getCart = []
    getCart = JSON.parse(localStorage.getItem('cart')) || []
    const cartData = {
        id: cartProduct.value.id,
        name: cartProduct.value.name,
        discountPrice: cartProduct.value.discount_price,
        regular_price: cartProduct.value.discount_price,
        quantity: 1,
        total: discountPrice
    }

    const findUnique = getCart.find(item => item.id === cartData.id)
    if(findUnique){
    
        for (let i = 0; i < getCart.length; i++) {
        // Matching specific id session storage data
            if (getCart[i].id === id) {
            // Value set specific matched session storage data
                getCart[i] = {
                    id: id,
                    name: "Partha",
                    quantity: getCart[i].quantity + 1,
                    regular_price: getCart[i].price,
                    total: parseInt(getCart[i].price * (getCart[i].qty + 1)),
                };

                // Value set Session storage
                sessionStorage.setItem("cart", JSON.stringify(getCart));
            }
        }

    }else{
        getCart.push(cartData)
        localStorage.setItem('cart', JSON.stringify(getCart))
        console.log('new product')
    }

   
    


}


</script>

<style lang="scss" scoped>

</style>