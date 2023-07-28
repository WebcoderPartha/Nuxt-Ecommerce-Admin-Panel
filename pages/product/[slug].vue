<template>
    <div class="my-10 max-w-[1200px] mx-auto">
        <div class="flex justify-between items-center">
            <div>
               hssdfs
            </div>
            <div>sdf</div>
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
    console.log(ptdetail.value)

</script>

<style lang="scss" scoped>

</style>