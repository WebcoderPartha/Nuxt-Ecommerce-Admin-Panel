<template>
    <div class="py-4">
       <div class=" grid grid-cols-1 md:grid-cols-2 gap-6 text-center my-2 mx-8">
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
                            <th class="border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, idx) in getCategory.category" :key="category.id">
                            <td class="border">{{ idx + 1 }}</td>
                            <td class="border">{{ category?.name }}</td>
                            <td class="border">{{ category?.slug }}</td>
                            <td class="border"><nuxt-img v-if="category?.image" :src="category?.image" class="w-10" /></td>
                            <td class="border">
                                <button class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white">
                                    <Icon name="fa6-regular:pen-to-square" @click="getIdData(category.id)" />
                                </button>&nbsp;
                                <button @click="deleteData(category.id)"
                                    class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white">
                                    <Icon name="fa6-regular:trash-can" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7 h-96" v-if="!getStateIdData">
            <h3 class="text-xl font-semibold pt-4 mb-3">Add Category</h3>
            <form @submit.prevent="storeData">
                <div class=" flex flex-col gap-3 items-center">
                    <input type="text" v-model="name" class="w-80 bg-gray-900 rounded-md px-3 py-2"
                        placeholder="Category name">
                        <input type="file" @change="imageHadler" class="w-80 bg-gray-900 rounded-md px-3 py-2"
                        placeholder="Category name">
                    <img v-if="image" class=" w-32 mx-auto" :src="image" alt="">
                    <input type="submit" class="bg-blue-400 rounded-md px-5 py-2 cursor-pointer" value="submit">
                </div>
            </form>
        </div>

        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7 h-96" v-else>
            <h3 class="text-xl font-semibold pt-4 mb-3">Edit Category</h3>
            <form @submit.prevent="updateData">
                <div class=" flex flex-col gap-3 items-center">
                    <input type="text" v-model="name" class="w-80 bg-gray-900 rounded-md px-3 py-2"
                        placeholder="Category name">
                    <input type="file" @change="imageHadler" required class="w-80 bg-gray-900 rounded-md px-3 py-2"
                        placeholder="Category name">
                    <img v-if="image" class=" w-32 mx-auto" :src="image" alt="">
                    <input type="submit" class="bg-blue-400 rounded-md px-5 py-2 cursor-pointer" value="Update">
                </div>
            </form>
        </div>
    </div>

        <div class="pt-3">
            <BankendPagination :per_page="perPage" :total="total" @paginate="paginateHandler" />
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
const { data: sessionData } = await useFetch('/api/session')

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

// Paginate 
const total = ref(0)
const perPage = ref(7)
const skip  = ref(0)

//=================== Get Category ================== //
const getCategory = useCategory()
const { data: categories, refresh, pending } = await useFetch("/api/category/getallcategory", { 
    method: "POST",
    body: {
        skip:skip.value,
        take: perPage.value
    } 
})
getCategory.value = categories
total.value = getCategory.value.total
//=================== Get Category ================== //

//================= Pagination Handler ===============//
const paginateHandler = async (skip) => {
    const { data: categories, refresh, pending } = await useFetch("/api/category/getallcategory", { 
        method: "POST",
        body: {
            skip: skip,
            take: perPage.value
        } 
    })
    getCategory.value = categories
}
//================= Pagination Handler ===============//
const name = ref('');
const image = ref('')
// =============== Upload Image Data ===========
const imageHadler = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048570) {
        Toast.fire({
            icon: "warning",
            title: "File must not be less then 1 MB",
        });
    } else {
        const reader = new FileReader();
        reader.onload = (event) => {
            image.value = event.target.result;
        };

        reader.readAsDataURL(file);
    }
};
// ============ Upload Image Data =================

//================== Store Category  ===============//

const storeData = async (e) => {

    if (name.value.length !== 0) {
        const uniqueNumber = 100000 + Math.floor(Math.random() * 900000)
        const formData = {
            name: name.value,
            slug: name.value.replaceAll(' ', '-') + "-" + uniqueNumber,
            image: image.value
        }
        const { data: storeDatas, error } = await useFetch('/api/category/category', { method: 'POST', body: JSON.stringify(formData) })

        // Notification
        // Toast.fire({
        //     icon: "success",
        //     title: storeDatas.value.success
        // });
        // Reset Form
        e.target.reset()
        name.value = ''
        image.value = ''
        // Reload category
        refresh()

    } else {
        Toast.fire({
            icon: "warning",
            title: "Field is required!",
        });
    }

}
// ============== Store Category ================= //


// ============== Delete Category ================// 
const deleteData = async (id) => {
    const { data: deleteData } = await useFetch('/api/category/category', {
        method: 'DELETE',
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
// ================ Delete Category ===============

// ============ Get Id By Category ================
const getStateIdData = useState(() => '')
const getIdData = async (idpass) => {
    const { data: idData } = await useFetch('/api/category/getid', {
        method: 'POST',
        body: {
            id: idpass
        }
    })
    getStateIdData.value = idData
    name.value = idData.value.name
}

// ================= Get Id By Category ==============


// =================== Update Category ==================
const updateData = async (e) => {
    if (name.value.length !== 0) {
        const uniqueNumber = 100000 + Math.floor(Math.random() * 900000)
        const formData = {
            name: name.value,
            id: getStateIdData.value.id,
            slug: name.value.replaceAll(' ', '-') + "-" + uniqueNumber,
            image: image.value
        }
        const { data: storeDatas, error } = await useFetch('/api/category/update', {
            method: 'PUT',
            body: JSON.stringify(formData)
        })

        // Notification
        Toast.fire({
            icon: "success",
            title: storeDatas.value.success
        });
        // Reset Form
        e.target.reset()
        name.value = ''
        image.value = ''
        // Reload category
        refresh()
        getStateIdData.value = ''

    } else {
        Toast.fire({
            icon: "warning",
            title: "Field is required!",
        });
    }
}
// ================== Update Category ================
</script>

<style lang="scss" scoped></style>