<template>
    <div id="app">
        <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
import 'flex.css'
export default {
    name: 'app',
    created() {
        this.$http.get('1/api/queryName?name=%E5%89%8D%E4%BB%BB').then(({ data })=> {
            console.log(data)
        })
    },
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
</style>
