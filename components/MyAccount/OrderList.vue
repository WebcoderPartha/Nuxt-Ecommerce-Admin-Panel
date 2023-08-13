<template>
  <div class="flex flex-col gap-3">
    <h2 class="text-center text-xl bg-gray-100 py-2">Order List</h2>
    <div class="overflow-x-auto" v-if="getOrders?.length > 0">
      <table class="border-collapse w-full border table-auto border-slate-200">
        <thead>
          <tr>
            <th class="border border-slate-300">Order ID</th>
            <th class="border border-slate-300">Total Price</th>
            <th class="border border-slate-300">Transation ID</th>
            <th class="border border-slate-300">Payment Method</th>
            <th class="border border-slate-300">Order Date</th>
            <th class="border border-slate-300">Order Status</th>
            <th class="border border-slate-300">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, i) in getOrders" :key="i">
            <td class="text-center border border-slate-200">
              <NuxtLink
                class="text-blue-500"
                :to="`/customer/order/view/${order.tcn}`"
                >{{ order.tcn }}</NuxtLink
              >
            </td>
            <td class="text-center border border-slate-200">
              BDT {{ order.total_price }}
            </td>
            <td class="text-center border border-slate-200">
              {{ order.payment_method }}
            </td>
            <td class="text-center border border-slate-200">
              {{ order.tran_id }}
            </td>
            <td class="text-center border border-slate-200">
              {{ order.order_date }}
            </td>
            <td class="text-center border border-slate-200">
              <span
                class="bg-yellow-400 text-sm px-2 py-1 rounded-md"
                v-if="order.order_status === 1"
                >Pending</span
              >
              <span
                class="bg-blue-400 text-sm px-2 py-1 rounded-md"
                v-else-if="order.order_status === 2"
                >Processing</span
              >
              <span
                class="bg-green-400 text-sm px-2 py-1 rounded-md"
                v-else-if="order.order_status === 3"
                >Delivered</span
              >
              <span
                class="bg-red-400 text-sm px-2 py-1 rounded-md text-white"
                v-else
                >Cancelled</span
              >
            </td>
            <td class="text-center border border-slate-200">
              <NuxtLink
                class="text-blue-500"
                :to="`/customer/order/view/${order.tcn}`"
              >
                <Icon name="entypo:eye" class="cursor-pointer text-2xl" />
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="text-center" v-else>You have no order yet!</h2>
  </div>
</template>

<script setup>
    const {data:authUser} = useAuth()
// All Order Fetch
const getOrders = useState(() => []);
const { data: allOrders } = await useFetch(
  "/api/frontend/myaccount/orders/" + authUser?.value?.user?.id,
  {
    method: "GET",
  }
);
getOrders.value = allOrders;
// All Order Fetch
</script>

<style lang="scss" scoped></style>
