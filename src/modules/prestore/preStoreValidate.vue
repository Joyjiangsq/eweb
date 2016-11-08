<template>
    <div :class="css.BoX">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="css.tBox">
                    <tbsp :headercaption="headercaption" curaction="store" :totals.sync="totals" :getchecks="getchecks" @checklist="getCheckList" :load="load" url="sales/stock" :params="searchParams" ></tbsp>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>

        <dialog :flag="show" title="请输入驳回原因" @dialogclick="dialogclick">
              <div slot="containerDialog">
                    <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValue" placeholder="请填写驳回理由" ></textarea>
              </div>
        </dialog>
    </div>
</template>

<script>
import css from "./pre.css";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import {orderStatus} from "config/const";
import tbsp from "component/grid/tableBackStore";
import Vue from "vue";
// 自定义
var orderComponent = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{totals | json}}</div>',
  ready: function(){
    this.totals = this.selfData.U_PurchaseNum;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"prestorevalidate/detail", query:{orderid: this.totals}})
    }
  }
})
import radiobx from "component/radiobox/radioBox";
var deWayComp = Vue.extend({
  data:function(){
    return {
      css,
      test:[{label:"配送", id:"PS", checked: false}, {label:"自提", id:"ZT", checked: false}],
      value:"",
      checkEvents:{
        radioClick: function(d){
          this.selfData.U_DeWay = d;
        }
      }
    }
  },
  template: '<radiobx :datas="test" checkname="name" :events="checkEvents" :defaultkey="value"></radiobx>',
  ready: function(){
    this.value = this.selfData.U_DeWay || 'PS';
    this.selfData.U_DeWay = this.value;
  },
  components:{radiobx},
  methods:{
  }
})
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"备货审核",
      curaction:"",
      statusData:orderStatus,
      getchecks: false,
      show: false,
      backValue:"",
      checkedList:[],
      headercaption:[{checkbox: true}, {name:"配送方式", labelValue:"U_DeWay", type:"component", component: deWayComp, cname:"deway"},
                              {name:"备货订单号", labelValue:"U_PurchaseNum",  type:"component", component: orderComponent, cname:"ordercomponent2"},
                              {name:"SAP订单号", labelValue:"DocNum",type:"data"},
                              {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d) {return (d.U_OrderStatus == '分站驳回' || d.U_OrderStatus == 'e站驳回')?"<span class='reback'>"+d.U_OrderStatus+"</span>":d.U_OrderStatus}},
                              {name:"收货人", labelValue:"U_Consignee",type:"data",adapterFun: function(d){ return d.rec_info.U_Consignee}},
                              {name:"收货人电话", labelValue:"U_ConsigneePhone",type:"data",adapterFun: function(d){return d.rec_info.U_ConsigneePhone}},
                              {name:"创建人", labelValue:"station",type:"data"},
                              {name:"创建时间", labelValue:"U_Date", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.U_Date), "yyyy-mm-dd");}}],
      btnsData:[{name:"导出", icon:"icon-share", action:"export"},{name:"核价并购买", icon:"icon-check", action:"buy"},{name:"驳回", icon:"icon-back", action:"back"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "buy") {
                  this.curaction = "buy";
                  this.getchecks = !this.getchecks;
            }
            else if(d.action == "back") {
                  this.curaction = "back";
                  this.getchecks = !this.getchecks;
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_PurchaseNum || "",  keyname:"U_PurchaseNum", labelcaption:"备货订单号:"},
              {type:"text",  value:q.DocNum || "",  keyname:"DocNum", labelcaption:"SAP订单号:"},
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"name", value:q.U_OrderStatus || "", datas:this.statusData, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建日期:"}];

    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
      successHandler: function(d) {

      },
      dialogclick: function(d) {
          if(d.action == "confirm") {
              if(this.checkedList.length == 0) return false
              let paramsArry = [];
              for (var i = 0; i < this.checkedList.length; i++) {
                  let one = this.checkedList[i];
                  paramsArry.push({
                    back_value: this.backValue,
                    U_OrderStatus: "分站驳回",
                    U_PurchaseNum: one.U_PurchaseNum
                  })
              }
              this.rebackAction(paramsArry);
          }
      },
      rebackAction: function(params){
           this.$http.put(this.$Api+"sales/stock",JSON.stringify(params)).then((res) => {
               var d = res.json();
               this.showMsg("success", "驳回成功");
               this.loadlist();
               this.show = !this.show;
           },(error) =>{
             console.log(error);
             this.showMsg("error", error.msg);
           })
      },
      getCheckList: function(list) {
          if(list.length == 0) {
            this.showMsg("warn", "至少选择一项");
            return false
          }
          this.checkedList = list;
          if(this.curaction == "buy") {
              // 验证通过规则  如果是单个品类- 如果不是定制品 则不能过
              // 如果是多个品类  如果只有一个是非定制品   则不能过
              // 定制品名称为  厨柜 门  对应比对字段  ItmsGrpNam 品类

              this.$http.post(this.$Api+"sales/sub-orders/calculate",JSON.stringify(list)).then((res) => {
                  var d = res.json();
              },(error) =>{
                console.log(error);
              })
          }
          else if(this.curaction == "back") {
              this.show = !this.show;
          }
      },
      failHandler: function(d){

      }

  },
  components: {tbsp},
}
</script>
