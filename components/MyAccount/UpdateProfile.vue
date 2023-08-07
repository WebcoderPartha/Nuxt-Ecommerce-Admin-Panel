<template>
    <div class="w-[500px] mx-auto px-8 py-4 border border-slate-200">
        <h2 class="text-2xl mb-3 text-center">Your Profile</h2>
        <form action="">
            <div class="flex flex-col gap-4">
                <div class="relative w-28 mx-auto group">
                    <nuxt-img class="rounded-full h-28 group-hover:opacity-50"
                        :src="getResponse.image" />
                    <Icon @click="uploadImage" class="text-3xl absolute top-10 -right-4 cursor-pointer"
                        name="ep:camera-filled" />
                </div>
                <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" v-model="fullname" placeholder="Your name">
                <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" v-model="email" placeholder="Email Address">
                <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" value="Username" disabled>
                <button type="submit" class="mt-4 bg-gray-300 hover:bg-gray-400 py-2">Save Change</button>
            </div>
        </form>
    </div>
</template>

<script setup>
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
    
    // Get Auth User
    const {data:getResponse, refresh} = await useFetch("/api/frontend/myaccount/profile/getuser", {
        method: "GET"
    })
    // Get Auth User
    const image = ref('') 
    const fullname = ref('') 
    const email = ref('') 
  
    // image.value = getResponse.value.image
    // fullname.value = getResponse.value.fullname
    // email.value = getResponse.value.email

// upload Image
const uploadImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
        // console.log(e.target.files[0])
        const file = e.target.files[0]
        if (file.size > 1048570) {
            Toast.fire({
                icon: "warning",
                title: "File must not be less then 1 MB",
            });
        } else {
            const reader = new FileReader()
            reader.onload = async (event) => {
                const { data: uiresponse} = await useFetch('/api/frontend/myaccount/profile/uploadimg', {
                    method: 'PUT',
                    body: {
                        image: event.target.result
                    }
                })
                Toast.fire({
                    icon: "success",
                    title: uiresponse.value.success,
                });
                refresh()
            }
            reader.readAsDataURL(file)
         
        }
    }

    input.click()
   
}
// upload Image




</script>

<style lang="scss" scoped></style>