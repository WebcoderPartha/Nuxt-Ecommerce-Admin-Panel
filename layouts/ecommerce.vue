<template>
    <div class="overflow-hidden">
        <Header />
        <div class="main mt-[13rem] md:mt-32 py-4">
            <slot/>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
    useHead({
        link: [
            {
                rel:'icon',
                href: '/assets/img/google.svg'
            }
        ]
    })
</script>

<style lang="scss" scoped>

</style>