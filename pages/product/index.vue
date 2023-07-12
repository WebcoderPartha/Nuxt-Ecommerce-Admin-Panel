<template>
    <div class=" grid grid-cols-1 md:grid-cols-1 items-center gap-6 text-center my-8 mx-8">
        <Head>
                <Title>Add Product</Title>
            </Head>
        
    
        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7" >
            <h3 class="text-xl font-semibold pt-4 mb-3">Add Category</h3>
           <form>
            <div class="mb-2">
                <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" v-model="name" placeholder="Product name">
           </div>

           <div class="mb-2">
            <select class="w-80 bg-gray-900 mx-auto rounded-md px-3 py-2 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-blue-300" v-model="category_id">
                <option value="">Choose product category</option>
                <option v-for="(category, idx) in getCategory" :key="idx" :value="category.id">{{ category.name }}</option>
            </select>
           </div>
           <div class="mb-2">
                <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" v-model="regular_price" placeholder="Regular price">
           </div>
           <div class="mb-2">
                <input type="text" v-model="discount" @change="discountChange"  class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Discount">
           </div>
           <div class="mb-2">
                <input type="text" v-model="discount_price" class="w-80 mx-auto bg-gray-900 rounded-md px-3 py-2" placeholder="discount price">
           </div>
           <div class="mb-2">
                <input type="text" v-model="quantity" class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Quantity">
           </div>
           <div class="mb-2">
                <input type="file" @change="imageHadler" class="w-80 bg-gray-900 rounded-md px-3 py-2">
           </div>
            <div class="mb-2 w-[200px] mx-auto" v-if="image">
                <img :src="image" class=" rounded" alt="">
           </div>
           <div class="mb-2">
                <input type="submit" class="w-80 bg-black hover:bg-gray-900 cursor-pointer rounded-md px-3 py-2" value="Submit">
           </div>
           </form>
        </div>

        
       
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth',
        // auth: {
        //     unauthenticatedOnly: true,
        //     navigateAuthenticatedTo: '/',
        // },     
    })
// ===========Sweet Alert Use =============//
    const { $swal } = useNuxtApp();
    const Toast = $swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", $swal.stopTimer);
        toast.addEventListener("mouseleave", $swal.resumeTimer);
    },
    });
// ===========Sweet Alert Use =============//

const getCategory = useState(()=> [])
const {data:getCtData} = await useFetch('/api/category/category', {method: 'GET'})
getCategory.value = getCtData

const name = ref('')
const category_id = ref('')
const regular_price = ref('')
const discount = ref('')
const discount_price = ref('')
const quantity = ref('')
const image = ref('')

const discountChange = (e) => {
    if(regular_price.value.length > 0){
       const discountValue = e.target.value
       discount_price.value = parseFloat(regular_price.value - ((regular_price.value * discountValue) / 100)).toFixed(0)
    }else{
        Toast.fire({
            icon: "warning",
            title: "Regular price is required!",
        });
        discount.value = ''
    }
}

const imageHadler = (e) => {
    const file = e.target.files[0]
    if(file.size > 1048570){
        Toast.fire({
            icon: "warning",
            title: "File must not be less then 1 MB",
        });
    }else{

        const reader = new FileReader()
        reader.onload = (event) => {
            image.value = event.target.result
        }

        reader.readAsDataURL(file)

    }
    

}


</script>

<style lang="scss" scoped>

</style>