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
      orderDatas:[{name:"正单"}, {name:"售后订单"}],
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
              if(!one[i]) continue;
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
        if(Object.keys(d).length == 0) {
          showTips(this.$store, {type:"warn", msg:"没有选择任何项目"});
          return false;
        }
        // 复制一份基础数据
        let newInfo = Utils.cloneObj(this.baseInfo);
        // 拼接 Address 前端地址和详情是两个字段   后台接收是一个字段
        // 特殊字段处理
        if(newInfo.Address.split(",").length <= 3) {
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
      // var tt = '{"sub_orders":{"cizhuan":{"list":[{"_id":"580ebd36e1a9c8a1cdcc5338","ItemCode":"CZ00001","U_PCycle":"7","U_PSDeepMin":0,"ItmsGrpCod":"111","U_PSWideMax":0,"U_SUPrice":0,"U_Modle":"YG800937_A","U_DLHighL":0,"U_DLThickL":0,"U_Brand":"东鹏","U_DWHighL":0,"FirmName":"大地砖","U_SUValue":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"片","U_PurCoe":0,"Code":"085","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_DLWideMin":0,"U_ThreeL":"大地砖","FirmCode":"1","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_DLHighMax":0,"U_PMeasure":0,"ItemName":"瓷砖-大地砖","U_Series":"银河石","SalPackUn":3,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"瓷砖","U_AC":0,"U_ProCoe":0,"CardCode":"S000015","U_Type":"A","U_DWWideMax":0,"U_DWDeepL":0,"SWW":"1","U_DWDeepMax":0,"SWeight1":14.333,"SVolume":0,"U_DWWideMin":0,"U_DWWideL":0,"U_DWHighMin":0,"U_SUValueD":0,"U_SUValueH":0,"U_SUValueW":0,"U_ProCoeW":0,"U_ProCoeH":0,"U_ProCoeD":0,"U_SUPriceW":0,"U_SUPriceD":0,"U_SUPriceH":0,"U_DLNum":"","U_DPValue":"","U_MQuality":"抛光砖","U_DLType":"","U_CardName":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_Colour":"","SalPackMsr":"箱","U_DCLNum":"","U_CQuality":"","U_WPValue":"","U_HandleCode":"","ProductList":"","Spec":"","selected":true,"sale_counts":"10"},{"_id":"58130e02e1a9c8a1cdcc5358","ItemCode":"CZ00008","U_PCycle":"7","U_PSDeepMin":0,"ItmsGrpCod":"111","U_PSWideMax":0,"U_Modle":"YG806200_A","U_DLHighL":0,"U_DLThickL":0,"U_Brand":"东鹏","U_SUValueD":0,"U_DWHighL":0,"FirmName":"大地砖","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"片","U_PurCoe":0,"Code":"085","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_ThreeL":"大地砖","U_Colour":"","FirmCode":"1","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"箱","U_DLHighMax":0,"U_ProCoeD":0,"U_PMeasure":0,"ItemName":"瓷砖-大地砖","U_Series":"卡拉拉","SalPackUn":3,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"瓷砖","U_AC":0,"U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"U_SUPriceD":0,"SWW":"3","U_DWDeepMax":0,"SWeight1":18.67,"SVolume":0,"U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"U_DLNum":"","U_DPValue":"","U_MQuality":"原石","U_DLType":"","U_CardName":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_DCLNum":"","U_CQuality":"","U_WPValue":"","U_HandleCode":"","CardCode":"S000015","ProductList":"","Spec":"","selected":false,"sale_counts":"10"},{"_id":"5816d4e7e1a9c8a1cdcc5397","ItemCode":"CZ00002","U_PCycle":"7","U_PSDeepMin":0,"U_DLNum":"","ItmsGrpCod":"111","U_DPValue":"","U_PSWideMax":0,"U_Modle":"YG803001_A","U_DLHighL":0,"U_DLThickL":0,"U_MQuality":"抛光砖","U_Brand":"东鹏","U_DLType":"","U_SUValueD":0,"U_DWHighL":0,"FirmName":"大地砖","U_CardName":"","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HPValue":"","U_HSValue":0,"U_GType":"","SalUnitMsr":"片","U_DMaterial":"","U_PurCoe":0,"Code":"085","U_DLWideMax":0,"U_CutAMe":"","U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_DType":"","U_ThreeL":"大地砖","U_Colour":"","FirmCode":"1","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"箱","U_DLHighMax":0,"U_ProCoeD":0,"U_DCLNum":"","U_PMeasure":0,"ItemName":"瓷砖-大地砖","U_CQuality":"","U_Series":"纳福娜","SalPackUn":3,"U_DLWideL":0,"U_WPValue":"","U_DWDeepMin":0,"ItmsGrpNam":"瓷砖","U_AC":0,"U_HandleCode":"","CardCode":"S000015","U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"ProductList":"","U_SUPriceD":0,"SWW":"1","U_DWDeepMax":0,"SWeight1":14.333,"SVolume":0,"Spec":"","U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"selected":false,"sale_counts":"20"},{"_id":"5816d4e7e1a9c8a1cdcc53bb","ItemCode":"CZ00039","U_PCycle":"7","U_PSDeepMin":0,"U_DLNum":"","ItmsGrpCod":"111","U_DPValue":"","U_PSWideMax":0,"U_Modle":"LF30502_A","U_DLHighL":0,"U_DLThickL":0,"U_MQuality":"瓷片","U_Brand":"东鹏","U_DLType":"","U_SUValueD":0,"U_DWHighL":0,"FirmName":"小地砖","U_CardName":"","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HPValue":"","U_HSValue":0,"U_GType":"","SalUnitMsr":"片","U_DMaterial":"","U_PurCoe":0,"Code":"087","U_DLWideMax":0,"U_CutAMe":"","U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_DType":"","U_ThreeL":"小地砖","U_Colour":"","FirmCode":"2","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"箱","U_DLHighMax":0,"U_ProCoeD":0,"U_DCLNum":"","U_PMeasure":0,"ItemName":"瓷砖-小地砖","U_CQuality":"","U_Series":"","SalPackUn":15,"U_DLWideL":0,"U_WPValue":"","U_DWDeepMin":0,"ItmsGrpNam":"瓷砖","U_AC":0,"U_HandleCode":"","CardCode":"S000015","U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"ProductList":"","U_SUPriceD":0,"SWW":"1","U_DWDeepMax":0,"SWeight1":1.7,"SVolume":0,"Spec":"","U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"selected":false,"sale_counts":"10"}],"rec_info":{"recName":"陈大伟","recphone":"15052111560","recAddr":"安徽省,合肥市,蜀山区,xx大街","detail":"xx大街","Notes":"这是瓷砖备注"}},"diban":{"list":[{"_id":"580ebd36e1a9c8a1cdcc5339","ItemCode":"DB00001","U_PCycle":"35","U_PSDeepMin":0,"ItmsGrpCod":"115","U_PSWideMax":0,"U_SUPrice":0,"U_Modle":"GZ066","U_DLHighL":0,"U_DLThickL":0,"U_Brand":"大自然","U_DWHighL":0,"FirmName":"强化地板","U_SUValue":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"平方米","U_PurCoe":0,"Code":"079","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_DLWideMin":0,"U_ThreeL":"强化地板","FirmCode":"5","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_DLHighMax":0,"U_PMeasure":1.627248,"ItemName":"地板-强化复合地板","U_Series":"","SalPackUn":1.627,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"地板","U_AC":0,"U_ProCoe":0,"CardCode":"S000004","U_Type":"A","U_DWWideMax":0,"U_DWDeepL":0,"SWW":"国民包","U_DWDeepMax":0,"SWeight1":17,"SVolume":0,"U_DWWideMin":0,"U_DWWideL":0,"U_DWHighMin":0,"U_SUValueD":0,"U_SUValueH":0,"U_SUValueW":0,"U_ProCoeW":0,"U_ProCoeH":0,"U_ProCoeD":0,"U_SUPriceW":0,"U_SUPriceD":0,"U_SUPriceH":0,"U_DLNum":"","U_DPValue":"","U_MQuality":"强化复合","U_DLType":"","U_CardName":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_Colour":"","SalPackMsr":"箱","U_DCLNum":"","U_CQuality":"","U_WPValue":"","U_HandleCode":"","ProductList":"","Spec":"","selected":true,"xxoo":"10","sale_counts":"10"},{"_id":"58130e02e1a9c8a1cdcc5359","ItemCode":"DB00006","U_PCycle":"35","U_PSDeepMin":0,"ItmsGrpCod":"115","U_PSWideMax":0,"U_Modle":"DW1851","U_DLHighL":0,"U_DLThickL":0,"U_Brand":"大卫","U_SUValueD":0,"U_DWHighL":0,"FirmName":"强化地板","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"平方米","U_PurCoe":0,"Code":"079","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_ThreeL":"强化地板","U_Colour":"","FirmCode":"5","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"箱","U_DLHighMax":0,"U_ProCoeD":0,"U_PMeasure":2.0462,"ItemName":"地板-强化复合地板","U_Series":"","SalPackUn":2.046,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"地板","U_AC":0,"U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"U_SUPriceD":0,"SWW":"国民包","U_DWDeepMax":0,"SWeight1":24,"SVolume":0,"U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"U_DLNum":"","U_DPValue":"","U_MQuality":"强化复合","U_DLType":"","U_CardName":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_DCLNum":"","U_CQuality":"","U_WPValue":"","U_HandleCode":"","CardCode":"S000003","ProductList":"","Spec":"","selected":false,"xxoo":"20","sale_counts":"20"},{"_id":"5816d4e7e1a9c8a1cdcc53d3","ItemCode":"DB00010","U_PCycle":"35","U_PSDeepMin":0,"U_DLNum":"","ItmsGrpCod":"115","U_DPValue":"","U_PSWideMax":0,"U_Modle":"S23LG03","U_DLHighL":0,"U_DLThickL":0,"U_MQuality":"实木","U_Brand":"大卫","U_DLType":"","U_SUValueD":0,"U_DWHighL":0,"FirmName":"实木多层","U_CardName":"","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HPValue":"","U_HSValue":0,"U_GType":"","SalUnitMsr":"平方米","U_DMaterial":"","U_PurCoe":0,"Code":"081","U_DLWideMax":0,"U_CutAMe":"","U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"Z","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_DType":"","U_ThreeL":"实木地板","U_Colour":"","FirmCode":"7","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"箱","U_DLHighMax":0,"U_ProCoeD":0,"U_DCLNum":"","U_PMeasure":1.7763,"ItemName":"地板-实木地板","U_CQuality":"","U_Series":"","SalPackUn":1.776,"U_DLWideL":0,"U_WPValue":"","U_DWDeepMin":0,"ItmsGrpNam":"地板","U_AC":0,"U_HandleCode":"","CardCode":"S000003","U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"ProductList":"","U_SUPriceD":0,"SWW":"尊享包","U_DWDeepMax":0,"SWeight1":30,"SVolume":0,"Spec":"","U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"selected":false,"xxoo":"30","sale_counts":"30"}],"rec_info":{"recAddr":"安徽省,芜湖市,弋江区","detail":"xxxxx","recName":"李大姐","recphone":"15555555555","Notes":"地板备注"}},"jieju":{"list":[{"_id":"580ebd36e1a9c8a1cdcc533b","ItemCode":"JJ00001","U_PCycle":"35","U_PSDeepMin":0,"ItmsGrpCod":"117","U_PSWideMax":0,"U_SUPrice":0,"U_Modle":"F6177220CP-A1","U_DLHighL":0,"U_DLThickL":0,"U_Brand":"贝朗","U_DWHighL":0,"FirmName":"花洒","U_SUValue":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"个","U_PurCoe":0,"Code":"068","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"P","U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_DLWideMin":0,"U_ThreeL":"花洒","FirmCode":"9","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_DLHighMax":0,"U_PMeasure":0,"ItemName":"洁具-贝朗花洒","U_Series":"","SalPackUn":1,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"洁具","U_AC":0,"U_ProCoe":0,"CardCode":"S000018","U_Type":"A","U_DWWideMax":0,"U_DWDeepL":0,"SWW":"尊享包","U_DWDeepMax":0,"SWeight1":0,"SVolume":0.03,"U_DWWideMin":0,"U_DWWideL":0,"U_DWHighMin":0,"U_SUValueD":0,"U_SUValueH":0,"U_SUValueW":0,"U_ProCoeW":0,"U_ProCoeH":0,"U_ProCoeD":0,"U_SUPriceW":0,"ProductList":"","U_SUPriceD":0,"U_SUPriceH":0,"U_DLNum":"","U_DPValue":"","U_MQuality":"","U_DLType":"","U_CardName":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_Colour":"","SalPackMsr":"个","U_DCLNum":"","U_CQuality":"","U_WPValue":"","U_HandleCode":"","Spec":"","selected":true,"sale_counts":"2"},{"_id":"58130e02e1a9c8a1cdcc535d","ItemCode":"JJ00009","U_PCycle":"35","U_PSDeepMin":0,"ItmsGrpCod":"117","U_PSWideMax":0,"U_Modle":"C21127W-4B","U_DLHighL":0,"U_DLThickL":0,"U_MQuality":"","U_Brand":"贝朗","U_SUValueD":0,"U_DWHighL":0,"FirmName":"马桶","U_CardName":"","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HSValue":0,"SalUnitMsr":"个","U_PurCoe":0,"Code":"035","U_DLWideMax":0,"U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"P","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_ThreeL":"坐便器","U_Colour":"","FirmCode":"8","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"个","U_DLHighMax":0,"U_ProCoeD":0,"U_PMeasure":0,"ItemName":"洁具-贝朗座便器","SalPackUn":1,"U_DLWideL":0,"U_DWDeepMin":0,"ItmsGrpNam":"洁具","U_AC":0,"CardCode":"S000018","U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"U_SUPriceD":0,"SWW":"尊享包","U_DWDeepMax":0,"SWeight1":0,"SVolume":0.24,"U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"U_DLNum":"","U_DPValue":"","U_DLType":"","U_HPValue":"","U_GType":"","U_DMaterial":"","U_CutAMe":"","U_DType":"","U_DCLNum":"","U_CQuality":"","U_Series":"","U_WPValue":"","U_HandleCode":"","ProductList":"","Spec":"","selected":false,"sale_counts":"2"},{"_id":"5816d506e1a9c8a1cdcc5507","ItemCode":"JJ00010","U_PCycle":"35","U_PSDeepMin":0,"U_DLNum":"","ItmsGrpCod":"117","U_DPValue":"","U_PSWideMax":0,"U_Modle":"JJH2151X","U_DLHighL":0,"U_DLThickL":0,"U_MQuality":"纯铜/ABS","U_Brand":"东鹏","U_DLType":"","U_SUValueD":0,"U_DWHighL":0,"FirmName":"花洒","U_CardName":"","U_SUValueH":0,"U_AWideMin":0,"U_PSHighMax":0,"U_HPValue":"","U_HSValue":0,"U_GType":"","SalUnitMsr":"个","U_DMaterial":"","U_PurCoe":0,"Code":"068","U_DLWideMax":0,"U_CutAMe":"","U_DLThickMin":0,"U_DLThickMax":0,"U_PSDeepMax":0,"U_TypeOG":"P","U_SUValueW":0,"U_SaleCoe":0,"U_PSWideMin":0,"U_PSHighMin":0,"U_DLHighMin":0,"U_ProCoeW":0,"U_DLWideMin":0,"U_DType":"","U_ThreeL":"花洒","U_Colour":"电镀＼铬色","FirmCode":"9","U_DSValue":0,"U_AHighMin":0,"U_DWHighMax":0,"U_ProCoeH":0,"SalPackMsr":"个","U_DLHighMax":0,"U_ProCoeD":0,"U_DCLNum":"","U_PMeasure":0,"ItemName":"洁具-东鹏花洒","U_CQuality":"","U_Series":"","SalPackUn":1,"U_DLWideL":0,"U_WPValue":"","U_DWDeepMin":0,"ItmsGrpNam":"洁具","U_AC":0,"U_HandleCode":"","CardCode":"S000019","U_Type":"A","U_DWWideMax":0,"U_SUPriceW":0,"U_DWDeepL":0,"ProductList":"","U_SUPriceD":0,"SWW":"国民包","U_DWDeepMax":0,"SWeight1":0,"SVolume":0.23,"Spec":"","U_DWWideMin":0,"U_DWWideL":0,"U_SUPriceH":0,"U_DWHighMin":0,"selected":false,"sale_counts":"1"}],"rec_info":{"recAddr":"安徽省,芜湖市,弋江区","detail":"xxxxx","recName":"李大姐","recphone":"15555444888","Notes":"洁具备注"}}},"base_info":{"Address":"安徽省,合肥市,高新区,xx大街","grp_package":"国民包","U_Acreage":"122","U_ToiletNum":"1","U_IsElevator":"是","one_price":"39899","U_PaInAmount":"44445","order_type":"正单","U_CntctCode":"大卫","U_CntctPhone":"15555555555","CardCode":"CC2016100065","CardName":"陈大伟","Phone2":"15050122555"}}'
      //
      this.baseInfo.validate = true;
      this.startvalidate = !this.startvalidate;
      this.validate = !this.validate; // 表单
    },
    formDimClick: function(d) {
        // TODO
        if(d.house_list.length == 0) return false;
        this.baseInfo.CardCode = d.CardCode; // 设置用户id
        this.baseInfo.CardName = d.CardName; // 设置用户名称
        this.baseInfo.Phone2 = d.Phone2;
        if(d.house_list.length > 1) {
            this.showUserDialog = !this.showUserDialog;
            this.customDatas = d.house_list;
        }
        else {
            let one = d.house_list[0];
            one.U_ToiletNum = one.U_ToiletNum || 1;
            for (var i in this.baseInfo) {
                if(!one[i]) continue;
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
