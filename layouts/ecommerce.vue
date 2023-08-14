<template>
    <div class="overflow-hidden">
        <Header />
        <MobileHeader />
        <div class="main mt-24 md:mt-32 py-4">
            <slot/>
        </div>
        <Footer/>
        <MobileMenuContent />
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