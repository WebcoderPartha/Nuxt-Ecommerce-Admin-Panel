<template>
  <div class="grid grid-cols-1 md:grid-cols-1 items-center gap-6 text-center my-8 mx-8">

    <Head>
      <Title>Add Product</Title>
    </Head>

    <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7">
      <h3 class="text-xl font-semibold pt-4 mb-3">Add Product</h3>
      <form @submit.prevent="storeProduct" autocomplete="off">
        <div class="mb-2">
          <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" v-model="form.name"
            placeholder="Product name" />
        </div>

        <div class="mb-2">
          <select
            class="w-80 bg-gray-900 mx-auto rounded-md px-3 py-2 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-blue-300"
            v-model="form.category_id">
            <option value="">Choose product category</option>
            <option v-for="(category, idx) in getCategory" :key="idx" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" v-model="form.regular_price"
            placeholder="Regular price" />
        </div>
        <div class="mb-2">
          <input type="text" v-model="form.discount" @change="discountChange"
            class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Discount" />
        </div>
        <div class="mb-2">
          <input type="text" v-model="form.discount_price" class="w-80 mx-auto bg-gray-900 rounded-md px-3 py-2 "
            placeholder="discount price" />
        </div>
        <div class="mb-2">
          <input type="text" v-model="form.quantity" class="w-80 bg-gray-900 rounded-md px-3 py-2"
            placeholder="Quantity" />
        </div>
        <div class="mb-2">
          <input type="file" @change="imageHadler" class="w-80 bg-gray-900 rounded-md px-3 py-2" />
        </div>
        <div class="mb-2 w-[200px] mx-auto" v-if="form.image">
          <img :src="form.image" class="rounded" alt="" />
        </div>
        <div class="mb-2">
          <input type="submit" class="w-80 bg-black hover:bg-gray-900 cursor-pointer rounded-md px-3 py-2"
            value="Submit" />

        </div>
      </form>
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

const getCategory = useState(() => []);
const { data: getCtData } = await useFetch("/api/category/category", {
  method: "GET",
});
getCategory.value = getCtData;


const form = useState(() => ({
  name: '',
  category_id: '',
  regular_price: '',
  discount: '',
  discount_price: '',
  quantity: '',
  image: '',
}))


const discountChange = (e) => {
  if (form.value.regular_price !== '') {
    const disVal = e.target.value
    const discPrice = (form.value.regular_price * disVal) / 100
    form.value.discount_price = parseInt(form.value.regular_price - discPrice).toFixed(0)

  } else {
    Toast.fire({
      icon: "warning",
      title: "Regular price is required!",
    });
    form.value.discount = ''
  }
};

// Upload Image Data
const imageHadler = (e) => {
  const file = e.target.files[0];
  if (file.size > 1048570) {
    Toast.fire({
      icon: "warning",
      title: "File must not be less then 1 MB",
    });
  } else {
    const reader = new FileReader();
    reader.onload = (event) => {
      form.value.image = event.target.result;
    };

    reader.readAsDataURL(file);
  }
};
// Upload Image Data

const storeProduct = async (e) => {

  if (form.value.name.length > 0 && form.value.category_id !== '' && form.value.regular_price !== '' && form.value.discount !== '' && form.value.discount_price !== '' && form.value.quantity !== '') {
    const uniqueNumber = 100000 + Math.floor(Math.random() * 900000)
    const formData = {
      name: form.value.name,
      category_id: form.value.category_id,
      regular_price: form.value.regular_price,
      discount: form.value.discount,
      discount_price: form.value.discount_price,
      quantity: form.value.quantity,
      slug: form.value.name.replaceAll(' ', '-') + "-" + uniqueNumber,
      image: form.value.image,
    }

    const { data: postData } = await useFetch('/api/product/product', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    Toast.fire({
      icon: "success",
      title: postData.value.success
    });
    e.target.reset()
    form.value.name = ''
    form.value.category_id = ''
    form.value.regular_price = ''
    form.value.discount = ''
    form.value.discount_price = ''
    form.value.quantity = ''
    form.value.image = ''
    navigateTo('/admin/product')

  } else {
    Toast.fire({
      icon: "warning",
      title: "Field must not be empty!",
    });
  }
}

</script>
  
<style lang="scss" scoped></style>
  