<template>
        <div class="">
          <panel>
              <div slot="panelTitle">
                     基础报价
              </div>
              <div slot="panelContent">
                    <formdim labelname="客户信息："  placeholder="姓名/手机号" :adapter="dimAdapter" dimlabel="CardName" :value="baseInfo.CardCode" :iptvalue="baseInfo.CardName" id="CardCode"  @fromdim="formDimClick"  formname='userName' :validatestart="validate" @onvalidate="validateHandler" url="customers/search-by-name-or-phone" :params="dimParams"></formdim>
                    <cascadeform  labelname="业主地址：" :detailneed="true" :read="true" :must="false" :value.sync= "baseInfo.Address" :detailv.sync="baseInfo.detail" formname="Address"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                    <comboxform keyid="name" labelname="组包选择：" :must="false"  @cashandler="onepHandler" :value.sync="baseInfo.U_SWW" keyname="name" formname="U_SWW" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                    <formtext labelname="房本面积：" :must="false"  unit="平米" @blurhandler="onepHandler" :value.sync="baseInfo.U_Acreage" placeholder=""  formname='U_Acreage' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext labelname="卫生间数量：" unit="个" :must="false"  @blurhandler="onepHandler"  :value.sync="baseInfo.U_ToiletNum" placeholder=""  formname='U_ToiletNum' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <comboxform keyid="name" labelname="是否有电梯：" :value.sync="baseInfo.U_IsElevator" keyname="name" formname="U_IsElevator" :datas="hasDianti" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                    <formtext :read="true"  labelname="主材包一口价：" :must="false" unit="元" :value.sync="baseInfo.one_price" placeholder=""  formname='one_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="服务包一口价：" :must="false" unit="元" :value.sync="baseInfo.server_price" placeholder=""  formname='server_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="施工包一口价：" :must="false" unit="元" :value.sync="baseInfo.build_price" placeholder=""  formname='build_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="设计费" :must="false" unit="元" :value.sync="baseInfo.design_price" placeholder=""  formname='design_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="一口价：" :must="false" unit="元" :value.sync="baseInfo.total_price" placeholder=""  formname='total_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="优惠金额" :must="false" unit="元" :value.sync="baseInfo.minus_price" placeholder=""  formname='minus_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formtext :read="true"  labelname="预定合同金额" :must="false" unit="元" :value.sync="baseInfo.pre_price" placeholder=""  formname='pre_price' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
              </div>
          </panel>
          <price @fail="failHandler" :startvalidate="startvalidate" @success="successHandler" v-if="show" :curdata="curData"></price>
          <div class="cfooter">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">保存</btn>
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
import css from "./renderP.css";
import btn from "component/sprite/button.vue";
import price from "component/priceblock/priceRender";
import formdim from "component/form/formDim";
import Utils from "common/Utils";
import {showTips} from "actions/index";
import {packageType, orderType} from "config/const";
import clist from "../sale/customListDialog";
export default {
  data: function () {
    return {
      css,
      validate: false,
      dimParams:{size:5, page:1},
      customDatas:[],
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      packageDatas: packageType,
      orderDatas:orderType,
      priceInfo:{U_ToiletNum: 1},
      curData:{},
      hasDianti:[{name:'是'},{name:'否'}], // 是否有电梯
      show: false,
      showUserDialog: false, // 控制用户选择多个地址
      self: false,
      baseInfo:{
        U_AddCode: Utils.getUserInfo().U_AddCode,
        GroupCode: "103", // 客户组
        U_OcrdType: "终端客户",// 业务伙伴类型
        Address:"",// 客户地址
        detail:"", //详情地址
        U_SWW:"", // 组包
        U_Acreage:"", //面积
        U_ToiletNum:1, //卫生间
        U_IsElevator:"", //是否有电梯
        one_price:"", // 一口价
        U_PaInAmount:"", // 实收金额
        order_type:"", //订单类型描述
        U_CntctCode:"", // 跟单员
        U_CntctPhone:"", // 跟单员电话
        validate: true // 验证依据
      },
      btnsData:[{name:"导入模板", action:"add"},{name:"导出", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
              this.showTplDialog = !this.showTplDialog
            }
            else if(d.action="export") {
              window.open(this.$Api+"employees/download?" + $.param(this.searchParams));
            }
        }
      }
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.show = true;

    },30)

  },
  attached: function () {},
  methods: {
  
    itemclick: function(item) {
      this.baseInfo.Series = item.id;  // 订单类型需要传递id
    },
    dimAdapter: function(one) {
        return one.CardName + "-" + one.Phone2
    },
    oneUserCheck: function(one) {
          // for (var i in this.baseInfo) {
          //     if(!one[i]) continue;
          //     this.baseInfo[i] = one[i];
          // }
         this.baseInfo = Object.assign(this.baseInfo, one);
         if(one.U_ToiletNum) this.priceInfo.U_ToiletNum = one.U_ToiletNum;
         if(one.U_Acreage) this.priceInfo.U_Acreage = one.U_Acreage;
        //  delete this.priceInfoU_SWWe;
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
     
    },
    btnClickHandler: function() {
      this.baseInfo.validate = true;
      this.startvalidate = !this.startvalidate;
      this.validate = !this.validate; // 表单
    },
    formDimClick: function(d) {
        // TODO
        if(d.house_list.length == 0) return false;
        this.baseInfo.CardCode = d.CardCode; // 设置用户id
        this.baseInfo.CardName = d.CardName; // 设置用户名称
        this.baseInfo.U_Phone = d.Phone2; //TODO
        this.baseInfo.CntctCode = d.CardName;
        this.baseInfo.Phone2 = d.Phone2;    // 设置用户手机号
        this.baseInfo.U_ComeFrom = d.U_ComeFrom; // 设置客户来源
        this.baseInfo.U_BTSubstation = d.station; // 设置归属分站编码
        this.baseInfo.U_DateRgst = Utils.formate(new Date(d.createAt), "yyyy-mm-dd"); // 设置登记日期
        if(d.house_list.length > 1) {
            this.showUserDialog = !this.showUserDialog;
            this.customDatas = d.house_list;
        }
        else {
            let one = d.house_list[0];
            one.U_ToiletNum = one.U_ToiletNum || 1;
            // for (var i in this.baseInfo) {
            //     if(!one[i]) continue;
            //     this.baseInfo[i] = one[i];
            // }
            this.baseInfo = Object.assign(this.baseInfo, one);
            if(one.U_ToiletNum) this.priceInfo.U_ToiletNum = one.U_ToiletNum;
            if(one.U_Acreage) this.priceInfo.U_Acreage = one.U_Acreage;
            // delete this.priceInfoU_SWWe;
            this.setOnePrice();
        }

    }
  },
  components: {panel, formtext, cascadeform,comboxform, price, btn,formdim, clist},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"项目报价", type:"back"}, {name:"报价"}]);
      window.onbeforeunload  = function(){return true;}
    },
    canDeactivate: function(transition){
      transition.next();
        // if(this.self) {
        //   transition.next();
        //   window.onbeforeunload  = function(){}
        // }
        // else {
        //   let tag = confirm("离开页面不会保存数据，请注意操作");
        //   if(tag) {
        //     transition.next();
        //     window.onbeforeunload  = function(){}
        //   }
        //   else transition.abort();
        // }
    }
  }
}
</script>
