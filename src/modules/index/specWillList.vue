<template lang="html">
      <div class="">
            <div :class='[css.operator, css.opSpec]'>
                 <icon iconname="icon-left3" @click ="prevAction"></icon>
                 <icon iconname="icon-right3" @click ="nextAction"></icon>
            </div>
            <div :class="css.rowOne" v-for="one in datas" @click="goTo(one.U_PurchaseNum)">
              定制品 {{one.U_PurchaseNum}} {{one.U_OrderStatus}}
              <span :class='css.date'>{{one.U_Date | dateformate 'yyyy/mm/dd'}}</span>
            </div>
            <span v-if="curStatus == 'no-result'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">没有数据</span>
            <span v-if="curStatus =='loading'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">加载中</span>
      </div>
</template>

<script>
import  baselist from "common/mixinList";
import css from "./index.css";
import  basedb from "./baseDB.js";
export default {
  mixins:[baselist,basedb],
  props:{
    url: {
      default:"todo/custom-products"
    }
  },
  data: function () {
    return {
      css,
      name:"定制品",
      routerUrl:"specmgr/apply"
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.load = !this.load;
    })
  },
  attached: function () {},
  methods: {

  },
  components: {}
}
</script>
