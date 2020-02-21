import Vue from 'vue'
import screenfull from 'screenfull'

export default new Vue({
    data(){
        return{
            loadingCount: 0,
            bookshelf: {},
            value: '',
            list: []
        }
    },
    created(){
        let bookshelf = localStorage.getItem('bookshelf');
        if(bookshelf){
            this.bookshelf = JSON.parse(bookshelf);
        }
    },
    methods:{
        addBookshelf(item){
            this.bookshelf[item.id] = item;
            localStorage.setItem('bookshelf', JSON.stringify(this.bookshelf))
        },
            // 全屏模式 将方法绑定(点击事件)到页面的元素上即可
        screenfull() {
            if (!screenfull.enabled) {
                return false
            }
            console.log(111)
            screenfull.toggle()
        },
        // Esc 全屏监测
        checkFull() {
            let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
            if (isFull === undefined) {
                isFull = false
            }
            return isFull
        },
        // 根据id获取小说图片地址
        getImgUrl(id){
            return `http://www.xqishuta.com/files/article/image/${id.slice(0, id.length - 3) || 0}/${id}/${id}s.jpg`
        }
    }
})