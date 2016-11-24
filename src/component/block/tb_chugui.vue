<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
            <!-- <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :curaction="curaction" :detail="detail"  :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <div :class="css.rowBox" v-else>
              <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false"></tbbase>
            </div> -->
            <div class="" v-if="!detail">
                <div class=""  v-if="curaction == 'add'">
                  <btn @click="toSelect">选品</btn>
                </div>
                <div :class="css.rowBox">
                  <div :class="css.typeitem" v-if="g_array.length !=0">
                        <p :class="css.ptitle">柜体/门板/配件</p>
                        <tb :headercaption="g_header" :datas="g_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="t_array.length !=0">
                        <p :class="css.ptitle">台面</p>
                        <tb :headercaption="t_header" :datas="t_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="w_array.length !=0">
                        <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                        <tb :headercaption="w_header" :datas="w_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                </div>
            </div>
            <div class="" v-else>
              <div :class="css.typeitem" v-if="g_array.length !=0">
                    <p :class="css.ptitle">柜体/门板/配件</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="g_header_d" :datas="g_array"  :load="false" :curaction="curaction" :detail="detail" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="t_array.length !=0">
                    <p :class="css.ptitle">台面</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="t_header_d" :datas="t_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="w_array.length !=0">
                    <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="w_header_d" :datas="w_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                    </div>
              </div>
            </div>

              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtextadd  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtextadd>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
            <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <div :class="css.attachrow" v-if="curaction != 'alldetail' && !detail">
                <ft url="upload" :filter="['zip', 'rar']" text="上传附件" @upsuccess="upSuccessHandler"></ft><span class="upsu">{{statusRes}}</span><span class="uptip">(仅允许上传zip,rar格式的文件包)</span>
          </div>
          <div v-if="curaction != 'alldetail' && !!detail">
            <div :class="css.attachrow">
              <a :href="eclosure" target="_blank" v-if="eclosure">下载附件</a>
              <span :class='css.noattach' v-else>没有附件</span>
            </div>
          </div>
          <!--选品对话框-->
          <dialog :flag.sync="showSelectDialog" title="选品" >
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
import btn from "component/sprite/button";
import adapter from "./tbAdapter/chuguiAdapter";
import baseMixins from "./itemMixins";
import chuguitb from "./tblist/chuguiList";
import mdialog from "component/blockcommon/mealDialog";
import Utils from "common/Utils";
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
      g_array:[],
      t_array:[],
      w_array:[],
      g_header: [{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"component", cname:"bashou", component:bashouComponent},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"edit"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"edit"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"edit"},
                    {name:"延米（m）/销售数量", labelValue:"buyCounts", type:"edit"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}],
      t_header:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"component", cname:"qianyan", component:qianyanComponent},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"component", cname:"qiyuan", component:qiyuanComponent},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"component", cname:"taiyi", component:taiyiComponent},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"edit"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"edit"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"edit"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"edit"},
                    {name:"延米（m）/销售数量", labelValue:"buyCounts", type:"edit"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}],
      w_header:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},

                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"销售数量", labelValue:"buyCounts", type:"edit"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}],
      g_header_d: [
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
      t_header_d:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},

                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
      w_header_d:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                  
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}],
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
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
                    {name:"延米（m）/销售数量", labelValue:"buyCounts", type:"edit"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}
                    ],
      headerdetail:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
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
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}
                    ],
      validateInfo: true, // 验证 收件信息
      tableEvents:{
          operatorRender: function(d, index){
              return [{action:"delete",icon:"icon-delete", data: d, index: index}]
          },
          operatorHandler: function(d){
              if(d.action == "delete") {
                // 木门和铝框门的时候 渲染门的列表 g_array
                if(d.data.FirmName == '柜体' || d.data.FirmName == '门板' ||  d.data.FirmName == '配件') this.g_array.splice(d.index,1)
                // 门控五金 非智能锁的时候 渲染 t_array
                else if(d.data.FirmName == '台面') this.t_array.splice(d.index,1)
                // 门控五金 智能门锁的时候  渲染 w_array
                else this.w_array.splice(d.index,1)
              }
          }
      },
    }
  },
  computed: {
  },
  ready:function(){
    if(this.detail) this.vlist = this.testdata;
    if(this.curaction == "edit") {
      this.g_header.splice(0,1);
      this.t_header.splice(0,1);
      this.w_header.splice(0,1);
    }
    for (var i = 0; i < this.vlist.length; i++) {
        let one = this.vlist[i];
        // 木门和铝框门的时候 渲染门的列表 g_array
        if(one.FirmName == '柜体' || one.FirmName == '门板' ||  one.FirmName == '配件') {
            this.g_array.push(one);
            continue;
        }
        // 门控五金 非智能锁的时候 渲染 t_array
        if(one.FirmName == '台面') {
            this.t_array.push(one);
            continue;
        }
        // 门控五金 智能门锁的时候  渲染 w_array
        this.w_array.push(one);
    }
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    },
    toSelect: function(){
        this.$set("toload", true);
        this.showSelectDialog = !this.showSelectDialog;
    },
    concatFunc: function(){
        this.vlist = this.g_array.concat(this.t_array, this.w_array);
    },
    addoneHandler : function(d){
        d = Utils.cloneObj(d);
        let one = this.adapterFun(d);
        // this.vlist.push(one);
        // 木门和铝框门的时候 渲染门的列表 g_array
        if(one.FirmName == '柜体' || one.FirmName == '门板' || one.FirmName == '配件') this.g_array.push(one);
        // 门控五金 非智能锁的时候 渲染 t_array
       else if(one.FirmName == '台面') this.t_array.push(one);
        // 门控五金 智能门锁的时候  渲染 w_array
       else  this.w_array.push(one);
    },
    upSuccessHandler: function(d){
      console.log(d);
      this.eclosure = d.url; // 赋值附件的url
      this.statusRes = "上传成功" + (d.name || "")
    }
  },
  components: {tb,chuguitb, ft,btn},
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
