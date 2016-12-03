<template>
    <div :class="acCss.accountBox">
        <div :class="acCss.panelRow">
          <icon iconname='icon-user' :classname="[acCss.iconItem, iconUser]" :iconlabel='accountBaseInfo.U_AccountName || "无"'></icon>
          <icon iconname='icon-account01'  :classname="[acCss.iconItem, iconBname]" :iconlabel='accountBaseInfo.U_BankName || "无"'></icon>
          <icon iconname='icon-account01' :classname="[acCss.iconItem, iconBbank]"  :iconlabel='accountBaseInfo.U_BBank || "无"'></icon>
          <icon iconname='icon-address' :classname="[acCss.iconItem, iconBdd]"  :iconlabel='accountBaseInfo.U_BAddress || "无"'></icon>
          <icon iconname='icon-mail' :classname="[acCss.iconItem, iconEmail]"  :iconlabel='accountBaseInfo.U_Email || "无"'></icon>
        </div>
        <pagepanel>
          <div :class="acCss.accountTitleBox">
              <div :class="acCss.accountTitleIn">
                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>冻结金额 : </span>
                         <span><span class='fcolor'>{{accountBaseInfo.FrozenMount | mondec}}</span>元</span>
                      </div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.mintitle'>账户余额 : </span>
                            <span :class='acCss.cash'>{{accountBaseInfo.Balance | mondec }}</span>
                            <span :class='acCss.unit'>元</span>
                            <span :class="acCss.backCash">
                              <btn  @clickaction="backCashHandler">提现</btn>
                              <span>
                                    <icon iconname="icon-warn" @mouseover="mouseOverHandler" @mouseout="mouseOutHandler" :classname="acCss.tipBtn"></icon>
                                    <tip :show="show">
                                      <div :class='acCss.tipInBox'>
                                        <div>
                                          <span class="tipTitle">提现须知：</span>
                                        </div>
                                        <div :class="acCss.detailDesc">
                                          <p>1、<span>1万以下（含1万）手续费5元；</span></p>
                                          <p>2、<span>1-10万（含10万）手续费10元；</span></p>
                                          <p>3、<span>10-50万（含50万）手续费15元；</span></p>
                                          <p>4、<span>50-100万（含100万）手续费20元；</span></p>
                                          <p>5、<span>100-1000万（含1000万）按0.00002比率计算算；</span></p>
                                          <p>6、<span>大于1000万手续费200元；</span></p>
                                          <span :class='acCss.demo'>例：提现10000元，扣除手续5元，实际到账银行卡金额9995元；</span>

                                        </div>
                                      </div>
                                    </tip>
                              </span>
                            </span>
                      </div>
                </span>

                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>授信额度 : </span>
                         <span><span  class='fcolor'>{{accountBaseInfo.CreditLine | mondec}}</span>元</span>
                      </div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.mintitle'>授信余额 : </span>
                            <span :class='acCss.cash'>{{accountBaseInfo.CreditLineBalance | mondec}}</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                </span>

              </div>
              <div style="margin-top:20px;">
                    <search  pathname="" :datas="sdata" :distance="true" :events = 'searchEvents'></search>
              </div>
          </div>
            <!-- <div style="padding-bottom: 20px;">

            </div> -->
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="acCss.tableIn">
                    <!--station-account/bills-->
                    <tb :headercaption="headercaption" :totals.sync="totals"  :params="searchParams" url="station-account/bills" :load="load" ></tb>
              </div>
              <pg :totals="totals"  :curpage.sync="searchParams.page"></pg>
        </pagepanel>

        <!--提现对话框-->
        <dialog :flag.sync="showBackCashDialog" @dialogclick="dialogClickHandler" title="提现">
              <div  slot="containerDialog">
                  <propertytext key="账户余额" :value="accountBaseInfo.Balance | mondec '2' '元'"></propertytext>
                  <propertytext key="冻结金额" :value="accountBaseInfo.FrozenMount | mondec '2' '元'"></propertytext>
                  <propertytext  key="可提现金额" :value="accountBaseInfo.AvailableBalance | mondec '2' '元'"></propertytext>
                  <formtext labelname="提现金额：" :value.sync="backCashParams.U_TraAmount" placeholder="请输入提现金额" :vertical="true" formname='backCash' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="备注：" :value.sync="backCashParams.Memo" placeholder="备注" :vertical="true" formname='backCash'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
              </div>
        </dialog>
        <!--提示对话框-->
        <dialog :flag.sync="showtips" title="友情提示">
              <div  slot="containerDialog">
                  <propertytext key="到账金额" :value="finalData.U_TraAmount | mondec '2' '元'"></propertytext>
                  <propertytext key="手续费" :value="finalData.U_Poundage | mondec '2' '元'"></propertytext>
              </div>
              <div class="" slot="footerDialog">

              </div>
        </dialog>
    </div>
