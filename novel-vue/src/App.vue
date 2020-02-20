<template>
    <div id="app">
        <keep-alive include='cashViews'>
            <router-view class="router-view" />
        </keep-alive>
        <NavsApp v-if="$route.meta.navs" />
        <LoadingApp />
    </div>
</template>

<script>
import 'flex.css'
import LoadingApp from './components/LoadingApp'
import NavsApp from './components/NavsApp'
export default {
    name: 'app',
    components:{LoadingApp, NavsApp},
    created() {
        let readActive = localStorage.getItem( `readActive`)
        let bookshelf = localStorage.getItem('bookshelf');

        if(readActive && bookshelf){
            let book = JSON.parse(bookshelf)[readActive];
            if(book){
                this.$router.push({path: '/read', query: book})
            }
        }
    },
}
</script>
<style lang="scss">
/*Vue隐藏*/
[v-cloak] {
    display: none;
}
/*清除样式*/

body, ol, ul, dl, li, dt, dd, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea,select{
    margin: 0;
    padding: 0;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block
}

html, body {
    height: 100%;
}
 

html {
    position: relative;
    margin: 0 auto;
    max-width: 750px;
    min-width: 300px;
    font-size: 62.5%;
}

body {
    position: relative;
    font-size: 14px;
    font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    background: #fff;
    color: #282828;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

h1, h2, h3, h4, h5 {
    font-weight: normal;
    font-size: 14px;
}

a {
    color: #333;
    text-decoration: none;
    transition: color .2s ease-out;
}

a:hover {
    text-decoration: none;
}

em, i {
    font-style: normal;
}

ol, ul, dl, li, dt, dd {
    list-style: none
}

img {
    border: 0;
    vertical-align: middle
}

.boxShadow{
    box-shadow: 0 0 .18rem 0 rgba(0,0,0,0.1);
}

a img {
    border: 0
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
input, textarea {
    font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    outline: none;
}

input, textarea {
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    outline: none;
    padding: 0px;
    margin: 0;
}
/*透明度渐变*/
.opacity{
    -webkit-animation: opacity 0.3s linear;
    animation: opacity 0.3s linear;
}
@-webkit-keyframes opacity {
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
@keyframes opacity {
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
/*清除浮动*/
.clearfloat{
    zoom:1
}
.clearfloat:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
}
/*居中*/
.center{margin: 0 auto}
html,body{
    height: 100%;
}
*{
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
    height: 100%;
    .van-card{
        font-size: 14px;
    }
    .van-card__title, .van-card__desc{
        line-height: 20px
    }
}


#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
        color: #42b983;
        }
    }
}
.no-more{
    text-align: center;
    line-height: 3;
}
</style>
