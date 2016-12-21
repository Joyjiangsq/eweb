<template>
    <div :class="css.Box" style="width:97%; margin: 0 auto;">
            <btn @click="inTpl">导入模板</btn>
            <div v-if="datas.length == 0" style="text-align: center; color:gray; padding: 30px">
                  请导入模板
            </div>
            <div v-else>{{datas | json}}
                <div :class='css.leftBox'>
                    <lefttb :headercaption="leftHeader" @rowclick="rowclick"  scene="price_yes"  :needselected= "true"  :datas="datas" :events="tableEventsLeft"></lefttb> 
                </div>

                <div :class='css.rightBox'>
                    <righttb v-if="curCheck =='gxh'" @selectchange="selectchange" :headercaption="rightHeader_g"  scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" v-else></righttb>
                    <righttb v-if="curCheck =='zx'" @selectchange="selectchangezx" :headercaption="rightHeader"  scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" v-else></righttb>
                    <righttb :headercaption="rightHeader"  scene="price_yes" :events="tableEventsRight"  :datas="actionDatas" v-else></righttb>
                </div>
            </div>
            <mdialog :show="showm" :datas="actionDatas" @addone="addone"></mdialog>
            <tpldialog :show.sync="showTplDialog" @checkone="getOnTpl"></tpldialog>
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
// 自定义
var selectComponent = Vue.extend({
  data:function(){
    return {
      css,
      show: false,
      params:{page: 1},
      toload: false,
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
        console.log(this.selfData);
        Object.assign(this.selfData, d)
        right_adapter(this.selfData);
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
      showm:false,
      actionDatas:[],
      showTplDialog: false,
      curCheck:"gxh",
      leftHeader: [{name:"名称", labelValue:"name",type:"data"},{type:"data", name:"金额", labelValue:"sub_price"}, {type:"operator", name:"操作"}],
      rightHeader: [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                                      {name:"选择产品", labelValue:"product_name", type:"componentspec",component: selectComponent, cname:"selectcomponent"},
                                      {name:"产品名称", labelValue:"ItemName", type:"data"}, 
                                      {name:"品牌", labelValue:"U_Brand", type:"data"}, 
                                      {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                                      {name:"单位", labelValue:"Unit", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit"},
                                      {name:"差价", labelValue:"selling_price", type:"data"}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"edit"}],
      rightHeader_g: [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
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
              //  let newData = Object.assign({}, d.data)
              let newData = Utils.cloneObj(d.data);
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
            if(this.curCheck == "gxh") return [{name:"删除", action:"delete", index: index}];
            return [{name:"升级", action:"delete", index: index},{name:"降级", action:"delete", index: index},{name:"减项", action:"delete", index: index},{name:"互换", action:"delete", index: index}]
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
        else if(d.code == "zx") this.curCheck = "zx";
        else this.curCheck = "";
        let tpl = [];
        for(let i = 0; i < d.sub_data.sub_list.length; i++) {
            let item = d.sub_data.sub_list[i];
            for(let j = 0; j < this.rightHeader.length; j++) {
                let one = this.rightHeader[j];
                if(one.type == "operator") continue;
                if(item[one.labelValue]) continue;
                item[one.labelValue] = "-";
            }
            right_adapter(item);
            tpl.push(Object.assign({}, item))
        }
        d.sub_data.sub_list = tpl;
        this.actionDatas = d.sub_data.sub_list;
    },
    selectchange: function() {
        this.showm = !this.showm;
    },
    selectchangezx: function(){

    }
  },
  components: {lefttb,righttb,mdialog,btn,tpldialog},
  watch:{}
}
</script>
