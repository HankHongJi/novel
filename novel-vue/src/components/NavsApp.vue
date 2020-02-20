<template>
    <van-tabbar v-model="active" active-color="#F60" route>
        <van-tabbar-item icon="home-o" @click.native="reset" replace to="/">书架</van-tabbar-item>
        <van-tabbar-item icon="apps-o" replace to="/class">分类</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import init from '@/service/init'
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
    name: "lading",
    data() {
        return {
            active: 0,
            init: init
        }
    },
    methods: {
        reset(){
            this.init.value = '',
            this.init.list = Object.values(this.init.bookshelf);
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
