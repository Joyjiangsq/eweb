<template lang="html">
      <div class="">
        <div  :class="css.spone" v-for="one in testdata">
          <span>子订单号：{{one.U_PurchaseNum}}</span>
          <div :class="css.rowBox">
                <tbbase :headercaption="header" :datas="one.sub_orders" :load="false"></tbbase>
          </div>
          <formtext labelname="收货人："  :read="true" :value="one.rec_info.U_Consignee" ></formtext>
          <formtext labelname="收货人电话："  :read="true" :value="one.rec_info.U_ConsigneePhone"></formtext>
          <cascadeform  labelname="收货地址："  :read="true" :detailneed="true" :value="one.rec_info.Address2"  :detailv.sync="one.rec_info.detail" ></cascadeform>
          <formtext labelname="备注："  :read="true"  :value.sync="one.rec_info.Comments"></formtext>
          <div :class="css.attachrow">
              <a :href="one.U_Enclosure" target="_blank" v-if="one.U_Enclosure">下载附件</a>
              <!-- <span :class='css.noattach' v-else>没有附件</span> -->
          </div>
        </div>
      </div>
</template>

<script>
import tbbase from "component/grid/tableListBase";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import css from "./type.css"
export default {
  props:{
    testdata:{
      default: function(){
        return []
      }
    },
    header:{
      default: function(){
        return [];
      }
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {},
  components: {tbbase, formtext, cascadeform}
}
</script>

<style lang="css">
</style>
