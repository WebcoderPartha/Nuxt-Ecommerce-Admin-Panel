<template>
    <div class="items-center gap-6 text-center my-8 mx-8 relative">
      <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white">
  
        <Head>
          <Title>Today Order</Title>
        </Head>
        <div class="flex justify-between items-center px-6 py-3">
          <h3 class="text-xl font-semibold pt-4">Today Order</h3>
        </div>
        <div class="px-2 pt-2">
          <table class="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th class="border">ID</th>
                <th class="border">Name</th>
                <th class="border">Total</th>
                <th class="border">Method</th>
                <th class="border">Txn ID</th>
                <th class="border">Order Date</th>
                <th class="border">Status</th>
                <th class="border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, idx) in getTodayOrder?.todayOrders" :key="order.id">
                <td class="border">{{ order.tcn }}</td>
                <td class="border">{{ order.user.fullname }}</td>
                <td class="border">BDT {{ order.total_price }}</td>
                <td class="border">{{ order.payment_method }}</td>
                <td class="border">{{ order.tran_id }}</td>
                <td class="border">{{ order.order_date }}</td>
                <td class="text-center border border-slate-200">
                <span
                  class="bg-yellow-400 text-sm text-black px-2 py-1 rounded-md"
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
                <td class="border flex gap-1 items-center justify-center">
                  <div @click="modelHandler(order.tcn)" class="px-2 py-1 cursor-pointer rounded-md bg-blue-400 text-white">
                    Order Status
                    <Icon name="fa6-regular:pen-to-square" />
                </div>&nbsp;
                  <button
                    class="px-2 py-1 cursor-pointer rounded-md bg-orange-600 text-white">
                    <Icon name="entypo:eye" />
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
      <!-- Change Order Status -->
      <BankendOrderUpdateStatus :orderdata="getOrderData" v-if="isVisible" @updateOrderStatus="updateStatusHandler" />
      <!-- Change Order Status -->
    
    </div>
  </template>
  
  <script setup>
      useHead({
          title: 'Toa Order'
      })
      const {status, data:userData} = useAuth() 
      // Admin 
      onBeforeMount(() => {
      
          if(status.value === "unauthenticated"){
              navigateTo("/admin/login")
          }else if(userData?.value?.user?.role !== 'admin'){
              navigateTo("/admin/login")
          }
         
      })
       
  const total = ref(0)
  const perPage = ref(10)
  const skip  = ref(0)
  
  //=========== Fetch All Product =============//
  const getTodayOrder = useState(() => []);
  const { data: orderData, refresh, pending } = await useFetch("/api/backend/order/gettodayorder", { 
      method: "POST",
      body: {
          skip:skip.value,
          take: perPage.value
      } 
  })
  getTodayOrder.value = orderData
  total.value = getTodayOrder?.value?.total
  //=========== Fetch All Product =============//
  
  //=============== Pagination Handler ================//
  const paginateHandler = async (skip) => {
    const { data: pagiTodayorder, refresh, pending } = await useFetch("/api/backend/order/gettodayorder", { 
      method: "POST",
      body: {
          skip:skip,
          take: perPage.value
      } 
  })
  getTodayOrder.value = pagiTodayorder
  
  }
  //=============== Pagination Handler ================//

  const isVisible = useOrderStatusForm()
  const getOrderData = useState(()=> "")
  //========== Fetching Order BY ID Data ==================
  const modelHandler = async (order_id) => {
    isVisible.value = true
    const {data:getorderbyid} = await useFetch("/api/backend/order/getorderbytcn",{
    method: "POST",
      body: {
        orderid: order_id
      }
    })
    getOrderData.value = getorderbyid
  }
  //========== Fetching Order BY ID Data ==================

  //============= Update Order Status Handler ====================// 
  const updateStatusHandler = async (orderStatus) => {
    const {data:res} = await useFetch("/api/backend/order/updateorderstatus", {
      method: "PUT", 
      body: {
        order_status: orderStatus,
        id: getOrderData.value.id
      }
    })
    refresh()
    console.log(res.value)
  }
  // ========== Update Order Status Handler ======================//
    
  </script>
  
  <style lang="scss" scoped>
  
  </style>