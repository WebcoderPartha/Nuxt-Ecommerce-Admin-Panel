<template>
    <div class="max-w-[1200px] mx-auto">
        <!-- Category & Banner -->
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
               <div class="max-w-[891px]">
                <Slider />
               </div>
            </div>
        </div>

        <!-- All Products -->
        <div class="allProduct">
            <div class="text-center py-2 my-2 shadow-md shadow-purple-300 bg-purple-400">
                <h2 class="text-2xl">All Products</h2>
            </div>
            <div class=" grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 lg:grid-cols-5 p-4 md:p-0">
                
                <!-- Product Item -->
                <div class="border rounded-md p-1  ">
                    <div class=" relative overflow-hidden">
                        <img class=" hover:scale-125 duration-300" src="https://media.e-valy.com/cms/products/images/31b4f9fc-0512-405d-9598-aaaba19eb19b?h=250&w=250" alt="">
                        <span class=" bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0">New</span>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Product Name</h2>
                        <p class=" text-base"><span class=" line-through text-red-600 text-sm">$246</span> $246</p>
                    </div>
                    <div class="flex md:items-center md:flex-row md:justify-between mt-4 mb-4 px-3 flex-col">
                        <button class=" bg-red-500 text-white md:px-2 py-1 rounded-md mb-3">Add to Cart</button>
                        <button class=" bg-yellow-500 text-white md:px-2 py-1 rounded-md">Buy Now</button>
                    </div>
                </div> 
                <!-- End Product Item -->

                        <!-- Product Item -->
                        <div class="border rounded-md p-1  ">
                    <div class=" relative overflow-hidden">
                        <img class=" hover:scale-125 duration-300" src="https://media.e-valy.com/cms/products/images/31b4f9fc-0512-405d-9598-aaaba19eb19b?h=250&w=250" alt="">
                        <span class=" bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0">New</span>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Product Name</h2>
                        <p class=" text-base"><span class=" line-through text-red-600 text-sm">$246</span> $246</p>
                    </div>
                    <div class="flex items-center justify-between mt-4 mb-4 px-3">
                        <button class=" bg-red-500 text-white md:px-2 py-1 rounded-md">Add to Cart</button>
                        <button class=" bg-yellow-500 text-white md:px-2 py-1 rounded-md">Buy Now</button>
                    </div>
                </div> 
                <!-- End Product Item -->
                        <!-- Product Item -->
                        <div class="border rounded-md p-1  ">
                    <div class=" relative overflow-hidden">
                        <img class=" hover:scale-125 duration-300" src="https://media.e-valy.com/cms/products/images/31b4f9fc-0512-405d-9598-aaaba19eb19b?h=250&w=250" alt="">
                        <span class=" bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0">New</span>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Product Name</h2>
                        <p class=" text-base"><span class=" line-through text-red-600 text-sm">$246</span> $246</p>
                    </div>
                    <div class="flex items-center justify-between mt-4 mb-4 px-3">
                        <button class=" bg-red-500 text-white md:px-2 py-1 rounded-md">Add to Cart</button>
                        <button class=" bg-yellow-500 text-white md:px-2 py-1 rounded-md">Buy Now</button>
                    </div>
                </div> 
                <!-- End Product Item -->
                        <!-- Product Item -->
                        <div class="border rounded-md p-1  ">
                    <div class=" relative overflow-hidden">
                        <img class=" hover:scale-125 duration-300" src="https://media.e-valy.com/cms/products/images/31b4f9fc-0512-405d-9598-aaaba19eb19b?h=250&w=250" alt="">
                        <span class=" bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0">New</span>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Product Name</h2>
                        <p class=" text-base"><span class=" line-through text-red-600 text-sm">$246</span> $246</p>
                    </div>
                    <div class="flex items-center justify-between mt-4 mb-4 px-3">
                        <button class=" bg-red-500 text-white md:px-2 py-1 rounded-md">Add to Cart</button>
                        <button class=" bg-yellow-500 text-white md:px-2 py-1 rounded-md">Buy Now</button>
                    </div>
                </div> 
                <!-- End Product Item -->
                        <!-- Product Item -->
                        <div class="border rounded-md p-1  ">
                    <div class=" relative overflow-hidden">
                        <img class=" hover:scale-125 duration-300" src="https://media.e-valy.com/cms/products/images/31b4f9fc-0512-405d-9598-aaaba19eb19b?h=250&w=250" alt="">
                        <span class=" bg-red-400 text-white absolute px-3 py-1 rounded-md top-0 right-0">New</span>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Product Name</h2>
                        <p class=" text-base"><span class=" line-through text-red-600 text-sm">$246</span> $246</p>
                    </div>
                    <div class="flex items-center justify-between mt-4 mb-4 px-3">
                        <button class=" bg-red-500 text-white md:px-2 py-1 rounded-md">Add to Cart</button>
                        <button class=" bg-yellow-500 text-white md:px-2 py-1 rounded-md">Buy Now</button>
                    </div>
                </div> 
                <!-- End Product Item -->
                
         
                
             
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