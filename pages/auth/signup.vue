<template>
    <div class="max-w-[400px] mx-auto my-10 bg-white rounded-lg border border-slate-300">
       <div class="py-5 px-10">
            <form>
                <div class="mb-6">
                 <h2 class="text-2xl text-center">Create your Account</h2>
            </div>
            <div class="flex flex-col gap-4">
                <label class="">
                    <span>Full Name</span>
                    <div class="">
                        <input type="text" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter full name">
                    </div>
                </label>
                <label class="">
                    <span>Email Address</span>
                    <div class="">
                        <input type="email" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter email address">
                    </div>
                </label>
                <label class="">
                    <span>Username</span>
                    <div class="">
                        <input type="text" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter username">
                    </div>
                </label>
                <label class="">
                    <span>Password</span>
                    <div class="">
                        <input type="password" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="********" autocomplete="on">
                    </div>
                </label>
                <label class="">
                    <span>Confirm Password</span>
                    <div class="">
                        <input type="password" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="********" autocomplete="on">
                    </div>
                </label>
                <button class="bg-black text-white py-2 rounded-md">Create Account</button>
             
                
                <div class="flex items-center justify-center py-4 gap-3">
                    <p>Already have an account? </p>
                   <NuxtLink to="/auth/login">Sign In</NuxtLink>
                </div>
            </div>
            </form>
       </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Sign Up Page'
})
definePageMeta({
    layout:'ecommerce',

})
</script>

<style lang="scss" scoped>

</style>