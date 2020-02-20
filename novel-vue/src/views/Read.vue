<template>
    <div class="read">
        <div class="nav_box" :style="{top: openNav ? 0 : '-46px'}">
            <van-nav-bar
                :title="info.title"
                left-text="返回"
                right-text="目录"
                left-arrow
                @click-left="goback"
                @click-right="$router.push({path: '/list', query: info})"
            />
        </div>
        <div class="content" ref="content" @click="openNav = !openNav" @scroll.passive="getScroll($event)">
            <div class="item" v-for="(item, index) in bookData.chapter" :key="index" >
                <h3>{{item.title}}</h3>
                <div class="chapter" v-html="item.text"></div>
            </div>
            <p class="no-more" v-if="finished">没有更多章节</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import init from '@/service/init'
import { NavBar, Dialog } from 'vant';
Vue.use(Dialog).use(NavBar)
export default {
    name: "read",
    data() {
        return {
            init: init,
            value: '',
            bgurl: require('../assets/bj.jpg'),
            list: [],
            info: this.$route.query,
            loading: false,
            finished: false,
            openNav: false,
            bookData:{
                pageIndex: 0,
                chapter: [],
                chapterList: [],
                scrollTop: 0 
            }
        }
    },
    created() {
        this.initFun();
    },
    methods: {
        // 初始化
        initFun(){
            let bookData = localStorage.getItem( `bookData${this.info.id}`);
            if(bookData){
                this.bookData = JSON.parse(bookData);
                this.getChapterList()
            }
            this.getChapterList().then(() => {
                if(!this.bookData.chapter.length){
                    this.getChapter()
                }
            })
            this.$nextTick(() => {
                if(this.bookData.scrollTop) this.$refs.content.scrollTop= this.bookData.scrollTop;
            })
        },
        // 获取章节列表
        getChapterList(){
            return this.$http.get(`/api/queryChapterList?prefix=${this.info.prefix}&bookId=${this.info.id}`, 
            {noLoading: this.bookData.chapterList.length && this.bookData.chapter.length}).then(({ data })=> {
                this.bookData.chapterList = data;
                this.setbookData();
            })
        },
        // 获取章节详情
        getChapter(){
            this.loading = true;
            this.$http.get(`/api/queryChapter?prefix=${this.info.prefix}&bookId=${this.info.id}&chapterId=${this.bookData.chapterList[this.bookData.pageIndex].id}`, 
            {noLoading: this.bookData.chapter.length}).then(({ data })=> {
                this.bookData.chapter.push(data);
                this.loading = false
                this.bookData.pageIndex++;
                if (this.bookData.pageIndex >= this.bookData.chapterList.length) {
                    this.finished = true;
                }
            })
        },
        // 滑动事件
        getScroll(event) {
            // 滚动条距离底部的距离scrollBottom
            let scrollBottom =
                event.target.scrollHeight -
                event.target.scrollTop -
                event.target.clientHeight;
            this.bookData.scrollTop = event.target.scrollTop;
            if (scrollBottom < 300 && !this.loading) {
                this.getChapter()
            }
            this.setbookData();
        },
        // 设置书籍数据
        setbookData(){
            localStorage.setItem( `bookData${this.info.id}`, JSON.stringify(this.bookData))
        },
        // 返回
        goback(){
            if(!this.init.bookshelf[this.info.id]){
                Dialog.confirm({
                    title: '提示',
                    message: '是否加入书架'
                }).then(() => {
                    this.init.addBookshelf(this.info);
                    this.$router.go(-1)
                }).catch(() => {
                    this.$router.go(-1)
                });
            }else{
                this.$router.go(-1)
            }
        }
    },
};
</script>

<style lang="scss">
.read{
    height: 100%;
    .item{
        font-size: 20px;
        h3{
            padding-left: 1em;
            font-size: 24px;
            line-height: 2;
        }
    }
    .content{
        overflow: auto;
        padding: .6em;
        height: 100%;
        background: url('../assets/skin-default-t.ece62.jpg') no-repeat center top,
        url('../assets/skin-default-b.79f06.jpg') no-repeat center bottom,
        url('../assets/skin-default-m.35905.jpg') repeat-y center 119px;
        background-size: 100%;
    }
    .nav_box{
        position: fixed;
        z-index: 99;
        width: 100%;
        top:-46px;
        transition:  top .3s;
    }
    .van-nav-bar{
        background-color: rgba(0,0,0,.9);
    }
    .van-nav-bar__text, .van-nav-bar .van-icon, .van-nav-bar__title{
        color: #fff;
    }
}

</style>



