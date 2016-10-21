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
            <tb :headercaption="tableHeaderDatas"  :needselected= "true" :needindex="false" :totals.sync="totals" :datas="testData" :load="load" :params="searchParams" url="" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :pix="2"  @pagechange="pagechange"></pg>
    </div>

    <div  :class="css.customRight">
          <tb :headercaption="subHeaders" :totals.sync="totals" :needindex="false" :load="load" :params="subParams" url="" :events="tableEvents"></tb>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import search from "component/search/search";
import pagepanel from "component/panel/pagepanel";
import pg from "component/pagination/pagination";
import tb from "component/grid/tableListBase";
import btnbar from "component/sprite/buttonbar";
import css from "./sale.css";
import {setTitle} from "actions";
import {packageType, orderType, orderStatus} from "config/const";
// 自定义
var MyComponent = Vue.extend({
  data:function(){
    return {
      css
    }
  },
  props:{
    datas:{
      default:{}
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{getData.totals}}</div>',
  ready: function(){},
  methods:{
    clickHandler: function(){
        alert(this.datas);
    }
  },
  computed: {
    getData: function(){
      return JSON.parse(this.datas)
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
  data: function () {
    return {
      css,
      testData:[{totals:"xxxx", html:true, orderId:"卡拉", orderStatus: 1, selected: true},{totals:"1102019201", orderId:"卡拉", orderStatus:2, selected: false}],
      tableHeaderDatas: tableHeaderDatas,  // 表头初始化
      subHeaders: subHeaders, // 子订单表格表头
      totals:0,
      subLoad: false, // 子列表加载
      load: false,      // 加载控制
      searchParams:{}, // 查询条件
      searchEvents:{          // 查询数据
        onSearch: function(params) {
            // this.$set("params", params);
            // this.loadtag = !this.loadtag;
        }
      },
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
    pagechange: function(d){
        this.searchParams.page = d.page;
        this.loadlist();
    },
    loadlist: function(){
      this.$set("load", !this.load);
    }
  },
  components: {search,pagepanel,btnbar,pg,tb},
  route:{
    data: function(){
      setTitle(this.$store, "销售订单管理");
    }
  }
}
</script>
