<template lang="html">
  <div class="css.customBox">
    <pagepanel classname="needpadding" direct="bottom">
          <div :class="css.userSearch">
            <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
          </div>
    </pagepanel>
    <pagepanel>
          <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
          <div class="">
            <tb :headercaption="headercaption" :load="load" :auto="true" :totoals.sync="totoals" :params="searchParams" url="customers" :events="tableEvents"></tb>
          </div>
          <pg :totals="totoals"  @pagechange="pagechange"></pg>
    </pagepanel>
    <!--新增对话框-->
    <dialog :flag="dialogMap.showFormDialog" :title="gettName" @dialogclick="dialogClickHandler" :scroll="true">
          <div slot="containerDialog" :class="css.dBox">
                <formcb keyid="id" labelname="渠道：" :value.sync="formData.U_ComeFrom"  keyname="name" :must="false" formname="U_ComeFrom" :vertical="true" :datas="formArray.fromConst" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                <formtext labelname="业主姓名："  :value.sync="formData.CardName" formname="CardName"  :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="业主电话："  :value.sync="formData.Phone1" formname="Phone1"  :vertical="true" :phone="true"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <cascadeformarray  labelname="地址：" :vertical="true" :value.sync="formData.Address" formname="Address" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></cascadeformarray>
                <cascadeform  labelname="城市：" :must="false" :value.sync= "formData.city" formname="city" :detailneed="false" :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></cascadeform>
                <formtext labelname="面积：" unit="平米" :number="true" formname="U_Acreage" :must="false" :value.sync="formData.U_Acreage" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formdt labelname="交房时间：" :must="false" formname="U_OthersDate" :value.sync="formData.U_OthersDate" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formdt>
                <formtext labelname="装修预算："  :number="true" unit="元" :must="false" :value.sync="formData.prePrice" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formcb keyid="id" labelname="装修风格：" :value.sync="formData.U_Renovation2"  keyname="name" :must="false" formname="U_Renovation2" :datas="formArray.decorateStyle" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                <formcb keyid="id" labelname="房屋类型：" :value.sync="formData.U_HouseType"  keyname="name" :must="false" formname="U_HouseType"  :datas="formArray.houseType" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                <formtext labelname="备注：" formname="Notes" :must="false" :value.sync="formData.Notes" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="天猫订单：" :must="false" formname="U_TmallOrderId" :value.sync="formData.U_TmallOrderId" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="天猫订单金额：" :must="false" formname="U_TmOrAmout" :value.sync="formData.U_TmOrAmout" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="旺旺号：" :must="false" formname="U_WWId" :value.sync="formData.U_WWId" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="销售订单号：" :must="false" :value.sync="formData.U_FZSalesOrder" formname="U_FZSalesOrder" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
          </div>
    </dialog>
    <!--详情对话框-->
    <dialog :flag="dialogMap.showDetailDialog" :title="gettName" :scroll="true">
        <div slot="containerDialog" :class="css.dBox">
                <propertytext type="form" key="客户编码" :value="detailData.CardCode"></propertytext>
                <propertytext type="form" key="渠道" :value="detailData.U_ComeFrom"></propertytext>
                <propertytext type="form" key="业主姓名" :value="detailData.CardName"></propertytext>
                <propertytext type="form" key="业主电话" :value="detailData.Phone1"></propertytext>
                <propertytext type="form" key="业主地址" :value="detailData.Address"></propertytext>
                <propertytext type="form" key="面积" :horizontal="true" :value="detailData.U_Acreage"></propertytext>
                <propertytext type="form" key="交房时间" :horizontal="true" :value="detailData.U_OthersDate"></propertytext>
                <propertytext type="form" key="装修预算" :horizontal="true" :value="detailData.prePrice"></propertytext>
                <propertytext type="form" key="装修风格" :horizontal="true" :value="detailData.U_Renovation2"></propertytext>
                <propertytext type="form" key="房屋类型" :horizontal="true" :value="detailData.U_HouseType"></propertytext>
                <propertytext type="form" key="备注" :horizontal="true" :value="detailData.Notes"></propertytext>
                <propertytext type="form" key="天猫订单" :horizontal="true" :value="detailData.U_TmallOrderId"></propertytext>
                <propertytext type="form" key="天猫订单金额" :horizontal="true" :value="detailData.U_TmOrAmout"></propertytext>
                <propertytext type="form" key="旺旺号" :horizontal="true" :value="detailData.U_WWId"></propertytext>
                <propertytext type="form" key="销售订单号" :horizontal="true" :value="detailData.U_FZSalesOrder"></propertytext>
        </div>
        <div slot="footerDialog"></div>
    </dialog>
  </div>
