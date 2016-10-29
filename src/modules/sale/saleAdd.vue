<template>
        <div class="">
          <div :class="css.paddingType">
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>

                <div slot="panelContent">
                      <formdim labelname="客户信息："  placeholder="姓名/手机号" :adapter="dimAdapter" dimlabel="CardName" :value="baseInfo.CardCode" :iptvalue="baseInfo.CardName" id="CardCode"  @fromdim="formDimClick"  formname='userName' :validatestart="validate" @onvalidate="validateHandler" url="customers/search-by-name-or-phone" :params="dimParams"></formdim>
                      <cascadeform  labelname="业主地址：" :detailneed="true" :read="true" :must="false" :value.sync= "baseInfo.Address" :detailv.sync="baseInfo.detail" formname="Address"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                      <comboxform keyid="name" labelname="组包选择：" :must="false"  @cashandler="onepHandler" :value.sync="baseInfo.grp_package" keyname="name" formname="grp_package" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="房本面积：" :must="false"  unit="平米" @blurhandler="onepHandler" :value.sync="baseInfo.U_Acreage" placeholder=""  formname='U_Acreage' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="卫生间数量：" unit="个" :must="false"  @blurhandler="onepHandler"  :value.sync="baseInfo.U_ToiletNum" placeholder=""  formname='U_ToiletNum' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <comboxform keyid="name" labelname="是否有电梯：" :must="false" :value.sync="baseInfo.U_IsElevator" keyname="name" formname="U_IsElevator" :datas="hasDianti" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext :read="true"  labelname="一口价：" :must="false" unit="元" :value.sync="baseInfo.one_price" placeholder=""  formname='one_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="实收金额：" unit="元" :must="false" :value.sync="baseInfo.U_PaInAmount" placeholder=""  formname='U_PaInAmount' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <comboxform keyid="name" labelname="订单类型：" :value.sync="baseInfo.order_type" keyname="name" formname="order_type" :datas="orderDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="跟单员：" :value.sync="baseInfo.U_CntctCode" placeholder=""  formname='U_CntctCode' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员电话：" :phone="true"  :value.sync="baseInfo.U_CntctPhone" :length="11" :number="true"  placeholder=""  formname='U_CntctPhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
            </panel>




          </div>
          <div :class="css.dataArea">
                <tblab @fail="failHandler" :startvalidate="startvalidate" @success="successHandler" v-if="show"></tblab>
          </div>
          <div :class="css.footerBar">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
          <clist :show.sync="showUserDialog" @onecheck="oneUserCheck" :datas="customDatas"></clist>
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
import formdim from "component/form/formDim";
import Utils from "common/Utils";
import {showTips} from "actions/index";
import {packageType} from "config/const";
import clist from "./customListDialog";
export default {
  data: function () {
    return {
      css,
      validate: false,
      dimParams:{size:5, page:1},
      customDatas:[],
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      packageDatas: packageType,
      orderDatas:[{name:"订单"}, {name:"售后订单"}],
      priceInfo:{U_ToiletNum: 1},
      hasDianti:[{name:'是'},{name:'否'}], // 是否有电梯
      show: false,
      showUserDialog: false, // 控制用户选择多个地址
      baseInfo:{
        mult:"", // 客户信息的手机号 加姓名
        Address:"",// 客户地址
        detail:"", //详情地址
        grp_package:"", // 组包
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
    dimAdapter: function(one) {
        return one.CardName + "-" + one.Phone2
    },
    oneUserCheck: function(one) {
          for (var i in this.baseInfo) {
              this.baseInfo[i] = one[i];
          }
         if(one.U_ToiletNum) this.priceInfo.U_ToiletNum = one.U_ToiletNum;
         if(one.U_Acreage) this.priceInfo.U_Acreage = one.U_Acreage;
         delete this.priceInfo.grp_package;
         this.setOnePrice();
    },
    // 一口价
    onepHandler: function(p){
        this.priceInfo[p.name] = p.value;
        this.setOnePrice();
    },
    setOnePrice: function(){
        if(Object.keys(this.priceInfo).length != 3) return false
        if(this.priceInfo.U_ToiletNum) {
          if(isNaN(this.priceInfo.U_ToiletNum))  {showTips(this.$store, {type:"warn", msg:"卫生间数量不正确"}); return false}
          else if(this.priceInfo.U_ToiletNum < 1) {showTips(this.$store, {type:"warn", msg:"卫生间数量不能小于1"}); return false}
        }
        else if(this.priceInfo.U_Acreage) {
          if(isNaN(this.priceInfo.U_Acreage))  {showTips(this.$store, {type:"warn", msg:"房本面积不正确"}); return false}
          else if(this.priceInfo.U_Acreage <= 0) {showTips(this.$store, {type:"warn", msg:"房本面积不正确"}); return false}
        }
        this.$http.get(this.$Api+"sales/one-price",{params:this.priceInfo}).then((res) => {
            var d = res.json();
            if(d.data || d.data != "null") {
                  this.baseInfo.one_price = d.data
            }
        },(error) =>{
          console.log(error);
        })
    },
    validateHandler: function(d){
        if(d.res == "fail") this.baseInfo.validate = false;
    },
    // 失败回调
    failHandler: function(d) {
        // console.log(d);
    },
    // 成功回调
    successHandler: function(d) {
        // console.log(d);
        // 基础信息验证失败 则不执行
        if(!this.baseInfo.validate) return false;
        // 几大类 数据适配
        saleAdapter(d);
        // 复制一份基础数据
        let newInfo = Utils.cloneObj(this.baseInfo);
        // 拼接 Address 前端地址和详情是两个字段   后台接收是一个字段
        // 特殊字段处理
        if(newInfo.Address.split(",") <= 3) {
          newInfo.Address = newInfo.Address + "," +newInfo.detail;
        }

        delete newInfo.detail;      // 删除多余详情字段
        delete newInfo.validate;    // 删除验证字段
        delete newInfo.mult;        // 删除多余用户文本描述

        this.$http.post(this.$Api+"sales",JSON.stringify({sub_orders:d, base_info:newInfo})).then((res) => {
            var d = res.json();
            console.log(d);
        },(error) =>{
          console.log(error);
        })
    },
    btnClickHandler: function() {
      this.baseInfo.validate = true;
      this.startvalidate = !this.startvalidate;
      this.validate = !this.validate; // 表单
    },
    formDimClick: function(d) {
        // TODO
        if(d.house_list.length == 0) return false;
        if(d.house_list.length > 1) {
            this.showUserDialog = !this.showUserDialog;
            this.customDatas = d.house_list;
        }
        else {
            let one = d.house_list[0];
            for (var i in this.baseInfo) {
                this.baseInfo[i] = one[i];
            }
            if(one.U_ToiletNum) this.priceInfo.U_ToiletNum = one.U_ToiletNum;
            if(one.U_Acreage) this.priceInfo.U_Acreage = one.U_Acreage;
            delete this.priceInfo.grp_package;
            this.setOnePrice();
        }

    }
  },
  components: {panel, formtext, cascadeform,comboxform, tblab, btn,formdim, clist},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"新增销售订单"}]);
    }
  }
}
</script>
