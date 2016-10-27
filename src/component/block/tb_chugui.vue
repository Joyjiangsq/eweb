<template lang="html">
    <div class="">
          <div class="">
              <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
              <formtext labelname="收货人："  :value.sync="recData.recName" placeholder=""  formname='recName' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :phone="true"  :length="11" :number="true" :value.sync="recData.recphone" placeholder=""  formname='recphone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址：" :must="false"  :detailneed="true" :read="true" formname="recAddr" :value.sync="recData.recAddr"  :detailv.sync="recData.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注：" :must="false" :value.sync="recData.Notes"  placeholder=""  formname='Notes' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">

          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                    <chuguitb :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="testdata"></chuguitb>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 厨柜分类
import Vue from "vue";
import tb from "component/grid/menTable";
import css from "./type.css";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import adapter from "./tbAdapter/chuguiAdapter";
import baseMixins from "./itemMixins";
import chuguitb from "./tblist/chuguiList";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"chugui",
      validate:false,
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"所属包", labelValue:"U_SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"bashou", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"component", cname:"qianyan", component:qianyanComponent},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"component", cname:"qiyuan", component:qiyuanComponent},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"component", cname:"taiyi", component:taiyiComponent},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"edit"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"edit"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"edit"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"edit"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"edit"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"edit"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"edit"},
                    {name:"延米线（m）/销售数量", labelValue:"buyCounts", type:"edit"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"avalibleStores",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Notes",type:"edit"}
                    ],
      recData:{
          recAddr:"安徽省,芜湖市,弋江区",
          detail:"xxxxx"
      },
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  ready:function(){

  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb, formtext, cascadeform, dialog,chuguitb},
}
import combobox from "component/combobox/combobox";
//  U_FModeling  前沿造型   下拉组件 默认 、、  DM-008-直边、  DM-002-罗马边
var qianyanComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"请选择", id:""}, {name:"DM-008-直边", id:"DM-008-直边"}, {name:"DM-002-罗马边", id:"DM-002-罗马边"}],
      value: ""
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    this.value = this.selfData.U_FModeling.def || ""
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_FModeling.def = d;
            this.selfData.U_FModeling.tb_disabled= false;
            this.selfData.U_FModeling.defCss= "default";
            this.selfData.U_FModeling.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})

// U_BasinT  // 台盆工艺   下拉组件 默认  台上工艺、台下工艺
var taiyiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"请选择", id:""}, {name:"台上工艺", id:"台上工艺"}, {name:"台下工艺", id:"台下工艺"}],
      value:""
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
        this.value = this.selfData.U_BasinT.def || ""
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_BasinT.def = d;
            this.selfData.U_BasinT.tb_disabled= false;
            this.selfData.U_BasinT.defCss= "default";
            this.selfData.U_BasinT.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})
//  d.U_GSMe  // 气源方式   下拉组件 默认 、、     液化气  天燃气
var qiyuanComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"液化气"}, {name:"天燃气"}],
      value: "天燃气"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value"  keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    this.value = this.selfData.U_GSMe.def || "天燃气";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_GSMe.def = d;
            this.selfData.U_GSMe.tb_disabled= false;
            this.selfData.U_GSMe.defCss= "default";
            this.selfData.U_GSMe.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})
</script>
