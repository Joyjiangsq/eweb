<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span class='itemrow'><span :class="css.hitem">子订单号：</span> {{orderId}}</span>
                <span class='itemrow'><span :class="css.hitem">子订单状态：</span> <span v-if = "showStatus" class="reback">{{detailData.U_OrderStatus}}</span><span  v-else>{{detailData.U_OrderStatus}}</span></span>
                <span class='itemrow' v-if="showStatus"><span :class="css.hitem">驳回理由：</span> {{detailData.U_CloseWhy || '无'}}</span>
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
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import panel from "component/panel/panel";
import css from "./sale.css";
import cascadeform from "component/form/formCascade";
import formtext from "component/form/formText";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLab";
import btn from "component/sprite/button";
import adapter from "./adapter";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      show: false,
      datamap:{},
      detailData:{}
    }
  },
  computed: {
    detail: function(){
       return this.detailData.U_OrderStatus != "店长驳回"
    },

    showStatus: function(){
      return this.detailData.U_OrderStatus == '店长驳回' || this.detailData.U_OrderStatus == 'e站驳回'
    }
  },
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    getData: function(id){
      this.$http.get(this.$Api+"sales/sub-orders/detail",{params:{U_PurchaseNum: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.baseInfo = d.data.base_info;
          this.datamap[d.data.type] = d.data;
          this.datamap["U_Enclosure"] = d.U_Enclosure || "";
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
      let params = {
        U_PurchaseNum:this.orderId,
        sub_orders:sub.list || [],
        rec_info: sub.rec_info,
        U_OrderStatus: 0
      }
      if(sub.U_Enclosure) params.U_Enclosure = sub.U_Enclosure;
      this.$http.put(this.$Api+"sales/sub-orders",JSON.stringify([params])).then((res) => {
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
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"子订单详情"}]);
    }
  }
}
</script>
