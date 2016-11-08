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

        <dialog :flag="show" title="加急" @dialogclick="dialogclick">
              <div slot="containerDialog">
                    <formcb keyid="value" labelname="加急金额：" @itemclick="itemclick" :value.sync="formParams.LineTotala" :vertical="true" keyname="name" dropfixed="dropfixed" formname="LineTotala" :datas="priceArry" :validatestart="validate" @onvalidate="validateHandler"></formcb>
                    <formtext labelname="自定义金额："  :vertical="true" placeholder="请输入自定义金额" :must="selfControl" :value.sync="formParams.LineTotalb" formname='LineTotalb' v-show="selfControl"  :number="true" :validatestart="validate"  @onvalidate="validateHandler"></formtext>
                    <formtext labelname="关联采购单号：" :vertical="true" placeholder="请输入关联采购单号" :value.sync="formParams.U_PurchaseNum" formname='U_PurchaseNum'  :validatestart="validate"  @onvalidate="validateHandler"></formtext>
              </div>
        </dialog>
    </div>
</template>

<script>
import css from "./urgent.css";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import formcb from "component/form/fmCombobox";
import formtext from "component/form/formText";
import {orderStatus} from "config/const";
let tableHeaderDatas = [
                        {name:"加急订单号", labelValue:"U_SPOrder",type:"data"},
                        {name:"订单金额", labelValue:"LineTotal",type:"data"},
                        {name:"关联采购单号", labelValue:"U_PurchaseNum",type:"data"},
                        {name:"购买人", labelValue:"purchaser",type:"data"},
                        {name:"购买时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {name:"订单状态", labelValue:"U_OrderStatus",type:"data",adapterFun: function(d) {return d.U_OrderStatus.indexOf("驳回") != -1?"<span class='reback'>"+d.U_OrderStatus+"</span>":d.U_OrderStatus}}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      validate: false,
      selfControl: false,
      priceArry:[{name:"500加急", value:500}, {name:"200加急", value:200}, {name:"自定义", value:"自定义"}],
      headercaption:tableHeaderDatas, // 表格头部信息设置
      btnsData:[{name:"申请购买", icon:"icon-share", action:"apply"}],
      orderStatus:orderStatus,
      formParams:{
      },
      validateRes: true,
      show:false,
      btnEvents:{
        btnClick: function(d){
            if(d.action == "apply") {
                  this.show = !this.show;
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.U_SPOrder || "",  keyname:"U_SPOrder", labelcaption:"加急订单号:"},
              {type:"text",  value:q.U_PurchaseNum || "",  keyname:"U_PurchaseNum", labelcaption:"关联订单号:"},
              {type:"combobox", keyname:"U_OrderStatus", labelname:"name", keyid:"name", value:q.U_OrderStatus || "", datas:this.orderStatus, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"购买时间:"}];

    }

  },
  ready: function () {
  },
  attached: function () {},
  methods: {
    validateHandler: function(p){
          if(p.res == "fail") {
             this.validateRes = false
          }
    },
    itemclick: function(d){
        if(d.name == "自定义") {
            this.selfControl = true;
        }
        else this.selfControl = false;
    },
    setUrgent: function(){
        let params = {};
        params.U_PurchaseNum = this.formParams.U_PurchaseNum;
        if(this.formParams.LineTotala == "自定义") params.LineTotal = this.formParams.LineTotalb
        else params.LineTotal = this.formParams.LineTotala
        this.$http.post(this.$Api+"urgent", params).then((res) =>{
              console.log(res);
              this.show = !this.show;
              this.loadlist();
        }, (e) =>{

        });
    },
    dialogclick: function(d){
          if(d.action =="confirm") {
              this.validateRes = true;
              this.validate = !this.validate;
              setTimeout(()=>{
                    if(this.validateRes) this.setUrgent();
              })
          }
    }
  },
  components: {btnbar,formcb,formtext},
  route:{
  }
}
</script>
