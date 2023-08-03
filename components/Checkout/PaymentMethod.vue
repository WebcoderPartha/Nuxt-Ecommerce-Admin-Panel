<template>
  <div>
    <form action="">
      <div class="flex flex-col gap-3 bg-gray-100 px-6 py-12">
        <div class="flex justify-between">
          <h2>Sub Total</h2>
          <p class="font-semibold">BDT 345</p>
        </div>
        <div class="flex justify-between mb-5">
          <h2>Sub Total</h2>
          <p class="font-semibold">BDT 345</p>
        </div>
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold">Payment Method</h2>
          <div class="flex gap-2">
            <input type="radio" value="Cash On Delivery" />
            <span>Cash On Delivery</span>
          </div>
          <div class="flex gap-2">
            <input type="radio" value="Cheque" />
            <span>Cheque</span>
          </div>
          <div class="flex gap-2">
            <input type="radio" value="Bank Transfer" />
            <span>Bank Transfer</span>
          </div>
        </div>
        <button class=" bg-slate-950 text-white px-3 py-1 mt-4 cursor-pointer">Order Now</button>
      </div>
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
