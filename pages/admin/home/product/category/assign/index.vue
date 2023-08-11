<template>
    <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 px-5 py-4 text-white w-[800px] mx-auto mt-5">

        <Head>
            <Title>Home Product Category</Title>
        </Head>
        <h3 class="text-xl font-semibold py-4 text-center">Home Product Category</h3>

        <div class="px-2 py-4">
            <div class="flex gap-6">
                <div v-for="(skip, idx) in skipLoop" >
                    <div v-for="category in getCategory.categories.slice(skip.skip, skip.take)" :key="category.id">
                        <div class="flex gap-3" >
                            <input v-if="category.homecategory === 1" checked @click="homeCategoryHandler(category.id)" :id="`category-${category.id}`" type="checkbox" :value="category.id">
                            <input v-else  @click="homeCategoryHandler(category.id)" :id="`category-${category.id}`" type="checkbox" :value="category.id">
                            <label :for="`category-${category.id}`">{{ category.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex justify-center">
            <button @click="updateHomeCategoryHandler" class=" bg-zinc-900 px-3 py-2 hover:bg-zinc-600 hover:text-black rounded-md">Save Change</button>
        </div>
    </div>
</template>

<script setup>

// Admin 

const { status, data: userData } = useAuth()
// Admin 
onBeforeMount(() => {
    if (status.value === "unauthenticated") {
        navigateTo("/admin/login")
    } else if (userData.value.user.role !== 'admin') {
        navigateTo("/admin/login")
    }
})


// ===========Sweet Alert Use =============//
const { $swal } = useNuxtApp();
const Toast = $swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", $swal.stopTimer);
        toast.addEventListener("mouseleave", $swal.resumeTimer);
    },
});
// ===========Sweet Alert Use =============//


//=================== Get Category ================== //
const getCategory = useState(() => [])
const { data: categories, refresh } = await useFetch('/api/backend/homecategoryproduct/getall', {
    method: 'GET'
})
getCategory.value = categories

//=================== Get Category ================== //
const perpage = ref(6)
const total = getCategory.value.total
const page = Math.ceil(total / perpage.value)
const skipLoop = useState(() => [])
const skip = ref(0)
const storeTake = ref(0)

storeTake.value = perpage.value
for (let i = 0; i < page; i++) {
    if (i === 0) {
        const data = {
            skip: 0,
            take: perpage.value
        }
        skipLoop.value.push(data)
    } else {
        skip.value += perpage.value
     
        storeTake.value = parseInt(storeTake.value + perpage.value)
        const data = {
            skip: skip.value,
            take: storeTake.value
        }
        skipLoop.value.push(data)
    }
}

// Unique Array 
skipLoop.value = [...new Map(skipLoop.value.map(item=> [item['skip'],item])).values()]
// Unique Array 

const categoryIds = useState(()=> [])
const homeCategoryHandler = (category_id) => {
    const data = {
        categoryId: category_id
    }
    categoryIds.value.push(data)
    categoryIds.value = [...new Map(categoryIds.value.map(item=> [item['categoryId'], item])).values()]

}

const updateHomeCategoryHandler = async () => {
    const {data:updateCat} = await useFetch('/api/backend/homecategoryproduct/updatecat',{
        method: 'PUT',
        body: {
            categories: categoryIds.value
        }
    })

    categoryIds.value = []
    refresh()
}


</script>

<style lang="scss" scoped></style>