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
    </div>
</template>

<script>
import css from "./pre.css";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import {orderStatus} from "config/const";
import tbsp from "component/grid/tableSpec";
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
        this.$router.go({path:"prestore/detail", query:{orderid: this.totals}})
    }
  }
})

var deWayComp = Vue.extend({
  data:function(){
    return {
      css,
      test:[{name:"配送", id:"PS"}, {name:"自提", id:"ZT"}],

    }
  },
  template: '<div>aaaa</div>',
  ready: function(){
  },
  methods:{
    clickHandler: function(){
    }
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
      headercaption:[{checkbox: true}, {name:"配送方式", labelValue:"U_DeWay", type:"component", component: deWayComp, cname:"deway"},
                              {name:"备货订单号", labelValue:"U_PurchaseNum",  type:"component", component: orderComponent, cname:"ordercomponent2"},
                              {name:"SAP订单号", labelValue:"DocNum",type:"data"},
                              {name:"订单状态", labelValue:"U_OrderStatus",type:"data"},
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
      getCheckList: function(list) {
          console.log(list);
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
      },
      failHandler: function(d){

      }

  },
  components: {tbsp},
}
</script>