</template>
<script>
import {setTitle} from "actions";
import {fromConst, decorateStyle, houseType} from "config/const";
import css from "./custom.css";
import formdt from "component/form/formDate";
import tb from "component/grid/tableListBase";
import dialog from "component/dialog/dialog";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import pg from "component/pagination/pagination";
import search from "component/search/search";
import formcb from "component/form/fmCombobox";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import Utils from "common/Utils";
import cascadeformarray from "component/form/formCascadeArry";
import pageBase from "common/mixinPage.js";
let headerData = [{name:"客户编号", labelValue:"CardCode", type:"data"},{name:"客户名称", labelValue:"CardName",type:"data"},
                  {name:"业主联系方式", labelValue:"Address",type:"data"},{name:"渠道", labelValue:"U_ComeFrom",type:"data"},
                  {name:"创建人", labelValue:"createdBy",type:"data"},  // TODO
                  {name:"创建时间", labelValue:"U_DateRgst", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                  {name:"是否签单", labelValue:"account",type:"data"},{name:"备注", labelValue:"Notes",type:"data"},
                  {type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      // 类型列表
      formArray:{
        fromConst: fromConst,
        decorateStyle:decorateStyle,
        houseType: houseType
      },
      curAction:"add", // 默认当前操作为add  其他操作有edit
      dialogMap: {
        showFormDialog: false, // 新增对话框控制
        showDetailDialog: false  // 详情对话框
      },
      formData:{      // 表单数据流
         validate: true
      },
      searchParams:{   // 查询条件
         page:1
      },
      detailData:{    // 详情数据
          CardCode:"xxxx"
      },
      totoals: 0,
      formControl:{
          validate: false,
          validateHandler: function(d){   // 表单验证
               if(d.res == "fail") {
                  this.formData.validate = false
               }
               else   this.formData.validate = true
          }
      },
      searchEvents:{          // 查询数据
        onSearch: function(params) {
            // this.$set("params", params);
            // this.loadtag = !this.loadtag;
        }
      },
      headercaption: headerData,
      load: true,
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑", action:"edit",icon:"icon-edit", id:d},{name:"详情",action:"detail",icon:"icon-tip", id:d }];
        },

        operatorHandler: function(d){
              if(d.action == "edit") {
                this.$set("curAction", "edit");
                this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
              else if(d.action == "detail") {
                this.$set("curAction", "detail");
                this.dialogMap.showDetailDialog = !this.dialogMap.showDetailDialog;
              }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"导入",  icon:"icon-share",action:"inport"}, {name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
              if(d.action == "add") {
                  this.$set("curAction", "add");
                  this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.cardCode || "",  keyname:"cardCode", labelcaption:"业主编号:"},
              {type:"text",  value:q.customName || "",  keyname:"customName", labelcaption:"业主姓名:"},
              {type:"text",  value:q.phone || "",  keyname:"phone", labelcaption:"业主联系方式:", property: "phone"},
              {type:"combobox", keyid:"id", value:q.from || "", labelname:"name", keyname:"from", labelcaption:"渠道", datas:this.formArray.fromConst},
              {type:"dim", iptvalue: q.dimLabel || "", value:q.ename || "",  keyname:"ename", labelcaption:"分站名称:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    },

    gettName: function(){
       let m = {"add":"新增", "edit":"编辑", "detail":"详情"}
       return m[this.curAction] || "编辑"
    }
  },
  ready: function () {

  },
  attached: function () {},
  methods: {
    pagechange: function(d){
        this.searchParams.page = d.page;
        this.loadlist();
    },
    // 新增对话框 按钮回调
    dialogClickHandler: function(d) {
        if(d.action == "confirm") {
          this.formControl.validate = !this.formControl.validate;
          if(this.formData.validate) {
              // this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              // this.loadlist();
              // this.formData = {validate: true}
          }
        }
    },
    loadlist: function(){
      this.$set("load", !this.load);
    }
  },
  components: {search,pagepanel,btnbar,pg,tb,dialog,formtext,cascadeformarray,cascadeform, formcb,formdt, propertytext},
  route:{
    data: function(){
      setTitle(this.$store, "客户管理");
    }
  }
}
</script>
