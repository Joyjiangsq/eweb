<template>
    <div :class="acCss.accountBox">
        <pagepanel classname="needpadding" direct="bottom">

          <div class="">
            <propertytext key="邮箱" :horizontal="true" :value="accountBaseInfo.U_Email"></propertytext>
            <propertytext key="账号" :horizontal="true" :value="accountBaseInfo.U_AccountName"></propertytext>
            <propertytext key="所属银行" :horizontal="true" :value="accountBaseInfo.U_BBank"></propertytext>
            <propertytext key="开户行地址" :horizontal="true" :value="accountBaseInfo.U_BAddress"></propertytext>
          </div>
          <div :class="acCss.accountTitleBox">
              <div :class="acCss.accountTitleIn">
                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>账户余额 : </span>
                         <span>{{accountBaseInfo.Balance | mondec}}元</span>
                      </div>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>冻结金额 : </span>
                         <span>{{accountBaseInfo.FrozenMount | mondec}}元</span>
                      </div>
                      <!-- <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>{{accountBaseInfo.Balance}}</span>
                            <span :class='acCss.unit'>元</span>
                      </div> -->
                      <span :class="acCss.backCash"><btn  @clickaction="backCashHandler">回款</btn></span>
                </span>

                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>授信余额 : </span>
                         <span>{{accountBaseInfo.CreditLineBalance | mondec}}元</span>
                      </div>
                      <div :class="acCss.itemTitle">
                         <span :class='acCss.mintitle'>授信额度 : </span>
                         <span>{{accountBaseInfo.CreditLine | mondec}}元</span>
                      </div>
                </span>

              </div>

              <div :class="[acCss.searchBox,'needtop']">
                      <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
          </div>
            <div style="padding-bottom: 20px;">
              <div class="tipRow">
                <div class="tipRowSub">
                  <span :class="acCss.tonedesc">提现须知：</span>
                </div>
                <p style="margin-bottom: 5px;">
                  <span :class="acCss.titledesc">1</span>1万以下（含1万）手续费5元；
                  <span :class="acCss.titledesc">2</span>1-10万（含10万）手续费10元；
                  <span :class="acCss.titledesc">3</span>10-50万（含50万）手续费15元；
                  <span :class="acCss.titledesc">4</span>50-100万（含100万）手续费20元；
                </p>
                <span :class="acCss.titledesc">5</span>100-1000万（含1000万）按0.00002比率计算算；
                <span :class="acCss.titledesc">6</span>大于1000万手续费200元；
                例：提现10000元，扣除手续5元，实际到账银行卡金额9995元；
              </div>
            </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="acCss.tableIn">
                    <!--station-account/bills-->
                    <tb :headercaption="headercaption" :totals.sync="totals"  :params="searchParams" url="station-account/bills" :load="load" ></tb>
              </div>
              <pg :totals="totals"  :curpage.sync="searchParams.page"></pg>
        </pagepanel>

        <!--回款对话框-->
        <dialog :flag="!showBackCashDialog" @dialogclick="dialogClickHandler" title="回款">
              <div  slot="containerDialog">
                  <propertytext key="账户余额" :value="accountBaseInfo.Balance | mondec '2' '元'"></propertytext>
                  <propertytext key="冻结金额" :value="accountBaseInfo.FrozenMount | mondec '2' '元'"></propertytext>
                  <propertytext key="可回款金额" :value="accountBaseInfo.AvailableBalance | mondec '2' '元'"></propertytext>
                  <formtext labelname="回款金额：" :value.sync="backCashParams.U_TraAmount" placeholder="请输入回款金额" :vertical="true" formname='backCash' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="备注：" :value.sync="backCashParams.Memo" placeholder="备注" :vertical="true" formname='backCash'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
              </div>
        </dialog>

    </div>
</template>

<script>
import acCss from "./account.css";
import btn from "component/sprite/button";
import pageBase from "common/mixinPage.js";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
import icon from "component/sprite/icon";
import Utils from "common/Utils";
console.log(Utils.getUserInfo());
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
          AvailableBalance:"", //可回款金额
          U_BBank: "" // 所属银行
      },
      acCss,
      // 表格头
      headercaption:[{name:"类型", labelValue:"U_Type",type:"data"},{name:"凭证日期", labelValue:"TaxDate", type:"data"},{name:"借方金额", labelValue:"Debit",type:"data"}, {name:"贷方金额", labelValue:"Credit",type:"data"},
                    {name:"科目名称", labelValue:"AcctName",type:"data"},{name:"备注", labelValue:"xx",type:"data", adapterFun: function(d){return this.remarkText(d)}}],
      // 验证回款表单参数
      validate: false,
      // 测试数据
      testData: [{"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"}],
      // 显示回款对话框
      showBackCashDialog: true,
      backCashParams: {validate: true},  // 回款参数
      btnsData:[{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "export") {
                  //  TODO
            }
        }
      }
    }
  },
  computed: {
    // 查询参数初始化
    sdata: function(){
      let q = this.$route.query;
      return [{type:"daterange", keynamestart:"start", keynameend:"end", start:q.start || "", end:q.end || "", labelcaption:"凭证日期："}];
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
                  if(this.backCashParams.U_TraAmount> this.accountBaseInfo.AvailableBalance) this.showMsg("warn", "不能大于可回款金额");
                  if(this.backCashParams.U_TraAmount*1 < 6) this.showMsg("warn", "体现金额不得小于6元");
                  else {
                    delete this.backCashParams.validate;
                    let nobj = Utils.cloneObj(this.backCashParams);
                    nobj.U_TraAmount = nobj.U_TraAmount*100;
                    this.$http.post(this.$Api+ "station-account",nobj).then((res) => {
                          let r = res.json();
                          this.$set("showBackCashDialog", !this.showBackCashDialog);
                          this.showMsg("success", "回款申请成功");
                          this.loadInfo();
                    })
                  }
            }
         })
      }
    },

  },
  // 注册查询组件， 表格组件， 面板组件， 按钮组组件，分页组件， 按钮组件， 对话框组件, 键值文本组建
  components: {btn, propertytext,formtext, icon}
}

</script>
