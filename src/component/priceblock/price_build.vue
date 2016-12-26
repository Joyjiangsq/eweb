<template>
    <div :class="css.Box" style="width:97%; margin: 0 auto;">
            <btn @click="inTpl" style="margin-bottom: 10px;">导入模板</btn>
            <div v-if="datas.length == 0"  style="text-align: center; color:gray; padding: 30px">
                  请导入模板
            </div>
            {{datas | json}}
            <div v-else>
                <div :class='css.leftBox'>
                    <lefttb :headercaption="leftHeader" @rowclick="rowclick"  scene="price_yes"  :needselected= "true"  :datas="datas" :events="tableEventsLeft"></lefttb> 
                </div>

                <div :class='css.rightBox'>
                    <righttb v-show="curCheck =='gxh'" @selectchange="selectchange" :headercaption="rightHeader_g" scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" ></righttb>
                    <righttb v-show="curCheck !='gxh'" :headercaption="rightHeader" scene="price_yes" :events="tableEventsRight"  :datas="actionDatas"></righttb>
                </div>
            </div>
            <tpldialog :show.sync="showTplDialog" @checkone="getOnTpl" url="tpl-construction-quote"></tpldialog>
            <showbuild :show="showBuildDialog" @buildconfirm="buildconfirm"></showbuild>
    </div>
</template>

<script>
import css from "./price.css";
import lefttb from "component/grid/priceWhereTable";
import tpldialog from "component/blockcommon/selectTplDialog.vue";
import righttb from "component/grid/priceTypeTable";
import right_adapter from "./adapterRight";
import right_adapter_n from "./adapterRightnew";
import btn from "component/sprite/button";
import spdialog from "component/blockcommon/selectProductByTypeDialog";
import Utils from "common/Utils.js";
import showbuild from "component/blockcommon/selectBuildDialog";

export default {
  props:{
      datas: {
        default: () => []
      }
  },
  data: function () {
    return {
      css,
      actionDatas:[],
      showTplDialog: false,
      curCheck:"gxh",
      showBuildDialog: false,
      leftHeader: [{name:"名称", labelValue:"name",type:"data"},{type:"data", name:"金额", labelValue:"sub_price"}, {type:"operator", name:"操作"}],
      rightHeader: [{name:"项目名称", labelValue:"project_name", type:"data"},
                                      {name:"工艺说明", labelValue:"description", type:"data"}, 
                                      {name:"数量" ,labelValue:"counts", type:"edit",validateFun: function(){
                                            console.log("==--====--===--====--==");
                                            this.caculateFinalData();
                                      }},
                                      {name:"单价", labelValue:"selling_price", type:"data"}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"edit"}],
      rightHeader_g: [{type:"operator", name:"操作"},{name:"项目名称", labelValue:"project_name", type:"edit"},
                                      {name:"工艺说明", labelValue:"description", type:"edit"}, 
                                      {name:"数量" ,labelValue:"counts", type:"edit",validateFun: function(){
                                            console.log("==--====--===--====--==");
                                            this.caculateFinalData();
                                      }},
                                      {name:"单价", labelValue:"selling_price", type:"edit",validateFun: function(){
                                            console.log("==--====--===--====--==");
                                            this.caculateFinalData();
                                      }}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"edit"}],
      tableEventsLeft:{
        operatorRender: function(d, index){
          if(d.canDelete) return [{name:"删除", action:"delete",icon:"icon-delete", index:index, data:d}];
          return [{name:"复制", action:"copy",icon:"icon-tip", index:index, data:d}];
        },

        operatorHandler: function(d){
            if(d.action == "copy") {
               let newData = Utils.cloneObj(d.data);
              //  let newData = Object.assign(tpData, d.data)
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
             if(d.action == "delete") {
                 this.actionDatas.splice(d.index, 1);
             }
         }
      }
    }
  },
  computed: {
  },
  ready: function () {},
  attached: function () {},
  methods: {
    buildconfirm: function(d) {
      for(let i = 0; i < d.length; i++) {
        d[i].type = "gxh";
        let ndata = Object.assign({}, d[i]);
        this.resetDateCol(ndata);
        this.actionDatas.push(ndata);
      }
       console.log(this.actionDatas);
    },
    addone: function(d) {
        right_adapter(d);
        console.log(d);
        this.actionDatas.push(d);
    },
    inTpl: function() {
        this.showTplDialog = !this.showTplDialog
    },
    getOnTpl: function(d) {
        // this.datas = d.prolist;
        this.datas = [];
        for(let i = 0; i < d.prolist.length; i++) {
            d.prolist[i].sub_price = 0;
            let one = Object.assign({}, d.prolist[i]);
            this.datas.push(one);
        }
        this.actionDatas = this.datas[this.datas.length-1].sub_data.sub_list;
    },
    caculateFinalData: function() {
        for(let i = 0; i < this.datas.length; i++) {
            let one = this.datas[i];
            let subPrice = 0;
            let subData = one.sub_data.sub_list;
            for(let j = 0; j < subData.length; j++) {
                let subOne = subData[j];
                if(!subOne.price || isNaN(subOne.price)) continue
                subPrice += subOne.price*1
            }
            one.sub_price = subPrice;
        }
    },
    resetDateCol: function(item) {
            let list = this.curCheck == "gxh"?this.rightHeader_g : this.rightHeader;
            for(let j = 0; j < list.length; j++) {
                let one = list[j];
                if(one.type == "operator") continue;
                if(item[one.labelValue]) continue;
                item[one.labelValue] = "";
            }
            right_adapter_n(item);
    },
    rowclick: function(d) {
        if(d.code == "gxh") this.curCheck = "gxh";
        else this.curCheck = "";
        let tpl = [];
        for(let i = 0; i < d.sub_data.sub_list.length; i++) {
            let item = d.sub_data.sub_list[i];
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
            let ndata = Object.assign({}, item);
            this.resetDateCol(ndata);
            tpl.push(ndata);
            // console.log(ndata);
        }
        d.sub_data.sub_list = tpl;
        this.actionDatas = d.sub_data.sub_list;
    },
    selectchange: function() {
       
        this.showBuildDialog = !this.showBuildDialog;
    }
  },
  components: {lefttb,righttb,btn,tpldialog,showbuild},
  watch:{
    "datas": {
      deep: true,
      handler: function(){
           console.log("--");
           
      }
    }
  }
}
</script>
