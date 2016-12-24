<template>
    <div :class="css.Box" style="width:97%; margin: 0 auto;">
            <btn @click="inTpl" style="margin-bottom: 10px;">导入模板</btn>
            <div v-if="datas.length == 0" style="text-align: center; color:gray; padding: 30px">
                  请导入模板
            </div>
            <div v-else>
                <div :class='css.leftBox'>
                    <lefttb :headercaption="leftHeader" @rowclick="rowclick"  scene="price_yes"  :needselected= "true"  :datas="datas" :events="tableEventsLeft"></lefttb> 
                    <div :class="css.finalRow">
                        <div>升级金额：{{statisticData.up}}</div>    
                        <div>降级金额：{{statisticData.down}}</div>   
                        <div>减项金额：{{statisticData.minu}}</div>   
                        <div>增项金额：{{statisticData.add}}</div>   
                        <div>互换金额：{{statisticData.change}}</div>   
                        <div>个性化金额：{{statisticData.spec}}</div>   
                    </div>
                </div>

                <div :class='css.rightBox'>
                    <righttb v-if="curCheck =='gxh'" @selectchange="selectchange" :headercaption="rightHeader_g"  scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" ></righttb>
                    <righttb v-if="curCheck =='zx'" @selectchange="selectchangezx" :headercaption="rightHeader"  scene="add_yes" :events="tableEventsRight"  :datas="actionDatas" ></righttb>
                    <righttb v-if="curCheck ==''" :headercaption="rightHeader"  scene="price_yes" :events="tableEventsRight"  :datas="actionDatas" ></righttb>
                </div>
            </div>

           

            <specdialog :show="showSpecDialog" :datas="actionDatas" @addone="addone"></specdialog>
             <adddialog :show="showAddDialog" :datas="actionDatas" @addone="addoneAdd"></adddialog>
             <updatedialog :show="showUpdateDialog" @onconfirm="updateConfirm" :params="updateParams"></updatedialog>
             <donwdialog :show="showDownDialog" @onconfirm="downConfirm" :params="downParams"></donwdialog>
             <changedialog :show="showChangeDialog" @onconfirm="changeConfirm" :params="changeParams"></changedialog>
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

