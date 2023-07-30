<template>
  <div class="lg:col-span-4">

    <div class="bg-gray-100 px-6 py-12 flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h2>Subtotal</h2>
        <span>BDT 3999</span>
      </div>
      <div class="flex justify-between items-center">
        <h2>Shipping Charge</h2>
        <span>BDT 3999</span>
      </div>
      <div class="flex justify-between items-center mb-5">
        <h2>Total</h2>
        <span>BDT 3999</span>
      </div>
      <NuxtLink
        to="/checkout"
        class="bg-black text-white px-3 py-3 text-center cursor-pointer"
        >Proccess To Checkout</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
  

</script>

<style lang="scss" scoped></style>
