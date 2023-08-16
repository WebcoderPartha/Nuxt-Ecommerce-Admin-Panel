<template>
    <div class="w-[600px] text-center my-8 mx-auto ">

        <Head>
            <Title>SSLCommers Setting</Title>
        </Head>

        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7">
            <h3 class="text-xl font-semibold pt-4 mb-3">SSLCommers Setting</h3>
            <form autocomplete="off">
                <div class="mb-2 flex flex-col gap-2">
                    <label for="">Api Sicret Key</label>

                    <input type="password" class="w-80 bg-gray-900 rounded-md px-3 py-2 place-self-center" v-model="apiKey"
                        placeholder="Product name" />
                </div>

                <div class="mb-2 flex flex-col gap-2">
                    <label for="">Password</label>
                    <input type="psasword" class="w-80 bg-gray-900 rounded-md px-3 py-2 place-self-center" v-model="password"
                        placeholder="" />
                </div>


                <div class="mb-2 mt-5">
                    <input type="submit" class="w-80 bg-black hover:bg-gray-900 cursor-pointer rounded-md px-3 py-2"
                        value="Submit" />
                </div>

            </form>
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


//=========== Sweet Alert Use =============//
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
//=========== Sweet Alert Use =============//


const apiKey = ref('')
const password = ref('')

//=================== Get Category ================== //
const getCategory = useState(() => [])
const { data: categories, refresh } = await useFetch('/api/backend/homecategoryproduct/getall', {
    method: 'GET'
})
getCategory.value = categories




</script>

<style lang="scss" scoped></style>