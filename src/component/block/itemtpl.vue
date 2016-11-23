<template lang="html">
      <div class="">
        <div  :class="css.spone" v-for="one in testdata">
          <span class='itemrow'>子订单号：{{one.U_PurchaseNum}}</span>
          <span class='itemrow'>子订单状态：<span v-if = "one.U_OrderStatus != '店长驳回' && one.U_OrderStatus != 'e站驳回'">{{one.U_OrderStatus}}</span><span class="reback" v-else>{{one.U_OrderStatus}}</span></span>
          <span class='itemrow' v-if="one.U_OrderStatus == '店长驳回' || one.U_OrderStatus == 'e站驳回'">驳回理由：{{one.U_CloseWhy || '无'}}</span>
          <div :class="css.rowBox">
                <tplitem :item="one"></tplitem>
          </div>
          <formtext labelname="收货人："  :read="true" :value="one.rec_info.U_Consignee" ></formtext>
          <formtext labelname="收货人电话："  :read="true" :value="one.rec_info.U_ConsigneePhone"></formtext>
          <cascadeform  labelname="收货地址："  :read="true" :detailneed="true" :value="one.rec_info.Address2"  :detailv.sync="one.rec_info.detail" v-if="one.type == 'cizhuan'" ></cascadeform>
          <formtextadd  labelname="收货地址：" :must="true"   :read="true" formname="Address2" :value.sync="one.rec_info.Address2"  v-else></formtextadd>
          <formtext labelname="备注："  :read="true"  :value.sync="one.rec_info.Comments"></formtext>
          <div :class="css.attachrow">
              <a :href="one.U_Enclosure" target="_blank" v-if="one.U_Enclosure">下载附件</a>
          </div>
        </div>
      </div>
</template>

<script>
import formtextadd from "component/form/formTextAdd";
import tplitem from "./tplitem";
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
      css,

    }
  },
  computed: {
  },
  ready: function () {

  },
  attached: function () {},
  methods: {},
  components: {formtext, cascadeform, formtextadd, tplitem}
}
</script>

<style lang="css">
</style>
