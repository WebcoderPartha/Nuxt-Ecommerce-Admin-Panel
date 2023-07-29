<template>
    <div class="my-10 max-w-[1200px] mx-auto">
        <div class="flex justify-between">
            <div>
               <!-- <img :src="productDetail.image" class=" w-[300px]" alt=""> -->
               <div class="w-[300px]">
                <inner-image-zoom :src="productDetail.image" zoomScale="0.9" zoomType="hover" :zoomSrc="productDetail.image" />
               </div>
               <div class="flex gap-2 items-center justify-center my-3">
                <img :src="productDetail.image" class=" w-16" alt="">
             
               </div>
            </div>
            <div>
                <h3 class=" font-semibold text-2xl">{{ productDetail.name  }}</h3>
                <p class=" my-3">Category: <span class=" font-semibold">{{ productDetail.category.name }}</span></p>
                <span class="my-3 rounded-md bg-red-600 px-2 py-1 text-white" v-if="productDetail.quantity === '0'">
                    Stock Out
                </span>
                <span class=" my-3 rounded-md bg-green-700 px-2 py-1 text-white" v-else>
                    Available
                </span>
                <p class="text-base font-extrabold my-4" v-if="productDetail.discount !== '0'">
                    <span class="line-through text-red-600 text-sm">BDT {{ productDetail.regular_price }}</span> BDT {{ productDetail.discount_price }} 
                </p>
                <p class="text-base font-extrabold my-4" v-else>
                    BDT {{ productDetail.regular_price }} 
                </p>

                <div class="flex gap-3 mt-5">
                    <button class="bg-red-500 text-white md:px-2 py-1 rounded-md mb-3 md:mb-0"> Add to Cart </button>
                    <button class="bg-yellow-500 text-white md:px-2 py-1 rounded-md"> Buy Now </button>
                </div>
                
            </div>
        </div>
        <!-- Releted Product -->
        <div class="my-10">
            <ProductSlider />
        </div>
    </div>
</template>

<script setup>
    import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
    import InnerImageZoom from 'vue-inner-image-zoom';

    definePageMeta({
        layout: 'ecommerce'
    })
    
    const productSlug = useRoute().params.slug
    const productDetail = usePtDetails()
    const {data:ptdetail, refresh} = await useFetch('/api/frontend/product/productdetail',{
        method: 'POST',
        body: {
            slug: JSON.stringify(productSlug.toString)
        }
    })
    productDetail.value = ptdetail
    useHead({
        title: productDetail.value?.name
    })

</script>

<style lang="scss" scoped>

</style>