<template>
   <div>
        <div class="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-12 justify-center items-center py-6">
            <CartLoopProduct :allCart="allCart" @clearCart="clearCartHandler" @removeCart="rmvCartHandler" />
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

const rmvCartHandler = (idx) => {
    const getCarts = JSON.parse(localStorage.getItem('cart'))
    getCarts.splice(idx, 1)
    localStorage.setItem('cart', JSON.stringify(getCarts))
    allCart.value = JSON.parse(localStorage.getItem('cart'))
}

</script>

<style lang="scss" scoped>

</style>