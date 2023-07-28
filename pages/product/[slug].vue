<template>
    <div class="my-10 max-w-[1200px] mx-auto">
        <div class="flex justify-between">
            <div>
               <img :src="productDetail.image" class=" w-[300px]" alt="">
               <div class="flex gap-2 items-center justify-center my-3">
                <img :src="productDetail.image" class=" w-16" alt="">
                <img :src="productDetail.image" class=" w-16" alt="">
                <img :src="productDetail.image" class=" w-16" alt="">
                <img :src="productDetail.image" class=" w-16" alt="">
               </div>
            </div>
            <div>
                <h3 class=" font-semibold text-2xl">{{ productDetail.name  }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
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