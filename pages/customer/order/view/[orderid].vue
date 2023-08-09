<template>
    <div class="max-w-[1200px] mx-auto py-8">
        <div class=" grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            <div class=" shadow-md shadow-gray-400 px-4 py-2 mx-4 md:mx-0">
                <h2 class="text-center text-xl mb-3">Order Details</h2>
                <div class="flex justify-between gap-3 py-2 px-4 border-b">
                    <span class="text-base">Customer Name</span>
                    <span class=" text-base">{{ authUser?.user?.name }}</span>
                </div>
                <div class="flex justify-between gap-3 py-2 px-4 border-b">
                    <span class="text-base">Order ID</span>
                    <span class=" text-base">{{ orderDetail?.tcn }}</span>
                </div>
                <div class="flex justify-between gap-3 py-2 px-4 border-b">
                    <span class="text-base">Payment Method</span>
                    <span class=" text-base">{{ orderDetail?.payment_method }}</span>
                </div>
                <div class="flex justify-between gap-3 py-2 px-4 border-b">
                    <span class="text-base">Order Date</span>
                    <span class=" text-base">{{ orderDetail?.order_date }}</span>
                </div>
            </div>
            <div class=" shadow-md shadow-gray-400 px-4 py-2 mx-4 md:mx-0">
                <div class="flex flex-col gap-3">
                    <h2 class="text-center text-xl mb-3">Shipping Address</h2>
                    <div class=" italic">
                        <h4 class=" font-semibold">{{ authUser?.user?.name }}</h4>
                        <p>{{ shippingAddress.address_one }} {{ shippingAddress.address_two }}, {{ shippingAddress.thana }}, {{ shippingAddress.city }}-{{ shippingAddress.zipecode }}, {{ shippingAddress.country }} </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-4 py-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 w-[800px]">
                <div class="border border-slate-200 flex flex-col gap-1 pb-2" v-for="(product,i) in orderDetail.orderdetail" :key="i">
                    <NuxtImg :src="product.image" />
                    <h2 class="text-center">{{ product.product_name }}</h2>
                    <p class="text-center text-sm">BDT {{ product.price }}</p>
                    <p class="text-center text-sm">Qty: {{ product.quantity }}</p>
                    <p class="text-center text-sm">Subtotal: BDT {{ product.subtotal }}</p>
                </div>
        
            </div>
            <div class="border border-slate-200 w-[350px] h-[245px] px-4 py-2">
                <h3 class="text-xl mb-3 mt-3">Total Summary</h3>
                <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>BDT {{ orderDetail.total_price }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>BDT 0</span>
                </div>
                <div class="flex justify-between">
                    <span>Vat</span>
                    <span>BDT 0</span>
                </div>
                <hr class="w-full h-px my-4 bg-slate-200 border-0">
                <div class="flex justify-between mb-2">
                    <span>Total</span>
                    <span>BDT {{ orderDetail.total_price }}</span>
                </div>
                <p>Paid by {{ orderDetail.payment_method }}</p>
            </div>
        </div>
     
    </div>
  </template>
  
  <script setup>

    definePageMeta({
        layout: 'ecommerce'
    })
    
    // Dynamic route params
    const orderId = useRoute().params.orderid
    
    const {data:authUser} = useAuth()

    // Authenticate before load
    onBeforeMount(() => {
        if (authUser && authUser?.value?.user?.role !== 'customer') {
            navigateTo('/auth/login')
        }
    });
    // Authenticate

    const {data:orderDetail} = await useFetch(`/api/frontend/myaccount/orders/view/${orderId}`, {
        method: 'GET'
    })
    // console.log(orderDetail.value)

    const {data:shippingAddress} = await useFetch(`/api/frontend/shipping/${authUser?.value?.user?.id}`)
    

    
  
  </script>
  
  <style lang="scss" scoped></style>
  