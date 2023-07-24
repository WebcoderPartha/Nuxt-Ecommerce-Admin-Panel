<template>
    <div class=" bg-blue-400 flex items-center justify-between px-4 py-4">
        <div>
            <h2 class=" text-2xl font-semibold text-white">Dashboard</h2>
        </div>
        <div class=" bg-red-600 text-white rounded-md text-xl px-2 py-1 cursor-pointer" @click="logOutHandler" title="Sign out">
            <Icon name="ph:sign-out-bold" />
        </div>
    </div>
</template>

<script setup>
    // ===========Sweet Alert Use =============//
    const { $swal } = useNuxtApp();
    const Toast = $swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", $swal.stopTimer);
        toast.addEventListener("mouseleave", $swal.resumeTimer);
    },
    });
// ===========Sweet Alert Use =============//

    const logOutHandler = async () => {
        const {signOut} = useAuth()
        await signOut({callback:'/admin/login'})

        Toast.fire({
            icon: "success",
            title: "Logout successfull!",
        });
     
      
    }

</script>

<style lang="scss" scoped>

</style>