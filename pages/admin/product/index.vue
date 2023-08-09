<template>
  <div class="items-center gap-6 text-center my-8 mx-8">
    <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white">

      <Head>
        <Title>Product List</Title>
      </Head>
      <div class="flex justify-between items-center px-6 py-3">
        <h3 class="text-xl font-semibold pt-4">Product List</h3>
        <NuxtLink to="/admin/product/new" class=" bg-blue-500 rounded-sm text-white px-3 py-1">Add New</NuxtLink>
      </div>
      <div class="px-2 pt-2">
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th class="border">SL</th>
              <th class="border">Product Name</th>
              <th class="border">Category</th>
              <th class="border">Quantity</th>
              <th class="border">Regular Price</th>
              <th class="border">Discount</th>
              <th class="border">Discount Price</th>
              <th class="border">Image</th>
              <th class="border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, idx) in getProductState" :key="product.id">
              <td class="border">{{ idx + 1 }}</td>
              <td class="border">{{ product?.name?.substring(0, 50) + '...' }}</td>
              <td class="border">{{ product.category?.name }}</td>
              <td class="border">{{ product.quantity }}</td>
              <td class="border">{{ product.regular_price }}</td>
              <td class="border">{{ product.discount }}%</td>
              <td class="border">{{ product.discount_price }}</td>
              <td class="border"><img :src="product.image" class="w-16 mx-auto" alt=""></td>
              <td class="border">
                <NuxtLink class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white"
                  :to="`/admin/product/edit/${product.id}`">
                  <Icon name="fa6-regular:pen-to-square" />
                </NuxtLink>&nbsp;
                <button @click="deleteProduct(product.id)"
                  class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white">
                  <Icon name="fa6-regular:trash-can" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="loadMoreHandler" class=" bg-neutral-900 text-white px-4 rounded-md py-2 my-3">Load More</button>
      </div>

    </div>
  </div>
</template>

<script setup>

// definePageMeta({
// middleware: "auth",
// auth: {
//     unauthenticatedOnly: true,
//     navigateAuthenticatedTo: '/',
// },
// });

const { status, data: userData } = useAuth()
// Admin 
onBeforeMount(() => {

  if (status.value === "unauthenticated") {
    navigateTo("/admin/login")
  } else if (userData.value.user.role !== 'admin') {
    navigateTo("/admin/login")
  }

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
const perPage = ref(7)
const getProductState = useState(() => []);
const { data: ptData, refresh } = await useFetch("/api/product/getallproduct", {
  method: "POST",
  body: {
    perPage: perPage.value
  }
});
getProductState.value = ptData


// =============== Load More Product ==============
const loadMoreHandler = async () => {
  perPage.value += 5
  const { data: loadPt, refresh } = await useFetch("/api/product/getallproduct", {
    method: "POST",
    body: {
      perPage: perPage.value
    }
  });
  getProductState.value = loadPt

}
// =============== Load More Product ==============




const discountChange = (e) => {
  if (form.value.regular_price !== "") {
    const disVal = e.target.value;
    const discPrice = (form.value.regular_price * disVal) / 100;
    form.value.discount_price = parseInt(
      form.value.regular_price - discPrice
    ).toFixed(0);
  } else {
    Toast.fire({
      icon: "warning",
      title: "Regular price is required!",
    });
    form.value.discount = "";
  }
};

const deleteProduct = async (productId) => {
  const { data: delptdata } = await useFetch('/api/product/product', {
    method: 'DELETE',
    body: {
      id: productId
    }
  })

  Toast.fire({
    icon: "success",
    title: delptdata.value.success
  });

  refresh()

}

</script>

<style lang="scss" scoped></style>
