<template>
    <div :class="epCss.userBox">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="epCss.userSearch">
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

        {{addFormData|json}}
        <!--新增对话框-->
        <dialog :flag="showFormDialog" title="新增" @dialogclick="dialogClickHandler">
              <div class="" slot="containerDialog">
                    <formdim labelname="用户名："  :value.sync="addFormData.userName" :vertical="true" @fromdim="formDimClick"  formname='userName' :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formdim>
                    <formtext labelname="系统账号："  :value.sync="addFormData.accountName"  :vertical="true" :read="true" :ingnore='true' ></formtext>
                    <formtext labelname="用户电话：" :value.sync="addFormData.userPhone" :vertical="true" :read="true" :ingnore='true' ></formtext>
                    <formrd labelname="是否启用：" :vertical="true" formname="open" :value.sync="addFormData.isOpen" :datas="[{label:'是', id:1, checked: false},{label:'否', id:2, checked: false},]" :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formrd>
                    <formck labelname="角色：" :vertical="true" formname="role" :value.sync="addFormData.role"  :datas="[{label:'设计师', id:1, checked: false},{label:'销售', id:2, checked: false}]" :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formck>
              </div>
        </dialog>
        <!--重设角色对话框-->
        <dialog :flag="showRolesDialog" title="更改角色" @dialogclick="rolesDialogClickHandler">
              <div class="" slot="containerDialog">
                  <formck labelname="角色：" :vertical="true" formname="role" :value.sync="rolesData.roles"  :datas="[{label:'设计师', id:1, checked: false},{label:'销售', id:2, checked: false}]" :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formck>
              </div>
        </dialog>
        <!--重置密码提示-->
        <dialogtip :flag="resetDialog" @dialogclick="confirmReset" msg="你确定重置密码吗？">
    </div>
</template>

<script>
import {setTitle} from "actions";
import epCss from "./user.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
import formdim from "component/form/formDim";
import formtext from "component/form/formText";
import formck from "component/form/formCheckBox";
import formrd from "component/form/formRadio";
import pageBase from "common/mixinPage.js";
import dialogtip from "component/dialog/dialogTip";

let headerData = [{name:"用户名", labelValue:"type", type:"data"},{name:"角色", labelValue:"orderid",type:"data"},
                  {name:"状态", labelValue:"cash",type:"data", attr:"price"},{name:"创建人", labelValue:"account",type:"data"},
                  {name:"创建时间", labelValue:"name", type:"data"},{type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      epCss,
      headercaption: headerData,
      showFormDialog: false,  // 显示表单对话框
      resetDialog: false,     // 密码重置对话框
      showRolesDialog: false, // 角色分配对话框
      load: false,            // 加载列表
      testData:[{type:"110202222219201", orderid:"卡拉", status: 1},{type:"1102019201", orderid:"卡拉", status:2}],
      searchEvents:{          // 查询数据
        onSearch: function(params) {
            // this.$set("params", params);
            // this.loadtag = !this.loadtag;
        }
      },
      // 新增表单验证
      newForm:{
          validate: false,
          validateHandler: function(d) {
            console.log(d);
          }
      },
      rolesData:{//划分角色默认值
        roles:"",
        userId:""
      },
      // 表单数据
      addFormData:{
          userId:"",
          accountName:"",
          userPhone:"",
          isOpen:"1",
          role:"",
          userName:""
      },
      tableEvents:{
        operatorRender: function(d){
          let bdatas = [{name:"密码重置", action:"rebuild",icon:"icon-key", id:d.type},{name:"编辑", action:"edit",icon:"icon-edit", id:d.type, roles: d.roles}];
          if(d.status == 1) bdatas.unshift({name:"启用", action:"open", icon:"icon-check", id:d.type})
          else bdatas.unshift({name:"禁用", action:"forbidden", icon:"icon-forbidden", id:d.type});
          return bdatas;
        },

        operatorHandler: function(d){
          if(d.action == "open") {
            d.action = "forbidden";d.name = "禁用";d.icon = "icon-forbidden";
          }
          else if(d.action == "forbidden") {
            d.action = "open";d.name = "启用";d.icon = "icon-check";
          }
          else if(d.action == "rebuild") {
            this.$set("resetDialog", !this.resetDialog);
          }
          else if(d.action == "edit") {
            this.$set("showRolesDialog", !this.showRolesDialog);
            this.rolesData.userId = d.id;
            this.roleData.roles = d.roles;
          }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") this.$set("showFormDialog", !this.showFormDialog);
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.username || "",  keyname:"username", labelcaption:"用户名:"},
              {type:"text",  value:q.status || "",  keyname:"status", labelcaption:"用户状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"员工姓名:"}];
    }
  },
  ready: function () {},
  attached: function () {},
  methods: {
    // 新增权限用户对话框
    dialogClickHandler: function(d) {
      if(d.action == "confirm") {
          this.newForm.validate = !this.newForm.validate;
      }
      setTimeout(()=>{this.resetParams(this.addFormData);})
      // console.log(this.addFormData);
    },
    // 修改角色对话框
    rolesDialogClickHandler: function(d) {
      console.log(d);
    },
    // 表单模糊查询点击
    formDimClick: function(d) {
      console.log(d);
    },
    // 重置密码
    confirmReset: function(d){
      console.log(d);
    }
  },
  components: {search,tb,pagepanel,btnbar,dialog, pg, formdim,formtext,formck,formrd, dialogtip},
  route:{
    data: function(){
      setTitle(this.$store, "用户管理");
    }
  }
}
</script>
