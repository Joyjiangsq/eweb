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
          <div class="" slot="containerDialog" :class="css.dBox">
                <formtext labelname="业主姓名："  :value.sync="formData.name"  :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="业主电话："  :value.sync="formData.phone"  :vertical="true" :phone="true"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <cascadeformarray  labelname="地址：" :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></cascadeformarray>
                <cascadeform  labelname="城市：" :must="false" :detailneed="false" :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></cascadeform>
                <formtext labelname="面积：" :must="false" :value.sync="formData.area" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="交房时间：" :must="false" :value.sync="formData.time" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="装修预算：" :must="false" :value.sync="formData.prePrice" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="装修风格：" :must="false" :value.sync="formData.spec" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="房屋类型：" :must="false" :value.sync="formData.type" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
                <formtext labelname="备注：" :must="false" :value.sync="formData.remark" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
          </div>
    </dialog>
  </div>
</template>
<script>
import {setTitle} from "actions";
import css from "./custom.css";
import tb from "component/grid/tableListBase";
import dialog from "component/dialog/dialog";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import pg from "component/pagination/pagination";
import search from "component/search/search";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import Utils from "common/Utils";
import cascadeformarray from "component/form/formCascadeArry";
import pageBase from "common/mixinPage.js";
let headerData = [{name:"客户编号", labelValue:"type", type:"data"},{name:"业主姓名", labelValue:"name",type:"data"},
                  {name:"业主联系方式", labelValue:"address",type:"data"},{name:"渠道", labelValue:"account",type:"data"},
                  {name:"创建人", labelValue:"createdBy",type:"data"},
                  {name:"创建时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                  {name:"是否签单", labelValue:"account",type:"data"},{name:"备注", labelValue:"account",type:"data"},
                  {type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      curAction:"add", // 默认当前操作为add  其他操作有edit
      dialogMap: {
        showFormDialog: false // 新增对话框控制
      },
      formData:{      // 表单数据流
      },
      searchParams:{   // 查询条件
         page:1
      },
      totoals: 0,
      formControl:{
          validate: false,
          validateHandler: function(d){   // 表单验证
              console.log(d);
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
          return [{name:"编辑", action:"edit",icon:"icon-edit", id:d._id}];
        },

        operatorHandler: function(d){
              if(d.action == "edit") {
                this.$set("curAction", "edit");
                this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"导出", icon:"icon-share", action:"export"}],
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
              {type:"combobox", keyid:"id", value:q.from || "", labelname:"name", keyname:"from", labelcaption:"渠道", datas:[{name:"淘宝", id:1},{name:"门店", id:2}]},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    },

    gettName: function(){
       return this.curAction == "add"? "新增":"编辑"
    }
  },
  ready: function () {},
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
        }
    },
    loadlist: function(){
      this.$set("load", !this.load);
    }
  },
  components: {search,pagepanel,btnbar,pg,tb,dialog,formtext,cascadeformarray,cascadeform},
  route:{
    data: function(){
      setTitle(this.$store, "客户管理");
    }
  }
}
</script>
