<template>
  <ClientOnly>
  <div class="lg:col-span-4">

    <div class="bg-gray-100 px-6 py-12 flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h2>Subtotal</h2>
    
        <span>BDT {{addCart?.length>0 ? subTotal : '0'}}</span>
      </div>

      <div class="flex justify-between items-center mb-5">
        <h2>Total</h2>
        <span>BDT {{addCart?.length>0 ? subTotal : '0'}}</span>
      </div>
      <NuxtLink @click="$emit('checkOut')"
        to="/checkout"
        class="bg-black text-white px-3 py-3 text-center cursor-pointer"
        >Proccess To Checkout</NuxtLink
      >
    </div>
  </div>
</ClientOnly>
</template>

<script setup>

  const addCart = useCarts()
  const cartPrice = useCartPrice() 
  if(process.client){
    cartPrice.value = JSON.parse(localStorage.getItem('subtotal'))
  }
  const subTotal = computed(() => cartPrice.value);

  // Checkout Event
  const emit = defineEmits(['checkOut'])

</script>

<style lang="scss" scoped></style>
