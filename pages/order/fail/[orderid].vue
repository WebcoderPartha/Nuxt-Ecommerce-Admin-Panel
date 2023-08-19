<template>
    <div>
        order failed
    </div>
</template>

<script setup>
    const orderid = useRoute().params.orderid

    const {data} = await useFetch('/api/frontend/order/sslcommerzfail', {
        method: "POST",
        body: {
            tcn: orderid
        }
    })
</script>

<style lang="scss" scoped>

</style>