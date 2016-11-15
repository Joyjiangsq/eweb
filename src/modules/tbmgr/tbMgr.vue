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
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" url="cost-account" :params="searchParams" ></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./tb.css";
import btnbar from "component/sprite/buttonbar";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import Vue from "vue";
// 自定义
var orderTo = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{totals}}</div>',
  ready: function(){
    this.totals = this.selfData.U_FZOrder;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"sale/detail", query:{orderid: this.totals}})
    }
  }
})
let tableHeaderDatas = [
                        {name:"销售订单号", labelValue:"U_FZOrder",type:"component", component: orderTo, cname:"orderto1"},
                        {name:"业主姓名", labelValue:"CardName",type:"data",adapterFun: function(d) {return d.base_info.CardName}},
                        {name:"业主地址", labelValue:"Address",type:"data",adapterFun: function(d) {return d.base_info.Address}},
                        {name:"销售报价", labelValue:"xxx",type:"data",adapterFun: function(d) {return d.base_info.U_PaInAmount}},
                        {name:"采购完成率", labelValue:"completion_rate",type:"data"},
                        {name:"主材款（采购）", labelValue:"DocTotal",type:"data"},
                        {name:"服务费（采购）", labelValue:"U_SerCharge",type:"data"},
                        {name:"销售时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"报表管理",
      headercaption:tableHeaderDatas, // 表格头部信息设置
      btnsData:[{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "export") {
                window.open(this.$Api + "cost-account/download?"+$.param(this.searchParams));
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_FZOrder || "",  keyname:"U_FZOrder", labelcaption:"销售订单号:"},
              {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"业主姓名:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"销售时间:"}];

    }

  },
  ready: function () {
  },
  attached: function () {},
  methods: {
  },
  components: {btnbar},
  route:{
  }
}
</script>
