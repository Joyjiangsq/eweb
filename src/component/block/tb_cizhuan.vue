<template lang="html">
    <div class="">
          <div v-if="curaction != 'alldetail'">
              <tb v-if="!detail"  :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :curaction="curaction"  :detail="detail" :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
              <tbbase :headercaption="headerdetail" :datas="testdata" :load="false" v-else></tbbase>
              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话："  :read="detail" :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址："  :read="detail" :detailneed="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注："  :read="detail"  :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
            <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <!--选品对话框-->
          <dialog :flag.sync="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <cizhuanlist :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></cizhuanlist>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>
// 瓷砖分类

import cizhuanlist from "./tblist/cizhuanList";
import cascadeform from "component/form/formCascade";
import saleAdapter from "./saleadapter/cizhuanAdapter.js";
import backAdapter from "./backadapter/cizhuanAdapter.js";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  props:{
    recdata:{
      default: function(){
        return {
          Address2:""
        }
      },
    },
  },
  data: function () {
    return {
      curName:"cizhuan",
    }
  },
  computed: {
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      if(this.scene == "sale") return saleAdapter(d)
      else return backAdapter(d);
    },
  },
  ready: function(){

  },
  components: {cascadeform, cizhuanlist},
}
</script>
