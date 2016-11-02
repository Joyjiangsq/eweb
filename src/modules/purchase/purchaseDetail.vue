<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span><span :class="css.hitem">采购订单号：</span> {{orderId}}</span>
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
          <div :class="css.footerBar" v-show="!detail">
            <span :class="css.itemone"><btn @clickaction="backClickHandler" btnname="btn-default" iconname="icon-back">驳回</btn></span>
              <span :class="css.itemone"><btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">核价并购买</btn></span>
          </div>
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
      detail: false,
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      show: false,
      datamap:{},
      tabType:""
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    backClickHandler: function(){

    },
    getData: function(id){
      this.$http.get(this.$Api+"sales/sub-orders/" + id,{}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.baseInfo = d.data.base_info;
          this.datamap[d.data.type] = d.data;
          this.tabType = d.data.type;
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
