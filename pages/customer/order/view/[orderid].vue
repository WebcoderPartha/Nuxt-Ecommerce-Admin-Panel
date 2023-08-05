<template>
    <div class="max-w-[1200px] mx-auto py-8">
 
     
    </div>
  </template>
  
  <script setup>
      definePageMeta({
          layout: 'ecommerce'
      })
      
      // Dynamic Tabs
      const tabState = ref('orderlist')
      const tabActionHandler = (e) => {
          tabState.value = e.target.getAttribute('data-tabs')
      }
      // Dynamic Tabs
  
      const {data:authUser} = useAuth()
  
      const getOrders = useState(() => [])
      const {data:allOrders} = await useFetch('/api/frontend/myaccount/orders/'+authUser?.value?.user?.id,{
          method: 'GET'
      })
      getOrders.value = allOrders
  
  
  </script>
  
  <style lang="scss" scoped></style>
  