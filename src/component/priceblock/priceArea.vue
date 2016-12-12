<template>
    <div :class="css.Box">
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader" @rowclick="rowclick" scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="glData" :events="tableEventsLeft"></lefttb> 
        </div>
        <div :class='css.rightBox'>
            <div v-if="gxhTip">{{gxhTip}}</div>
            <righttb :headercaption="rightHeader" @selectchange="selectchangeHandler"  scene="add_yes" :datas="rightDatas.sub_list" :events="tableEventsRight" v-else></righttb>
        </div>
        <typedialog :show="showTypeDialog" @onecheck="typeCheck"></typedialog>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable";
import righttb from "component/grid/priceTypeTable";
import typedialog from "./typeDialog";
import adapter_left from "./adapterLeft.js";
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
      glData:[{name:"个性化", code:"gxh", selected: true, sub_data:{sub_list:[]}}],
      rightHeader:[{type:"operator", name:"操作"},{name:"分类编号", labelValue:"catery_code", type:"data"},{name:"分类名称", labelValue:"catery_name", type:"data"},
                  {name:"产品名称", labelValue:"product_name", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                  {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                  {name:"单位", labelValue:"Unit", type:"data"}],
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      rightDatas:[],
      showTypeDialog: false, // 分类型对话框
      tableEventsLeft:{
        operatorRender: function(d){
          return [{name:"删除", action:"delete",icon:"icon-delete", data:d}];
        },

        operatorHandler: function(d){
             
        }
      },
      tableEventsRight:{
         operatorRender: function(d){
            return [{name:"删除", action:"delete",icon:"icon-delete", data:d},{name:"选品", action:"select",icon:"icon-add", data:d}];
         },

         operatorHandler: function(d){
              
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
        this.rightDatas.sub_list.push({catery_code: d.code, catery_name:d.name});
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
  components: {lefttb,righttb,typedialog},

}
</script>
