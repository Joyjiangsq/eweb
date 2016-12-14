<template>
    <div :class="css.Box">
        {{glData | json}}
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader" @rowclick="rowclick" :redef="redef" scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="glData" :events="tableEventsLeft"></lefttb> 
            <div :class="css.attachInfo">
                <propertytext key="升级金额" :horizontal="true" value="0"></propertytext>
                <propertytext key="降级金额" :horizontal="true" value="0"></propertytext>
                <propertytext key="减项金额" :horizontal="true" value="0"></propertytext>
                <propertytext key="互换金额" :horizontal="true" value="0"></propertytext>
                <propertytext key="个性化金额" :horizontal="true" value="0"></propertytext>
            </div>
        </div>
        <div :class='css.rightBox'>
            <div v-if="gxhTip">{{gxhTip}}</div>
            <righttb :headercaption="rightHeader" @selectchange="selectchangeHandler"  scene="add_yes" :deleteindex="deleteindex" :datas="rightDatas.sub_list" :events="tableEventsRight" v-else></righttb>
        </div>
        <typedialog :show="showTypeDialog" @onecheck="typeCheck"></typedialog>
        <showselect :show="showSelectDialog" :toload="toloadProduct" :params="selectParams"></showselect>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable";
import righttb from "component/grid/priceTypeTable";
import typedialog from "./typeDialog";
import propertytext from "component/form/propertyText.vue";
import adapter_left from "./adapterLeft.js";
import adapter_right from "./adapterRight.js";
import showselect from "component/blockcommon/selectProductByTypeDialog";

export default {
  props: {
    action:{
      type: String,
      default: "add"
    }
  },
  data: function () {
    return {
      css,
      gxhTip:"", // 个性化提示
      redef: false,
      glData:[{name:"个性化", code:"gxh", selected: true, sub_data:{sub_list:[]}}],
      rightHeader:[{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                  {name:"产品名称", labelValue:"product_name", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                  {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                  {name:"单位", labelValue:"Unit", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit"},
                  {name:"差价", labelValue:"diff_price", type:"edit"}, {name:"金额", labelValue:"price", type:"data"},
                  {name:"备注", labelValue:"remark", type:"edit"}],
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      rightDatas:[],
      showTypeDialog: false, // 分类型对话框
      showSelectDialog: false,
      toloadProduct: false,
      selectParams:{page: 1},
      deleteindex: {index: -1},
      tableEventsLeft:{
        operatorRender: function(d, index){
          return [{name:"删除", action:"delete",icon:"icon-delete", index:index}];
        },

        operatorHandler: function(d){
             if(d.action == "delete") {
                  this.glData.splice(d.index, 1);
                  this.redef = !this.redef;
             }
        }
      },
      tableEventsRight:{
         operatorRender: function(d, index){
            return [{name:"删除", action:"delete",icon:"icon-delete", index: index},{name:"选品", action:"select",icon:"icon-add", data:d}];
         },

         operatorHandler: function(d){
              if(d.action == "select") {
                let stPage = this.selectParams.page;
                this.selectParams = {page: stPage};
                this.showSelectDialog = !this.showSelectDialog;
                console.log(this.selectParams);
                if(d.data.level_n == 1) this.selectParams.lv1_code = d.data.lv_code;
                else if(d.data.level_n == 2) this.selectParams.lv2_code = d.data.lv_code;
                else this.selectParams.lv3_code = d.data.lv_code;
                this.toloadProduct = !this.toloadProduct
              }
              else if(d.action == "delete") {
                this.deleteindex = {index: d.index}
              }
         }
      }
    }
  },
  computed: {
  },
  ready: function () {
    if(this.action == "add") this.gxhTip = "个性化项目不需要选择"
  },
  attached: function () {},
  methods: {
    leftAddOne: function() {
        let one = adapter_left({selected: false, sub_data:{sub_list:[]}});
        this.glData.unshift(one);
    },
    typeCheck: function(d) {
        let data = Utils.cloneObj(adapter_right(d));
        delete data.selected;
        this.rightDatas.sub_list.push(data);
    },
    rowclick: function(d) {
      if(d.code && d.code == "gxh") {
         this.gxhTip = "个性化项目不需要选择"
      }
      else {
        this.gxhTip = ""
        this.rightDatas = d.sub_data;
      }
    },
    selectchangeHandler: function(){
        this.showTypeDialog = !this.showTypeDialog
    }
  },
  components: {lefttb,righttb,typedialog,showselect,propertytext},

}
</script>
