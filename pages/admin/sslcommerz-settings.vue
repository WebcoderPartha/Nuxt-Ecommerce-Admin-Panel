<template>
    <div class="w-[600px] text-center my-8 mx-auto ">

        <Head>
            <Title>SSLCommers Setting</Title>
        </Head>

        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7">
            <h3 class="text-xl font-semibold pt-4 mb-3">SSLCommers Setting</h3>
            <form @submit.prevent="updateSSLCommerz" autocomplete="off">
                <div class="mb-2 flex flex-col gap-2">
                    <label for="">Api Sicret Store Key</label>
                    <div class="flex items-center justify-center relative">
                        <input type="password"
                            class="w-80 bg-gray-900 rounded-md px-3 py-2 place-self-center focus:outline-none" id="storeId"
                            v-model="apiKey" placeholder="Api store id" />
                        <Icon class="text-2xl absolute right-[150px] cursor-pointer text-green-600" v-if="isStoreId"
                            @click="storeIdHandler" name="entypo:eye" />
                        <Icon class="text-2xl absolute right-[150px] cursor-pointer" v-else @click="storeIdHandler"
                            name="entypo:eye-with-line" />
                    </div>
                </div>

                <div class="mb-2 flex flex-col gap-2">
                    <label for="">Store Password</label>
                    <div class="flex items-center justify-center relative">
                        <input type="password"
                            class="w-80 bg-gray-900 rounded-md px-3 py-2 place-self-center focus:outline-none"
                            v-model="password" placeholder="Store password" id="storePass" />
                        <Icon class="text-2xl absolute right-[150px] cursor-pointer text-green-600" v-if="isStorePassword"
                            @click="passwordHandler" name="entypo:eye" />
                        <Icon class="text-2xl absolute right-[150px] cursor-pointer" v-else @click="passwordHandler"
                            name="entypo:eye-with-line" />
                    </div>
                </div>
                <div class="mb-2 flex flex-col gap-2">
                    <label for="">Callback URL</label>
                    <div class="flex items-center justify-center relative">
                        <input type="text"
                            class="w-80 bg-gray-900 rounded-md px-3 py-2 place-self-center focus:outline-none"
                            v-model="callback_url" placeholder="http://www.example.com" />
                    </div>
                </div>
                <div class="mb-2 flex flex-col gap-2">
                    <label for="">API Mode</label>
                    <select
                        class="w-80 bg-gray-900 mx-auto rounded-md px-3 py-2 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-blue-300"
                        v-model="sandbox">
                        <option value="1">Live</option>
                        <option value="0">Test</option>
                    </select>
                </div>
                <div class="mb-2 mt-5">
                    <input type="submit" class="w-80 bg-black hover:bg-gray-900 cursor-pointer rounded-md px-3 py-2"
                        value="Save" />
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
const sandbox = ref('')
const callback_url = ref('')

//=================== Get SSLCommerz ================== //

const { data: resSSL, refresh } = await useFetch("/api/backend/sslcommerz/getsslcommerz", {
    method: 'GET'
})
apiKey.value = resSSL?.value?.store_id
password.value = resSSL?.value?.store_password
sandbox.value = resSSL?.value?.sandbox
callback_url.value = resSSL?.value?.callback_url

//=================== Get SSLCommerz ================== //


//=================== Update SSLCommerz ================== //
const updateSSLCommerz = async () => {

    if (apiKey.value.length === 0) {
        Toast.fire({
            icon: 'warning',
            text: 'Store ID is required!'
        })
    } else if (password.value.length === 0) {
        Toast.fire({
            icon: 'warning',
            text: 'Store password is required!'
        })
    }else if (callback_url.value.length === 0) {
        Toast.fire({
            icon: 'warning',
            text: 'Callback url is required!'
        })
    } else {
        const { data: res } = await useFetch("/api/backend/sslcommerz/sslcommerz", {
            method: "PUT",
            body: {
                store_id: apiKey.value,
                store_password: password.value,
                sandbox: sandbox.value,
                callback_url: callback_url.value
            }
        })

        Toast.fire({
            icon: 'success',
            text: res.value.success
        })
    }
}

//=================== Update SSLCommerz ================== //

// Store ID Show / Hide
const isStoreId = ref(true)

const storeIdHandler = () => {
    if (isStoreId.value === false) {
        document.getElementById('storeId').type = 'password'
        isStoreId.value = true
    } else {
        document.getElementById('storeId').type = 'text'
        isStoreId.value = false
    }
}
// Store Password Show / Hide

// Store Password Show / Hide
const isStorePassword = ref(true)

const passwordHandler = () => {
    if (isStorePassword.value === false) {
        document.getElementById('storePass').type = 'password'
        isStorePassword.value = true
    } else {
        document.getElementById('storePass').type = 'text'
        isStorePassword.value = false
    }
}
// Store Password Show / Hide




</script>

<style lang="scss" scoped></style>