<template lang="html">
      <div class="">
            <div :class='[css.operator, css.opSpec]'>
                 <icon iconname="icon-left3" @click ="prevAction"></icon>
                 <icon iconname="icon-right3" @click ="nextAction"></icon>
            </div>
            <div :class="css.rowOne" v-for="one in datas" @click="goTo(one.design_serial)">
              定制品 {{one.design_serial}} {{getStatus(one.status)}}
              <span :class='css.date'>{{one.createAt | dateformate 'yyyy/mm/dd'}}</span>
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
      name:"定制品设计",
      routerUrl:"specmgr/apply"
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.load = !this.load;
    },30)
  },
  attached: function () {},
  methods: {
    getStatus: function(status){
      let mp = {
        "1":"待交付","2":"待确认", "3":"已完成", "4":"退回修改"
      }
      return mp[status]
    },

  },
  components: {}
}
</script>
