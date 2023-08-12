<template>
    <div>
        dslfksdjf
    </div>
</template>

<script setup>
    useHead({
        title: 'All Order'
    })
    const {status, data:userData} = useAuth() 
    // Admin 
    onBeforeMount(() => {
    
        if(status.value === "unauthenticated"){
            navigateTo("/admin/login")
        }else if(userData.value.user.role !== 'admin'){
            navigateTo("/admin/login")
        }
       
    })
</script>

<style lang="scss" scoped>

</style>