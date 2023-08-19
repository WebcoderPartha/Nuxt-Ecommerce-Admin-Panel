<template>
    <div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: "ecommerce",
});

onBeforeMount(() => {
    if (authData && authData?.value?.user?.role !== "customer") {
        navigateTo("/auth/login");
    }

});

const orderid = useRoute().params.orderid


</script>

<style lang="scss" scoped></style>