<template>
<div class="bg-white shadow-sm shadow-slate-200 fixed top-0 w-full z-10">
            <header class="max-w-[1200px] mx-auto">
                <div class="md:flex justify-between items-center pt-6">
                    <div>
                        <NuxtLink to="/">
                            <img class="mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" width="150" alt="">
                        </NuxtLink>
                    </div>
                    <div class="md:w-[500px] w-[200px] mx-auto mt-3 md:mt-0">
                        <input  type="text" class="bg-gray-100 text-gray-400 px-3 py-2 rounded-md w-full focus:outline-none" placeholder="Search">
                    </div>
                    <div class="flex gap-2 justify-center">
                        <NuxtLink to="/cart" class="text-stone-950 pt-1 text-xl hover:rounded-md cursor-pointer relative">
                            <Icon name="material-symbols:shopping-cart-sharp" />
                            <div class="" v-if="addCart?.length > 0">
                                <span class="animate-ping inline-flex w-3 h-3 rounded-full bg-sky-400 opacity-75 absolute top-1 left-3"></span>
                                <span class=" absolute top-1 left-3 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </div>
                        </NuxtLink>
                        <NuxtLink v-if="!isAuthenticated" to="/auth/login" class="text-stone-950 px px-2 py-2 hover:rounded-md cursor-pointer">
                            <Icon name="fa6-regular:user" />
                            <span class="ml-2">Sign In</span>
                        </NuxtLink>
                        <a v-else @click="logoutHander" href="#" class="text-stone-950 px px-2 py-2 hover:rounded-md cursor-pointer">
                            <Icon name="fa6-regular:user" />
                            <span class="ml-2">Logout</span>
                        </a>
                    </div>
                </div>
                
                <div class="MenuContainer pt-4 pb-3">
                    <ul class="flex gap-3 text-stone-950 font-semibold justify-center md:justify-normal">
                        <li class="py-2 px-2"><NuxtLink to="/">Home</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Shop</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Account</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="#">Category</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="/cart">Cart</NuxtLink></li>
                        <li class="py-2 px-2"><NuxtLink to="/checkout">Checkout</NuxtLink></li>
                    </ul>
                </div>
            </header>    
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

    const {status, signOut} = useAuth()
    const isAuthenticated = computed(()=> status.value === 'authenticated')
    const logoutHander = async() => {
        await signOut({redirect:false})
        navigateTo('/')
        Toast.fire({
            icon: "success",
            title: "Logout successfully!"
        });
    }

    const addCart = useCarts()
   
</script>

<style lang="scss" scoped>

</style>