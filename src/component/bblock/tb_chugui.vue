<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
            <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :curaction="curaction" :detail="detail"  :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <div :class="css.rowBox" v-else>
              <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false"></tbbase>
            </div>
              <!-- <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb> -->
              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <cascadeform  labelname="收货地址：" :must="false"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
            <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <div :class="css.attachrow" v-if="curaction != 'alldetail' && !detail">
                <ft url="upload" :filter="['zip', 'rar']" text="上传附件" @upsuccess="upSuccessHandler"></ft><span :class="css.upsu">{{statusRes}}</span><span :class="css.uptip">(仅允许上传zip,rar格式的文件包)</span>
          </div>
          <div v-if="curaction != 'alldetail' && !!detail">
            <div :class="css.attachrow">
              <a :href="eclosure" target="_blank" v-if="eclosure">下载附件</a>
              <span :class='css.noattach' v-else>没有附件</span>
            </div>
          </div>
          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                    <chuguitb :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></chuguitb>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 厨柜分类
import ft from "component/file/filedeal";
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
  props:{
    eclosure: {   // 附件特殊字段
      default:""
    }
  },
  data: function () {
    return {
      css,
      curName:"chugui",
      validate:false,
      statusRes:"",
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"component", cname:"bashou", component:bashouComponent},
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
                    {name:"延米线（m）/采购数量", labelValue:"U_Pquantity", type:"edit", number: true},
                    {name:"转换数量", labelValue:"Quantity", type:"data"},
                    {name:"包装数量", labelValue:"SalPackUn",type:"data"},
                    {name:"包装单位", labelValue:"SalPackMsr",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}
                    ],
      headerdetail:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleCode", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米线（m）/采购数量", labelValue:"U_Pquantity", type:"data"},
                    {name:"转换数量", labelValue:"Quantity", type:"data"},
                    {name:"包装数量", labelValue:"SalPackUn",type:"data"},
                    {name:"包装单位", labelValue:"SalPackMsr",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}
                    ],
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
    },

    upSuccessHandler: function(d){
      console.log(d);
      this.eclosure = d.url; // 赋值附件的url
      this.statusRes = "上传成功" + (d.name || "")
    }
  },
  components: {tb, formtext, cascadeform, dialog,chuguitb, ft},
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
    this.value = this.selfData.U_FModeling.def || "DM-008-直边"
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
        this.value = this.selfData.U_BasinT.def || "台上工艺"
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
//    // U_HandleCode  U_HandleName
var bashouComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value: ""
    }
  },
  template: '<div><combobox labelname="ItemName" @dropclick="dropclick" :value="value"  keyid="ItemName" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    this.test = this.selfData.U_HandleCodes.def;
    this.value = this.selfData.U_HandleName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_HandleName.def = d;
            this.selfData.U_HandleCode = d;
            this.selfData.U_HandleName.tb_disabled= false;
            this.selfData.U_HandleName.defCss= "default";
            this.selfData.U_HandleName.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})

</script>
