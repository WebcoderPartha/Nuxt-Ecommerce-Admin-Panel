<template>
    <div class="max-w-[1200px] mx-auto my-10">
        <div class="text-center py-2 my-2 border border-slate-300 mb-4">
            <h2 class="text-2xl">Top Categories</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-6 mx-4 md:mx-0 gap-4 md:gap-8">
            <NuxtLink v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`" class="group">
                <div class="flex flex-col items-center justify-center py-6 rounded-lg shadow-xl shadow-slate-200">
                    <NuxtImg :src="category?.image" v-if="category?.image" />
                    <h3 class="text-base group-hover:text-[#79bc62] py-2">{{ category?.name }}</h3>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const categories = useState(() => [])
    const {data:catgrid} = await useFetch('/api/frontend/home/categories', {
        method: "GET"
    })
    categories.value = catgrid
</script>

<style lang="scss" scoped></style>