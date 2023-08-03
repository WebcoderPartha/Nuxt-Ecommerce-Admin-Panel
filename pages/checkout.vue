<template>
    <div class="max-w-[1200px] mx-auto py-6">
        <div class=" grid lg:grid-cols-12 gap-4 items-center justify-center px-4 lg:px-0">
            <div class=" lg:col-span-6">
                <CheckoutAddress />
            </div>
            <div class=" lg:col-span-6">
                <CheckoutPrice />
            </div>
        </div>
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