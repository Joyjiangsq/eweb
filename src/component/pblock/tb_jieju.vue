<template lang="html">
    <div class="">
          <div >
            <tb v-if="!detail" :headercaption="headercaption" :curaction="curaction" :detail="detail"  :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <div :class="css.rowBox" v-else>
              <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false"></tbbase>
            </div>
            <formtext labelname="收货人："  :read="true" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' ></formtext>
            <formtext labelname="收货人电话：" :read="true"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' ></formtext>
            <cascadeform  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" ></cascadeform>
            <formtext labelname="备注：" :read="true" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' ></formtext>
          </div>
    </div>
</template>
<script>
// 瓷砖分类
import css from "./type.css";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"jieju",
    }
  },
  computed: {
  },

  attached: function () {},
  methods: {

  },
  components: { formtext, cascadeform},
}
</script>
