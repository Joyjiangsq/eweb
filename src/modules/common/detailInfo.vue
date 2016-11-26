<template lang="html">
        <div :class="css.hrow">
            <span class='itemrow'><span :class="css.hitem">订单号：</span> {{data.U_PurchaseNum || data.U_FZOrder}}</span>
            <span v-if="data.U_PurchaseNum">
              <span class='itemrow' v-if="data.DocNum"><span :class="css.hitem">SAP订单号：</span> {{data.DocNum}}</span>
              <span class='itemrow' v-if="data.base_info"><span :class="css.hitem">订单类型：</span> {{data.base_info.order_type}}</span>
              <span class='itemrow'><span :class="css.hitem">订单状态：</span> <span v-if="data.U_OrderStatus == 'e站驳回' || data.U_OrderStatus == '店长驳回'" class='reback'>{{data.U_OrderStatus}}</span><span class='common' v-else>{{data.U_OrderStatus}}</span></span>
              <span class='itemrow' v-if="data.U_OrderStatus == 'e站驳回' || data.U_OrderStatus == '店长驳回'" ><span :class="css.hitem">驳回理由：</span> {{data.U_CloseWhy || '无'}}</span>
            </span>
        </div>
        <panel>

            <div slot="panelTitle">
                   基础信息
            </div>
            <div slot="panelContent" v-if="data.base_info">
                  <formtext :labelname="type == 'back'?'分站名称：':'客户信息：'"  :read="true" :must="false" :value="data.base_info.CardName" v-if="data.base_info.CardName"></formtext>
                  <cascadeform  :labelname="type == 'back'?'收货地址':'业主地址：'" :detailneed="true" :must="false" :read="true" :value.sync= "data.base_info.Address" v-if="data.base_info.Address"></cascadeform>
                  <formtext labelname="组包选择：" :read="true" :must="false" :value.sync="data.base_info.U_SWW"  v-if="data.base_info.U_SWW"></formtext>
                  <formtext labelname="房本面积：" :read="true" :must="false"  unit="平米"  :value.sync="data.base_info.U_Acreage" v-if="data.base_info.U_Acreage"></formtext>
                  <formtext labelname="卫生间数量：" :read="true" :must="false" unit="个" :value.sync="data.base_info.U_ToiletNum" v-if="data.base_info.U_ToiletNum"></formtext>
                  <formtext labelname="是否有电梯：" :read="true"  :must="false"  :value.sync="data.base_info.U_IsElevator" v-if="data.base_info.U_IsElevator"></formtext>
                  <formtext :read="true"  labelname="一口价：" unit="元" :must="false" :value.sync="data.base_info.one_price" v-if="data.base_info.one_price"></formtext>
                  <formtext labelname="实收金额：" :read="true" unit="元" :must="false" :value.sync="data.base_info.U_PaInAmount" v-if="data.base_info.U_PaInAmount"></formtext>
                  <formtext labelname="跟单员：" :read="true" :must="false" :value.sync="data.base_info.U_CntctCode" v-if="data.base_info.U_CntctCode"></formtext>
                  <formtext labelname="跟单员电话：" :read="true" :must="false" :value.sync="data.base_info.U_CntctPhone" v-if="data.base_info.U_CntctPhone"></formtext>
            </div>
        </panel>
      </div>
</template>

<script>
import css from "./detail.css";
import cascadeform from "component/form/formCascade";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
export default {
  props:{
      data:{
        default: function(){
            return {}
        }
      },
      type:{
        default:"back"
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
  methods: {},
  components: {cascadeform, formtext, panel}
}
</script>

<style lang="css">
</style>
