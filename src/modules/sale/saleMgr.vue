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
            <tb :headercaption="tableHeaderDatas" :load="load"  :needselected= "true" @successload="successloadHandler" :needindex="false" :totals.sync="totals" @rowclick="rowClickHanlder"  :params="searchParams" url="sales" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :pix="4" :curpage.sync="searchParams.page" ></pg>
    </div>

    <div  :class="css.customRight">
          <tb :headercaption="subHeaders"  :needindex="false" :load="subLoad" url="sales/all-sub-orders" :params="subSearchParams"  :events="subTableEvents"></tb>
    </div>
    <dialog :flag="showCode" title="二维码">
          <div slot="containerDialog">
                  <div :class="css.inBoxCode">
                    <propertytext key="订单号" :value="curData.U_FZOrder"></propertytext>
                    <!-- <propertytext key="分站名称：" :value="curData.U_FZOrder"></propertytext>
                    <propertytext key="银行账号：" :value="------"></propertytext> -->
                    <propertytext key="业主姓名" :value="curData.base_info.CardName"></propertytext>
                    <propertytext key="业主电话" :value="curData.base_info.Phone2"></propertytext>
                    <propertytext key="业主地址" :value="curData.base_info.Address"></propertytext>
                    <propertytext key="订单日期" :value="curData.createAt"></propertytext>
                  </div>
                  <div :class="css.codeTarget">

                  </div>
          </div>
          <div slot="footerDialog"></div>
    </dialog>

  </div>
</template>
<script>
import Vue from "vue";
import Utils from "common/Utils.js";
import css from "./sale.css";
import {setTitle} from "actions";
import {packageType, orderType, orderStatus} from "config/const";
import pageBase from "common/mixinPage.js";
import qrcode from "vendor/jquery.qrcode.min.js";
import propertytext from "component/form/propertyText.vue";
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
                        {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d) {return d.U_OrderStatus == 0?"<span class='reback'>驳回</span>":"正常"}},
                        {name:"产品包", labelValue:"U_SWW",type:"data", adapterFun: function(d) {return d.base_info.U_SWW}},
                        {name:"订单类型", labelValue:"order_type",type:"data", adapterFun: function(d) {return d.base_info.order_type}},
                        {name:"客户姓名", labelValue:"CardName",type:"data", adapterFun: function(d) {return d.base_info.CardName}},
                        {name:"电话", labelValue:"Phone2",type:"data", adapterFun: function(d) {return d.base_info.Phone2}},
                        {name:"业主地址", labelValue:"Address",type:"data", adapterFun: function(d) {return d.base_info.Address}},
                        {name:"创建人", labelValue:"createdByName",type:"data"},
                        {name:"创建时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
let subHeaders = [{name:"销售子订单号",labelValue:"U_PurchaseNum", type:"component", component: sorderComponent, cname:"subordercomponent"},
                  {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d) {return (d.U_OrderStatus == '店长驳回' || d.U_OrderStatus == 'e站驳回')?"<span class='reback'>"+d.U_OrderStatus+"</span>":d.U_OrderStatus}}]
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
      curData:{base_info:{}},
      showCode: false,
      // 表格回调
      tableEvents:{
        operatorRender: function(d){
          return [{name:"补单",action:"addOrder",data: d},{name:"二维码",action:"code",data: d}]
        },
        operatorHandler: function(d){
            if(d.action == "addOrder") {
                this.$router.go({path:"sale/append", query:{orderid:d.data.U_FZOrder}})
            }
            else if(d.action == "code") {
                this.curData = d.data;
                $("." + this.css.codeTarget).empty();
                $("." + this.css.codeTarget).qrcode({
                  width: 150, //宽度
                  height:150, //高度
                  text: d.data.U_FZOrder //任意内容
                });
                this.showCode = !this.showCode;
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
      return [{type:"text",  value:q.U_FZOrder || "",  keyname:"U_FZOrder", labelcaption:"销售订单号:"},
              {type:"combobox", keyid:"name", value:q.U_SWW || "", labelname:"name", keyname:"U_SWW", labelcaption:"产品所属包:", datas:packageType},
              {type:"combobox", keyid:"id", value:q.Series || "", labelname:"name", keyname:"Series", labelcaption:"订单类型:", datas:orderType},
              {type:"combobox", keyid:"id", value:q.U_OrderStatus || "", labelname:"name", keyname:"U_OrderStatus", labelcaption:"订单状态:", datas:[{name:"正常", id:"1"},{name:"驳回", id:"0"}]},
              {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"客户姓名:"},
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
            if(datas.length == 0) {
                this.subSearchParams.U_FZOrder = Math.random().toString(36);
                this.$set("subLoad", !this.subLoad);
                return false;
            }
            let one = datas[0];
            this.subSearchParams.U_FZOrder = one.U_FZOrder;
            this.$set("subLoad", !this.subLoad);
      }
  },
  components: {propertytext},

}
</script>
