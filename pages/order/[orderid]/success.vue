<template>
    <div class="max-w-[500px] mx-auto md:py-16 py-6 px-4 md:px-0">
      <h3 class="text-xl font-semibold text-center">
        Your placed order confirmation details below:
      </h3>
  
      <ClientOnly>
      <div class="my-4">
        <table class="border-collapse border border-slate-500 w-full text-center">
          <tr>
            <td class="border border-slate-700">Order ID</td>
            <td class="border border-slate-700">{{ placeOrder.tcn }}</td>
          </tr>
          <tr>
            <td class="border border-slate-700">Totoal Price</td>
            <td class="border border-slate-700">BDT {{ placeOrder.total_price }}</td>
          </tr>
          <tr>
            <td class="border border-slate-700">Total Qty</td>
            <td class="border border-slate-700">{{ placeOrder.quantity }}</td>
          </tr>
          <tr>
            <td class="border border-slate-700">Payment Method</td>
            <td class="border border-slate-700">{{ placeOrder.payment_method }}</td>
          </tr>
          <tr>
            <td class="border border-slate-700">Transation ID</td>
            <td class="border border-slate-700">{{ placeOrder.tran_id }}</td>
          </tr>
          <tr>
            <td class="border border-slate-700">Order Date</td>
            <td class="border border-slate-700">{{ placeOrder.order_date }}</td>
          </tr>
          <tr class=" h-1">
            <td class="border border-slate-700">Order Status</td>
            <td class="border border-slate-700"><span class=" bg-orange-500 px-2 py-1 inline-block text-white rounded-md text-sm">Pending</span></td>
          </tr>
        </table>
      </div>
  </ClientOnly>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "ecommerce",
  });
  useHead({
    title: "Order Success",
  });
  const { data: authData } = useAuth();
  
  const orderid = useRoute().params.orderid

  onBeforeMount(() => {
    if (authData && authData?.value?.user?.role !== "customer") {
      navigateTo("/auth/login");
    }
    if(placeOrder.value){
    setTimeout(() => {
      navigateTo('/'),
      placeOrder.value = ''
    },6000)
  }
  });
  

  const placeOrder = useState(()=> '')

  const {data:orderdetail} = await useFetch('/api/frontend/order/ordersuccess', {
    method: "POST",
    body: {
        orderid: orderid
    }
  })
  placeOrder.value = orderdetail

 


  </script>
  
  <style lang="scss" scoped></style>
  