<template>
  <div class="mb-10 max-w-[1200px] mx-auto">
    <div class="text-center py-2 my-2 border border-slate-300 mb-4">
      <h2 class="text-2xl">{{ catgoryProduct.name }}</h2>
    </div>
    <div v-if="catgoryProduct?.length > 0" class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0">
      <!-- Product Item -->
      <div class="shadow-md shadow-gray-300 group rounded-md pb-4"
        v-for="(hProduct, hinx) in catgoryProduct" :key="hinx">
        <div class="relative overflow-hidden">
          <nuxt-img :src="hProduct?.image" class="group-hover:scale-110 duration-300" loading="lazy" />
          <span v-if="hProduct.discount !== '0'"
            class="bg-[#79bc62] text-xs w-16 text-center text-white font-semibold absolute px-3 py-1 rounded-sm top-6 left-4">-{{
              hProduct.discount }}%</span>

          <Icon v-if="hProduct.wishlist?.productId === hProduct.id && authUser?.user?.role === 'customer'"
            @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
            :class="` text-red-700 duration-300 cursor-pointer group-hover:right-4 text-2xl p-1 rounded-full bg-[#79bc62] hover:text-red-600 absolute top-8 -right-16`" />
          <Icon v-else @click="wishlistHandler(hProduct.id)" name="heroicons-solid:heart"
            :class="` text-white duration-300 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-8 -right-16`" />
          <Icon @click="addToCartHandler(hProduct.id)" name="ri:shopping-basket-fill"
            :class="` text-white duration-500 cursor-pointer group-hover:right-4 rounded-full bg-[#79bc62] p-1 text-2xl hover:text-red-600 absolute top-20 -right-16`" />
          <NuxtLink :to="`/product/${hProduct.slug}`"
            class="group-hover:bottom-0 absolute -bottom-10 duration-300 bg-[#79bc62] w-full text-center py-2 text-white font-semibold">
            Product Detail</NuxtLink>
        </div>
        <div class="text-center flex flex-col gap-1 mt-2">
          <h2 class="text-sm hover:text-[#79bc62] font-semibold h-14 text-neutral-500 px-2"><NuxtLink :to="`/product/${hProduct.slug}`">{{ hProduct.name.substring(0, 50) + '...' }}</NuxtLink></h2>
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
    <div class="py-6" v-else>
        <h2 class="text-2xl text-center">No product found!</h2>
    </div>
    <FrontendPagination :per_page="perPage" :total="total" @paginate="paginationHandler" />
  </div>
</template>
  

<script setup>

definePageMeta({
  layout: 'ecommerce'
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

// Category Slug
const categorySlug = useRoute().params.slug

//=============== Default Value for Take product ==============
const perPage = ref(20)
const skip = ref(0)
const total = ref(0)
//=============== Default Value for Take product =============

// Fetching Category Product
// const catgoryProduct = useHomeCatProduct()
const catgoryProduct = useState(() => [])
const { data: catpt } = await useFetch('/api/frontend/category/categoryproduct', {
  method: 'POST',
  body: {
    // slug: JSON.stringify(categorySlug.toString)
    slug: categorySlug,
    skip: skip.value,
    take:perPage.value
  }
})
catgoryProduct.value = catpt.value.products
// Fetching Category Product
total.value = catpt.value.total

// Page title
useHead({
  title: catgoryProduct.value.name
})

//============ Pagination Handler ================//
const paginationHandler = async (skip) => {
  const { data: paginatePt } = await useFetch('/api/frontend/category/categoryproduct', {
  method: 'POST',
  body: {
    // slug: JSON.stringify(categorySlug.toString)
    slug: categorySlug,
    skip: skip,
    take:perPage.value
  }
})
catgoryProduct.value = paginatePt.value.products
}
//============ Pagination Handler ================//


// Getting Cart from local storage
const addcart = useCarts()
if (process.client) {
  addcart.value = JSON.parse(localStorage.getItem('cart')) || []
}

// =============== Start Add To cart ===============//
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
// =============== End Add To cart ===============//

// =============== Start Add Wishlist ============== //
const wishlistHandler = async (product_id) => {

if(authUser?.value?.user?.role === 'customer' && status.value === "authenticated"){

    // Find exist wishlist product
    const {data:existWishList} = await useFetch('/api/frontend/wishlist/getwishlistbyid',{
        method: 'POST',
        body: {
            product_id: product_id
        }
    })

    // Check exist wishlist
    if (existWishList.value) {
        const {data:rmvWishlist} = await useFetch('/api/frontend/wishlist/removewishlist', {
            method: "DELETE", 
            body: {
                product_id: product_id
            }
        })
          // Sweet toast alert 
        Toast.fire({
            icon: "success",
            title: rmvWishlist.value.success
        });

    } else {
        // Added to wishlist
        const {data:wishdata} = await useFetch('/api/frontend/wishlist/insert', {
            method: 'POST',
            body: {
                product_id: product_id
            }
        })
        // Sweet toast alert
        Toast.fire({
            icon: "success",
            title: "Added to wishlist",
        });

    }

}else{
    Toast.fire({
        icon: "warning",
        title: "Please login!",
    });
    navigateTo('/auth/login')
}

}
// =============== End Add Wishlist ============== //



</script>

<style lang="scss" scoped></style>