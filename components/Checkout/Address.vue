<template>
  <div>
    <div class="border rounded-md border-zinc-300 p-4 max-w-[400px]" v-if="getShipAddress?.shipping">
      <h2 class="text-2xl font-semibold mb-3">Shipping Address</h2>
      <div class="flex flex-col">
        <h2 class="text-[18px] font-semibold"> {{ getShipAddress?.fullname }}</h2>
        <p>{{ getShipAddress.shipping.address_one }}</p>
        <p>{{ getShipAddress.shipping.address_two }}</p>
        <p>{{ getShipAddress.shipping.area }} {{ getShipAddress.shipping.thana }}</p>
        <p>{{ getShipAddress.shipping.city }}-{{ getShipAddress.shipping.zipecode }}</p>
        <p>{{ getShipAddress.shipping.country }}</p>
      </div>
    </div>
    <div class="border rounded-md border-zinc-300 p-4 max-w-[400px]" v-else>
      <h2 class="text-2xl font-semibold mb-3">Shipping Address</h2>
      <form @submit.prevent="shippingHandler" autocomplete="off">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <input
              type="text"
              v-model="addressForm.address_one"
              placeholder="Address line one"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <span class="text-red-500 text-sm">{{
              validation?.address_one
            }}</span>
          </div>
          <div class="flex flex-col">
            <input
              type="text"
              v-model="addressForm.address_two"
              placeholder="Address line two"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <span class="text-red-500 text-sm">{{
              validation?.address_two
            }}</span>
          </div>
          <div class="flex gap-2">
            <div class="flex flex-col">
              <input
                type="text"
                v-model="addressForm.thana"
                placeholder="Area / Thana"
                class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
              />
              <span class="text-red-500 text-sm">{{
                validation?.thana
              }}</span>
            </div>
            <div class="flex flex-col">
              <input
                type="text"
                v-model="addressForm.zipe_code"
                placeholder="Zip Code"
                class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
              />
              <span class="text-red-500 text-sm">{{
                validation?.zipe_code
              }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="flex flex-col">
            <input
              type="text"
              v-model="addressForm.city"
              placeholder="City"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <span class="text-red-500 text-sm">{{
                validation?.city
              }}</span>
            </div>
            <div class="flex flex-col">
            <input
              type="text"
              v-model="addressForm.country"
              placeholder="Country"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <span class="text-red-500 text-sm">{{
                validation?.country
              }}</span>
            </div>
          </div>
          <button
            class="bg-zinc-950 text-white px-3 py-1 rounded-sm cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const addressForm = useState(() => ({
  address_one: "",
  address_two: "",
  thana: "",
  zipe_code: "",
  city: "",
  country: "",
}));

const validation = useState(() => ({
  address_one: "",
  address_two: "",
  thana: "",
  zipe_code: "",
  city: "",
  country: "",
}));

const {data:authUser} = useAuth()

const {data:getShipAddress, refresh} = await useFetch('/api/frontend/order/'+authUser?.value?.user?.id, {
  method: "GET"
})


const shippingHandler = async (e) => {
 if(addressForm.value.address_one.length === 0){
    validation.value.address_one = 'Field is requried'
  }else if(addressForm.value.address_two.length === 0){
    validation.value.address_two = 'Field is requried'
  }else if(addressForm.value.thana.length === 0){
    validation.value.thana = 'Field is requried'
  }else if(addressForm.value.zipe_code.length === 0){
    validation.value.zipe_code = 'Field is requried'
  }else if(addressForm.value.city.length === 0){
    validation.value.city = 'Field is requried'
  }else if(addressForm.value.country.length === 0){
    validation.value.country = 'Field is requried'
  }else{

    const formAddressData = {
      address_one: addressForm.value.address_one,
      address_two: addressForm.value.address_two,
      thana: addressForm.value.thana,
      zipecode: addressForm.value.zipe_code,
      city: addressForm.value.city,
      country: addressForm.value.country,
      userId: authUser?.value?.user?.id
    }

    const {data:shippData} = await useFetch('/api/frontend/order/shippaddress', {
      method: 'POST',
      body: formAddressData
    })
    // User Address Refresh
    refresh()
    e.target.reset()
    addressForm.value.address_one = ''
    addressForm.value.address_two = ''
    addressForm.value.thana = ''
    addressForm.value.zipe_code = ''
    addressForm.value.city = ''
    addressForm.value.country = ''

    validation.value.address_one = ''
    validation.value.address_two = ''
    validation.value.thana = ''
    validation.value.zipe_code = ''
    validation.value.city = ''
    validation.value.country = ''
    console.log(shippData.value)

  }
}



</script>

<style lang="scss" scoped></style>
