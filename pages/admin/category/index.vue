<template>
    <div class=" grid grid-cols-1 md:grid-cols-2 items-center gap-6 text-center my-8 mx-8">
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white">
            <Head>
                <Title>Category</Title>
            </Head>
            <h3 class="text-xl font-semibold pt-4">Category List</h3>
            <div class="px-2 pt-2">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                        <th class="border">SL</th>
                        <th class="border">Name</th>
                        <th class="border">Slug</th>
                        <th class="border">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(category, idx) in getCategory" :key="category.id">
                        <td class="border">{{ idx+1 }}</td>
                        <td class="border">{{ category.name }}</td>
                        <td class="border">{{ category.slug }}</td>
                        <td class="border">
                            <button class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white"><Icon name="fa6-regular:pen-to-square" @click="getIdData(category.id)" /></button>&nbsp;
                            <button @click="deleteData(category.id)" class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white"><Icon name="fa6-regular:trash-can" /></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7" v-if="!getStateIdData">
            <h3 class="text-xl font-semibold pt-4 mb-3">Add Category</h3>
           <form @submit.prevent="storeData">
                <div class=" flex flex-col gap-3 items-center">
                    <input type="text" v-model="name" class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Category name">
                    <input type="submit" class="bg-blue-400 rounded-md px-5 py-2 cursor-pointer" value="submit">
                </div>
           </form>
        </div>

        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7" v-else>
            <h3 class="text-xl font-semibold pt-4 mb-3">Edit Category</h3>
           <form @submit.prevent="updateData">
                <div class=" flex flex-col gap-3 items-center">
                    <input type="text" v-model="name" class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Category name">
                    <input type="submit" class="bg-blue-400 rounded-md px-5 py-2 cursor-pointer" value="Update">
                </div>
           </form>
        </div>
        
 
    </div>
</template>

<script setup>
    // definePageMeta({
        // middleware: 'auth',
        // auth: {
        //     unauthenticatedOnly: true,
        //     navigateAuthenticatedTo: '/',
        // },     
    // })
    
    // Admin 
    const {data:sessionData} = await useFetch('/api/session')

    const {status, data:userData} = useAuth() 
    // Admin 
    onBeforeMount(() => {
    
        if(status.value === "unauthenticated"){
            navigateTo("/admin/login")
        }else if(userData.value.user.role !== 'admin'){
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

    const getCategory = useCategory()
    const {data:categories, refresh, pending} = await useFetch('/api/category/category', {method:'GET'})
    getCategory.value = categories
   

    const name = ref('');
    const storeData = async (e) => {
     
        if(name.value.length !== 0){
            const uniqueNumber = 100000 + Math.floor(Math.random() * 900000)
            const formData = {
                name: name.value,
                slug: name.value.replaceAll(' ', '-')+"-"+uniqueNumber
            }
            const {data:storeDatas, error} = await useFetch('/api/category/category', {method:'POST', body:JSON.stringify(formData)})

            // Notification
            // Toast.fire({
            //     icon: "success",
            //     title: storeDatas.value.success
            // });
            // Reset Form
            e.target.reset()
            name.value = ''
            // Reload category
            refresh()

        }else{
            Toast.fire({
                icon: "warning",
                title: "Field is required!",
            });
        }
    
    } 
    
    const deleteData = async (id) => {
        const {data:deleteData} = await useFetch('/api/category/category', {
            method:'DELETE', 
            body: {
            id: id
            }
    })
  
        // Notification
        Toast.fire({
                icon: "success",
                title: deleteData.value.success
            });
        // Reload category
         refresh()
    }

    const getStateIdData = useState(()=> '')
    const getIdData = async (idpass) => {
        const {data:idData} = await useFetch('/api/category/getid', {
            method: 'POST',
            body: {
                id: idpass
            }
        })
        getStateIdData.value = idData
        name.value = idData.value.name
    } 

    const updateData = async (e) => {
        if(name.value.length !== 0){
            const formData = {
                name: name.value,
                id: getStateIdData.value.id
            }
            const {data:storeDatas, error} = await useFetch('/api/category/update', {
                method:'PUT', 
                body:JSON.stringify(formData)
            })

            // Notification
            Toast.fire({
                icon: "success",
                title: storeDatas.value.success
            });
            // Reset Form
            e.target.reset()
            name.value = ''
            // Reload category
            refresh()
            getStateIdData.value = ''

        }else{
            Toast.fire({
                icon: "warning",
                title: "Field is required!",
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>