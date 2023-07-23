<template>
    <div class="max-w-[1200px] mx-auto">
        <Head>
            <Title>Biggest Ecommerce Website</Title>
        </Head>
        <!-- Category & Banner -->
        <div class="md:flex md:gap-2">
            <div class="bg-[#f3fee3] px-6 py-3 min-w-[300px] mx-auto">
               <h3 class="text-xl font-semibold">Categories</h3>
              <ul>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span class="text-sm"> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span class="text-sm"> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span class="text-sm"> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
              </ul>
            </div>
            <div class=" flex-1">
               <div class="max-w-[891px]">
                <Slider />
               </div>
            </div>
        </div>

        <div class="ProductSlider my-6">
            <ProductSlider />
        </div>
        <!-- All Products -->
        <div class="allProduct">
            <AllProducts />
        </div>
    
    </div>
</template>

<script setup>
definePageMeta({
    layout:'ecommerce'
})
</script>

<style lang="scss" scoped>

</style>