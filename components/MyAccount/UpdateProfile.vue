<template>
    <div class="w-[500px] mx-auto px-8 py-4 border border-slate-200">
        <h2 class="text-2xl mb-3 text-center">Your Profile</h2>
        <form action="">
            <div class="flex flex-col gap-4">
                <div class="relative w-28 mx-auto group">
                    <nuxt-img class="rounded-full group-hover:opacity-50"
                        src="https://media.e-valy.com/cms/products/images/c9cc7d04-ae44-4b2f-b7a1-a25f88c5cb00" />
                    <Icon @click="uploadImage" class="text-3xl absolute top-10 -right-4 cursor-pointer"
                        name="ep:camera-filled" />
                </div>
                <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" placeholder="Your name">
                <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" placeholder="Email Address">
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
                const { data: uiresponse, error } = await useFetch('/api/frontend/myaccount/profile/uploadimg', {
                    method: 'PUT',
                    body: {
                        image: event.target.result
                    }
                })
                Toast.fire({
                    icon: "success",
                    title: uiresponse.value.success,
                });

            }
            reader.readAsDataURL(file)
        }
    }

    input.click()
}
// upload Image

</script>

<style lang="scss" scoped></style>