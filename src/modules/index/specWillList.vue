<template lang="html">
      <div class="">
            <div :class="css.listOne" v-for="one in datas">
              定制品订单 <span :class='css.inrow' @click="goTo">SJ2016100008</span> 暂未处理
              <span :class='css.date'>2016.06.29</span>
            </div>
      </div>
</template>

<script>
import  baselist from "common/mixinList";
import css from "./index.css";
export default {
  mixins:[baselist],
  props:{
    datas:{
      default: function(){
        return ["dingzhipin","dingzhipin11111","dingzhipi--n"]
      }
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    goTo: function(){
        this.$router.go({path:"specmgr/apply", query:{orderid:"SJ2016100008"}});
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
