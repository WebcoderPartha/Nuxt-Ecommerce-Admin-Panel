<template>
    <div class=" grid grid-cols-1 md:grid-cols-2 items-center gap-6 text-center my-8 mx-8">
        <div class=" bg-gray-800 shadow-md rounded-sm shadow-gray-500 pb-5 text-white">
            <h3 class="text-xl font-semibold pt-4">Category List</h3>
            <div class="px-2 pt-2">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                        <th class="border">SL</th>
                        <th class="border">Name</th>
                        <th class="border">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="border">1</td>
                        <td class="border">Laptop</td>
                        <td class="border">
                            <button class="px-2 py-1 cursor-pointer rounded-md bg-yellow-400 text-white"><Icon name="fa6-regular:pen-to-square" /></button>&nbsp;
                            <button class="px-2 py-1 cursor-pointer rounded-md bg-red-600 text-white"><Icon name="fa6-regular:trash-can" /></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bg-gray-800 shadow-md rounded-sm shadow-gray-500 text-white pb-7">
            <h3 class="text-xl font-semibold pt-4 mb-3">Add Category</h3>
            <div class=" flex flex-col gap-3 items-center">
                <input type="text" class="w-80 bg-gray-900 rounded-md px-3 py-2" placeholder="Category name">
                <input type="submit" class="bg-blue-400 rounded-md px-5 py-2 cursor-pointer" value="submit">
            </div>
        </div>
       
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>