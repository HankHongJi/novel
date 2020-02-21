<template>
    <div class="chapterList" ref="chapterList">
        <div class="nav_box_list">
            <van-nav-bar
                :title="info.title"
                left-text="返回"
                left-arrow
                @click-left="$router.go(-1)"
            />
        </div>
        <van-cell @click="goChapter(item, index)" :class="{'c-red':pageIndex > 0 && pageIndex == index }" v-for="(item, index) in chapterList" :key="index" :title="item.title" />
        <p class="tip no-more">没有更多数据</p>
    </div>
</template>

<script>
import Vue from 'vue';
import { Cell} from 'vant';
Vue.use(Cell);
import init from '@/service/init'

export default {
    name: "chapterList",
    data() {
        return {
            init: init,
            info: this.$route.query,
            chapterList: [],
            pageIndex: 0,
            bookData: {}
        }
    },
    created() {
        this.initFun()
    },
    methods: {
                // 初始化
        initFun(){
            let bookData = localStorage.getItem( `bookData${this.info.id}`);
            if(bookData){
                this.bookData = JSON.parse(bookData);
                this.chapterList =  this.bookData['chapterList'];
                this.pageIndex =  this.bookData['pageIndex'];
                if(this.pageIndex > 5){
                    this.$nextTick(() => {
                        this.$refs.chapterList.scrollTop= (this.pageIndex - 5) * 44;
                    })
                }
            }
        },
        goChapter(item, index){
            this.bookData.pageIndex = index;
            this.bookData.scrollTop = 0;
            this.bookData.chapter = []
            localStorage.setItem( `bookData${this.info.id}`, JSON.stringify(this.bookData))
            this.$router.go(-1);
        }
    },
};
</script>

<style lang="scss">
    .chapterList{
        overflow: auto;
        padding: .6em;
        height: 100%;
        background: url('../assets/skin-default-t.ece62.jpg') no-repeat center top,
        url('../assets/skin-default-b.79f06.jpg') no-repeat center bottom,
        url('../assets/skin-default-m.35905.jpg') repeat-y center 119px;
        background-size: 100%;
        padding-top: 46px;
        .van-cell{
            background-color: transparent;
            &.c-red{
                span{
                    color: red
                }
            }
        }
        .nav_box_list{
            position: fixed;
            z-index: 99;
            width: 100%;
            top:0;
            left: 0;
        }
        .van-nav-bar{
            background-color: rgba(0,0,0,.9);
        }
        .van-nav-bar__text, .van-nav-bar .van-icon, .van-nav-bar__title{
            color: #fff;
            font-size: 16px;
        }
    }
</style>



