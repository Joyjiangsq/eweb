<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span class="itemrow"><span :class="css.hitem">子订单号：</span> {{orderId}}</span>
                <span class='itemrow'><span :class="css.hitem">订单状态：</span> <span v-if="detailData.U_OrderStatus == '分站驳回' || detailData.U_OrderStatus == 'e站驳回'" class='reback'>{{detailData.U_OrderStatus}}</span><span class='common' v-else>{{detailData.U_OrderStatus}}</span></span>
                <span class='itemrow' v-if="detailData.U_OrderStatus == '分站驳回' || detailData.U_OrderStatus == 'e站驳回'"><span :class="css.hitem">驳回理由：</span> {{detailData.U_CloseWhy || '无'}}</span>
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
                <tblab  v-if="show" :tabs="tabs"  :startvalidate="startvalidate" @success="successHandler" @fail="failHandler" :datamap="datamap" :detail.sync="detailData.U_OrderStatus!='分站驳回'"></tblab>
          </div>
          <div :class="css.footerBar" v-show="detailData.U_OrderStatus =='分站驳回'">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
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
      detail: false,
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      show: false,
      datamap:{},
      detailData:{},
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
          this.detailData = d.data;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      this.startvalidate = !this.startvalidate;
    },
    successHandler: function(d){
        let one = adapter(Utils.cloneObj(d));
        // 这里的one只可能有一项
        if(one[this.detailData.type]) this.editAction(one[this.detailData.type]);
    },
    failHandler: function(d){
        console.log(d);
    },
    editAction: function(sub){
      //{ "U_PurchaseNum": "FZXS201611100132_101", "sub_orders": [{产品及数量等信息}]}
      let params = {
        U_PurchaseNum:this.orderId,
        sub_orders:sub.list || [],
        rec_info: sub.rec_info,
        U_OrderStatus: "0"
      }
      if(sub.U_Enclosure) params.U_Enclosure = sub.U_Enclosure;
      this.$http.put(this.$Api+"sales/stock",JSON.stringify([params])).then((res) => {
          var d = res.json();
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
      setTitle(this.$store, [{name:"备货订单", type:"back"}, {name:"备货订单详情"}]);
    }
  }
}
</script>
