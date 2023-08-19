<template>
    <div class="max-w-[1200px] mx-auto content-center items-center flex flex-col">
        <div class=" px-5 py-5 text-center border h-44">
            <h2 class="text-2xl">Payment Failed</h2>
            <p>Order again</p>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout:'ecommerce'
    })
    useHead({
        title: 'Payment Failed'
    })
    const orderid = useRoute().params.orderid

    const {data} = await useFetch('/api/frontend/order/sslcommerzfail', {
        method: "POST",
        body: {
            tcn: orderid
        }
    })
    setTimeout(() => {
        navigateTo('/')
    }, 1500)
</script>

<style lang="scss" scoped>

</style>