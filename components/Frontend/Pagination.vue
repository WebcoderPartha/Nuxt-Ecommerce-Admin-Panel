<template>
    <div class="pt-12 pb-4">
        <ul class="flex justify-center gap-2">
            <!-- Previous Button -->
            <li v-if="currentPage === 1">
                <span class=" rounded-md cursor-not-allowed bg-gray-700 text-white px-2 py-1">❮</span>
            </li>
            <li v-else>
                <span @click="paginateHandler" data-button="prev" class="rounded-md cursor-pointer bg-green-700 text-white px-2 py-1">❮</span>
            </li>
             <!-- Previous Button -->
            
             <!-- Page Number -->
            <li v-for="(number, idx) in pageNumber">
                <span v-if="currentPage === number.page" class="rounded-md bg-red-700 text-white px-2 py-1 cursor-not-allowed">
                    {{ number.page }}
                </span>
                <span v-else :class="`rounded-md  cursor-pointer bg-green-700 text-white px-2 py-1`" @click="paginateHandler"
                    :data-pageNumber="number.page" data-button="number">{{ number.page }}</span>
            </li>
            <!-- Page Number -->

            <!-- Next Button -->
            <li v-if="currentPage === lastPageNumber">
                <span class="rounded-md cursor-not-allowed bg-gray-700 text-white px-2 py-1">❯</span>
            </li>
            <li v-else>
                <span @click="paginateHandler" data-button="next" class="rounded-md cursor-pointer bg-green-700 text-white px-2 py-1">❯</span>
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

// Current Page
const currentPage = ref(1)
// Per page Item
const perPage = ref(20)
// Total Item Count
const total = res.value._count.name

// Total Page Number
const TotalPage = Math.ceil(total / perPage.value)
// Pagination Button Number Array
const pageNumber = []
for (let i = 0; i < TotalPage; i++) {
    const paginateData = {
        page: i + 1,
        skip: i*perPage.value,
    }
    pageNumber.push(paginateData)
}
// Pagination Button Number Array

// Last Page Number
const lastPage = pageNumber[pageNumber.length -1].page
const lastPageNumber = ref(0)
lastPageNumber.value = lastPage
// Last Page Number


//================== Pagination Button Handler ===============================//
const paginateHandler = (e) => {
    
    const getButton = e.target.getAttribute('data-button')
    console.log(getButton)
    if (getButton === 'prev') {

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

    } else if(getButton === 'next') {
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
    }else{
        // Get Carrent Page
        currentPage.value = parseInt(e.target.getAttribute('data-pageNumber'))
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

}
//================== Pagination Button Handler ===============================//

// Previous Page Button Handler
// const prevPageHandler = (e) => {
    
//     // Get Previous Page
//     const previousPage = currentPage.value - 1
//     // Get Carrent Page
//     currentPage.value = previousPage
//     // Total Page Item
//     const totalPageItem  = parseInt(previousPage * perPage.value).toFixed(0)
//     // Skip Item
//     const skip = totalPageItem - perPage.value
//     // Take Item
//     const take = perPage.value

//     const data = {
//         skip: skip,
//         take: take
//     }
//     console.log(data)

// }


// Next Page Button Handdler 
// const nextPageHandler = (e) => {

//    // Get Next Page
//     const nextPage = currentPage.value + 1
//     // Get Current Page
//     currentPage.value = nextPage
//     // Total Page Item
//     const totalPageItem  = parseInt(nextPage * perPage.value).toFixed(0)
//     // Skip Item
//     const skip = totalPageItem - perPage.value
//     // Take Item
//     const take = perPage.value

//     const data = {
//         skip: skip,
//         take: take
//     }
//     console.log(data)   
// }

</script>

<style lang="scss" scoped></style>