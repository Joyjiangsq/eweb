<template>
    <div :class="css.Box">
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader"scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="leftDatas" :events="tableEventsLeft"></lefttb> 
        </div>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable"
export default {
  data: function () {
    return {
      css,
     
      leftDatas:[{name:"个性化", code:"gxh", selected: true, subData:{}}],
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      tableEventsLeft:{
        operatorRender: function(d){
          return [{name:"删除", action:"delete",icon:"icon-delete", data:d}];
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
        this.leftDatas.unshift({ selected: false});
    }
  },
  components: {lefttb},

}
</script>
