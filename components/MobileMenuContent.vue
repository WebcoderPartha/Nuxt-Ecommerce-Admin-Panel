<template>
    <div class=" md:hidden fixed inset-0 w-72 z-40 bg-[#f3fee3] shadow-md shadow-gray-200 px-6 py-6">
        <div class="flex gap-3 justify-between">
            <h2 class="text-xl font-semibold">Categories</h2>
            <Icon @click="removeCart(index)"
            name="material-symbols:close"
            class="mt-1 text-black text-2xl cursor-pointer"
          />
        </div>
        <div class=" grid grid-cols-3 gap-4 py-8">
            <div class="flex flex-col gap-2" v-for="category in mobileCategories" :key="category.id">
                <nuxt-img :src="category.image" class="w-10 place-self-center" />
                <p class="text-center text-sm">{{ category.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

// Fetch Category
const mobileCategories = useState(() => [])
const {data:res} = await useFetch('/api/frontend/category/category', {method: 'GET'})
mobileCategories.value = res
// Fetch Category

</script>

<style lang="scss" scoped>

</style>