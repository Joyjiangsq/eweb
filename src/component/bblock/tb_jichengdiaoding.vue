<template lang="html">
    <div class="">
          <div v-if="curaction != 'alldetail'">
            <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler"  :curaction="curaction" :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false" v-else></tbbase>
              <!-- <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb> -->
              <formtext labelname="收货人：" :read="detail"  :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail" :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址："  :must="false"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
              <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <jichengdiaodinglist :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></jichengdiaodinglist>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>
// 瓷砖分类
import tb from "component/grid/tableSpec";
import css from "./type.css";
import jichengdiaodinglist from "./tblist/jichengdiaodinglist";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import adapter from "./tbAdapter/jichengdiaodingAdapter";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,

      curName:"jichengdiaoding",
      validate:false,
  
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },

  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb, formtext, cascadeform, dialog, jichengdiaodinglist},
}
</script>
