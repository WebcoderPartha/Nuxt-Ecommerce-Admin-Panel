<template>
  <div>
    <form @submit.prevent="orderNowHandler">
      <div class="flex flex-col gap-3 bg-gray-100 px-6 py-12">
        <div class="flex justify-between">
          <h2>Sub Total</h2>
          <ClientOnly>
            <p class="font-semibold">BDT {{ subtotal }}</p>
          </ClientOnly>
        </div>
        <div class="flex justify-between mb-5">
          <h2>Sub Total</h2>
          <ClientOnly>
            <p class="font-semibold">BDT {{ subtotal }}</p>
          </ClientOnly>
        </div>
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold">Payment Method</h2>
          <div class="flex gap-2">
            <input
              @change="onClickPayMethod"
              id="cash"
              class="cursor-pointer"
              type="radio"
              name="payment_method"
              value="Cash On Delivery"
            />
            <label for="cash" class="cursor-pointer">Cash On Delivery</label>
          </div>
          <div class="flex gap-2">
            <input
              @change="onClickPayMethod"
              id="cheque"
              class="cursor-pointer"
              type="radio"
              name="payment_method"
              value="Cheque"
            />
            <label for="cheque" class="cursor-pointer">Cheque</label>
          </div>
          <div class="flex gap-2">
            <input
              @change="onClickPayMethod"
              id="bank"
              class="cursor-pointer"
              type="radio"
              name="payment_method"
              value="Bank Transfer"
            />
            <label for="bank" class="cursor-pointer">Bank Transfer</label>
          </div>
        </div>
        <button
          type="submit"
          class="bg-slate-950 text-white px-3 py-1 mt-4 cursor-pointer"
        >
          Order Now
        </button>
      </div>
    </form>
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

// =========== Subtotal =============//
const cartPrice = useCartPrice();
if (process.client) {
  cartPrice.value = JSON.parse(localStorage.getItem("subtotal"));
}
const subtotal = computed(() => cartPrice.value);
// =========== Subtotal =============//

// =========== Payment Method value assign =============//
const payMethod = ref("");
const onClickPayMethod = (e) => {
  payMethod.value = e.target.value;
  refresh();
};
// =========== Payment Method value assign =============//

const { data: authUser } = useAuth();
const { data: shipAdresGet, refresh } = await useFetch(
  `/api/frontend/shipping/${authUser?.value?.user?.id}`,
  {
    method: "GET",
  }
);


// =========== Order Handler =============//
const orderNowHandler = async (e) => {
  refresh();
  if (shipAdresGet?.value) {
    if (payMethod.value.length > 0) {
      const formData = {
        carts: JSON.parse(localStorage.getItem('cart')),
        payment_method: payMethod.value,
        userId: authUser?.value?.user?.id
      }

      const {data:orderNow, error} = await useFetch("/api/frontend/order/successorder", {
        method: 'POST',
        body: formData
      })
      const addCart = useCarts()
      const cartPrice = useCartPrice()
      cartPrice.value = 0
      addCart.value = []
      localStorage.removeItem('cart')
      localStorage.removeItem('subtotal')
      const placedOrder = usePlacedOrderData()
      placedOrder.value = orderNow.value.order
      navigateTo('/order-success')
     
    } else {
      Toast.fire({
        icon: "warning",
        title: "Select payment method!",
      });
    }
  } else {
    Toast.fire({
        icon: "warning",
        title: "Fillup shipping address!",
    });
  }
};
// =========== Order Handler =============//
</script>

<style lang="scss" scoped></style>
