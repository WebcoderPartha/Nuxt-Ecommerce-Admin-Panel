<template>
    <div class="w-[990px] mx-auto">
        <div class="flex gap-2">
            <div class="bg-[#f3fee3] px-6 py-3 w-60">
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
                slider
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