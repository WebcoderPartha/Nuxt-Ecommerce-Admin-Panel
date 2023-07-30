<template>
   <div>
        <div class="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-12 justify-center items-center py-6">
            <CartLoopProduct :allCart="allCart" @clearCart="clearCartHandler" />
            <CartTotalPrice />
        </div>
   </div>
</template>

<script setup>
useHead({
    title: 'Cart Page'
})
definePageMeta({
    layout:'ecommerce'
})

const allCart = useCarts()
if(process.client){
    allCart.value = JSON.parse(localStorage.getItem('cart')) || []
}

const clearCartHandler = () => {
    localStorage.removeItem('cart')
    allCart.value = []
    
}

</script>

<style lang="scss" scoped>

</style>