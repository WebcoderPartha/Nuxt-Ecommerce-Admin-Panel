<template>
    <div class="max-w-[400px] mx-auto my-16 bg-white rounded-lg border border-slate-300">
       <div class="py-10 px-10">
            <form>
                <div class="mb-6">
                 <h2 class="text-2xl text-center">Login your Account</h2>
            </div>
            <div class="flex flex-col gap-4">
                <label class="">
                    <span>Email or Username</span>
                    <div class="">
                        <input type="text" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter email or username">
                    </div>
                </label>
                <label class="">
                    <span>Password</span>
                    <div class="">
                        <input type="password" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter password" autocomplete="on">
                    </div>
                </label>
                <button class="bg-black text-white py-2 rounded-md">Login</button>
                <div class="flex flex-row items-center mx-auto border rounded-sm px-3 cursor-pointer">
                    <img src="/assets/img/google.svg" width="35" alt="">
                    <span>Sign in with Google</span>
                </div>
                
                <div class="flex items-center justify-center py-4 gap-3">
                    <p>Don't have an account? </p>
                   <NuxtLink to="/auth/signup">Singup</NuxtLink>
                </div>
            </div>
            </form>
       </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Login Page'
})
definePageMeta({
    layout:'ecommerce',

})
</script>

<style lang="scss" scoped>

</style>