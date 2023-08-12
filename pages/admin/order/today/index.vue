<template>
    <div>
sdf
    </div>
</template>

<script setup>

    useHead({
        title: 'Today Order'
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