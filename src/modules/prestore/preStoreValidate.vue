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
                    <tbsp :headercaption="headercaption" curaction="store" :totals.sync="totals" :datas="td" :params="searchParams" ></tbsp>
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
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"备货审核",
      curaction:"",
      statusData:orderStatus,
      orderids:[],
      finalData:[],
      headercaption:[{checkbox: true}, {name:"配送方式", labelValue:"U_DeWay",type:"data"},{name:"备货订单号", labelValue:"U_PurchaseNum",type:"data"},
                      {name:"SAP订单号", labelValue:"DocNum",type:"data"},{name:"订单状态", labelValue:"U_OrderStatus",type:"data"},{name:"收货人", labelValue:"U_Consignee",type:"data"},
                    {name:"收货人电话", labelValue:"U_ConsigneePhone",type:"data"},{name:"创建人", labelValue:"createdby",type:"data"},],
      td:[{U_DeWay:"ziti", U_PurchaseNum:"111213131313",DocNum:"xxxx",U_OrderStatus:"xxxccc",U_Consignee:"rrr",U_ConsigneePhone:"15555555555",createdby:"li"},
          {U_DeWay:"222", U_PurchaseNum:"3333",DocNum:"xxxx",U_OrderStatus:"xxxccc",U_Consignee:"rrr",U_ConsigneePhone:"15555555555",createdby:"li"}],
      btnsData:[{name:"导出", icon:"icon-share", action:"export"},{name:"核价并购买", icon:"icon-check", action:"buy"},{name:"驳回", icon:"icon-back", action:"back"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "buy") {
                  this.curaction = "buy";
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
          if(this.curaction == "buy") {
              console.log(d); // 核价
              this.finalData = d;
              this.$http.post(this.$Api+"sales/sub-orders/calculate",JSON.stringify(d)).then((res) => {
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
