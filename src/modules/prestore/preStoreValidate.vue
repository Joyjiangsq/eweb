<template>
    <div :class="css.BoX">
        <pagepanel >
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="css.tBox">
                    <tbsp :headercaption="headercaption" curaction="store" :totals.sync="totals" :getchecks="getchecks" @checklist="getCheckList" :load="load" url="stockpiles" :params="searchParams" :events="tableEvents"></tbsp>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>

        <dialog :flag.sync="show" title="请输入驳回原因" @dialogclick="dialogclick">
              <div slot="containerDialog">
                    <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValue" placeholder="请填写驳回理由" ></textarea>
              </div>
        </dialog>
        <dialog :flag.sync="priceShow" title="核价结果"  @dialogclick="closeAction">
              <div slot="containerDialog">
                <propertytext key="主材款" :value="priceInfo.zprice  | mondec '2' '元'" ></propertytext>
                <propertytext key="服务费" :value="priceInfo.sprice  | mondec '2' '元'" ></propertytext>
              </div>
              <div slot="footerDialog">
                  <btnbar :buttons="buttons" :events="footerClick"></btnbar>
              </div>
        </dialog>
    </div>
</template>

<script>
import css from "./pre.css";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import propertytext from "component/form/propertyText.vue";
import btnbar from "component/sprite/buttonbar";
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
  template: '<div :class="css.inrow" @click="clickHandler">{{totals | json}}</div>',
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
      priceInfo:{},
      priceShow: false,
      priceArray:[],
      show: false,
      buttons:[{name:"取消", icon:"icon-close1", action:"close"},{name:"购买", icon:"icon-check", action:"confirm", type:"btn-primary"}],
      backValue:"",
      checkedList:[],
      headercaption:[{checkbox: true}, {name:"配送方式", labelValue:"U_DeWay", type:"component", component: deWayComp, cname:"deway"},
                              {name:"备货订单号", labelValue:"U_PurchaseNum",  type:"component", component: orderComponent, cname:"ordercomponent2"},
                              {name:"SAP订单号", labelValue:"DocNum",type:"data"},
                              {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d) {return (d.U_OrderStatus == '店长驳回' || d.U_OrderStatus == 'e站驳回')?"<span class='reback'>"+d.U_OrderStatus+"</span>":d.U_OrderStatus}},
                              {name:"收货人", labelValue:"U_Consignee",type:"data",adapterFun: function(d){ return d.rec_info.U_Consignee}},
                              {name:"收货人电话", labelValue:"U_ConsigneePhone",type:"data",adapterFun: function(d){return d.rec_info.U_ConsigneePhone}},
                              {name:"创建人", labelValue:"createdByName",type:"data"},
                              {name:"订单时间", labelValue:"updateAt", type:"data",adapterFun: function(d) {return d.updateAt?Utils.formate(new Date(d.updateAt), "yyyy-mm-dd") :"-";}},
                            {type:"operator", name:"操作"}],
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
            else if(d.action == "export") {
              window.open(this.$Api+"stockpiles/download?" + $.param(this.searchParams));
            }
        }
      },
      tableEvents:{
        operatorRender: function(d){
          if(!d.U_PurchaseNum) return []
          return [{name:"查看物流",action:"look",icon:"icon-edit", data: d.U_PurchaseNum}]
        },
        operatorHandler: function(d){
          if(d.action == "look") {
            // window.open(d.U_PageLink);
            this.$http.get(this.$Api + "/purchases/otms?U_PurchaseNum="+d.data).then((res)=>{
                    let r = res.json();
                    if(r.code == "200") {
                        if(r.data) {
                          window.open(r.data);
                        }
                    }
                    else {

                    }
            })
          }
        }
      },
      footerClick: {
        btnClick: function(d) {
          if(d.action == "close") this.priceShow = !this.priceShow;
          else this.priceClick(d);
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
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"时间:"}];

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
                    U_OrderStatus: 8,
                    U_PurchaseNum: one.U_PurchaseNum
                  })
              }
              this.rebackAction(paramsArry);
          }
      },
      closeAction: function(){

      },
      rebackAction: function(params){
           this.$http.put(this.$Api+"stockpiles",JSON.stringify(params)).then((res) => {
               var d = res.json();
               this.showMsg("success", "驳回成功");
               this.loadlist();
               this.show = !this.show;
           },(error) =>{
             console.log(error);
             this.showMsg("error", error.msg);
           })
      },
      adapterPriceInfo: function(){
          this.priceInfo = {sprice:0, zprice:0}
          for (var i = 0; i < this.priceArray.length; i++) {
            let one = this.priceArray[i];
            this.priceInfo.sprice += one.U_SerCharge*1;
            this.priceInfo.zprice += one.docTotal*1;
          }
      },
      repeat: function(array) {
            let tpl = [];
            for(let i = 0; i < array.length; i++) {
                let on = array[i];
                tpl.push(on.ItemCode);
            }
            let resArr = {};
            for(let j = 0; j < tpl.length; j++){
                if(!resArr[tpl[j]]) resArr[tpl[j]] = true;
            }
            if(Object.keys(resArr).length <= 1) {
                this.showMsg("warn", "重复产品不允许核价");
                return true;
            }
            else return false
      },
      getCheckList: function(list) {
          if(list.length == 0) {
            this.showMsg("warn", "至少选择一项");
            return false
          }
          this.checkedList = list;
          if(this.curaction == "buy") {
              if(list.length == 1) {
                  if(list[0].sub_orders.length <= 1) {
                      this.showMsg("warn", "不允许核价单个标品");
                      return false;
                  }
                  else {            // 判断ItemCode是否重复
                      console.log(list[0].sub_orders);
                      if(this.repeat(list[0].sub_orders)) {
                          this.showMsg("warn", "重复产品不允许核价");
                           return false;
                      }
                      else this.doGetPrice(list)
                  }
              }
              else {
                 let lastAyy = list.reduce(function(prev, current){
                      return prev.concat(current.sub_orders);
                  }, [])
                  if(this.repeat(lastAyy)) {
                      this.showMsg("warn", "重复产品不允许核价");
                      return false;
                  }
                  else  this.doGetPrice(list); 
              }
          }
          else if(this.curaction == "back") {
              this.show = !this.show;
          }
      },
      doGetPrice: function(list){
              // 核价
              this.$http.post(this.$Api+"stockpiles/calculate",JSON.stringify(list)).then((res) => {
                  var d = res.json();
                  this.priceArray = d.data.datas;
                  this.priceShow = !this.priceShow;
                  this.adapterPriceInfo();
              },(error) =>{
                  console.log(error);
              })
      },
      priceClick: function(d){
          // 购买
          if(d.action == "confirm") {
              console.log(this.checkedList);
              this.$http.post(this.$Api+"stockpiles/buy",JSON.stringify(this.checkedList)).then((res) => {
                  var d = res.json();
                  this.showMsg("success", "活动期间，核价结果为预测价，实际以扣款为主。");
                  this.loadlist();
                  this.priceShow = !this.priceShow;
              },(error) =>{
                console.log(error);
              })
          }
          else this.priceShow = !this.priceShow;
      },
      failHandler: function(d){

      }

  },
  components: {tbsp,propertytext, btnbar},
}
</script>
