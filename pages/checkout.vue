<template>
    <div class="max-w-[1200px] mx-auto py-7">
        <div class=" grid lg:grid-cols-12 justify-between px-4 lg:px-0">
            <div class=" lg:col-span-6">
                <CheckoutAddress />
            </div>
            <div class=" lg:col-span-5">
               <CheckoutPaymentMethod />
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'ecommerce'
})

const {data:authData} = useAuth()
const addCart = useCarts()

onBeforeMount(() => {
    if (authData && authData?.value?.user?.role !== 'customer') {
        navigateTo('/auth/login')
    }else if(addCart.value.length === 0){
        navigateTo('/')
    }
});

</script>

<style lang="scss" scoped>

</style>