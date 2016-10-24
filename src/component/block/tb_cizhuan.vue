<template lang="html">
    <div class="">
          <div class="">
              <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
              <formtext labelname="收货人："  value="" placeholder=""  formname='recName' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :phone="true"  :length="11" :number="true" value="" placeholder=""  formname='recphone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址：" :detailneed="true" formname="recAddr"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注：" :must="false" value="" placeholder=""  formname='remark' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">

          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                      <cizhuanlist :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="testdata"></cizhuanlist>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>
// 瓷砖分类
import tb from "component/grid/tableSpec";
import css from "./type.css";
import cizhuanlist from "./tblist/cizhuanList";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import adapter from "./tbAdapter/cizhuanAdapter";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"cizhuan",
      validate:false,
      headercaption:[{type:"operator", name:""},{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"产品包", labelValue:"SWW", type:"data"},{name:"二级分类", labelValue:"FirmName", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                    {name:"可用库存量", labelValue:"avalibleStores",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"remark",type:"data"},
                    ]
    }
  },
  computed: {
  },
  attached: function () {},
  methods: {

    // 验证列表数据
    validateFun: function(){
        this.validateRec = true;
        this.validateInfo = true;
        for (var i = 0; i < this.testdata.length; i++) {
          let one = this.testdata[i];
            for(var key in one) {
              if(typeof(one[key]) == "object") {
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false; break;}
              }
          }
        }
        if(this.testdata.length != 0) {
          // 收件信息验证
          this.validate = !this.validate;
        }
        setTimeout(()=>{
          if(!this.validateRec || !this.validateInfo) this.$dispatch("fail", {project: this.curName});
          else this.$dispatch("success", {project:this.curName,data:{list: this.testdata, recInfo: this.recData}});
        })
    },
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb, formtext, cascadeform, dialog, cizhuanlist},
}
</script>
