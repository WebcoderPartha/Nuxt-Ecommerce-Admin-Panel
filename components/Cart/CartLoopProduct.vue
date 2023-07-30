<template>
  <ClientOnly>
    <div class="lg:col-span-8">
      <h2 class="text-2xl font-bold mb-3">
        My Cart
      </h2>
    <div v-if="allCart?.length > 0">
        <div class="flex justify-between mb-3">
            <h4 class="text-stone-950">All listed products</h4>
            <div class="flex gap-2 items-center cursor-pointer" @click="$emit('clearCart')">
            <Icon class="text-xl" name="mdi:eraser" />
            <span>Clear Cart</span>
            </div>
        </div>

      <!-- Cart Loop -->
      <div v-for="(cart, index) in allCart" :key="index"
        class="flex justify-between items-center gap-3 bg-gray-100 px-6 py-2 mb-2 rounded-md shadow-sm shadow-gray-300"
      >
        <div class="flex gap-2 items-center">
          <nuxt-img
            :src="cart.image"
            width="80"
            alt=""
          />

          <h3>{{ cart.name }}</h3>
        </div>
        <div class="flex gap-3 justify-between items-center">
          <p>BDT {{cart.total}}</p>
          <div class="flex items-center gap-2">
            <span>Qty:</span>
            <Icon
              name="ic:twotone-minus"
              class="border text-2xl bg-white cursor-pointer"
            />
            <span class="border w-8 h-6 px-1 text-center">{{ cart.quantity }}</span>
            <Icon
              name="ic:twotone-plus"
              class="border text-2xl bg-white cursor-pointer"
            />
          </div>
          <Icon
            name="material-symbols:close"
            class="bg-green-500 text-white text-2xl cursor-pointer"
          />
        </div>
      </div>
      <!--/ Cart Loop -->
    </div>
    <div class="flex flex-col gap-4 text-center" v-else>
        <h2 class="text-2xl font-semibold">Cart Empty!</h2>
        <NuxtLink  to="/">Go back to Home</NuxtLink>
    </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { allCart } = defineProps(["allCart"]);


</script>

<style lang="scss" scoped></style>
