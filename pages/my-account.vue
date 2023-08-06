<template>
  <div class="max-w-[1200px] mx-auto py-8">
    <Head>
        <Title>My Account</Title>
    </Head>
    <div class=" grid grid-cols-1 md:grid-cols-4 gap-3">
        <div class=" md:col-span-1 bg-gray-100 text-center">
            <nav>
                <ul>
                    <li :class="`${tabState === 'orderlist' && 'bg-gray-300'} py-2 px-4 border-b cursor-pointer hover:bg-gray-300`" @click="tabActionHandler" data-tabs="orderlist">Orders</li>
                    <li :class="`${tabState === 'profile' && 'bg-gray-300'} hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="profile">Profile</li>
                    <li :class="`${tabState === 'password' && 'bg-gray-300'} hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="password">Change Password</li>
                    <li :class="`hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="logoutHander" >Logout</li>
                </ul>
            </nav>
        </div>
        <div class=" md:col-span-3 min-h-[300px]">
            <!-- Order List -->
            <div v-if="tabState === 'orderlist'" >
                <div class="flex flex-col gap-3">
                    <h2 class="text-center text-xl bg-gray-100 py-2">Order List</h2>
                    <div class=" overflow-x-auto" v-if="getOrders?.length > 0">
                        <table class="border-collapse w-full border table-auto border-slate-200" >
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
                            <tr v-for="(order,i) in getOrders" :key="i">
                                <td class="text-center border border-slate-200"><NuxtLink class="text-blue-500" :to="`/customer/order/view/${order.tcn}`">{{order.tcn}}</NuxtLink></td>
                                <td class="text-center border border-slate-200">BDT {{order.total_price}}</td>
                                <td class="text-center border border-slate-200">{{order.payment_method}}</td>
                                <td class="text-center border border-slate-200">{{order.tran_id}}</td>
                                <td class="text-center border border-slate-200">{{order.order_date}}</td>
                                <td class="text-center border border-slate-200">
                                    <span class=" bg-yellow-400 text-sm px-2 py-1 rounded-md" v-if="order.order_status === '1'">Pending</span>
                                    <span class=" bg-blue-400 text-sm px-2 py-1 rounded-md" v-else-if="order.order_status === '2'">Processing</span>
                                    <span class=" bg-green-400 text-sm px-2 py-1 rounded-md" v-else-if="order.order_status === '3'">Delivered</span>
                                    <span class=" bg-red-400 text-sm px-2 py-1 rounded-md text-white" v-else>Cancelled</span>
                                </td>
                                <td class="text-center border border-slate-200">
                                    <NuxtLink class="text-blue-500" :to="`/customer/order/view/${order.tcn}`">
                                        <Icon name="entypo:eye" class=" cursor-pointer text-2xl" />
                                    </NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <h2 class="text-center" v-else>You have no order yet!</h2>
                </div>
            </div>
            <!-- Order List -->

             <!-- Profile -->
             <div class=" duration-300" v-if="tabState === 'profile'">
                <h2>Profile</h2>
            </div>
            <!-- Profile -->
        </div>
    </div>
  </div>
</template>

<script setup>
    definePageMeta({
        layout: 'ecommerce'
    })

    // ===========Sweet Alert Use =============//
    const { $swal } = useNuxtApp();
    const Toast = $swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", $swal.stopTimer);
            toast.addEventListener("mouseleave", $swal.resumeTimer);
        },
    });
    // ===========Sweet Alert Use =============//
    
    const {data:authUser, signOut} = useAuth()

    // Authenticate before load
    onBeforeMount(() => {
        if (authUser && authUser?.value?.user?.role !== 'customer') {
            navigateTo('/auth/login')
        }
    });
    // Authenticate
    
    // Dynamic Tabs
    const tabState = ref('orderlist')
    const tabActionHandler = (e) => {
        tabState.value = e.target.getAttribute('data-tabs')
    }
    // Dynamic Tabs

    const getOrders = useState(() => [])
    const {data:allOrders} = await useFetch('/api/frontend/myaccount/orders/'+authUser?.value?.user?.id,{
        method: 'GET'
    })
    getOrders.value = allOrders

    // Logout Handler
    const logoutHander = async() => {
        await signOut({redirect:false})
        navigateTo('/')
        Toast.fire({
            icon: "success",
            title: "Logout successfully!"
        });
    }
      // Logout Handler



</script>

<style lang="scss" scoped></style>
