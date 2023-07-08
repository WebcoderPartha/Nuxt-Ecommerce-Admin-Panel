<template>
    <div class=" bg-gray-950 h-screen pt-56">
        <div class="w-[400px] mx-auto bg-gray-900 shadow-sm shadow-gray-500 px-14 pb-10">
            <h2 class="text-2xl text-gray-600 text-center py-4" text-center>Login</h2>
            <form class="flex flex-col gap-4">
                <input type="text" placeholder="Username" class="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none appearance-none">
                <input type="password" placeholder="Password" class="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none">
                <button class=" bg-gray-950 hover:bg-black py-1 text-zinc-400 rounded-md">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout:false
    })
</script>

<style lang="scss" scoped>

</style>