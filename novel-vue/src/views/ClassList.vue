<template>
    <div class="class-list">
        <van-tabs v-model="active" @click="onClick">
            <van-tab :title="row.name" v-for="(row, key) in ranking" :key="key">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    v-if="active == key"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <van-card
                        v-for="(item, index) in list"
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
                </van-list>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import Vue from 'vue';
import { List , Card, tag, Tab, Tabs} from 'vant';
Vue.use(List).use(tag).use(Card).use(Tab).use(Tabs);
import init from '@/service/init'

export default {
    name: "home",
    data() {
        return {
            init: init,
            bgurl: require('../assets/bj.jpg'),
            query: this.$route.query,
            ranking: [
                {name: '综合', code: 0},
                {name: '周排行', code: 1},
                {name: '月排行', code: 2},
                {name: '总排行', code: 3},
            ],
            list: [],
            loading: false,
            finished: false,
            page: 1,
            active: 0,

        }
    },
    created(){
        this.init.checkFull()
    },
    methods: {
        onClick(name, title) {
            this.list = [];
            this.page = 0;
            this.finished = false;
        },
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            let total = this.list.length
            this.$http.get(`/api/queryClass?className=${this.query.className}&page=${this.page}&code=${this.active}`,
            {noLoading: true}).then(({ data })=> {
                this.list= this.list.concat(data);
                this.page++;
                 // 加载状态结束
                this.loading = false;
                if (this.list.length == total || this.active ) {
                    this.finished = true;
                }
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
    .class-list{
        padding-bottom: 50px;
    }
</style>



