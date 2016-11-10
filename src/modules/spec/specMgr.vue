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
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" url="urgent" :params="searchParams" ></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./d.css";
import btnbar from "component/sprite/buttonbar";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import Vue from "vue";
// 自定义
var orderurgent = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{totals}}</div>',
  ready: function(){
    this.totals = this.selfData.U_PurchaseNum;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"purchase/purchasedetail", query:{orderid: this.totals}})
    }
  }
})
let tableHeaderDatas = [
                        {name:"设计申请单号", labelValue:"U_FZOrder",type:"component", component: orderurgent, cname:"orderurgent2"},
                        {name:"品类", labelValue:"CardName",type:"data"},
                        {name:"测量员", labelValue:"U_PurchaseNum",type:"data"},
                        {name:"测量员电话", labelValue:"purchaser",type:"data"},
                        {name:"订单状态", labelValue:"purchaser",type:"data"},
                        {name:"申请时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"定制品设计管理",
      headercaption:tableHeaderDatas, // 表格头部信息设置
      btnsData:[{name:"设计申请", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                this.$router.go({path:"specmgr/apply"})
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_FZOrder || "",  keyname:"U_FZOrder", labelcaption:"设计申请单号:"},
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"name", value:q.U_OrderStatus || "", datas:[{name:"待交付", id:"待交付"},{name:"待确认", id:"待确认"},{name:"退回修改", id:"退回修改"},{name:"已完成", id:"已完成"}], labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"申请时间:"}];

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
