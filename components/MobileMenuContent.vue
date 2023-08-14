<template>
    <div @click="closeOutside" id="mobileMenu" :class="`${isVisible === true ? '-left-0' : '-left-[28rem]'} z-50  md:hidden fixed inset-0 w-full duration-300`">
        <div :class="` w-72 h-screen z-40  bg-[#f3fee3] shadow-md shadow-gray-200 px-6 py-6`">
        <div class="flex gap-3 justify-between">
            <h2 class="text-xl font-semibold">Categories</h2>
            <Icon @click="closeButton"
            name="material-symbols:close"
            class="mt-1 text-black text-2xl cursor-pointer"
          />
        </div>
        <div class=" grid grid-cols-3 gap-4 py-8">
            <NuxtLink :to="`/category/${category.slug}`" class="flex flex-col gap-2" v-for="category in mobileCategories" :key="category.id">
                <nuxt-img :src="category.image" class="w-10 place-self-center" />
                <p class="text-center text-sm">{{ category.name }}</p>
            </NuxtLink>
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
const isVisible = mobileMenu()
const closeButton = () => {
    isVisible.value = false
}
const closeOutside = (e) => {
  
    const id = e.target.id
    if(id === 'mobileMenu'){
        isVisible.value = false
    }
}



</script>

<style lang="scss" scoped>

</style>