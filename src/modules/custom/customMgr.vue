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
            <tb :headercaption="headercaption" :load="load" :datas="testData" url="" :events="tableEvents"></tb>
          </div>
          <pg :totals="100" ></pg>
    </pagepanel>
    <!--新增对话框-->
    <dialog :flag="dialogMap.showFormDialog" :title="gettName" @dialogclick="dialogClickHandler">
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
import cascadeformarray from "component/form/formCascadeArry";
import pageBase from "common/mixinPage.js";
let headerData = [{name:"用户名", labelValue:"type", type:"data"},{name:"角色", labelValue:"orderid",type:"data"},
                  {name:"状态", labelValue:"cash",type:"data", attr:"price"},{name:"创建人", labelValue:"account",type:"data"},
                  {name:"创建时间", labelValue:"name", type:"data"},{type:"operator", name:"操作"}]
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
      load: false,
      testData:[{type:"110202222219201", orderid:"卡拉", status: 1},{type:"1102019201", orderid:"卡拉", status:2}],
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑", action:"edit",icon:"icon-edit", id:d.id},{name:"详情", action:"detail",icon:"icon-detail", id:""}];
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
      return [{type:"text",  value:q.customName || "",  keyname:"customName", labelcaption:"业主姓名:"},
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
    // 新增对话框 按钮回调
    dialogClickHandler: function(d) {
        if(d.action == "confirm") {
          this.formControl.validate = !this.formControl.validate;
        }
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
