<template lang="html">
    <div class="">
          <div v-if="curaction != 'alldetail'">
            <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :curaction="curaction" :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false" v-else></tbbase>
              <!-- <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb> -->
              <formtext labelname="收货人：" :read="detail"  :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail" :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtextadd  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtextadd>
              <!-- <cascadeform  labelname="收货地址："  :must="false" :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform> -->
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">
              <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <!--选品对话框-->
          <dialog :flag.sync="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <shigongfucailist :hash="false" :toload="toload" @addone="addoneHandler" :listdata.sync="vlist"></shigongfucailist>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>
// 瓷砖分类
import css from "./type.css";
import shigongfucailist from "./tblist/shigongfucailist";
import saleAdapter from "./saleadapter/shigongfucaiAdapter.js";
import backAdapter from "./backadapter/shigongfucaiAdapter.js";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"shigongfucai",

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
  components: {shigongfucailist},
}
</script>
