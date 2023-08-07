<template>
    <div class="max-w-[400px] mx-auto my-10 bg-white rounded-lg border border-slate-300">
        <div class="py-5 px-10">
            <form @submit.prevent="signupHandler" autocomplete="off">
                <div class="mb-6">
                    <h2 class="text-2xl text-center">Create your Account</h2>
                </div>
                <div class="flex flex-col gap-4">
                    <label class="">
                        <span>Full Name</span>
                        <div class="">
                            <input type="text" v-model="form.fullname"
                                class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                                placeholder="Enter full name">
                            <span class="text-sm text-red-500">{{ requiredForm?.fullname }}</span>
                        </div>
                    </label>
                    <label class="">
                        <span>Email Address</span>
                        <div class="">
                            <input type="email" v-model="form.email"
                                class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                                placeholder="Enter email address">
                            <span class="text-sm text-red-500">{{ requiredForm?.email }}</span>
                        </div>
                    </label>
                    <label class="">
                        <span>Username</span>
                        <div class="">
                            <input type="text" v-model="form.username"
                                class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                                placeholder="Enter username">
                            <span class="text-sm text-red-500">{{ requiredForm?.username }}</span>
                        </div>
                    </label>
                    <label class="">
                        <span>Password</span>
                        <div class="">
                            <input type="password" v-model="form.password"
                                class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="********"
                                autocomplete="on">
                            <span class="text-sm text-red-500">{{ requiredForm?.password }}</span>
                        </div>
                    </label>
                    <label class="">
                        <span>Confirm Password</span>
                        <div class="">
                            <input type="password" v-model="form.conformPassword"
                                class=" bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full" placeholder="********"
                                autocomplete="on">
                            <span class="text-sm text-red-500">{{ requiredForm?.conformPassword }}</span>
                        </div>
                    </label>
                    <button class="bg-black text-white py-2 rounded-md">Create Account</button>


                    <div class="flex items-center justify-center py-4 gap-3">
                        <p>Already have an account? </p>
                        <NuxtLink to="/auth/login">Sign In</NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import bcrypt from 'bcryptjs'
useHead({
    title: 'Sign Up Page'
})
definePageMeta({
    layout: 'ecommerce',

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

// Form State
const form = useState(() => ({
    fullname: '',
    email: '',
    username: '',
    password: '',
    conformPassword: ''
}))

const requiredForm = useState(() => ({
    fullname: '',
    email: '',
    username: '',
    password: '',
    conformPassword: ''
}))

// Nuxt Auth
const { status, signIn } = useAuth()

// if Authenticate condition
onBeforeMount(() => {
    if (status.value === 'authenticated') {
        navigateTo('/')
    }
    requiredForm.value.fullname = ''
    requiredForm.value.username = ''
    requiredForm.value.email = ''
    requiredForm.value.password = ''
    requiredForm.value.conformPassword = ''

    form.value.fullname = ''
    form.value.username = ''
    form.value.email = ''
    form.value.password = ''
    form.value.conformPassword = ''
})

// Signup Method
const signupHandler = async (e) => {
    if (!form.value.fullname.length > 0 && !form.value.email.length > 0 && !form.value.username.length > 0 && !form.value.password.length > 0 && !form.value.conformPassword.length > 0) {
        requiredForm.value.fullname = 'Fullname is required!'
        requiredForm.value.email = 'Email is required!'
        requiredForm.value.username = 'Username is required!'
        requiredForm.value.password = 'Password is required!'
        requiredForm.value.conformPassword = 'Confirm Password is required!'
    } else if (!form.value.email.length) {
        requiredForm.value.email = 'Email is required!'
    } else if (!form.value.fullname.length > 0) {
        requiredForm.value.fullname = 'Full is required!'
    } else if (!form.value.username.length > 0) {
        requiredForm.value.username = 'Username is required!'
    } else if (!form.value.password.length > 0) {
        requiredForm.value.password = 'Password is required!'
    } else if (!form.value.conformPassword.length > 0) {
        requiredForm.value.conformPassword = 'Conform password is required!'
    } else {
        if (form.value.password === form.value.conformPassword) {
            const hashPassword = bcrypt.hashSync(form.value.password, 10)
            const formData = {
                fullname: form.value.fullname,
                email: form.value.email,
                username: form.value.username,
                password: hashPassword
            }

            const { data: response } = await useFetch('/api/auth/frontend/user/user', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            Toast.fire({
                icon: "success",
                title: response.value.success,
            });


            const { error, url } = await signIn('credentials', { username: form.value.username, password: form.value.password, role: 'customer', redirect: false })
            if (error) {
                Toast.fire({
                    icon: "warning",
                    title: "Invalid credentials!",
                });
            } else {

                requiredForm.value.fullname = ''
                requiredForm.value.username = ''
                requiredForm.value.email = ''
                requiredForm.value.password = ''
                requiredForm.value.conformPassword = ''

                form.value.fullname = ''
                form.value.username = ''
                form.value.email = ''
                form.value.password = ''
                form.value.conformPassword = ''
                e.target.reset()

                navigateTo('/')
                Toast.fire({
                    icon: "success",
                    title: "Signup successfully!",
                });
            }

        } else {
            requiredForm.value.conformPassword = 'Confirm password not match!'
        }
    }
}

</script>

<style lang="scss" scoped></style>