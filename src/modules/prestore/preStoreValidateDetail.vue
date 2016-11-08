<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span class="itemrow"><span :class="css.hitem">子订单号：</span> {{orderId}}</span>
                <span class='itemrow'><span :class="css.hitem">订单状态：</span> <span v-if="orderStatus == '分站驳回'" class='reback'>{{orderStatus}}</span><span class='common' v-else>{{orderStatus}}</span></span>
                <span class='itemrow' v-if="backValue"><span :class="css.hitem">驳回理由：</span> {{backValue}}</span>
            </div>
            <panel>
                <div slot="panelTitle">
                       基础信息
                </div>
                <div slot="panelContent">
                  <formtext labelname="分站名称：" :must="false"  :read="true"  :value.sync="baseInfo.CardName" formname='CardName' ></formtext>
                  <cascadeform  labelname="分站地址：" :detailneed="true" :read="true"  :value.sync= "baseInfo.Address"  formname="Address" ></cascadeform>
                  <formtext labelname="跟单员：" :read="true" :value.sync="baseInfo.U_CntctCode" placeholder=""  formname='U_CntctCode'></formtext>
                  <formtext labelname="跟单员电话：" :read="true" :phone="true"  :value.sync="baseInfo.U_CntctPhone" :length="11" :number="true"  placeholder=""  formname='U_CntctPhone'></formtext>
                </div>
            </panel>
          </div>
          <div :class="css.dataArea">
                <tblab  v-if="show" :tabs="tabs"  :startvalidate="startvalidate" @success="successHandler" @fail="failHandler" :datamap="datamap" :detail.sync="detail"></tblab>
          </div>
          <div :class="css.footerBar" v-if="this.orderStatus == '待采购' || this.orderStatus == 'e站驳回'">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">驳回</btn>
          </div>

          <dialog :flag="showBack" title="请输入驳回原因" @dialogclick="dialogclick">
                <div slot="containerDialog">
                      <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValueIpt" placeholder="请填写驳回理由" ></textarea>
                </div>
          </dialog>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import panel from "component/panel/panel";
import css from "./pre.css";
import cascadeform from "component/form/formCascade";
import formtext from "component/form/formText";
import basePage from "common/mixinPage";
import tblab from "component/bblock/typeLab";
import btn from "component/sprite/button";
import adapter from "./itemAdapter";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      detail: true,
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      show: false,
      datamap:{},
      tabType:"",
      orderStatus:"",
      backValueIpt:"",
      backValue:"",
      showBack:false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    getData: function(id){
      this.$http.get(this.$Api+"sales/stock/detail", {params:{U_PurchaseNum: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.baseInfo = d.data.base_info;
          this.datamap[d.data.type] = d.data;
          this.datamap["U_Enclosure"] = d.U_Enclosure || "";
          this.tabType = d.data.type;
          this.orderStatus = d.data.U_OrderStatus;
          this.backValue = d.data.back_value;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      // this.startvalidate = !this.startvalidate;
        this.showBack = !this.showBack;
    },
    successHandler: function(d){
        let one = adapter(Utils.cloneObj(d));
        // 这里的one只可能有一项
        if(one[this.tabType]) this.editAction(one[this.tabType]);
    },
    failHandler: function(d){
        console.log(d);
    },
    dialogclick: function(d) {
      if(d.action == "confirm") {
        this.$http.put(this.$Api+"sales/stock",JSON.stringify([{back_value:this.backValueIpt, U_OrderStatus:"分站驳回",U_PurchaseNum: this.orderId}])).then((res) => {
            var d = res.json();
            this.showMsg("success", "驳回成功");
            this.showBack = !this.showBack;
            this.backValue = this.backValueIpt;
            this.orderStatus = "分站驳回";
        },(error) =>{
          console.log(error);
          this.showMsg("error", error.msg);
        })
      }
    },
    editAction: function(sub){
      //{ "U_PurchaseNum": "FZXS201611100132_101", "sub_orders": [{产品及数量等信息}]}
      let params = {
        U_PurchaseNum:this.orderId,
        sub_orders:sub.list || [],
        rec_info: sub.rec_info
      }
      if(sub.U_Enclosure) params.U_Enclosure = sub.U_Enclosure;
      this.$http.put(this.$Api+"sales/stock",JSON.stringify([params])).then((res) => {
          var d = res.json();
          console.log(d);
          this.showMsg("success", "提交成功");
          this.getData(this.orderId);
          this.show = !this.show;
          this.detail = true;
      },(error) =>{
        console.log(error);
        this.showMsg("error", error.msg);
      })
    }
  },
  components: {tblab, panel,formtext,cascadeform,btn},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"备货订单", type:"back"}, {name:"详情"}]);
    }
  }
}
</script>
