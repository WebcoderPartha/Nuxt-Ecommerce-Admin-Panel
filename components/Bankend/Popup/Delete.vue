<template>
    <div @click="bodyCloseHandler" v-if="deletePopupVisible" id="deleteWrapper" class="fixed items-center justify-center flex flex-col inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
        <div class="w-[400px] bg-gray-800 px-6 py-6 gap-6 flex flex-col">
            <h2 class="text-white font-semibold text-2xl text-center">Are you sure to delete?</h2>
            <div class="flex gap-2 justify-end items-end">
                <button @click="buttonClose" class="bg-red-500 px-7 py-1 tex-white">Cancel</button>
                <button class="bg-blue-500 px-7 py-1 tex-white">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const deletePopupVisible = useDeletePopup()
const bodyCloseHandler = (e) => {
    const deleteId = e.target.id
    if(deleteId === 'deleteWrapper'){
        deletePopupVisible.value = false
    }
}
const buttonClose = () => {
    deletePopupVisible.value = false
}
</script>

<style lang="scss" scoped>

</style>