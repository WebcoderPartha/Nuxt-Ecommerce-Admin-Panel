<template>
    <div class="my-10 max-w-[1200px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5 md:mx-0 item-center">
            <div>
                <!-- <img :src="productDetail.image" class=" w-[300px]" alt=""> -->
                <div class=" max-w-xl">
                    <inner-image-zoom :src="useImageZoom.imageSrc" zoomType="hover" :zoomSrc="useImageZoom.zoomSrc" />
                </div>
                <div class="flex gap-2 items-center my-2">
                    <img @click="onChangeImageEvent" :src="img.image" v-for="(img, idx) in productDetail.gallery" :key="idx"
                        class="w-24 cursor-pointer" alt="">

                </div>
            </div>
            <div>
                <h3 class=" font-semibold text-2xl">{{ productDetail.name }}</h3>
                <p class=" my-3">Category: <span class=" font-semibold">{{ productDetail.category.name }}</span></p>
                <span class="my-3 rounded-sm bg-red-600 px-2 py-1 text-white" v-if="productDetail.quantity === '0'">
                    Stock Out
                </span>
                <span class=" my-3 rounded-sm bg-[#79bc62] px-2 py-1 text-white" v-else>
                    Available
                </span>
                <div class="flex gap-3 justify-between items-center mt-6">
                    <div class="flex items-center gap-2">
                        <span>Qty:</span>

                        <Icon v-if="quantity === 1" name="ic:twotone-minus"
                            class="border text-2xl bg-white cursor-not-allowed" />
                        <Icon v-else name="ic:twotone-minus" @click="decrementQty"
                            class="border text-2xl bg-white cursor-pointer" />
                        <span class="border w-8 h-6 px-1 text-center">{{ quantity }}</span>
                        <Icon @click="incrementQty" name="ic:twotone-plus"
                            class="border text-2xl bg-white cursor-pointer" />
                    </div>
                </div>


                <div class="flex flex-col gap-1">
                    <div class="flex flex-col gap-2" v-if="productDetail.discount !== '0'">
                        <span class="font-extrabold text-neutral-600 text-xl md:text-2xl mt-4 mb-3">BDT {{ productDetail.regular_price }}</span>
                        <div class="flex w-36 gap-3 px-5 py-2 rounded-sm text-[#00a88a] bg-[#e5fffa]">
                            <Icon class="text-[16px] font-semibold mt-[5px]" name="ph:credit-card-duotone" />
                            <span class=" font-extrabold">BDT {{ productDetail.discount_price }}</span>
                        </div>
                    </div>

                    <p class="text-base font-extrabold text-neutral-600 mt-8" v-else>
                    </p>
                </div>

                <div class="flex gap-6 mt-5 border-t border-b py-4">
                    <button @click="addToCart(productDetail.id)"
                        class="bg-[#00a88a] text-white px-4 md:px-8 md:py-3 font-semibold py-2 rounded-sm mb-3 md:mb-0"> ADD TO CART </button>
                    <div class="mt-2">Stock: {{ productDetail.quantity }}</div>
                </div>

            </div>

        </div>
        <!-- Releted Product -->
        <!-- <div class="my-10">
            <ProductSlider />
        </div> -->
    </div>
</template>

<script setup>
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';

definePageMeta({
    layout: 'ecommerce'
})

// Product page slug
const productSlug = useRoute().params.slug
// Global product detail Composables
const productDetail = usePtDetails()
// GetProductBySlug
const { data: ptdetail, refresh } = await useFetch('/api/frontend/product/productdetail', {
    method: 'POST',
    body: {
        slug: productSlug
    },
    key: "data" + productSlug
})
productDetail.value = ptdetail
// GetProductBySlug
// Page Title
useHead({
    title: productDetail.value?.name
})

// ========== Image Zoom ================
const useImageZoom = useState(() => ({
    imageSrc: '',
    zoomSrc: ''
}))

useImageZoom.value.imageSrc = ptdetail.value.image
useImageZoom.value.zoomSrc = ptdetail.value.image

const onChangeImageEvent = (e) => {
    useImageZoom.value.imageSrc = e.target.src
    useImageZoom.value.zoomSrc = e.target.src
}
// ========== Image Zoom ================

const quantity = ref(1)
// Qty Increment 
const incrementQty = () => {
    quantity.value++
}
// Qty Decrement 
const decrementQty = () => {
    quantity.value--
}

const addcart = useCarts()
if (process.client) {
    addcart.value = JSON.parse(localStorage.getItem('cart')) || []
}
// Add To Cart
const addToCart = async (id) => {
    const { data: cartProduct } = await useFetch(`/api/frontend/product/${id}`, {
        method: 'GET'
    })


    const addData = {
        id: cartProduct.value.id,
        name: cartProduct.value.name,
        price: (cartProduct.value.discount === '0') ? cartProduct.value.regular_price : cartProduct.value.discount_price,
        quantity: quantity.value,
        image: cartProduct.value.image,
        total: (cartProduct.value.discount === '0') ? cartProduct.value.regular_price : cartProduct.value.discount_price
    }

    const getCartData = JSON.parse(localStorage.getItem('cart')) || []
    const foundCartItem = getCartData.find(item => item.id === id)

    if (foundCartItem) {

        for (let i = 0; i < getCartData.length; i++) {
            if (getCartData[i].id === foundCartItem.id) {
                getCartData[i] = {
                    id: foundCartItem.id,
                    name: foundCartItem.name,
                    price: foundCartItem.price,
                    quantity: foundCartItem.quantity + quantity.value,
                    image: foundCartItem.image,
                    total: foundCartItem.price * (foundCartItem.quantity + quantity.value)
                }
                localStorage.setItem('cart', JSON.stringify(getCartData));
                quantity.value = 1
            }
        }

    } else {
        getCartData.push(addData)
        localStorage.setItem('cart', JSON.stringify(getCartData))
        addcart.value = JSON.parse(localStorage.getItem('cart'))
        quantity.value = 1
    }

}



</script>

<style lang="scss" scoped></style>