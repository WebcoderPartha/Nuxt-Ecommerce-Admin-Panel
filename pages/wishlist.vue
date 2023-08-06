<template>
  <div class="max-w-[1200px] mx-auto">
    <div
      class="text-center py-2 my-2 shadow-md shadow-purple-300 bg-purple-400 mb-4"
    >
      <h2 class="text-2xl">All Products</h2>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0"
    >
      <!-- Product Item -->
        <WishlistProduct :wishlist="getWishlistProduct" />
      <!-- End Product Item -->
    </div>
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

    const getWishlistProduct = useWishlistProduct()
    const {data:wishlistPt} = await useFetch('/api/frontend/wishlist/getallwishlist')
    getWishlistProduct.value = wishlistPt.value
   


</script>

<style lang="scss" scoped></style>
