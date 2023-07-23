<template>
<div class="bg-white shadow-sm shadow-slate-200 fixed top-0 w-full z-10">
            <header class="max-w-[1200px] mx-auto">
                <div class="md:flex justify-between items-center pt-6">
                    <div>
                        <img class="mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" width="150" alt="">
                    </div>
                    <div class="md:w-[500px] w-[200px] mx-auto mt-3 md:mt-0">
                        <input  type="text" class="bg-gray-800 text-white px-3 py-2 rounded-md w-full focus:outline-none" placeholder="Search">
                    </div>
                    <div class="flex gap-2 justify-center">
                        <div class="text-stone-950 pt-1 text-xl hover:rounded-md cursor-pointer">
                            <Icon name="material-symbols:shopping-cart-sharp" />
                        </div>
                        <div class="text-stone-950 px px-2 py-2 hover:rounded-md cursor-pointer">
                            <Icon name="fa6-regular:user" />
                            <span class="ml-2">Sign In</span>
                        </div>
                    </div>
                </div>
                
                <div class="MenuContainer pt-4 pb-3">
                    <ul class="flex gap-3 text-stone-950 font-semibold justify-center md:justify-normal">
                        <li class="py-2 px-2"><NuxtLink to="#">Home</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Shop</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Account</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Category</NuxtLink></li>
                    </ul>
                </div>
            </header>    
        </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>