<template>
  <div class="max-w-[1200px] mx-auto">
    <div
      class="text-center py-2 my-2 shadow-md shadow-purple-300 bg-purple-400 mb-4"
    >
      <h2 class="text-2xl">All Wishlist Product</h2>
    </div>
    <div v-if="getWishlistProduct?.length > 0"
      class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0"
    >
      <!-- Product Item -->
        <WishlistProduct :wishlist="getWishlistProduct" @rmvWishlist="rmvWishListHandler" />
      <!-- End Product Item -->
    </div>
    <h3 v-else class="text-center my-4">You don't have wishlist product.</h3>
  
  </div>
</template>

<script setup>

    useHead({
    title: "Wishlist",
    });
    definePageMeta({
    layout: "ecommerce",
    });
    const { data: authUser } = useAuth();
    // Authenticate before load
    onBeforeMount(() => {
    if (authUser && authUser?.value?.user?.role !== "customer") {
        navigateTo("/auth/login");
    }
    });
    // Authenticate

    // Wishlist data fetching
    const getWishlistProduct = useWishlistProduct()
    const {data:wishlistPt, refresh:wishRefresh} = await useFetch('/api/frontend/wishlist/getallwishlist')
    getWishlistProduct.value = wishlistPt.value
    // Wishlist data fetching


    // Remove Item
    const rmvWishListHandler = async (product_id) => {
      const {data:rmvSuccess} = await useFetch('/api/frontend/wishlist/removewishlist', {
        method: "DELETE",
        body: {
          product_id: product_id
        }
      })
      const {data:wishlistPt} = await useFetch('/api/frontend/wishlist/getallwishlist')
     getWishlistProduct.value = wishlistPt.value
    }
    // Remove Item
    


</script>

<style lang="scss" scoped></style>