import specdialog from "./action/materialSpecDialog";
import adddialog from "./action/materialAddDialog";
import updatedialog from "./action/materialUpdateDialog";
import donwdialog from "./action/materialDowndateDialog";
import changedialog from "./action/materialChangeDialog";

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
        console.log(d);
        Object.assign(this.selfData, d);
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
      showSpecDialog:false,
      showAddDialog: false,
      showUpdateDialog: false,
      showDownDialog: false,
      showChangeDialog: false,
      updateParams:{type:"升级", page: 1, before_code:""},
      downParams:{type:"降级", page: 1, before_code:""},
      changeParams: {type:"互换", page: 1, before_code:""},
      actionDatas:[],
      copyArea: false,
      showTplDialog: false,
      curCheck:"gxh",
      areaData: "", // 空间对象
      curStaticData:[],
      statisticData:{
        up: 0, // 升级金额
        down:0, // 降级
        minu:0, // 减项
        change:0, // 互换
        add: 0, //增项
        spec:0 // 个性化
      },
      leftHeader: [{name:"名称", labelValue:"name",type:"data"},{type:"data", name:"金额", labelValue:"sub_price"}, {type:"operator", name:"操作"}],
      rightHeader: [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                                      {name:"选择产品", labelValue:"product_name", type:"componentspec",component: selectComponent, cname:"selectcomponent",
                                        validateFun: function(d) {
                                            console.log(d);
                                            if(d.remark == "减项") return true
                                            return false
                                        }},
                                      {name:"产品名称", labelValue:"ItemName", type:"data"}, 
                                      {name:"品牌", labelValue:"U_Brand", type:"data"}, 
                                      {name:"型号", labelValue:"U_Modle", type:"data"},{name:"规格", labelValue:"Spec", type:"data"},
                                      {name:"单位", labelValue:"SalUnitMsr", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit",validateFun: function(){
                                            console.log("==--====--===--====--==");
                                            this.caculateFinalData();
                                      }},
                                      {name:"差价", labelValue:"self_price", type:"data"}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"data"}],
      rightHeader_g: [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                                      {name:"产品名称", labelValue:"ItemName", type:"data"}, 
                                      {name:"品牌", labelValue:"U_Brand", type:"data"}, 
                                      {name:"型号", labelValue:"U_Modle", type:"data"},{name:"规格", labelValue:"Spec", type:"data"},
                                      {name:"单位", labelValue:"SalUnitMsr", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit",validateFun: function(){
                                          this.caculateFinalData();
                                      }},
                                      {name:"单价", labelValue:"self_price", type:"data"},
                                      {name:"金额", labelValue:"price", type:"data"},
                                      {name:"个性化说明", labelValue:"remark", type:"data"}],
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
               this.caculateFinalData();
            }
            else if(d.action == "delete") {
               // 重置状态
               // 如果当前是选中的
               if(d.data.selected) {
                   let tindex = this.datas.length-1;
                   this.datas[tindex].selected = true;
                   this.actionDatas =  this.datas[tindex].sub_data.sub_list;
                   this.curCheck = "gxh";
               }
               // 如果当前是非选中的 不做任何事情
               this.datas.splice(d.index, 1);
               this.caculateFinalData()
            }
        }
      },
      tableEventsRight:{
         operatorRender: function(d, index){
            if(this.curCheck == "gxh" || this.curCheck == "zx") return [{name:"删除", action:"delete", index: index}];
            let btns = [{name:"升级", action:"update", index: index, data: d},{name:"降级", action:"downdate", index: index, data: d}]
            if(d.change == "1") btns.push({name:"互换", action:"rechange", index: index, data: d}); // 允许互换
            if(!this.copyArea) {
                btns.unshift({name:"重置", action:"reset", index: index, data: d})
            }
            if(d.remark == "升级" || d.remark == "互换" || d.remark == "降级") return btns
            else {
                console.log(d);
                if(d.minu == "1") btns.push({name:"减项", action:"minus", index: index, data: d});
            }
            return btns;
         },

         operatorHandler: function(d){
             if(d.action == "delete") {
                 // 删除个性化一项
                 this.actionDatas.splice(d.index, 1);
             }
             else if(d.action == "update") {
                 this.updateParams.before_code = d.data.lv_code;
                 this.showUpdateDialog = !this.showUpdateDialog;
             }
             else if(d.action == "downdate") {
                 this.downParams.before_code = d.data.lv_code;
                 this.showDownDialog = !this.showDownDialog;
             }
             else if(d.action == "rechange") {
                 this.changeParams.before_code = d.data.lv_code;
                 this.showChangeDialog = !this.showChangeDialog;
             }
             else if(d.action == "minus") {
                 this.minusAction(d.data, d.index);
             }
             else if(d.action == "reset") {
                 this.resetAction(d.data, d.index);
             }
             this.caculateFinalData(d);
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
    addone: function(d) {
        console.log(d);
        d.price = "-";
        right_adapter(d);
        this.actionDatas.push(d);
    },
    caculateFinalData: function() {
       this.statisticData = {
            up: 0, // 升级金额
            down:0, // 降级
            minu:0, // 减项
            change:0, // 互换
            add: 0,
            spec:0 // 个性化
      };
      for(let i = 0; i < this.datas.length; i++) {
            let one = this.datas[i];
            let subPrice = 0;
            let subData = one.sub_data.sub_list;
            for(let j = 0; j < subData.length; j++) {
                let subOne = subData[j];
                if(!subOne.price || isNaN(subOne.price)) continue
                if(!subOne.counts.def || isNaN(subOne.counts.def)) continue
                if(subOne.remark == "升级") this.statisticData.up += subOne.price*1;
                else if(subOne.remark == "降级") this.statisticData.down += subOne.price*1;
                else if(subOne.remark == "减项") this.statisticData.minu += subOne.price*1;
                else if(subOne.remark == "互换") this.statisticData.change += subOne.price*1;
                else if(subOne.remark == "增项") this.statisticData.add += subOne.price*1;
                else if(subOne.remark == "个性化") this.statisticData.spec += subOne.price*1;
                subPrice += subOne.price*1
            }
            one.sub_price = subPrice;
        }
        console.log(this.datas);
    },
    // 重置
    resetAction: function(d, index) {
        //curStaticData 初始对象
        // areaData 单个空间
        console.log(this.areaData);
        let uni = this.areaData.uniId || "";
        let curStatic = null;
        for(let i = 0;i<this.curStaticData .length; i++) {
            let one = this.curStaticData[i];
            if(one.canDelete) continue;
            if(one.uniId == uni) curStatic = one;
        }
        if(!curStatic) return false;

        let curStaticRow = curStatic.sub_data.sub_list[index];
        let curRow = this.actionDatas[index];
        this.resetDateCol(curStaticRow);
        Object.assign(curRow, curStaticRow);
    },
    updateConfirm: function(d,changeCode) {
        console.log("升级");
        d.remark= "升级";
        for(let i = 0; i < this.actionDatas.length; i++) {
            let one = this.actionDatas[i];
            if(one.lv_code != changeCode) continue
            else {
                this.resetDateCol(d);
                d.change= one.change;
                d.minu = one.minu;
                this.actionDatas.splice(i, 0, d);
                this.actionDatas.splice(i+1, 1);
                break;
            }
            // curIndex
            // one = Object.assign({}, one, d);
        }
    },
    minusAction: function(d, index) {
        this.$http.get(this.$Api + "rule-product", {params:{lv_code: d.lv_code, type:"减项", page: 1}}).then((res) => {
            console.log(res);
            let data = res.json();
            if(data.data.count == 0) {

            }
            else {
                let one = data.data.docs[0]; // 获取降级金额 TODO
                let nData = {
                    lv_code: one.lv_code,
                    lv_name: one.lv_name,
                    remark: "减项",
                    self_price: one.self_price,
                    level_n: one.lv_level
                }
                console.log(nData);
                console.log(this.actionDatas[index]);
                Object.assign(this.actionDatas[index], nData);
            }
        });
    },
    downConfirm: function(d,changeCode) {
        d.remark= "降级";
        for(let i = 0; i < this.actionDatas.length; i++) {
            let one = this.actionDatas[i];
            if(one.lv_code != changeCode) continue
            else {
                this.resetDateCol(d);
                 d.change= one.change;
                d.minu = one.minu;
                this.actionDatas.splice(i, 0, d);
                this.actionDatas.splice(i+1, 1);
                break;
            }
        }
    },
    changeConfirm: function(d,changeCode) {
        d.remark= "互换";
        for(let i = 0; i < this.actionDatas.length; i++) {
            let one = this.actionDatas[i];
            if(one.lv_code != changeCode) continue
            else {
                this.resetDateCol(d);
                d.change= one.change;
                d.minu = one.minu;
                this.actionDatas.splice(i, 0, d);
                this.actionDatas.splice(i+1, 1);
                break;
            }
        }
    },
    addoneAdd: function(d) {
        this.resetDateCol(d);
        right_adapter(d);
        d.remark = "增项";
        this.actionDatas.push(d);
    },
    inTpl: function() {
        this.showTplDialog = !this.showTplDialog
    },
    getOnTpl: function(d) {
        this.curStaticData = Utils.cloneObj(d.prolist);
        this.datas = [];
        for(let i = 0; i < d.prolist.length; i++) {
            d.prolist[i].sub_price = 0;
            let one = Object.assign({}, d.prolist[i]);
            this.datas.push(one);
        }
        console.log(this.datas);
         // 初始化个性化对象
        this.actionDatas = this.datas[this.datas.length - 1].sub_data.sub_list;
    },
    resetDateCol: function(item) {
            for(let j = 0; j < this.rightHeader.length; j++) {
                let one = this.rightHeader[j];
                if(one.type == "operator") continue;
                if(item[one.labelValue]) continue;
                item[one.labelValue] = "-";
            }
            right_adapter(item);
    },
    rowclick: function(d, index) {
        this.areaData = d; // 记录空间的对象
        if(d.canDelete) this.copyArea = true
        else this.copyArea = false
        if(d.code == "gxh") this.curCheck = "gxh";
        else if(d.code == "zx") this.curCheck = "zx";
        else this.curCheck = "";
        let tpl = [];
        for(let i = 0; i < d.sub_data.sub_list.length; i++) {
            let item = d.sub_data.sub_list[i];
            this.resetDateCol(item)
            tpl.push(Object.assign({}, item))
        }
        d.sub_data.sub_list = tpl;
        this.actionDatas = d.sub_data.sub_list;
    },
    selectchange: function() {
        this.showSpecDialog = !this.showSpecDialog;
    },
    selectchangezx: function(){
        this.showAddDialog = !this.showAddDialog;
    }
  },
  components: {lefttb,righttb,specdialog,btn,tpldialog,adddialog,updatedialog, donwdialog, changedialog},
  watch:{
     
  }
}
</script>
