<template>
    <div @click="bodyClose" id="closeWrapper" class=" fixed inset-0 bg-black flex justify-center items-center bg-opacity-25  backdrop-blur-sm">
        <div class=" bg-gray-500 p-3 flex flex-col w-[600px]">
            <Icon @click="closeHandler" name="ri:close-fill" class="text-red-500 place-self-end cursor-pointer text-2xl" />
            <div class="">
                <h2>Update Order Status</h2>
                <form action="">
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    const isVisible = useOrderStatusForm()
    const closeHandler = () => {
        isVisible.value = false
    }
    const bodyClose = (e) => {
        if(e.target.id === 'closeWrapper'){
            isVisible.value = false
        }  
    }
</script>

<style lang="scss" scoped></style>