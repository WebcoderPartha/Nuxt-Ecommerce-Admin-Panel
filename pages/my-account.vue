<template>
  <div class="max-w-[1200px] mx-auto py-8">

    <Head>
      <Title>My Account</Title>
    </Head>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div class="md:col-span-1 bg-gray-100 text-center">
        <nav>
          <ul>
            <li :class="`${tabState === 'orderlist' && 'bg-gray-300'
              } py-2 px-4 border-b cursor-pointer hover:bg-gray-300`" @click="tabActionHandler" data-tabs="orderlist">
              Orders
            </li>
            <li :class="`${tabState === 'password' && 'bg-gray-300'
              } hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="password">
              Change Password
            </li>
            <li :class="`${tabState === 'profile' && 'bg-gray-300'
              } hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="tabActionHandler" data-tabs="profile">
              Profile
            </li>
            <li :class="`hover:bg-gray-300 py-2 px-4 border-b cursor-pointer`" @click="logoutHander">
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

        <!-- Change Password -->
        <div class="duration-300" v-if="tabState === 'password'">
          <MyAccountChangePassword />
        </div>
        <!-- Change Password -->

        <!-- Profile -->
        <div class="duration-300" v-if="tabState === 'profile'">
          <MyAccountUpdateProfile />
        </div>
        <!-- Profile -->
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: "ecommerce",
});



const { data: authUser, signOut } = useAuth();

// Authenticate before load
onBeforeMount(() => {
  if (authUser && authUser?.value?.user?.role !== "customer") {
    navigateTo("/auth/login");
  }
});
// Authenticate


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
