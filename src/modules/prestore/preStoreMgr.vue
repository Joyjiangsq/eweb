<template>
    <div :class="css.BoX">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="css.tBox">
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" url="stockpiles" :params="searchParams" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page" ></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./pre.css";
import Utils from "common/Utils.js";
import {orderStatus} from "config/const";
import pageBase from "common/mixinPage.js";
console.log(pageBase);
import Vue from "vue";

// 自定义
var orderComponent = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inrow" @click="clickHandler">{{totals | json}}</div>',
  ready: function(){
    this.totals = this.selfData.U_PurchaseNum;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"prestore/detail", query:{orderid: this.totals}})
    }
  }
})

let tableHeaderDatas = [{name:"备货订单号", labelValue:"U_PurchaseNum", type:"data", type:"component", component: orderComponent, cname:"ordercomponent01"},
                        {name:"SAP订单号", labelValue:"DocNum",type:"data"},
                        {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d){return d.U_OrderStatus =="店长驳回"?"<span class='reback'>店长驳回</span>":d.U_OrderStatus}},
                        {name:"收货人", labelValue:"U_Consignee",type:"data",adapterFun: function(d){ return d.rec_info.U_Consignee}},
                        {name:"收货人电话", labelValue:"U_ConsigneePhone",type:"data",adapterFun: function(d){return d.rec_info.U_ConsigneePhone}},
                        {name:"创建人", labelValue:"station",type:"data"},
                        {name:"创建时间", labelValue:"U_Date", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.U_Date), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"备货申请",
      orderStatus: orderStatus,
      headercaption:tableHeaderDatas, // 表格头部信息设置
      btnsData:[{name:"新增", icon:"icon-share", action:"add"},{name:"导出", icon:"icon-export", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                this.$router.go({path:"prestore/add"});
            }
        }
      },
      tableEvents:{
        operatorRender: function(d){
          if(!d.U_PageLink) return []
          return [{name:"查看物流",action:"look",icon:"icon-edit", data: d}]
        },
        operatorHandler: function(d){
          if(d.action == "look") {
            window.open(d.U_PageLink);
          }
        }
      },
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_PurchaseNum || "",  keyname:"U_PurchaseNum", labelcaption:"备货订单号"},
              {type:"text",  value:q.DocNum || "",  keyname:"DocNum", labelcaption:"SAP订单号"},
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"name", value:q.U_OrderStatus || "", datas:this.orderStatus, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建日期:"}];
    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
  },
  components: {},
}
</script>
