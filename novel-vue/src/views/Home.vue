<template>
    <div class="home">
        <van-search
            v-model="init.value"
            show-action
            placeholder="请输入搜索关键词或小说名称"
            @search="onSearch"
            >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-card
            v-for="(item, index) in init.list"
            :key="index"
            :desc="`最新章节：${item.newtitle}`"
            :title="item.title"
            :thumb="init.getImgUrl(item.id)"
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
           
        }
    },
    created(){
        this.init.value = '',
        this.init.list = Object.values(this.init.bookshelf);
        this.init.checkFull()
    },
    methods: {
        onSearch(){
            this.$http.get(`/api/queryName?name=${this.init.value}`).then(({ data })=> {
                this.init.list = data;
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



