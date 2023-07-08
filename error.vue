<template>
    <div class="h-screen bg-gray-900 py-48">
        <Head>
            <Title>Error</Title>
        </Head>
        <div class="bg-gray-800 shadow-md shadow-gray-700 w-[600px] text-center mx-auto text-white py-40">
            <h2 class="text-4xl font-semibold">{{ error.statusCode }}</h2>
            <h4 class="text-3xl mt-3">{{ error.message }}</h4>
            <NuxtLink class="text-2xl bg-zinc-950 px-4 py-1 rounded-md inline-block mt-5" to="/">GO Back To Home</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const {error} = defineProps(['error'])
    
</script>

<style lang="scss" scoped>

</style>