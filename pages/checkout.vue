<template>
    <div>
        <h2>Check out page</h2>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'ecommerce'
})

const {data:authData} = useAuth()

onBeforeMount(() => {
    if (authData && authData?.value?.user?.role !== 'customer') {
        navigateTo('/auth/login')
    }
});

</script>

<style lang="scss" scoped>

</style>