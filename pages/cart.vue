<template>
   <div>
        <div class="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-12 justify-center items-center py-6">
            <div class=" lg:col-span-8">
                <h2 class="text-2xl font-bold mb-3">My Cart</h2>
                <div class="flex justify-between mb-3">
                    <h4 class=" text-stone-950">All listed products</h4>
                    <div class="flex gap-2 items-center cursor-pointer">
                        <Icon class=" text-xl" name="mdi:eraser" />
                        <span>Clear Cart</span>
                    </div>
                </div>

                <!-- Cart Loop -->
                <div class="flex justify-between items-center gap-3 bg-gray-100 px-6 py-2 mb-2 rounded-md shadow-sm shadow-gray-300">
                    <div class="flex gap-2 items-center">
                        <img src="https://media.e-valy.com/cms/products/images/17650583-cb7f-42dd-828f-904bae4d4437?h=250&w=250" width="80" alt="">
                        <h3>Product 1</h3>
                    </div>
                    <div class="flex gap-3 justify-between items-center">
                        <p>BDT 700</p>
                        <div class="flex items-center gap-2">
                            <span>Qty:</span>
                            <Icon name="ic:twotone-minus"  class=" border text-2xl bg-white cursor-pointer"/>
                            <span class="border w-8 h-6 px-1 text-center">1</span>
                            <Icon name="ic:twotone-plus"  class=" border text-2xl bg-white cursor-auto"/>
                        </div>
                        <Icon name="material-symbols:close"  class="bg-green-500 text-white text-2xl cursor-pointer"/>
                    </div>
                </div>
                 <!--/ Cart Loop -->

                          <!-- Cart Loop -->
                <div class="flex justify-between items-center gap-3 bg-gray-100 px-6 py-2 mb-2 rounded-md shadow-sm shadow-gray-300">
                    <div class="flex gap-2 items-center">
                        <img src="https://media.e-valy.com/cms/products/images/17650583-cb7f-42dd-828f-904bae4d4437?h=250&w=250" width="80" alt="">
                        <h3>Product 1</h3>
                    </div>
                    <div class="flex gap-3 justify-between items-center">
                        <p>BDT 700</p>
                        <div class="flex items-center gap-2">
                            <span>Qty:</span>
                            <Icon name="ic:twotone-minus"  class=" border text-2xl bg-white cursor-pointer"/>
                            <span class="border w-8 h-6 px-1 text-center">1</span>
                            <Icon name="ic:twotone-plus"  class=" border text-2xl bg-white cursor-auto"/>
                        </div>
                        <Icon name="material-symbols:close"  class="bg-green-500 text-white text-2xl cursor-pointer"/>
                    </div>
                </div>
                 <!--/ Cart Loop -->

                          <!-- Cart Loop -->
                <div class="flex justify-between items-center gap-3 bg-gray-100 px-6 py-2 mb-2 rounded-md shadow-sm shadow-gray-300">
                    <div class="flex gap-2 items-center">
                        <img src="https://media.e-valy.com/cms/products/images/17650583-cb7f-42dd-828f-904bae4d4437?h=250&w=250" width="80" alt="">
                        <h3>Product 1</h3>
                    </div>
                    <div class="flex gap-3 justify-between items-center">
                        <p>BDT 700</p>
                        <div class="flex items-center gap-2">
                            <span>Qty:</span>
                            <Icon name="ic:twotone-minus"  class=" border text-2xl bg-white cursor-pointer"/>
                            <span class="border w-8 h-6 px-1 text-center">1</span>
                            <Icon name="ic:twotone-plus"  class=" border text-2xl bg-white cursor-auto"/>
                        </div>
                        <Icon name="material-symbols:close"  class="bg-green-500 text-white text-2xl cursor-pointer"/>
                    </div>
                </div>
                 <!--/ Cart Loop -->


            </div>
            <div class=" lg:col-span-4">
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
                    <NuxtLink to="/checkout" class="bg-black text-white px-3 py-3 text-center cursor-pointer">Proccess To Checkout</NuxtLink>
                </div>
                
            </div>
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
</script>

<style lang="scss" scoped>

</style>