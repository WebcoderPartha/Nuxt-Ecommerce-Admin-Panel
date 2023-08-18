<template>
    <div>

        {{ orderid }}
    </div>
</template>

<script setup>
  definePageMeta({
    layout: "ecommerce",
  });

const orderid = useRoute().params.orderid


navigateTo(`/order/${orderid}/success`)



// console.log(res.value.payment)


  
</script>

<style lang="scss" scoped>

</style>