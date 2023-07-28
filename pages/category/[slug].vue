<template>
    <div>
        {{ categorySlug }}
    </div>
</template>

<script setup>

definePageMeta({
    layout:'ecommerce'
})
    const categorySlug = useRoute().params.slug
</script>

<style lang="scss" scoped>

</style>