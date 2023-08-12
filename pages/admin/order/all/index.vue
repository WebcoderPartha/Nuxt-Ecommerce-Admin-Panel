<template>
  <div class="items-center gap-6 text-center my-8 mx-8">
    <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white">

      <Head>
        <Title>All Order</Title>
      </Head>
      <div class="flex justify-between items-center px-6 py-3">
        <h3 class="text-xl font-semibold pt-4">All Order</h3>
      </div>
      <div class="px-2 pt-2">
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th class="border">Order ID</th>
              <th class="border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, idx) in getAllOrder.todayOrders" :key="order.id">
              <td class="border">{{ order.tcn }}</td>

              <td class="border">
                <NuxtLink class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white"
                  :to="`/admin/`">
                  <Icon name="fa6-regular:pen-to-square" />
                </NuxtLink>&nbsp;
                <button
                  class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white">
                  <Icon name="fa6-regular:trash-can" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
       
      </div>

    </div>
    <div class="pt-3">
      <BankendPagination :per_page="perPage" :total="total" @paginate="paginateHandler" />
    </div>
  </div>
</template>

<script setup>
    useHead({
        title: 'All Order'
    })
    const {status, data:userData} = useAuth() 
    // Admin 
    onBeforeMount(() => {
    
        if(status.value === "unauthenticated"){
            navigateTo("/admin/login")
        }else if(userData.value.user.role !== 'admin'){
            navigateTo("/admin/login")
        }
       
    })


    
const total = ref(0)
const perPage = ref(10)
const skip  = ref(0)

//=========== Fetch All Product =============//
const getAllOrder = useState(() => []);
const { data: orderData, refresh, pending } = await useFetch("/api/backend/order/getallorder", { 
    method: "POST",
    body: {
        skip:skip.value,
        take: perPage.value
    } 
})
getAllOrder.value = orderData
total.value = getAllOrder.value.total
//=========== Fetch All Product =============//

//=============== Pagination Handler ================//
const paginateHandler = async (skip) => {
  const { data: PgorderData, refresh, pending } = await useFetch("/api/backend/order/getallorder", { 
    method: "POST",
    body: {
        skip:skip,
        take: perPage.value
    } 
})
getAllOrder.value = PgorderData

}
//=============== Pagination Handler ================//


</script>

<style lang="scss" scoped>

</style>