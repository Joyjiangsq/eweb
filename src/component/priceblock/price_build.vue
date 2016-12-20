<template>
    <div :class="css.Box" style="width:97%; margin: 0 auto;">
            <btn @click="inTpl">导入模板</btn>
            <div v-if="datas.length == 0"  style="text-align: center; color:gray; padding: 30px">
                  请导入模板
            </div>
            {{datas | json}}
            <div v-else>
                <div :class='css.leftBox'>
                    <lefttb :headercaption="leftHeader" @rowclick="rowclick"  scene="price_yes"  :needselected= "true"  :datas="datas" :events="tableEventsLeft"></lefttb> 
                </div>

                <div :class='css.rightBox'>
                    <righttb v-show="curCheck =='gxh'" @selectchange="selectchange" :headercaption="rightHeader_g" :clone="clone.tag" scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" v-else></righttb>
                    <righttb v-show="curCheck !='gxh'" :headercaption="rightHeader" :clone="clone.tag" scene="price_yes" :events="tableEventsRight"  :datas="actionDatas"></righttb>
                </div>
            </div>
            <mdialog :show="showm" :datas="actionDatas" @addone="addone"></mdialog>
            <tpldialog :show.sync="showTplDialog" @checkone="getOnTpl" url="tpl-construction-quote"></tpldialog>
    </div>
</template>

<script>
import css from "./price.css";
import lefttb from "component/grid/priceWhereTable";
import tpldialog from "component/blockcommon/selectTplDialog.vue";
import righttb from "component/grid/priceTypeTable";
import right_adapter from "./adapterRight";
import btn from "component/sprite/button";
import spdialog from "component/blockcommon/selectProductByTypeDialog";
import Utils from "common/Utils.js";
import mdialog from "./materialSpecDialog";
import Vue from "vue";
let cloneBoy = {tag: false}
// 自定义
var selectComponent = Vue.extend({
  data:function(){
    return {
      css,
      show: false,
      params:{page: 1},
      toload: false,
      clone: cloneBoy
    }
  },
  template: '<div><btn @click="clickHandler">选择产品</btn><spdialog :show="show" @success="success" :params="params" :toload="toload"></spdialog></div>',
  ready: function(){
  },
  methods:{
    clickHandler: function(){
        
        this.params = {
          page: 1
        }
        this.params["lv"+this.selfData.level_n+"_"+"code"] = this.selfData.lv_code;
        this.params["lv"+this.selfData.level_n+"_"+"name"] = this.selfData.lv_name;
        this.show = !this.show;
        this.toload = !this.toload
    },
    success: function(d) {
        Object.assign(this.selfData, d)
        let one = right_adapter(this.selfData);
        this.clone.tag = !this.clone.tag;
    },
    
  },
  components: {btn, spdialog}
})

export default {
  props:{
      datas: {
        default: () => []
      }
  },
  data: function () {
    return {
      css,
      clone: cloneBoy,
      showm:false,
      actionDatas:[],
      showTplDialog: false,
      curCheck:"gxh",
      leftHeader: [{name:"名称", labelValue:"name",type:"data"},{type:"data", name:"金额", labelValue:"sub_price"}, {type:"operator", name:"操作"}],
      rightHeader: [{name:"项目名称", labelValue:"project_name", type:"data"},
                                      {name:"工艺说明", labelValue:"description", type:"data"}, 
                                      {name:"数量" ,labelValue:"counts", type:"edit"},
                                      {name:"单价", labelValue:"selling_price", type:"data"}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"edit"}],
      rightHeader_g: [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_name", type:"data"},
                                      {name:"产品名称", labelValue:"ItemName", type:"data"}, 
                                      {name:"品牌", labelValue:"U_Brand", type:"data"}, 
                                      {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                                      {name:"单位", labelValue:"Unit", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit"},
                                      {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"edit"}],
      tableEventsLeft:{
        operatorRender: function(d, index){
          if(d.canDelete) return [{name:"删除", action:"delete",icon:"icon-delete", index:index, data:d}];
          return [{name:"复制", action:"copy",icon:"icon-tip", index:index, data:d}];
        },

        operatorHandler: function(d){
            if(d.action == "copy") {
               let newData = Object.assign({}, d.data)
               newData.selected = false;
               newData.canDelete = true;
               this.datas.splice(d.index, 0, newData);
            }
            else if(d.action == "delete") {
               this.datas.splice(d.index, 1);
            }
        }
      },
      tableEventsRight:{
         operatorRender: function(d, index){
            return [{name:"删除", action:"delete", index: index}];
         },

         operatorHandler: function(d){
             
         }
      }
    }
  },
  computed: {
  },
  ready: function () {},
  attached: function () {},
  methods: {
    addone: function(d) {
        right_adapter(d);
        console.log(d);
        this.actionDatas.push(d);
    },
    inTpl: function() {
        this.showTplDialog = !this.showTplDialog
    },
    getOnTpl: function(d) {
        this.datas = d.prolist;
    },
    rowclick: function(d) {
        if(d.code == "gxh") this.curCheck = "gxh";
        else this.curCheck = "";
        for(let i = 0; i < d.sub_data.sub_list.length; i++) {
            let item = d.sub_data.sub_list[i];
            for(let j = 0; j < this.rightHeader.length; j++) {
                let one = this.rightHeader[j];
                if(one.type == "operator") continue;
                if(item[one.labelValue]) continue;
                item[one.labelValue] = "";
            }
            // 构造自己的数据
            if(item.lv3_code) {
                item["lv_code"] = item.lv3_code;
                item["lv_name"] = item.lv3_name;
                item["level_n"] = 3
            }
            else if(item.lv2_code) {
                item["lv_code"] = item.lv2_code;
                item["lv_name"] = item.lv2_name;
                item["level_n"] = 2
            }
            else if(item.lv1_code) {
                item["lv_code"] = item.lv1_code;
                item["lv_name"] = item.lv1_name;
                item["level_n"] = 1
            }
            right_adapter(item);
        }
        this.actionDatas = d.sub_data.sub_list;
        this.clone.tag = !this.clone.tag;
    },
    selectchange: function() {
        this.showm = !this.showm;
    }
  },
  components: {lefttb,righttb,mdialog,btn,tpldialog},
  watch:{}
}
</script>
