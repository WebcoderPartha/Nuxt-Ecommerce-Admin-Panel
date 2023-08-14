<template>
    <div class="bg-white shadow-sm shadow-slate-200 fixed top-0 w-full z-10 md:hidden px-4 py-2">
        <header class="">
            <div class="flex justify-between items-center mb-2">

                <div class="flex gap-4 items-center justify-center">
                    <div class="bg-[#79bc62] cursor-pointer text-white px-1 rounded-sm">
                        <Icon @click="mobileMenuOpen" class="text-2xl" name="ic:baseline-menu" />
                    </div>
                    <NuxtLink to="/">
                        <img class="mx-auto w-24"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                            alt="">
                    </NuxtLink>
                </div>
                <div class="flex gap-2 justify-center item-center">
                    <NuxtLink to="/wishlist" class="h-full mt-2">
                        <Icon :class="`${router.name === 'wishlist' && 'text-red-500'} text-2xl text-gray-600`"
                            name="material-symbols:favorite-outline-rounded" />
                    </NuxtLink>
                    <NuxtLink to="/cart"
                        class="text-stone-950 pt-1 text-xl hover:rounded-md cursor-pointer relative h-full">
                        <Icon name="material-symbols:shopping-cart-sharp" />
                        <div class="" v-if="addCart?.length > 0">
                            <span
                                class="animate-ping inline-flex w-3 h-3 rounded-full bg-sky-400 opacity-75 absolute top-1 left-3"></span>
                            <span class=" absolute top-1 left-3 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </div>
                    </NuxtLink>
                    <NuxtLink v-if="!isAuthenticated" to="/auth/login"
                        class="h-full text-stone-950 px px-2 py-2 hover:rounded-md cursor-pointer">
                        <Icon name="fa6-regular:user" />

                    </NuxtLink>
                    <NuxtLink v-else to="/my-account" class="text-stone-950 px px-2 py-2 hover:rounded-md cursor-pointer">
                        <Icon name="fa6-regular:user" />
                        <span class="ml-1 text-sm">My Account</span>
                    </NuxtLink>
                    <Icon @click="logoutHander" v-if="isAuthenticated" name="ph:sign-out-fill"
                        class="text-xl mt-3 cursor-pointer" />
                </div>
            </div>
            <div class="md:w-[500px] w-full mx-auto">
                <input type="text" class="bg-gray-100 text-gray-400 px-3 py-2 rounded-md w-full focus:outline-none"
                    placeholder="Search">
            </div>


        </header>
    </div>
</template>
    

<script setup>
// Current Route for Checking dynamic route path
const router = useRouter().currentRoute

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

const { status, signOut } = useAuth()
const isAuthenticated = computed(() => status.value === 'authenticated')
const logoutHander = async () => {
    await signOut({ redirect: false })
    navigateTo('/')
    Toast.fire({
        icon: "success",
        title: "Logout successfully!"
    });
}
const addCart = useCarts()

const isVisible = mobileMenu()
const mobileMenuOpen = () => {
    isVisible.value = true
}


</script>

<style lang="scss" scoped></style>