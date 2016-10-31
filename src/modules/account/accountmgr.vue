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
                        <span> 冻结金额 : <span :class='acCss.cashText'>{{accountBaseInfo.FrozenMount}}</span>元 </span>
                      </div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>{{accountBaseInfo.Balance}}</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                      <span :class="acCss.backCash"><btn  @clickaction="backCashHandler">回款</btn></span>
                </span>

                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">
                        <span :class='acCss.mintitle'>授信余额 : </span>
                        <span> 授信额度 : <span :class='acCss.cashText'>{{accountBaseInfo.CreditLine}}</span>元 </span>
                      </div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>{{accountBaseInfo.CreditLineBalance}}</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                </span>

              </div>

              <div :class="[acCss.searchBox,'needtop']">
                      <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
          </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="acCss.tableIn">
                    <tb :headercaption="headercaption" :totals.sync="totals"  :params="searchParams" url="station-account/bills" :load="load"  :datas="testData"></tb>
              </div>
              <pg :totals="totals"  :curpage.sync="searchParams.page"></pg>
        </pagepanel>

        <!--回款对话框-->
        <dialog :flag="!showBackCashDialog" @dialogclick="dialogClickHandler">
              <div  slot="containerDialog">
                  <propertytext key="账户余额" :value="accountBaseInfo.Balance"></propertytext>
                  <propertytext key="冻结金额" :value="accountBaseInfo.FrozenMount"></propertytext>
                  <propertytext key="可回款金额" :value="accountBaseInfo.AvailableBalance"></propertytext>
                  <formtext labelname="回款金额：" :value.sync="backCashParams.backCash" placeholder="请输入回款金额" :vertical="true" formname='backCash' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="备注：" :value.sync="backCashParams.backCash" placeholder="备注" :vertical="true" formname='backCash'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
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
      headercaption:[{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额", labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易时间", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"data"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {name:"付款账号", labelValue:"date",type:"data"},{name:"付款账号名称", labelValue:"date",type:"data"},{name:"交易流水号", labelValue:"date",type:"data"},
                    {name:"关联流水号", labelValue:"date",type:"data"}],
      // 验证回款表单参数
      validate: false,
      // 测试数据
      testData: [{"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"}],
      // 显示回款对话框
      showBackCashDialog: true,
      backCashParams: {validate: true, backCash:""},  // 回款参数
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
      return [{type:"daterange", keynamestart:"start", keynameend:"end", start:q.start || "", end:q.end || "", labelcaption:"交易日期："}];
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
      if(d.res == "success") {
          this.backCashParams[d.name] = d.value;
      }
      else this.backCashParams["validate"] = false;
    },

    loadInfo: function(){
      this.$http.get(this.$Api+ "station-account",{}).then((res) => {
            let r = res.json();
            console.log(r);
            this.$set("accountBaseInfo", r.data);
      })
    },

    dialogClickHandler: function(d) {
      if(d.action == "confirm") {
         this.backCashParams["validate"] = true;
         this.$set("validate", !this.validate);
         if(this.backCashParams.validate) {
            this.loadlist();
            this.$set("showBackCashDialog", !this.showBackCashDialog);
         }
         // 验证结束去执行逻辑
      }
    },

  },
  // 注册查询组件， 表格组件， 面板组件， 按钮组组件，分页组件， 按钮组件， 对话框组件, 键值文本组建
  components: {btn, propertytext,formtext}
}

</script>
