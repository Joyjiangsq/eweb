<template lang="html">
    <div class="">
          <div v-if="curaction != 'alldetail'">
            <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler"  :curaction="curaction" :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false" v-else></tbbase>
              <!-- <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb> -->
              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail" :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址："  :must="false" :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">
              <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <zhuangxiufucailist :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></zhuangxiufucailist>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>
// 瓷砖分类
import tb from "component/grid/tableSpec";
import css from "./type.css";
import zhuangxiufucailist from "./tblist/zhuangxiufucailist";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import adapter from "./tbAdapter/zhuangxiufucaiAdapter";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"zhuangxiufucai",
      validate:false,
      headercaption:[{type:"operator", name:""},{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    // {name:"二级分类", labelValue:"FirmName", type:"data"},
                    // {name:"三级分类", labelValue:"U_ThreeL", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"颜色", labelValue:"Color", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"edit"},
                    ],
      headerdetail:[{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"}],
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },

  attached: function () {
    // 默认datas初始化
    for (var i = 0; i < this.testdata.length; i++) {
      var one = this.testdata[i];
      adapter(one);
    }
  },
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb, formtext, cascadeform, dialog, zhuangxiufucailist},
}
</script>
