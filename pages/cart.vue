<template>
   <div>
        <div class="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-12 justify-center items-center py-6">
            <CartLoopProduct :allCart="allCart" @clearCart="clearCartHandler" @removeCart="rmvCartHandler" @cartQtyUpdate="cartQtyUpdateHandler" @cartQtyReduce="cartQtyReduceHandler" />
            <CartTotalPrice @checkOut="checkOutHandler" />
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
    allCart.value = JSON.parse(localStorage.getItem('cart'))
}
// End Update Qty 

// Cart Qty Reduce Handler 
const cartQtyReduceHandler = (id) => {
    const getCartStorage = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < getCartStorage.length; i++) {
        if (getCartStorage[i].id === id) {
            getCartStorage[i] = {
                id: getCartStorage[i].id,
                name: getCartStorage[i].name,
                quantity: getCartStorage[i].quantity - 1,
                price: getCartStorage[i].price,
                image: getCartStorage[i].image,
                total: getCartStorage[i].price * (getCartStorage[i].quantity - 1)
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
    allCart.value = JSON.parse(localStorage.getItem('cart'))
}

    // checkout Handler 
    const {data:authData} = useAuth()
   
    const checkOutHandler = () => {
      
        
        if (authData && authData?.value?.user?.role === 'customer') {
            navigateTo('/checkout')
        }else{
            Toast.fire({
                icon: "error",
                title: "Please login first!",
            });
            navigateTo('/auth/login')
        }
    }

</script>

<style lang="scss" scoped>

</style>