<template>
    <div class="home">
        <van-card
            v-for="(item, index) in list"
            :key="index"
            :desc="`最新章节：${item.newtitle}`"
            :title="item.title"
            :thumb="item.imgUrl"
            @click="onRead(item)"
        >
            <div slot="tags" style="margin-top:28px">
                <van-tag plain type="danger">作者 - {{item.author}}</van-tag>
            </div>
        </van-card>
        <p class="tip">没有更多数据</p>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search , Card, tag} from 'vant';
Vue.use(Search).use(tag).use(Card);
import init from '@/service/init'

export default {
    name: "home",
    data() {
        return {
            init: init,
            bgurl: require('../assets/bj.jpg'),
            query: this.$route.query,
            list: []
        }
    },
    created(){
        this.onSearch()
        this.init.checkFull()
    },
    methods: {
        onSearch(){
            this.$http.get(`/api/queryClass?className=${this.query.className}`).then(({ data })=> {
                this.list = data;
            })
        },
        onRead(item){
            this.$router.push({
                path: '/read',
                query: item
            })
            this.init.screenfull()
        }
    },
};
</script>

<style lang="scss" scoped>
    .tip{
        color: #ccc;
        text-align: center;
        line-height: 3;
    }
</style>



