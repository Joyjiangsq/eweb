<template>
        <div class="">
            <div :class="css.infoRow">
                <span><span :class="css.hitem">销售主订单号：</span> {{orderid}}</span>
            </div>
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>

                <div slot="panelContent">
                      <formtext labelname="客户信息：" :read="true"  :value="baseInfo.CardCode" ></formtext>
                      <cascadeform  labelname="业主地址：" :read="true"  :detailneed="true" :read="true" :must="false" :value.sync= "baseInfo.Address" :detailv.sync="baseInfo.detail" formname="Address"   ></cascadeform>
                      <formtext  labelname="组包选择：" :read="true"  :value.sync="baseInfo.U_SWW" ></formtext>
                      <formtext labelname="房本面积：" :read="true"  unit="平米" :value.sync="baseInfo.U_Acreage" ></formtext>
                      <formtext labelname="卫生间数量：" :read="true"  unit="个" :value.sync="baseInfo.U_ToiletNum" ></formtext>
                      <formtext labelname="是否有电梯：" :read="true"  :value.sync="baseInfo.U_IsElevator" ></formtext>
                      <formtext :read="true"  labelname="一口价：" unit="元" :value.sync="baseInfo.one_price"></formtext>
                      <formtext labelname="实收金额：" :read="true"  unit="元" :value.sync="baseInfo.U_PaInAmount" ></formtext>
                      <!-- <formtext labelname="订单类型："  :value.sync="baseInfo.order_type" ></formtext> -->
                      <comboxform keyid="name" labelname="订单类型：" @itemclick="itemclick" :value.sync="baseInfo.order_type" dropfixed="dropfixed" keyname="name" formname="order_type" :datas="orderDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="跟单员：" :read="true"  :value.sync="baseInfo.U_CntctCode" ></formtext>
                      <formtext labelname="跟单员电话：" :read="true"  :value.sync="baseInfo.U_CntctPhone" ></formtext>
                </div>
            </panel>

          <div :class="css.dataArea">
                <tblab @fail="failHandler" :startvalidate="startvalidate" @success="successHandler" v-if="show"></tblab>
          </div>
          <div class="cfooter">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
        </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import comboxform from "component/form/fmCombobox";
import css from "./sale.css";
import btn from "component/sprite/button.vue";
import tblab from "component/block/typeLab";
import saleAdapter from "./adapter.js";
import Utils from "common/Utils";
import {orderType} from "config/const";
import {showTips} from "actions/index";
export default {
  data: function () {
    return {
      css,
      orderid:"",
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      show: false,
      self: true,
      orderDatas:orderType,
      baseInfo:{
        mult:"", // 客户信息的手机号 加姓名
        Address:"",// 客户地址
        detail:"", //详情地址
        U_SWW:"", // 组包
        U_Acreage:"", //面积
        U_ToiletNum:1, //卫生间
        U_IsElevator:"", //是否有电梯
        one_price:"", // 一口价
        U_PaInAmount:"", // 实收金额
        order_type:"", //订单类型
        U_CntctCode:"", // 跟单员
        U_CntctPhone:"", // 跟单员电话
        validate: true // 验证依据
      }
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.show = true;
    })
  },
  attached: function () {},
  methods: {
    itemclick: function(item) {
      this.baseInfo.Series = item.id;  // 订单类型需要传递id
    },
    // 失败回调
    failHandler: function(d) {
        // console.log(d);
    },
    // 成功回调
    successHandler: function(d) {
        // 几大类 数据适配
        saleAdapter(d);
        this.self = false;
        if(Object.keys(d).length == 0) {
          showTips(this.$store, {type:"warn", msg:"没有选择任何项目"});
          return false;
        }
        this.$http.post(this.$Api+"sales/append",JSON.stringify({sub_orders:d, U_FZOrder:this.orderid, base_info: this.baseInfo})).then((res) => {
            var d = res.json();
            this.self = true;
            showTips(this.$store, {type:"success", msg:"补单成功"});
            window.onbeforeunload  = function(){}
            setTimeout(()=>{
              history.back();
            })
        },(error) =>{
          console.log(error);
        })
    },
    btnClickHandler: function() {
      // 开启验证
      this.startvalidate = !this.startvalidate;
    },
    getData: function(id){
        this.$http.get(this.$Api+"sales/base-info",{params:{U_FZOrder: id}}).then((res) => {
            var d = res.json();
            console.log(d);
            this.baseInfo = d.data.base_info;
        },(error) =>{
          console.log(error);
        })
    }
  },
  components: {panel, formtext, cascadeform, tblab, btn,comboxform},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"补单"}]);
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderid = this.$route.query.orderid;
      }
      this.getData(this.orderid);
      window.onbeforeunload  = function(){return true;}
    },
    canDeactivate: function(transition){
        if(this.self) {
          transition.next();
          window.onbeforeunload  = function(){}
        }
        else {
          let tag = confirm("离开页面不会保存数据，请注意操作");
          if(tag) {
            transition.next();
            window.onbeforeunload  = function(){}
          }
          else transition.abort();
        }
    }
  }
}
</script>
