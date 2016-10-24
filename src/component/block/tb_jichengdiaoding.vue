<template lang="html">
    <div class="">
          <div class="">
              <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
              <formtext labelname="备注：" :must="false" value="" placeholder=""  formname='remark' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">

          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <jichengdiaodinglist :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="testdata"></jichengdiaodinglist>
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
      headercaption:[{type:"operator", name:""},{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"产品包", labelValue:"SWW", type:"data"},{name:"二级分类", labelValue:"FirmName", type:"data"},
                    {name:"三级分类", labelValue:"U_ThreeL", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"颜色", labelValue:"Color", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                    {name:"可用库存量", labelValue:"avalibleStores",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"remark",type:"data"},
                    ],
      recData:{},
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
