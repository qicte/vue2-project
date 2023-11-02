<template>
    <div>
        <!-- 三级联动组件 全局组件-->
        <TypeNav />
        <ListContainer />
        <TodayRecommed />
        <Rank />
        <Like />
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :floorList="floor" />
        <Brand />


    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommed from '@/pages/Home/TodayRecommed'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'


export default {
    name: 'Home',
    components: {
        ListContainer,
        TodayRecommed,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        this.$store.dispatch('home/floorList')

    },
    computed: {
        ...mapState('home', ['floorList'])
    }
}
</script>
<style></style>