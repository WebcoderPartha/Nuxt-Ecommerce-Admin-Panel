<template>
   <div>
        <div class="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-12 justify-center items-center py-6">
            <CartLoopProduct :allCart="allCart" @clearCart="clearCartHandler" @removeCart="rmvCartHandler" @cartQtyUpdate="cartQtyUpdateHandler" />
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

const cartPrice = useCartPrice()
// Remove Cart
const rmvCartHandler = (idx) => {
    const getCarts = JSON.parse(localStorage.getItem('cart'))
    getCarts.splice(idx, 1)
    localStorage.setItem('cart', JSON.stringify(getCarts))
    allCart.value = JSON.parse(localStorage.getItem('cart'))

        
    // Cart Subtotal Count
    let price = 0
    allCart.value.forEach(ct => {
    price += parseInt(ct.total)
    })
    localStorage.setItem('subtotal', JSON.stringify(price))
    cartPrice.value = JSON.parse(localStorage.getItem('subtotal'))
}
// End Remove Cart

// Update Qty 
const cartQtyUpdateHandler = (id) => {
    const getCartStorage = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < getCartStorage.length; i++) {
        if (getCartStorage[i].id === id) {
            getCartStorage[i] = {
                id: getCartStorage[i].id,
                name: getCartStorage[i].name,
                quantity: getCartStorage[i].quantity + 1,
                price: getCartStorage[i].price,
                image: getCartStorage[i].image,
                total: getCartStorage[i].price * (getCartStorage[i].quantity + 1)
            }
            localStorage.setItem('cart', JSON.stringify(getCartStorage))
        }
    }
    let price = 0
    getCartStorage.forEach(item => {
        price += parseInt(item.total)
    })
    localStorage.setItem('subtotal', JSON.stringify(price))
    cartPrice.value = JSON.parse(localStorage.getItem('subtotal'))
}



</script>

<style lang="scss" scoped>

</style>