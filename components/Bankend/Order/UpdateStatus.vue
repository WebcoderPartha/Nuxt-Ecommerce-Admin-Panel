<template>
    <div @click="bodyClose" id="closeWrapper" class="justify-center items-center mr-4 duration-300 fixed inset-0 bg-black flex  bg-opacity-25  backdrop-blur-sm">
    
        <div class=" bg-gray-500 px-3 py-4 flex flex-col w-[600px]">
            <Icon @click="closeHandler" name="ri:close-fill" class="text-red-500 place-self-end cursor-pointer text-2xl" />
            <h2 class="text-2xl text-center">Update Order Status</h2> 
           
            <div class=" pb-4">
                <form @submit.prevent="updateOrderStatusHandler">
                    <h2>Customer Name: {{ orderdata?.user?.fullname }}</h2>
                    <h4>Order ID : {{ orderdata?.tcn }}</h4>
             
                    <div class=" flex-col flex py-2">
                         <label for="status" class="text-xl font-semibold">Order Status</label>
                         
                         <select @change="orderStatusChange" id="status" :data-orderid="orderdata?.id"  class="w-80 bg-gray-900 mx-auto rounded-md px-3 py-2 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-blue-300 focus:outline-none cursor-pointer">
                            <option v-if="orderdata?.order_status === 1" selected value="1">Pending</option>
                            <option v-else value="1">Pending</option>
                            <option v-if="orderdata?.order_status === 2" selected value="2">Proccessing</option>
                            <option v-else value="2">Proccessing</option>
                            <option v-if="orderdata?.order_status === 3" selected value="3">Delivered</option>
                            <option v-else value="3">Delivered</option>
                            <option v-if="orderdata?.order_status === 4" selected value="4">Cancelled</option>
                            <option v-else value="4">Cancelled</option>
                         </select>
                      
                       
                    </div>
                    <button type="submit" class="bg-gray-950 text-white px-6 rounded-md py-2 my-3">Save Change</button>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    const {orderdata} = defineProps(['orderdata'])

    const order_status = ref('')
    const id = ref(0)
    // Order Status value Getting
    const orderStatusChange = (e) => {
        order_status.value = e.target.value
        // id.value = e.target.getAttribute('data-orderid')
    }

    // Close model
    const isVisible = useOrderStatusForm()
    const closeHandler = () => {
        isVisible.value = false
    }

    // Close model 
    const bodyClose = (e) => {
        if(e.target.id === 'closeWrapper'){
            isVisible.value = false
        }  
    }

    // ========== Update order status Handler ================
    const emit = defineEmits(['updateOrderStatus'])
    const updateOrderStatusHandler = () => {
        const status = order_status.value
        emit('updateOrderStatus', status)
        isVisible.value = false
    }
    // ========== Update order status Handler ================

    
</script>

<style lang="scss" scoped></style>