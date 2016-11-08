<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span class='itemrow'><span :class="css.hitem">采购订单号：</span> {{orderId}}</span>
                <span class='itemrow'><span :class="css.hitem">订单状态：</span> <span v-if="orderStatus == 'e站驳回' || orderStatus == '分站驳回'" class='reback'>{{orderStatus}}</span><span class='common' v-else>{{orderStatus}}</span></span>
                <span class='itemrow' v-if="backValue"><span :class="css.hitem">驳回理由：</span> {{backValue}}</span>
            </div>
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>

                <div slot="panelContent">
                      <formtext labelname="客户信息："  :read="true" :value="baseInfo.CardName"></formtext>
                      <cascadeform  labelname="业主地址：" :detailneed="true" :read="true" :value.sync= "baseInfo.Address" ></cascadeform>
                      <formtext labelname="组包选择：" :read="true"  :value.sync="baseInfo.U_SWW" ></formtext>
                      <formtext labelname="房本面积：" :read="true"   unit="平米"  :value.sync="baseInfo.U_Acreage" ></formtext>
                      <formtext labelname="卫生间数量：" :read="true" unit="个" :value.sync="baseInfo.U_ToiletNum" ></formtext>
                      <formtext labelname="是否有电梯：" :read="true"   unit="平米"  :value.sync="baseInfo.U_IsElevator" ></formtext>
                      <formtext :read="true"  labelname="一口价：" unit="元" :value.sync="baseInfo.one_price" ></formtext>
                      <formtext labelname="实收金额：" :read="true" unit="元"  :value.sync="baseInfo.U_PaInAmount"></formtext>
                      <formtext labelname="订单类型：" :read="true" unit="元" :value.sync="baseInfo.order_type"></formtext>
                      <formtext labelname="跟单员：" :read="true" :value.sync="baseInfo.U_CntctCode" ></formtext>
                      <formtext labelname="跟单员电话：" :read="true" :value.sync="baseInfo.U_CntctPhone"></formtext>
                </div>
            </panel>
          </div>
          <div :class="css.dataArea">
                <tblab  v-if="show" :tabs="tabs" :startvalidate="startvalidate" @success="successHandler" @fail="failHandler" :datamap="datamap" :detail.sync="detail"></tblab>
          </div>
          <div :class="css.footerBar" v-if="orderStatus =='待采购' || orderStatus == 'e站驳回'">
              <!--在待采购  和 e站驳回的状态   才可以放开驳回按钮-->
              <span :class="css.itemone"><btn @clickaction="backClickHandler" btnname="btn-primary" iconname="icon-back">驳回</btn></span>
          </div>

          <dialog :flag="showReDialog" title="请输入驳回原因" @dialogclick="dialogclick">
                <div slot="containerDialog">
                      <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValueipt" placeholder="请填写驳回理由" ></textarea>
                </div>
          </dialog>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import panel from "component/panel/panel";
import css from "./p.css";
import cascadeform from "component/form/formCascade";
import formtext from "component/form/formText";
import basePage from "common/mixinPage";
import tblab from "component/pblock/typeLab";
import btn from "component/sprite/button";
import adapter from "./itemAdapter";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      detail: true, // 不允许更改
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      backValue:"",
      show: false,
      showReDialog: false,
      datamap:{},
      tabType:"",
      orderStatus:"",
      backValue:"",
      backValueipt:""
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    backClickHandler: function(){
        this.showReDialog = !this.showReDialog;
    },
    dialogclick: function(d){
        if(d.action == "confirm") {
            this.$http.put(this.$Api+"sales/sub-orders",JSON.stringify([{U_PurchaseNum: this.orderId, U_OrderStatus:"分站驳回", back_value: this.backValueipt}])).then((res) => {
                var d = res.json();
                this.showMsg("success", "驳回成功");
                this.showReDialog = !this.showReDialog;
                this.orderStatus = "分站驳回";
                this.backValue = this.backValueipt;
            },(error) =>{
              console.log(error);
              this.showMsg("error", error.msg);
            })
        }
    },
    getData: function(id){
      this.$http.get(this.$Api+"sales/sub-orders/detail",{params:{U_PurchaseNum: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.baseInfo = d.data.base_info;
          this.datamap[d.data.type] = d.data;
          this.tabType = d.data.type;
          this.orderStatus = d.data.U_OrderStatus;
          this.backValue = d.data.back_value;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      this.startvalidate = !this.startvalidate;
    },
    successHandler: function(d){
      let one = adapter(Utils.cloneObj(d));
      adapter(one.sub_orders);
      this.editAction(one);
    },
    failHandler: function(d){
        console.log(d);
    },
    editAction: function(one){
      one.U_PurchaseNum = this.orderId;
      one.type = this.tabType;
      let arr = [];
      arr.push(one);
      this.$http.put(this.$Api+"sales/sub-orders/calculate",JSON.stringify(arr)).then((res) => {
          var d = res.json();
          console.log(d);
          // this.showMsg("success", "提交成功");
          // this.getData(this.orderId);
          // this.show = !this.show;
          // this.detail = true;
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
      setTitle(this.$store, [{name:"采购订单管理", type:"back"}, {name:"采购订单"}]);
    }
  }
}
</script>
