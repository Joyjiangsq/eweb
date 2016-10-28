<template>
          <div :class="css.paddingType">
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>

                <div slot="panelContent">
                      <formdim labelname="客户信息："  placeholder="姓名/手机号" :value="baseInfo.mult" :id=""  @fromdim="formDimClick"  formname='userName' :validatestart="validate" @onvalidate="validateHandler"></formdim>
                      <cascadeform  labelname="业主地址：" :detailneed="true" :must="false" :value.sync= "baseInfo.Address" :detail.sync="baseInfo.detail" formname="Address"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                      <comboxform keyid="name" labelname="组包选择：" @cashandler="onepHandler" :value.sync="baseInfo.grp_package" keyname="name" formname="grp_package" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="房本面积：" unit="平米" @blurhandler="onepHandler" :value.sync="baseInfo.U_Acreage" placeholder=""  formname='U_Acreage' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="卫生间数量：" unit="个"  @blurhandler="onepHandler"  :value.sync="baseInfo.U_ToiletNum" placeholder=""  formname='U_ToiletNum' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <comboxform keyid="name" labelname="是否有电梯：" :value.sync="baseInfo.U_IsElevator" keyname="name" formname="U_IsElevator" :datas="hasDianti" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext :read="true"  labelname="一口价：" unit="元" :value.sync="baseInfo.one_price" placeholder=""  formname='one_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="实收金额：" unit="元" :value.sync="baseInfo.U_PaInAmount" placeholder=""  formname='U_PaInAmount' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
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
              <btn @clickaction="btnClickHandler" >下单</btn>
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
export default {
  data: function () {
    return {
      css,
      validate: false,
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      packageDatas: [{name:"国名包"}, {name:"名品包"}, {name:"尊享包"}],
      orderDatas:[{name:"订单"}, {name:"售后订单"}],
      priceInfo:{},
      hasDianti:[{name:'是'},{name:'否'}], // 是否有电梯
      show: false,
      baseInfo:{
        mult:"", // 客户信息的手机号 加姓名
        Address:"",// 客户地址
        detail:"", //详情地址
        grp_package:"", // 组包
        U_Acreage:"", //面积
        U_ToiletNum:"", //卫生间
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
    onepHandler: function(p){
        this.priceInfo[p.name] = p.value;
        console.log(JSON.stringify(this.priceInfo));
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
        console.log(JSON.stringify(d));
        if(!this.baseInfo.validate) return false;

        saleAdapter(d);
        let newInfo = Utils.cloneObj(this.baseInfo);

        newInfo.Address = newInfo.Address + newInfo.detail;
        delete newInfo.detail;
        delete newInfo.validate;
        delete newInfo.mult;

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
        console.log(d);
        //CardCode  客户编码   U_Phone 客户电话
        this.baseInfo.mult = "adasdasdasasd";
    }
  },
  components: {panel, formtext, cascadeform,comboxform, tblab, btn,formdim},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"新增销售订单"}]);
    }
  }
}
</script>
