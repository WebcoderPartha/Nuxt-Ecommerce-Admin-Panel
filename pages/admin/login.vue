<template>
    <div class=" bg-gray-950 h-screen pt-56">
        <div class="w-[400px] mx-auto bg-gray-900 shadow-sm shadow-gray-500 px-14 pb-10">
            <h2 class="text-2xl text-gray-600 text-center py-4" text-center>Login</h2>
            <form class="flex flex-col gap-4" @submit.prevent="loginHandler">
                <input v-model="username" type="text" placeholder="Username" class="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none appearance-none">
                <input type="password" v-model="password" placeholder="Password" class="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none">
                <button type="submit" class=" bg-gray-950 hover:bg-black py-1 text-zinc-400 rounded-md">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout:false
    })

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

    const username = ref('')
    const password = ref('')
    
    const {signIn} = useAuth() 
    const loginHandler = async (e) => {
        if(username.value.length > 0 && password.value.length > 0){
            const {error, url} = await signIn('credentials', {username:username.value, password: password.value, redirect:false })
            if(error){
              
                Toast.fire({
                    icon: "warning",
                    title: "Invalid credentials!",
                });
            }else{
                navigateTo('/admin')
                username.value = '';
                password.value = '';
                e.target.reset()
            
                Toast.fire({
                    icon: "success",
                    title: "Loggin SuccessfullY!",
                });
            }

        }else{
            Toast.fire({
                icon: "warning",
                title: "Field is required!",
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>