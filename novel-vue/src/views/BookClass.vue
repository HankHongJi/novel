<template>
    <div class="book-class">
        <van-grid :column-num="3">
            <van-grid-item 
                v-for="(item, index) in list" 
                :key="index" 
                :icon="bgurl" 
                @click="$router.push({path: '/classList', query: item})"
                :text="item.name" />
        </van-grid>
    </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
export default {
    name: "cashViews",
    data() {
        return {
            value: '',
            bgurl: require('../assets/bj.jpg'),
            list: [
                { name: '热门', className: '/s/hot/' },
                { name: '玄幻奇幻', className: '/soft/sort01/' },
                { name: '武侠仙侠', className: '/soft/sort02/' },
                { name: '女频言情', className: '/soft/sort03/' },
                { name: '现代都市', className: '/soft/sort04/' },
                { name: '历史军事', className: '/soft/sort05/' },
                { name: '游戏竞技', className: '/soft/sort06/' },
                { name: '科幻灵异', className: '/soft/sort07/' },
                { name: '美文同人', className: '/soft/sort08/' },
                { name: '名著杂志', className: '/soft/sort010/' }
            ]
        }
    },
    methods: {
        onSearch(){
            this.$http.get(`/api/queryName?name=${this.value}`).then(({ data })=> {
                this.list = data;
            })
        },
        onRead(item){
            this.$router.push({
                path: '/read',
                query: item
            })
        }
    },
};
</script>

<style lang="scss">
    .book-class{
        padding-top: 2em;
        .van-icon__image{
            width: 2.5em;
            height: 2.5em;
        }
        .van-grid-item__text{
            font-size: 14px;
        }
    }
</style>



