<template>
    <div :class="css.Box">
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader" scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="leftDatas" :events="tableEventsLeft"></lefttb> 
        </div>
        <div :class='css.rightBox'>
            <righttb :headercaption="rightHeader" @selectchange="selectchangeHandler"  scene="add_yes" :datas="rightDatas" :events="tableEventsRight"></righttb>
        </div>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable";
import righttb from "component/grid/priceTypeTable";
import adapter_left from "./adapterLeft.js";
export default {
  data: function () {
    return {
      css,
     
      leftDatas:[{name:"个性化", code:"gxh", selected: true, subData:{}}],
      rightHeader:[{type:"operator", name:"操作"},{name:"分类编号", labelValue:"catery_code", type:"data"},{name:"分类名称", labelValue:"catery_name", type:"data"},
                  {name:"产品名称", labelValue:"product_name", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                  {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                  {name:"单位", labelValue:"Unit", type:"data"}],
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      rightDatas:[],
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
  },
  attached: function () {},
  methods: {
    leftAddOne: function() {
        let one = adapter_left({selected: false});
        this.leftDatas.unshift(one);
    },

    selectchangeHandler: function(){
      
    }
  },
  components: {lefttb,righttb},

}
</script>
