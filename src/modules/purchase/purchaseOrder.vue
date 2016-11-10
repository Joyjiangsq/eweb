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
                <orderlist :subvalidate="subvalidate" :load="load" :params="searchParams" :totals.sync="totals" url="sales/sub-orders" @success="successHandler" @fail="failHandler" :orderids.sync="orderids"></orderlist>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
        <dialog :flag="show" title="请输入驳回原因" @dialogclick="dialogclick">
              <div slot="containerDialog">
                    <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValue" placeholder="请填写驳回理由" ></textarea>
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
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_PurchaseNum || "",  keyname:"U_PurchaseNum", labelcaption:"采购订单号:"},
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"name", value:q.U_OrderStatus || "", datas:this.statusData, labelcaption:"订单状态:"},
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


              this.$http.post(this.$Api+"sales/sub-orders/calculate",JSON.stringify(d)).then((res) => {
                  var d = res.json();
              },(error) =>{
                console.log(error);
              })
          }

      },
      failHandler: function(d){

      },
      rebackAction: function(params){
           this.$http.put(this.$Api+"sales/sub-orders",JSON.stringify(params)).then((res) => {
               var d = res.json();
               this.showMsg("success", "驳回成功");
               this.loadlist();
               this.show = !this.show;
           },(error) =>{
             console.log(error);
             this.showMsg("error", error.msg);
           })
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
      }

  },
  components: {formcb,dialogtip, orderlist},
}
</script>
