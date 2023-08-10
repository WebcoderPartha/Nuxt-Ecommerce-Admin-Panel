<template>
    <div class="max-w-[1200px] mx-auto">
        <h1>Pagination</h1>
        {{ currentPage }}
        <ul class="flex justify-center gap-4">
            <!-- Previous Button -->
            <li v-if="currentPage === 1">
                <span class=" cursor-not-allowed bg-gray-700 text-white px-2 py-1">Prev</span>
            </li>
            <!-- Previous Button -->

            <!-- Page Number -->
            <li v-else>
                <span @click="prevPageHandler" class=" cursor-pointer bg-green-700 text-white px-2 py-1">Prev</span>
            </li>

            <li v-for="(number, idx) in pageNumber">
                <span v-if="currentPage === number.page" class="bg-red-700 text-white px-2 py-1 cursor-not-allowed">
                    {{ number.page }}
                </span>
                <span v-else :class="` cursor-pointer bg-green-700 text-white px-2 py-1`" @click="paginateHandler"
                    :data-pageNumbe="number.page">{{ number.page }}</span>
            </li>
            <!-- Page Number -->

            <!-- Next Button -->
            <li v-if="currentPage === lastPageNumber">
                <span class=" cursor-not-allowed bg-gray-700 text-white px-2 py-1">Next</span>
            </li>
            <li v-else>
                <span @click="nextPageHandler" class=" cursor-pointer bg-green-700 text-white px-2 py-1">Next</span>
            </li>
            <!-- Next Button -->
        </ul>
       
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'ecommerce'
})


const { data: res } = await useFetch('/api/frontend/paginate/allproduct', {
    method: 'GET'
})

const currentPage = ref(1)
const perPage = ref(20)
const total = res.value._count.name
// Total Page
const TotalPage = Math.ceil(total / perPage.value)
const pageNumber = []
for (let i = 0; i < TotalPage; i++) {
    const paginateData = {
        page: i + 1,
        skip: i*perPage.value,
    }
    pageNumber.push(paginateData)
}

// Last Page Number
const lastPage = pageNumber[pageNumber.length -1].page
const lastPageNumber = ref(0)
lastPageNumber.value = lastPage
// Last Page Number

// const prevSkip = ref(20)
// const prevPage = ref(0)
// const nextPage = ref(2)


// Pagination Button Handler
const paginateHandler = (e) => {

    // Get Carrent Page
    currentPage.value = parseInt(e.target.getAttribute('data-pageNumbe'))
    // Total Page Item
    const totalPageItem  = parseInt(currentPage.value * perPage.value).toFixed(0)
    // Skip Item
    const skip = totalPageItem - perPage.value
    // Take Item
    const take = perPage.value

    const data = {
        skip: skip,
        take: take
    }

    console.log(data)

}

// Previous Page Button Handler
const prevPageHandler = (e) => {
    
    // Get Previous Page
    const previousPage = currentPage.value - 1
    // Get Carrent Page
    currentPage.value = previousPage
    // Total Page Item
    const totalPageItem  = parseInt(previousPage * perPage.value).toFixed(0)
    // Skip Item
    const skip = totalPageItem - perPage.value
    // Take Item
    const take = perPage.value

    const data = {
        skip: skip,
        take: take
    }
    console.log(data)

}


// Next Page Button Handdler 
const nextPageHandler = (e) => {

   // Get Next Page
    const nextPage = currentPage.value + 1
    // Get Current Page
    currentPage.value = nextPage
    // Total Page Item
    const totalPageItem  = parseInt(nextPage * perPage.value).toFixed(0)
    // Skip Item
    const skip = totalPageItem - perPage.value
    // Take Item
    const take = perPage.value

    const data = {
        skip: skip,
        take: take
    }

    console.log(data)   
}

</script>

<style lang="scss" scoped></style>