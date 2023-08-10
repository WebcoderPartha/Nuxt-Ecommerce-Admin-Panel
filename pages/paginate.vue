<template>
    <div class=" w-[1200px] mx-auto">
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
                <span @click="prevPageHandler" :data-prevPage="prevPage" :data-prevSkip="prevSkip" class=" cursor-pointer bg-green-700 text-white px-2 py-1">Prev</span>
            </li>

            <li v-for="number in pageNumber">
                <span v-if="currentPage === number.page" class="bg-red-700 text-white px-2 py-1 cursor-not-allowed">
                    {{ number.page }}
                </span>
                <span v-else :class="` cursor-pointer bg-green-700 text-white px-2 py-1`" @click="paginateHandler"
                    :data-skip="number.skip" :data-page="number.page">{{ number.page }}</span>
            </li>
            <!-- Page Number -->

            <!-- Next Button -->
            <li v-if="currentPage === lastPageNumber">
                <span class=" cursor-not-allowed bg-gray-700 text-white px-2 py-1">Next</span>
            </li>
            <li v-else>
                <span @click="nextPageHandler" :data-nextPage="nextPage" :data-nextSkip="nextSkip" class=" cursor-pointer bg-green-700 text-white px-2 py-1">Next</span>
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
const skiping = ref(0)
const total = res.value._count.name
const TotalPage = Math.ceil(total / perPage.value)
const pageNumber = []

for (let i = 0; i < TotalPage; i++) {
    skiping.value += 20
    const paginateData = {
        page: i + 1,
        skip: skiping.value,
    }
    pageNumber.push(paginateData)
}

// Last Page Number
const lastPage = pageNumber[pageNumber.length -1].page
const lastPageNumber = ref(0)
lastPageNumber.value = lastPage

// Last Page Number

const prevSkip = ref(20)
const prevPage = ref(1)
const nextSkip = ref(40)
const nextPage = ref(2)


// Pagination Button Handler
const paginateHandler = (e) => {

    // Current Page
    currentPage.value = parseInt(e.target.getAttribute('data-page'))
    // Current Skip
    const currentSkip = parseInt(e.target.getAttribute('data-skip'))
    // Current Take
    const currentTake = perPage.value

    // Previous Page
    prevPage.value = currentPage.value - 1
    // Previous Skip
    prevSkip.value = currentSkip - perPage.value

    // Previous Button Data

    //Current Button Data
    const prevData = {
        prevPage: prevPage.value,
        skip: prevSkip.value,
    }

    //Current Button Data
    const currentData = {
        currentPage: currentPage.value,
        skip: prevSkip.value,
    }
    console.log(prevData)
}

// Previous Page Button Handler
const prevPageHandler = (e) => {
    // Current Page
    currentPage.value = parseInt(e.target.getAttribute('data-prevPage'))
    // Current Skip
    const currentSkip = parseInt(e.target.getAttribute('data-prevSkip')) - perPage.value
    // Current Take
    const currentTake = perPage.value

    // Previous Page
    prevPage.value = currentPage.value - 1
    // Previous Skip
    prevSkip.value = currentSkip

    // Previous Button Data
    const prevData = {
        prevPage: prevPage.value,
        skip: prevSkip.value,
    }
    
    // Current Button Data
    const currentData = {
        currentPage: currentPage.value,
        skip: currentSkip
    }
    console.log(prevData)
}

// Next Page Button Handdler 
const nextPageHandler = (e) => {
    // Current Page
    currentPage.value = parseInt(e.target.getAttribute('data-nextPage'))
    // next Page
    nextPage.value = currentPage.value + 1
}

</script>

<style lang="scss" scoped></style>