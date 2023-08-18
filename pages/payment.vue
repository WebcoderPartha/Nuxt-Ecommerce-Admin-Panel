<template>
    <div>
        <button @click="payment">Payment</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout:"ecommerce"
})
    const payment = async () => {
        const {data} = await useFetch("/api/okpay",{
        method: "POST",
        // body:{
        //     ok: 'sdfsdf'
        // }
    })
    console.log(data.value)
    // navigateTo(data.value.GatewayPageURL, {external:true})
    }
</script>

<style lang="scss" scoped>

</style>