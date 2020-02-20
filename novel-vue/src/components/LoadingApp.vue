<template>
  <div class="loading" v-if="init.loadingCount > 0">
    <div>
        <div class="mask"></div>
        <div class="animation">
            <div class="lds-css ng-scope">
            <div class="lds-ellipsis" style="width: 100%; height: 100%;">
                <div>
                <div></div>
                </div>
                <div>
                <div></div>
                </div>
                <div>
                <div></div>
                </div>
                <div>
                <div></div>
                </div>
                <div>
                <div></div>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import init from '@/service/init'
export default {
    name: "loading",
    data() {
        return {
            init: init
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
