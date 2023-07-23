<template>
    <div class="max-w-[1200px] mx-auto">
        <div class="md:flex md:gap-2">
            <div class="bg-[#f3fee3] px-6 py-3 min-w-[300px] mx-auto">
               <h3>Category</h3>
              <ul>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
                <li class="py-3 border-b">
                    <NuxtLink to="#">
                        <div class="flex items-center justify-between">
                        <span> Category One</span>
                        <Icon name="fa6-solid:arrow-right" />
                    </div>
                    </NuxtLink>
                </li>
              </ul>
            </div>
            <div class=" flex-1">
               <div class="max-w-[900px]">
                <Slider />
               </div>
            </div>
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