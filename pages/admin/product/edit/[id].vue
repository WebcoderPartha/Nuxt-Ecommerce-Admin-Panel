<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center my-8 mx-3 ">

    <Head>
      <Title>Edit Product</Title>
    </Head>

    <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7">
      <h3 class="text-xl font-semibold pt-4 mb-3">Edit Product</h3>
      <form @submit.prevent="update" autocomplete="off">
        <div class="mb-2">
          <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" v-model="form.name"
            placeholder="Product name" />
        </div>

        <div class="mb-2">
          <select
            class="w-80 bg-gray-900 mx-auto rounded-md px-3 py-2 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-blue-300"
            v-model="form.categoryId">
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
          <input type="file" @change="imageHadler" multiple class="w-80 bg-gray-900 rounded-md px-3 py-2" />
        </div>
       
        <div class="mb-2">
          <input type="submit" class="w-80 bg-black hover:bg-gray-900 cursor-pointer rounded-md px-3 py-2"
            value="Submit" />
        </div>
        
      </form>
    </div>
    <div v-if="images?.length > 0" class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-7">
      <h3 class="text-2xl font-semibold text-white py-2">Product Gallery</h3>
    <div class="grid grid-cols-5 gap-3 px-5"  >
        <div v-for="(image, idx) in images">
          <div class=" relative">
            <nuxt-img :src="image.image" class="w-32 rounded mx-2" alt="" />   
            <Icon @click="removeImage(idx)" class=" cursor-pointer bg-red-500 absolute -top-1 rounded-full w-5 h-5 text-white -right-0" name="material-symbols:close-rounded" />
          </div>
        </div>
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

  const {status, data:userData} = useAuth() 
    // Admin 
    onBeforeMount(() => {
    
        if(status.value === "unauthenticated"){
            navigateTo("/admin/login")
        }else if(userData.value.user.role !== 'admin'){
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
    
  const form = useState(()=> ({
    name: '',
    categoryId: '',
    regular_price: '',
    discount: '',
    discount_price: '',
    quantity: ''
  }))
  const images = useState(() => [])
// Get ID By Product

    const route = useRoute().params
    const {data:idProduct, refresh:productReresh} = await useFetch('/api/product/getidbyproduct', {
        method: 'POST',
        body: {
            id: parseInt(route.id)
        }
  })
  form.value = idProduct.value

  // const getImages = idProduct.value.gallery
  
  form.value.gallery.forEach(gallery => {
    images.value.push({
      image: gallery.image
    })
  })
  images.value = [...new Map(images.value.map(item=> [item['image'], item])).values()]
  
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
  
//============ Upload Image Data ===========
const imageHadler = (e) => {
  const files = e.target.files
    for (let i = 0; i < files.length; i++){
          let reader = new FileReader()
          reader.onload = (event) => {
              let data = {
                  image: event.target.result
              }
              images.value.push(data)
          }
          reader.readAsDataURL(files[i])
      }
};
//============ Upload Image Data ===========
// ========== Remove image with index ==========
const removeImage = (index) => {
  images.value.splice(index, 1)
}
// ========== Remove image with index ==========
  
  const update = async (e) => {
    
      if(form.value.name.length > 0 && form.value.categoryId !== '' && form.value.regular_price !== '' && form.value.discount !== '' && form.value.discount_price !== '' && form.value.quantity !== ''){
        const formData = {
          name: form.value.name,
          categoryId:  form.value.categoryId,
          regular_price:  form.value.regular_price,
          discount: form.value.discount,
          discount_price: form.value.discount_price,
          quantity: form.value.quantity,
          images: images.value,
          id: route.id
        }
  
        const {data:updateData} = await useFetch('/api/product/update', {
          method: 'PUT',
          body: JSON.stringify(formData)
        })
        Toast.fire({
              icon: "success",
              title: updateData.value.success
          });
          e.target.reset()
          form.value.name = ''
          form.value.categoryId = ''
          form.value.regular_price = ''
          form.value.discount = ''
          form.value.discount_price = ''
          form.value.quantity = ''
          images.value = []
          productReresh()
          navigateTo('/admin/product')
         
  
      }else{
        Toast.fire({
            icon: "warning",
            title: "Field must not be empty!",
        });
      }
  }
  
  </script>
  
  <style lang="scss" scoped></style>
  