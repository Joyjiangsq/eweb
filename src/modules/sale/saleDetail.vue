<template>
        <div class="">
          <div :class="css.paddingType">
            <div :class="css.hrow">
                <span><span :class="css.hitem">主订单号：</span> {{orderId}}</span>
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
                <tblab  v-if="show" :tabs="tabs" :startvalidate="startvalidate" :datamap="datamap" ></tblab>
          </div>
        </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import css from "./sale.css";
import cascadeform from "component/form/formCascade";
import formtext from "component/form/formText";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLabDetail";
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
      datamap:{}
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    getData: function(id){
      this.$http.get(this.$Api+"sales/" + id,{}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          for (var i = 0; i < d.data.sub_orders.length; i++) {
              var one = d.data.sub_orders[i];
              if(!this.datamap[one.type]) {
                this.datamap[one.type] = [];
                this.datamap[one.type].push(one);
              }
              else {
                this.datamap[one.type].push(one);
              }
          }
          this.tabs = Object.keys(this.datamap);
          this.baseInfo = d.data.base_info;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      this.startvalidate = !this.startvalidate;
    }
  },
  components: {tblab, panel,formtext,cascadeform},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"订单详情"}]);
    }
  }
}
</script>
