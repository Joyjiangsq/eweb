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
                <orderlist :subvalidate="subvalidate" :load="load" :params="searchParams" :totals.sync="totals" url="purchases" @success="successHandler" @fail="failHandler" :orderids.sync="orderids"></orderlist>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
        <dialog :flag.sync="show" title="请输入驳回原因" @dialogclick="dialogclick">
              <div slot="containerDialog">
                    <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValue" placeholder="请填写驳回理由" ></textarea>
              </div>
        </dialog>
        <dialog :flag.sync="priceShow" title="核价结果" @dialogclick="closeAction">
              <div slot="containerDialog">
                    <propertytext key="主材款" :value="priceInfo.zprice"></propertytext>
                    <propertytext key="服务费" :value="priceInfo.sprice"></propertytext>
              </div>
              <div slot="footerDialog">
                  <btnbar :buttons="buttons" :events="footerClick"></btnbar>
              </div>
        </dialog>
    </div>
</template>

<script>
import css from "./p.css";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import dialogtip from "component/dialog/dialogTip";
import pageBase from "common/mixinPage.js";
import propertytext from "component/form/propertyText.vue";
import btnbar from "component/sprite/buttonbar";
import orderlist from "./purchaseList";
import {orderStatus} from "config/const";
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      totals: 0,
      subvalidate: false,
      show: false,
      moduleName:"采购订单管理",
      curaction:"",
      statusData:orderStatus,
      buttons:[{name:"取消", icon:"icon-close1", action:"close"},{name:"购买", icon:"icon-check", action:"confirm", type:"btn-primary"}],
      priceShow: false,
      priceInfo:{sprice:"",sprice:""},
      priceArray:[],
      orderids:[],
      finalData:[],
      backValue:"",
      btnsData:[{name:"导出", icon:"icon-share", action:"export"},{name:"核价并购买", icon:"icon-check", action:"buy"},{name:"驳回", icon:"icon-back", action:"back"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "buy") {
                  this.curaction = "buy";
                  this.subvalidate = !this.subvalidate;
            }
            else if(d.action == "back") {
                  this.curaction = "back";
                  if(this.orderids.length == 0) this.showMsg("warn", "请至少选择一项")
                  else   this.show = !this.show;
            }
            else if(d.action == "export") {
              window.open(this.$Api+"purchases/download?" + $.param(this.searchParams));
            }
        }
      },
      footerClick: {
        btnClick: function(d) {
          if(d.action == "close") this.priceShow = !this.priceShow
          else this.priceClick(d);
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_PurchaseNum || "",  keyname:"U_PurchaseNum", labelcaption:"采购订单号:"},
              {type:"text",  value:q.DocNum || "",  keyname:"DocNum", labelcaption:"SAP订单号:"},
              
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"id", value:q.U_OrderStatus || "", datas:this.statusData, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"购买时间:"}];

    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
      successHandler: function(d) {
          if(this.curaction == "buy") {
              console.log(d); // 核价

              this.finalData = d;
              // 验证通过规则  如果是单个品类- 如果不是定制品 则不能过
              // 如果是多个品类  如果只有一个是非定制品   则不能过
              // 定制品名称为  厨柜 门  对应比对字段  ItmsGrpNam 品类
              let canContinue = true;
              let pMap = [];
              for (var i = 0; i < d.length; i++) {
                let one = d[i];
                if(one.base_info.Series == 81) continue
                pMap.push({type:one.type, value:one.sub_orders.length})
              }
              // 如果只有单个品类  判断是订制品还是标品
              if(pMap.length == 1) {
                  let justone = pMap[0];
                  // 当既不是厨柜也不是门 且产品数量为1
                  if(justone.type != "chugui" && justone.type !="men" && justone.value == 1) {
                    this.showMsg("warn", "单个标品不允许核价");
                    return false;
                  }
              }
              // 反向条件 只需要判断有大于一个单品的数据  既可以过
                  // 大于一个单品的条件可能有
                        // 两个单品各有一条 || 一个单品有两条
              else {
                  var successCount = 0; // 计算最终 如果successCount 数值大于1  则通过
                  for (var i = 0; i < pMap.length; i++) {
                    let pone = pMap[i];
                    if(pone.type != "chugui" && pone.type !="men") successCount += pone.value*1;
                  }
              }
              if(successCount <=1 && pMap.length != 0) {
                this.showMsg("warn", "存在单个标品不允许核价");
                return false;
              }
              this.doGetPrice(d);
          }
      },
      doGetPrice: function(d) {
        // 核价
        this.$http.post(this.$Api+"purchases/calculate",JSON.stringify(d)).then((res) => {
            var d = res.json();
            this.priceArray = d.data.datas;
            this.priceShow = !this.priceShow;
            this.adapterPriceInfo();
        },(error) =>{
            console.log(error);
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
      failHandler: function(d){

      },
      rebackAction: function(params){
           this.$http.put(this.$Api+"purchases",JSON.stringify(params)).then((res) => {
               var d = res.json();
               this.showMsg("success", "驳回成功");
               this.loadlist();
               this.show = !this.show;
           },(error) =>{
             console.log(error);
             this.showMsg("error", error.msg);
           })
      },
      closeAction: function(d) {
      },
      dialogclick: function(d){
           if(d.action == "confirm") {
              let tpArry = [];
              for (var i = 0; i < this.orderids.length; i++) {
                let one = this.orderids[i];
                tpArry.push({
                    U_CloseWhy: this.backValue,
                    U_OrderStatus: 8,
                    U_PurchaseNum: one.U_PurchaseNum
                });
              }
              if(tpArry.length == 0) return false
              this.rebackAction(tpArry);
           }
      },

      priceClick: function(d){
          // 购买 TODO
          if(d.action == "confirm") {
              console.log(this.finalData);
              this.$http.post(this.$Api+"purchases",JSON.stringify(this.finalData)).then((res) => {
                  var d = res.json();
                  this.priceShow = !this.priceShow;
                  this.showMsg("success", "购买成功");
                  this.loadlist();
              },(error) =>{
                console.log(error);
              })
          }
          else this.priceShow = !this.priceShow;
      }

  },
  components: {formcb,dialogtip, orderlist,propertytext, btnbar},
}
</script>
