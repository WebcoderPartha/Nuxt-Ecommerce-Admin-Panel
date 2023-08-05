<template>
    <div class="max-w-[1200px] mx-auto py-8">
        <h2>{{orderId}}</h2>
     
    </div>
  </template>
  
  <script setup>

    definePageMeta({
        layout: 'ecommerce'
    })
    
    // Dynamic route params
    const orderId = useRoute().params.orderid


    const {data:authUser} = useAuth()

    // Authenticate before load
    onBeforeMount(() => {
        if (authUser && authUser?.value?.user?.role !== 'customer') {
            navigateTo('/auth/login')
        }
    });
    // Authenticate
  
  
  </script>
  
  <style lang="scss" scoped></style>
  