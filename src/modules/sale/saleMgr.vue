<template lang="html">
  <div :class="css.saleContainer">
    <pagepanel classname="needpadding" direct="bottom">
          <div :class="css.userSearch">
            <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
          </div>
    </pagepanel>
    <div  :class="css.customLeft">
          <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
          <div :class="css.tBox">
            <tb :headercaption="tableHeaderDatas"  :needselected= "true" @successload="successloadHandler" :needindex="false" :totals.sync="totals" @rowclick="rowClickHanlder"  :params="searchParams" url="sales" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :pix="4" :curpage.sync="searchParams.page" ></pg>
    </div>

    <div  :class="css.customRight">
          <tb :headercaption="subHeaders"  :needindex="false" :load="subLoad" url="sales/all-sub-orders" :params="subSearchParams"  :events="subTableEvents"></tb>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Utils from "common/Utils.js";
import css from "./sale.css";
import {setTitle} from "actions";
import {packageType, orderType, orderStatus} from "config/const";
import pageBase from "common/mixinPage.js";
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
    this.totals = this.selfData.U_FZOrder;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"sale/detail", query:{orderid: this.totals}})
    }
  }
})
var sorderComponent = Vue.extend({
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
        this.$router.go({path:"sale/subdetail", query:{orderid: this.totals}})
    }
  }
})
let tableHeaderDatas = [{name:"订单号", labelValue:"U_FZOrder", type:"component", component: orderComponent, cname:"ordercomponent"},
                        {name:"订单状态", labelValue:"order_status",type:"data"},
                        {name:"产品包", labelValue:"U_SWW",type:"data", adapterFun: function(d) {return d.base_info.U_SWW}},
                        {name:"订单类型", labelValue:"order_type",type:"data", adapterFun: function(d) {return d.base_info.order_type}},
                        {name:"客户姓名", labelValue:"CardName",type:"data", adapterFun: function(d) {return d.base_info.CardName}},
                        {name:"电话", labelValue:"Phone2",type:"data", adapterFun: function(d) {return d.base_info.Phone2}},
                        {name:"业主地址", labelValue:"Address",type:"data", adapterFun: function(d) {return d.base_info.Address}},
                        {name:"创建人", labelValue:"CardCode",type:"data"},
                        {name:"创建时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
let subHeaders = [{name:"销售子订单号",labelValue:"U_PurchaseNum", type:"component", component: sorderComponent, cname:"subordercomponent"},{name:"订单状态", labelValue:"status",type:"data"}] // 0 被驳回
export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      moduleName:"销售订单管理",
      testData:[{totals:"xxxx", html:true, orderId:"卡拉", orderStatus: 1, selected: true},{totals:"1102019201", orderId:"卡拉", orderStatus:2, selected: false}],
      tableHeaderDatas: tableHeaderDatas,  // 表头初始化
      subHeaders: subHeaders, // 子订单表格表头
      subLoad: false, // 子列表加载
      subSearchParams:{},
      // 表格回调
      tableEvents:{
        operatorRender: function(d){
          return [{name:"补单",action:"addOrder",data: d},{name:"付款记录",action:"payHistory",data: d},{name:"二维码",action:"code",data: d}]
        },
        operatorHandler: function(d){
            if(d.action == "addOrder") {
                this.$router.go({path:"saleappend", query:{orderid:d.data.U_FZOrder}})
            }
        }
      },
      subTableEvents:{

      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                  this.$router.go({path:"sale/addSale"})
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.orderId || "",  keyname:"orderId", labelcaption:"销售订单号:"},
              {type:"text",  value:q.subOrderId || "",  keyname:"subOrderId", labelcaption:"子订单号:"},
              {type:"combobox", keyid:"id", value:q.packageType || "", labelname:"name", keyname:"packageType", labelcaption:"产品所属包:", datas:packageType},
              {type:"combobox", keyid:"id", value:q.orderType || "", labelname:"name", keyname:"orderType", labelcaption:"订单类型:", datas:orderType},
              {type:"combobox", keyid:"id", value:q.orderStatus || "", labelname:"name", keyname:"orderStatus", labelcaption:"订单状态:", datas:orderStatus},
              {type:"text",  value:q.customName || "",  keyname:"customName", labelcaption:"客户姓名:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    }
  },
  ready: function () {
    this.$nextTick(function () {
       this.$el.querySelector("."+this.css.customLeft).style.width = (window.innerWidth - 505 )+"px";
    })
  },
  attached: function () {},
  methods: {
      rowClickHanlder: function(one) {
            console.log(one);
            this.subSearchParams.U_FZOrder = one.U_FZOrder;
            this.$set("subLoad", !this.subLoad);
      },
      successloadHandler: function(datas){
            if(datas.length == 0) return false;
            let one = datas[0];
            this.subSearchParams.U_FZOrder = one.U_FZOrder;
            this.$set("subLoad", !this.subLoad);
      }
  },
  components: {},

}
</script>
