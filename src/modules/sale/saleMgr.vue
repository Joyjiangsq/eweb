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
            <tb :headercaption="tableHeaderDatas"  :needselected= "true" :needindex="false" :totals.sync="totals" :datas="testData" :params="searchParams" url="" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :pix="4" :curpage.sync="searchParams.page" ></pg>
    </div>

    <div  :class="css.customRight">
          <tb :headercaption="subHeaders" :totals.sync="totals" :needindex="false" :load="load" :params="searchParams" url="sales" :events="tableEvents"></tb>
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
var MyComponent = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{totals | json}}</div>',
  ready: function(){
    this.totals = this.selfData.totals;
  },
  methods:{
    clickHandler: function(){
        alert(this.totals);
    }
  }
})

let tableHeaderDatas = [{name:"订单号", labelValue:"orderId", type:"data"},
                        {name:"订单状态", labelValue:"orderStatus",type:"data"},
                        {name:"销售总额", labelValue:"totals",type:"component", component: MyComponent, cname:"test"},
                        {name:"产品包", labelValue:"packageType",type:"data"},
                        {name:"订单类型", labelValue:"createdBy",type:"data"},
                        {name:"客户姓名", labelValue:"customName",type:"data"},
                        {name:"电话", labelValue:"phone",type:"data"},
                        {name:"业主地址", labelValue:"customAddress",type:"data"},
                        {name:"创建人", labelValue:"createdBy",type:"data"},
                        {name:"创建时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
let subHeaders = [{name:"销售子订单号",labelValue:"user_code", type:"data"},{name:"订单状态", labelValue:"status",type:"data"}]
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
      // 表格回调
      tableEvents:{
        operatorRender: function(d){
          return [{name:"补单",action:"addOrder",data: d},{name:"付款记录",action:"payHistory",data: d},{name:"二维码",action:"code",data: d}]
        },
        operatorHandler: function(d){
            console.log(d);
        }
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
       this.$el.querySelector("."+this.css.customLeft).style.width = (window.innerWidth - 455 )+"px";
    })
  },
  attached: function () {},
  methods: {

  },
  components: {},

}
</script>
