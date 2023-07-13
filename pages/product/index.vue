<template>
  <div
    class="items-center gap-6 text-center my-8 mx-8"
  >
    <div
      class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white"
    >
      <Head>
        <Title>Category</Title>
      </Head>
      <h3 class="text-xl font-semibold pt-4">Category List</h3>
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
            <tr>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">sdf</td>
              <td class="border">
                <button
                  class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white"
                >
                  <Icon
                    name="fa6-regular:pen-to-square"
                  
                  /></button
                >&nbsp;
                <button
                 
                  class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white"
                >
                  <Icon name="fa6-regular:trash-can" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  // auth: {
  //     unauthenticatedOnly: true,
  //     navigateAuthenticatedTo: '/',
  // },
});
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

const getProductState = useState(() => []);
const { data: ptData, refresh } = await useFetch("/api/product/product", {
  method: "GET",
});

getProductState.value = ptData
console.log(getProductState.value)


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
</script>

<style lang="scss" scoped></style>
