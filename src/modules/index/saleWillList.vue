<template lang="html">
      <div class="">
            <div :class="css.listOne" v-for="one in datas">
              销售订单 <span :class='css.inrow' @click="goTo">FZXS201611100184</span> 暂未处理
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
        return ["1","2","3",4,5,6,7,8]
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
        this.$router.go({path:"sale/detail", query:{orderid: "FZXS201611100184"}})
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
