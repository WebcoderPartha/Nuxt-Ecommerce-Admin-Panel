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
            <input id="cash" class=" cursor-pointer" type="radio" name="payment_method" value="Cash On Delivery" />
            <label for="cash" class=" cursor-pointer">Cash On Delivery</label>
          </div>
          <div class="flex gap-2">
            <input id="cheque" class=" cursor-pointer" type="radio" name="payment_method" value="Cheque" />
            <label for="cheque" class=" cursor-pointer">Cheque</label>
          </div>
          <div class="flex gap-2">
            <input id="bank" class=" cursor-pointer" type="radio" name="payment_method" value="Bank Transfer" />
            <label for="bank" class=" cursor-pointer">Bank Transfer</label>
          </div>
        </div>
        <button class=" bg-slate-950 text-white px-3 py-1 mt-4 cursor-pointer">Order Now</button>
      </div>
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
