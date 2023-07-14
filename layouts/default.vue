<template>
    <div class="flex">
        <div :class="`${menuOpen ? 'w-72' : 'w-24'} duration-500 bg-[#2e323a]`">
            <div class="flex py-4 px-6 bg-black items-center relative">
                <Icon :class="`${menuOpen && 'rotate-[360deg]'} duration-700 text-white text-2xl mt-1 mr-4`" name="foundation:lightbulb" />
                <h2 :class="`text-white duration-700 text-2xl ${!menuOpen && 'hidden'}`">Admin</h2>
                <Icon @click="menuOpenHandler" name="typcn:arrow-shuffle" :class="`absolute right-3 top-4 cursor-pointer text-2xl mt-1 text-white ml-28 bg-[#333333] py-1`" />
            </div>
            <nav>
                <ul>
                    <li v-for="(menu,i) in allMenu" @click="OpenSubmenu(menu.title, i)" :key="i" :class="`${menu.space ? 'mt-6 mb-6' : ''}`">
                        <div class="cursor-pointer px-6 py-3 hover:bg-[#262930]">
                            <Icon :name="menu.icon" class="text-2xl mr-3 text-white" />
                            <span :class="`text-white ${menuOpen ? ' visible' : 'hidden'} duration-300`">{{ menu.title }}</span>
                            <span v-if="submenuIndex  !== i">
                                <Icon v-if="menu.submenu" :name="menu.plusIcon" :class="` duration-500 text-2xl float-right text-white`" />
                            </span>
                            <span v-else>
                                <Icon v-if="menu.submenu" :name="menu.minusIcon" :class="` duration-500 text-2xl float-right text-white`" />
                            </span>
                        </div>
                        <ul class="bg-[#282c33]" v-if="menu.submenu && submenuIndex  === i && menuOpen">
                            <li class="cursor-pointer px-16 py-3 hover:bg-[#262930] text-white" v-for="(sbmenu, id) in menu.submenuItems" :key="id">
                                <NuxtLink :to="sbmenu.link">{{ sbmenu.title }}</NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                
            </nav>
        </div>
        <div class="flex-1 bg-gray-900">
            <HeaderTop />
            <slot />
        </div>
    </div>
</template>

<script setup>
   useHead({
    title: 'Admin Panel',
 
   })

   const allMenu = [
    {
        title: 'Dashboard',
        link: '/',
        icon: 'mdi:monitor',
        space: true,
        submenu: false
    },
    {
        title: 'Category',
        link: '/',
        icon: 'mdi:monitor',
        plusIcon: 'ic:round-plus',
        minusIcon: 'ic:round-minus',
        submenu: true,
        submenuItems: [
            {
                title: 'Add Category',
                link: '/category'
            },
            {
                title: 'Category List',
                link: '/category'
            }
        ]
    },
    {
        title: 'Product',
        link: '/',
        icon: 'mdi:monitor',
        plusIcon: 'ic:round-plus',
        minusIcon: 'ic:round-minus',
        submenu: true,
        submenuItems: [
            {
                title: 'Add Product',
                link: '/product/new',
            },
            {
                title: 'Product List',
                link: '/product',
            }
        ]
    }
   ]


   const submenuIdxState = useState(() => [])
    allMenu.forEach((item, allIdx) => {
        submenuIdxState.value.push({subIndex:allIdx})
        submenuIdxState.value = [...new Map(submenuIdxState.value.map(item => [item['subIndex'], item])).values()]
    })

   // Submenu 
   const submenuIndex = ref(null)
   const OpenSubmenu = (menuTitle, menuIndex) => {
    if(submenuIndex.value === menuIndex){
        submenuIndex.value = null
    }else{
        const matchMenuIdx = allMenu.findIndex(itm => itm.title === menuTitle)
        if(matchMenuIdx === menuIndex){
            submenuIndex.value = matchMenuIdx
        }
    }

   }

   const menuOpen = ref(true)
   const menuOpenHandler = () => {
        if(menuOpen.value === true){
            menuOpen.value = false
        }else{
            menuOpen.value = true
        }
   }

</script>

<style lang="scss" scoped>
 
</style>