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

        <div class=" my-6">
            <ProductSlider @addToCart="addToCartHandler" @addWishlist="wishlistHandler" />
        </div>
        <!-- All Products -->
        <div class="allProduct">
            <AllProducts @addToCart="addToCartHandler" @addWishlist="wishlistHandler" />
        </div>
      
        
    </div>
</template>

<script setup>


definePageMeta({
    layout:'ecommerce'
})


// ===========Sweet Alert Use =============//
    const { $swal } = useNuxtApp();
    const Toast = $swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", $swal.stopTimer);
            toast.addEventListener("mouseleave", $swal.resumeTimer);
        },
    });
// ===========Sweet Alert Use =============//


const {data:authUser, status} = useAuth()

// Fetch Category
const homeCategories = useHomeCategories()
const {data:hmCategories, refresh} = await useFetch('/api/frontend/category/category', {method: 'GET'})
homeCategories.value = hmCategories
// Fetch Category

// Get Cart data from Local storage with client side
const addcart = useCarts()
if(process.client){
    addcart.value = JSON.parse(localStorage.getItem('cart')) || []
}
// Get Cart data from Local storage with client side


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
        image: cartProduct.value.image,
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
                    image: foundCartItem.image,
                    total: foundCartItem.price * (foundCartItem.quantity + 1)
                }
                localStorage.setItem('cart', JSON.stringify(getCartData));
            }
        }
        addcart.value =  JSON.parse(localStorage.getItem('cart'))
        let price = 0
        addcart.value.forEach(ct => {
            price += parseInt(ct.total)
        })
        localStorage.setItem('subtotal', JSON.stringify(price))

    }else{
        getCartData.push(addData)
        localStorage.setItem('cart', JSON.stringify(getCartData))
        addcart.value = JSON.parse(localStorage.getItem('cart'))
        
        // Cart Subtotal Count
        let price = 0
        addcart.value.forEach(ct => {
            price += parseInt(ct.total)
        })
        localStorage.setItem('subtotal', JSON.stringify(price))
    } 
}

// =============== Add To cart ===============//

// =============== Add Wishlist ============== //
const wishlistHandler = async (product_id) => {

    if(authUser?.value?.user?.role === 'customer' && status.value === "authenticated"){
        const {data:wishdata} = await useFetch('/api/frontend/wishlist/insert', {
            method: 'POST',
            body: {
                product_id: product_id
            }
        })
        Toast.fire({
            icon: "success",
            title: "Added to wishlist",
        });
    }else{
        Toast.fire({
            icon: "warning",
            title: "Please login!",
        });
        navigateTo('/auth/login')
    }
   
}


</script>

<style lang="scss" scoped>

</style>