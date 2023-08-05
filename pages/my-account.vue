<template>
  <div class="max-w-[1200px] mx-auto py-8">
    <Head>
        <Title>My Account</Title>
    </Head>
    <div class=" grid grid-cols-1 md:grid-cols-4 gap-3">
        <div class=" md:col-span-1 bg-gray-100 text-center">
            <nav>
                <ul>
                    <li :class="`${tabState === 'orderlist' && 'bg-gray-300'} py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="orderlist">Orders</li>
                    <li :class="`${tabState === 'profile' && 'bg-gray-300'} py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="profile">Profile</li>
                    <li :class="`${tabState === 'password' && 'bg-gray-300'} py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="password">Change Password</li>
                </ul>
            </nav>
        </div>
        <div class=" md:col-span-3 min-h-[300px]">
            <!-- Order List -->
            <div v-if="tabState === 'orderlist'" >
                <div class="flex flex-col gap-3">
                    <h2 class="text-center text-xl bg-gray-100 py-2">Order List</h2>
                    <table class="w-full border-collapse border border-slate-200">
                        <thead>
                            <tr>
                                <th class="border border-slate-300">Order ID</th>
                                <th class="border border-slate-300">Total Price</th>
                                <th class="border border-slate-300">Total Qty</th>
                                <th class="border border-slate-300">Transation ID</th>
                                <th class="border border-slate-300">Payment Method</th>
                                <th class="border border-slate-300">Order Date</th>
                                <th class="border border-slate-300">Order Status</th>
                                <th class="border border-slate-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center border border-slate-200">34345</td>
                                <td class="text-center border border-slate-200">100 BD</td>
                                <td class="text-center border border-slate-200">100</td>
                                <td class="text-center border border-slate-200">345345</td>
                                <td class="text-center border border-slate-200">Cash on delivery</td>
                                <td class="text-center border border-slate-200">pending</td>
                                <td class="text-center border border-slate-200">pending</td>
                                <td class="text-center border border-slate-200 text-red-400">
                                    <Icon name="entypo:eye" class=" cursor-pointer text-2xl" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
    const tabState = ref('orderlist')

    const tabActionHandler = (e) => {
        tabState.value = e.target.getAttribute('data-tabs')
    }
</script>

<style lang="scss" scoped></style>
