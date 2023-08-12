<template>
    <div class=" grid grid-cols-1 md:grid-cols-4 items-center gap-6 text-center my-8 mx-8">
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 h-32 text-white">
            <h3 class="text-xl font-semibold pt-4">Total Category</h3>
            <div class="text-4xl font-semibold pt-4">35</div>
        </div>
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 h-32 text-white">
            <h3 class="text-xl font-semibold pt-4">Total Product</h3>
            <div class="text-4xl font-semibold pt-4">35</div>
        </div>
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 h-32 text-white">
            <h3 class="text-xl font-semibold pt-4">Total Customer</h3>
            <div class="text-4xl font-semibold pt-4">{{totalCustomer}}</div>
        </div>
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 h-32 text-white">
            <h3 class="text-xl font-semibold pt-4">Total Total Order</h3>
            <div class="text-4xl font-semibold pt-4">35</div>
        </div>
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 h-32 text-white">
            <h3 class="text-xl font-semibold pt-4">Total Earn</h3>
            <div class="text-4xl font-semibold pt-4">35</div>
      
        </div>
    
    </div>
</template>

<script setup>

    // definePageMeta({
    //     middleware: 'auth',
    // })
    const {data:sessionData} = await useFetch('/api/session')
    const {status, data:userData} = useAuth() 
    // Admin 
    onBeforeMount(() => {
    
        if(status.value === "unauthenticated"){
            navigateTo("/admin/login")
        }else if(userData.value.user.role !== 'admin'){
            navigateTo("/admin/login")
        }
       
    })

    // ================= Total Customer ============= //
    const totalCustomer = ref(0)
    const {data:customer} = await useFetch("/api/backend/dashboard/countcustomer", {
        method: "GET"
    })
    totalCustomer.value = customer.value.customerCount
    // ================= Total Customer ============= //

  

    

</script>

<style lang="scss" scoped>

</style>