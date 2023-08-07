<template>
  <div class="max-w-[1200px] mx-auto py-8">
    <Head>
      <Title>My Account</Title>
    </Head>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div class="md:col-span-1 bg-gray-100 text-center">
        <nav>
          <ul>
            <li
              :class="`${
                tabState === 'orderlist' && 'bg-gray-300'
              } py-2 px-4 border-b cursor-pointer hover:bg-gray-300`"
              @click="tabActionHandler"
              data-tabs="orderlist"
            >
              Orders
            </li>
            <li
              :class="`${
                tabState === 'password' && 'bg-gray-300'
              } hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`"
              @click="tabActionHandler"
              data-tabs="password"
            >
              Change Password
            </li>
            <li
              :class="`${
                tabState === 'profile' && 'bg-gray-300'
              } hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`"
              @click="tabActionHandler"
              data-tabs="profile"
            >
              Profile
            </li>
            <li
              :class="`hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`"
              @click="logoutHander"
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
      <div class="md:col-span-3 min-h-[300px]">
        <!-- Order List -->
        <div v-if="tabState === 'orderlist'">
            <MyAccountOrderList />
        </div>
        <!-- Order List -->

        <!-- Profile -->
        <div class="duration-300" v-if="tabState === 'password'">
          <MyAccountChangePassword />
        </div>
        <!-- Profile -->
        <!-- Change Password -->
        <div class="duration-300" v-if="tabState === 'profile'">
            <div class="w-[500px] mx-auto px-8 py-4 border border-slate-200">
              <h2 class="text-2xl mb-3 text-center">Your Profile</h2>
              <form action="">
                <div class="flex flex-col gap-4">
                  <div class="relative w-28 mx-auto group">
                    <nuxt-img class="rounded-full group-hover:opacity-50" src="https://media.e-valy.com/cms/products/images/c9cc7d04-ae44-4b2f-b7a1-a25f88c5cb00" />
                    <Icon @click="uploadImage" class="text-3xl absolute top-10 -right-4 cursor-pointer" name="ep:camera-filled" />
                  </div>
                  <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" placeholder="Your name">
                  <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" placeholder="Email Address">
                  <input type="text" class="bg-gray-100 focus:outline-none rounded-sm px-4 py-1" value="Username" disabled>
                  <button type="submit" class="mt-4 bg-gray-300 hover:bg-gray-400 py-2">Save Change</button>
                </div>
             
              </form>
            </div>
        </div>
        <!-- Change Password -->
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: "ecommerce",
});

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

const { data: authUser, signOut } = useAuth();

// Authenticate before load
onBeforeMount(() => {
  if (authUser && authUser?.value?.user?.role !== "customer") {
    navigateTo("/auth/login");
  }
});
// Authenticate

// upload Image
const uploadImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    // console.log(e.target.files[0])
    const file = e.target.files[0]
    if(file.size > 1048570){
          Toast.fire({
          icon: "warning",
          title: "File must not be less then 1 MB",
          });
    }else{
      const reader = new FileReader()
      reader.onload = async (event) => {
        const {data:uiresponse, error} = await useFetch('/api/frontend/myaccount/profile/uploadimg', {
          method: 'PUT',
          body: {
            image: event.target.result
          }
        })
        Toast.fire({
          icon: "success",
          title:uiresponse.value.success,
          });
    
      }
      reader.readAsDataURL(file)
    }
  }

  input.click()
}
// upload Image

// Dynamic Tabs
const tabState = ref("orderlist");
const tabActionHandler = (e) => {
  tabState.value = e.target.getAttribute("data-tabs");
};
// Dynamic Tabs



// Logout Handler
const logoutHander = async () => {
  await signOut({ redirect: false });
  navigateTo("/");
  Toast.fire({
    icon: "success",
    title: "Logout successfully!",
  });
};
// Logout Handler
</script>

<style lang="scss" scoped></style>
