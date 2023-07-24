<template>
    <div class="max-w-[400px] mx-auto my-16 bg-white rounded-lg border border-slate-300">
       <div class="py-10 px-10">
            <form @submit.prevent="loginHandler">
                <div class="mb-6">
                 <h2 class="text-2xl text-center">Login your Account</h2>
            </div>
            <div class="flex flex-col gap-4">
                <label class="">
                    <span>Email or Username</span>
                    <div class="">
                        <input v-model="form.emailOrUsername" type="text" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter email or username">
                        <span class="text-sm text-red-500">{{ requiredForm?.emailOrUsername }}</span>
                    </div>
                </label>
                <label class="">
                    <span>Password</span>
                    <div class="">
                        <input v-model="form.password" type="password" class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="Enter password" autocomplete="on">
                        <span class="text-sm text-red-500">{{ requiredForm?.password }}</span>
                    </div>
                </label>
                <button type="submit" class="bg-black text-white py-2 rounded-md">Login</button>
                <div class="flex flex-row items-center mx-auto border rounded-sm px-3 cursor-pointer">
                    <img src="/assets/img/google.svg" width="35" alt="">
                    <span>Sign in with Google</span>
                </div>
                
                <div class="flex items-center justify-center py-4 gap-3">
                    <p>Don't have an account? </p>
                   <NuxtLink to="/auth/signup">Singup</NuxtLink>
                </div>
            </div>
            </form>
       </div>
    </div>
</template>

<script setup>

import bcrypt from  'bcryptjs'

useHead({
    title: 'Login Page'
})
definePageMeta({
    layout:'ecommerce',

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

// Form State
const form = useState(() => ({
    emailOrUsername: '',
    password: ''
}))

const requiredForm = useState(() => ({
    emailOrUsername: '',
    password: ''
}))

const {signIn} = useAuth()
 
const checkPassword = usePassword()

// Login Method
const loginHandler =  async (e) => {
    if(!form.value.emailOrUsername.length > 0 && !form.value.password.length > 0){
        requiredForm.value.emailOrUsername = 'Email or Username is required!'
        requiredForm.value.password = 'Password is required!'
    }else if (!form.value.emailOrUsername.length){
        requiredForm.value.emailOrUsername = 'Email or Username is required!'
    }else if (!form.value.password.length > 0){
        requiredForm.value.password = 'Password is required!'
    }else{
      
        const hashPassword = await bcrypt.hashSync(form.value.password, 10)
       
        const {error, url} = await signIn('credentials', {username:form.value.emailOrUsername, password: form.value.password, role:'customer', redirect:false })
            if(error){
              
                Toast.fire({
                    icon: "warning",
                    title: "Invalid credentials!",
                });
            }else{
                navigateTo('/')
                form.value.emailOrUsername = '';
                form.value.password = '';
                requiredForm.emailOrUsername = '';
                requiredForm.value.password = '';
                e.target.reset()
            
                Toast.fire({
                    icon: "success",
                    title: "Loggin Successfully!",
                });
            }
        
    }
}

</script>

<style lang="scss" scoped>

</style>