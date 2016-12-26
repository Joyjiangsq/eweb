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
                    <propertytext key="主材款" :value="priceInfo.zprice  | mondec '2' '元'"></propertytext>
                    <propertytext key="服务费" :value="priceInfo.sprice  | mondec '2' '元'" ></propertytext>
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
import {getLevelThreeTypeByName} from "config/codeMap";
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
      successHandler: function(d) {
          if(this.curaction == "buy") {
              console.log(d); // 核价

              this.finalData = d;
              if(d.length == 1) {
                  if(d[0].base_info.Series == 81) this.doGetPrice(d); // 81售后订单
                  else if(d[0].sub_orders.length <= 1) {
                      this.showMsg("warn", "正常订单不允许核价单个标品");
                      return false;
                  }
                  else {            // 判断ItemCode是否重复
                      console.log(d[0].sub_orders);
                      if(this.repeat(d[0].sub_orders)) {
                          this.showMsg("warn", "重复产品不允许核价");
                           return false;
                      }
                      else this.doGetPrice(d)
                  }
              }
              else {
                   let pMap = [];
                   for (var i = 0; i < d.length; i++) {
                      let one = d[i];
                      if(one.base_info.Series == 81) continue
                      pMap.push({type:one.type, value:one.sub_orders})
                    }
                    if(pMap.length == 1) {
                        this.showMsg("warn", "正常订单不允许核价单个标品");
                        return false;
                    }
                    else {
                        let lastAyy = pMap.reduce(function(prev, current){
                            return prev.concat(current.value);
                        }, [])
                        if(this.repeat(lastAyy)) {
                            this.showMsg("warn", "重复产品不允许核价");
                            return false;
                        }
                        else  this.doGetPrice(d); // 81售后订单
                    }
              }
          }
      },
      doGetPrice: function(d) {
          this.resizeData(d);
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
      resizeData: function(d) {
        for(let i = 0; i < d.length; i ++) {
            let one = d[i].sub_orders;
            for(let j = 0; j < one.length; j++) {
                let item = one[j];
                let Code = getLevelThreeTypeByName("台面");
                if(item.Code == Code) {
                // "U_TableB"                  // 台面进深
              // "U_HeightWR"             // 挡水高度
              // "U_ASWide"         // 包管展开宽  U_Pquantity
              // "U_ASDeep"                // 包管展开深
                      if(item.U_Pquantity == 0) {
                          if(item.U_ASWide > 0 && U_ASDeep > 0) {
                              item.U_TableB = 0; item.U_HeightWR = 0;
                          }
                      }
                      else {
                          if(item.U_TableB > 0 && U_HeightWR > 0) {
                              if(item.U_ASWide == 0) {
                                        item.U_ASDeep = 0
                              }
                              else if(item.U_ASDeep == 0) {
                                         item.U_ASWide = 0
                              }
                          }
                      }
                }
            }
        }
      },
      adapterPriceInfo: function(){
          this.priceInfo = {sprice:0, zprice:0}
          for (var i = 0; i < this.priceArray.length; i++) {
            let one = this.priceArray[i];
            this.priceInfo.sprice += one.U_SerCharge*1;
            this.priceInfo.zprice += one.docTotal*1;
            this.finalData[i]["U_SerCharge"] = one.U_SerCharge || 0;
          }
      },
      failHandler: function(d){
          console.log(d);
      },
      rebackAction: function(params){
           this.$http.put(this.$Api+"purchases",JSON.stringify(params)).then((res) => {
               var d = res.json();
               this.showMsg("success", "驳回成功");
               this.loadlist();
               this.show = !this.show;
               this.orderids = []; // 清空
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
                  this.showMsg("success", "活动期间，核价结果为预测价，实际以扣款为主。");
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
