<template>
    <div>
        <h1>Wishlist</h1>
    </div>
</template>

<script setup>
useHead({
    title: 'Wishlist'
})
definePageMeta({
    layout:'ecommerce'
})
    const {data:authUser} = useAuth()
// Authenticate before load
    onBeforeMount(() => {
        if (authUser && authUser?.value?.user?.role !== 'customer') {
            navigateTo('/auth/login')
        }
    });
// Authenticate

</script>

<style lang="scss" scoped>

</style>