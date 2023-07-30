<template>
  <ClientOnly>
  <div class="lg:col-span-4">

    <div class="bg-gray-100 px-6 py-12 flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h2>Subtotal</h2>
        <span>BDT {{subTotalPrice}}</span>
      </div>

      <div class="flex justify-between items-center mb-5">
        <h2>Total</h2>
        <span>BDT {{ subTotalPrice }}</span>
      </div>
      <NuxtLink
        to="/checkout"
        class="bg-black text-white px-3 py-3 text-center cursor-pointer"
        >Proccess To Checkout</NuxtLink
      >
    </div>
  </div>
</ClientOnly>
</template>

<script setup>
  const {allCart} = defineProps(['allCart'])
  const subTotalPrice = useState(()=> '')
  let price =0
  allCart.forEach(cart => {
    price += parseInt(cart.total)
  })
  subTotalPrice.value = price

 


</script>

<style lang="scss" scoped></style>