</template>

<script>
import acCss from "./account.css";
import tip from "component/dialog/tiptip";
import btn from "component/sprite/button";
import pageBase from "common/mixinPage.js";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
import icon from "component/sprite/icon";
import {accountTypes} from "config/const";
import Utils from "common/Utils";
export default {
  mixins: [pageBase],
  data: function () {
    return {
      moduleName:"账户管理",
      accountBaseInfo:{
          Balance: "", // 账户余额
          CreditLine: "", //授信额度
          FrozenMount: "", // 冻结金额
          U_Email:"", // 邮箱
          U_AccountName:"", // 账号
          U_BAddress:"", // 开户行地址
          CreditlineBalance:"", // 授信余额
          AvailableBalance:"", //可提现金额
          U_BBank: "" // 所属银行
      },
      acCss,
      show: false,
      showtips: false,
      finalData:{U_Poundage:0, U_TraAmount:0},
      // 表格头
      headercaption:[{name:"类型", labelValue:"U_Type",type:"data"},{name:"凭证日期", labelValue:"TaxDate", type:"data"},{name:"借方金额", labelValue:"Debit",type:"data", attr:"price"}, {name:"贷方金额", labelValue:"Credit",type:"data", attr:"price"},
                    {name:"科目名称", labelValue:"AcctName",type:"data"},{name:"备注", labelValue:"xx",type:"data", adapterFun: function(d){return this.remarkText(d)}}],
      // 验证提现表单参数
      validate: false,
      // 显示提现对话框
      showBackCashDialog: false,
      backCashParams: {validate: true},  // 提现参数
      btnsData:[{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "export") {
                  //  TODO
                  window.open(this.$Api + "station-account/bills/download?" + $.param(this.searchParams));
            }
        }
      }
    }
  },
  computed: {
    // 查询参数初始化
    sdata: function(){
      let q = this.$route.query;
      return [{type:"combobox", keyid:"id", value:q.typeCode || "", labelname:"name", keyname:"typeCode", labelcaption:"类型：", datas:accountTypes},
              {type:"daterange", keynamestart:"start", keynameend:"end", start:q.start || "", end:q.end || "", labelcaption:"凭证日期："}];
    }
  },
  ready: function () {
      this.loadInfo();
  },
  attached: function () {},
  methods: {
    backCashHandler: function(){
       this.$set("showBackCashDialog", !this.showBackCashDialog);
    },
    mouseOverHandler: function(){
      this.show = true
    },
    mouseOutHandler: function(){
      this.show =  false
    },
    validateHandler: function(d){
      console.log(d);
      if(d.res == "fail") {
          this.backCashParams.validate = false
      }
    },

    loadInfo: function(){
      this.$http.get(this.$Api+ "station-account",{}).then((res) => {
            let r = res.json();
            this.$set("accountBaseInfo", r.data);
      })
    },
    remarkText(d) {
        if(!d.Memo && !d.LineMemo) return '-'
        else if(d.Memo && !d.LineMemo) return d.Memo
        else if(!d.Memo && d.LineMemo) return d.LineMemo
        else return ((d.Memo || '') + "," + (d.LineMemo || ''))
    },
    dialogClickHandler: function(d) {
      if(d.action == "confirm") {
         this.validate = !this.validate;
         this.backCashParams.validate = true;
         setTimeout(()=>{
            if(this.backCashParams.validate) {
                  if(this.backCashParams.U_TraAmount> this.accountBaseInfo.AvailableBalance) this.showMsg("warn", "不能大于可提现金额");
                  if(this.backCashParams.U_TraAmount*1 < 6) this.showMsg("warn", "体现金额不得小于6元");
                  else {
                    delete this.backCashParams.validate;
                    let nobj = Utils.cloneObj(this.backCashParams);
                    nobj.U_TraAmount = nobj.U_TraAmount*100;
                    this.$http.post(this.$Api+ "station-account",nobj).then((res) => {
                          let r = res.json();
                          this.$set("showBackCashDialog", !this.showBackCashDialog);
                          this.showMsg("success", "提现申请成功");
                          this.finalData = Object.assign({},this.finalData, r.data);
                          this.showtips = !this.showtips;
                          this.loadInfo();
                    })
                  }
            }
         },30)
      }
    },

  },
  // 注册查询组件， 表格组件， 面板组件， 按钮组组件，分页组件， 按钮组件， 对话框组件, 键值文本组建
  components: {btn, propertytext,formtext, icon,tip}
}

</script>
