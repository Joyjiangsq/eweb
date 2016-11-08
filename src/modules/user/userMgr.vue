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
                <tb :headercaption="headercaption" url="users" :params="searchParams" totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>

        <!--新增对话框-->
        <dialog :flag="showFormDialog" title="新增" @dialogclick="dialogClickHandler">
              <div class="" slot="containerDialog">
                    <formdim labelname="用户名："  placeholder="姓名"  dimlabel="CardName" querylabel="CardName" :value="addFormData.CardCode" :iptvalue="addFormData.CardName" id="CardCode"  @fromdim="formDimClick"  formname='CardName' :validatestart="newForm.validate" @onvalidate="newForm.validateHandler" url="employees" :params="dimParams"></formdim>
                    <formtext labelname="系统账号："  :value.sync="addFormData.CardCode"  :vertical="true" :read="true" :ingnore='true' ></formtext>
                    <formtext labelname="用户电话：" :value.sync="addFormData.phone" :vertical="true" :read="true" :ingnore='true' ></formtext>
                    <formrd labelname="是否启用：" :vertical="true" formname="U_Type" :value.sync="addFormData.U_Type" :datas="[{label:'是', id:'N', checked: false},{label:'否', id:'F', checked: false},]"  :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formrd>
                    <formck labelname="角色：" :vertical="true" formname="roles" lname="name" lkey="name" :value.sync="addFormData.roles"  :datas="getRoles" :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formck>
              </div>
        </dialog>
        <!--重设角色对话框-->
        <dialog :flag="showRolesDialog" title="更改角色" @dialogclick="rolesDialogClickHandler">
              <div class="" slot="containerDialog">
                  <formck labelname="角色：" :vertical="true" formname="roles" :value.sync="curopData.roles"  lname="name" lkey="name"  :datas="getRoles" :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formck>
              </div>
        </dialog>
        <!--重置密码提示-->
        <dialogtip :flag="resetDialog" @dialogclick="confirmReset" msg="你确定重置密码吗？">
    </div>
</template>

<script>
import {rolesE, rolesS} from "config/const";
import epCss from "./user.css";
import formdim from "component/form/formDim";
import formtext from "component/form/formText";
import formck from "component/form/formCheckBox";
import formrd from "component/form/formRadio";
import pageBase from "common/mixinPage.js";
import dialogtip from "component/dialog/dialogTip";
import Utils from "common/Utils";
let headerData = [{name:"用户名", labelValue:"CardCode", type:"data"},{name:"姓名", labelValue:"CardName", type:"data"},{name:"角色", labelValue:"roles",type:"data"},
                  {name:"状态", labelValue:"U_Type_desc",type:"data",adapterFun: function(d) {return d.U_Type =="N"?"启用":"禁用"}},{name:"创建人", labelValue:"createdByName",type:"data"},
                  {name:"创建时间", labelValue:"createAt_desc", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},{type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      epCss,
      moduleName:"用户管理",
      headercaption: headerData,
      dimParams: {
          size: 5,
          page: 1
      },
      curopData:{},
      showFormDialog: false,  // 显示表单对话框
      resetDialog: false,     // 密码重置对话框
      showRolesDialog: false, // 角色分配对话框
      // 新增表单验证
      addTag: true,
      newForm:{
          validate: false,
          validateHandler: function(d) {
              if(d.res == "fail") {
                  this.addTag = false;
              }
          }
      },
      // 表单数据
      addFormData:{
          CardCode:"",
          CardName:"",
          phone:"",
          U_Type:"N",
          roles:""
      },
      tableEvents:{
        operatorRender: function(d){
          let bdatas = [{name:"密码重置", action:"rebuild",icon:"icon-key", data:d},{name:"编辑", action:"edit",icon:"icon-edit", data:d}];
          if(d.U_Type == "F") bdatas.unshift({name:"启用", action:"open", icon:"icon-check", data:d})
          else bdatas.unshift({name:"禁用", action:"forbidden", icon:"icon-forbidden", data:d});
          return bdatas;
        },

        operatorHandler: function(d){
          this.curopData = Utils.cloneObj(d.data);
          if(d.action == "open") this.changeOpen("N");
          else if(d.action == "forbidden") this.changeOpen("F");
          else if(d.action == "rebuild") this.$set("resetDialog", !this.resetDialog);
          else if(d.action == "edit") this.$set("showRolesDialog", !this.showRolesDialog);
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
      return [{type:"text",  value:q.CardName || "",  keyname:"CardCode", labelcaption:"用户名:"},
              {type:"combobox", keyname:"U_Type", labelname:"name", keyid:"id", value:q.U_Type || "", datas:[{name:"启用", id: 'N'}, {name:"禁用", id:"F"}], labelcaption:"用户状态"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    },
    getRoles: function(){
      if(Utils.isEAdmin()) return rolesE
      return rolesS;
    },

  },
  ready: function () {

  },
  attached: function () {},
  methods: {
    // 新增权限用户对话框
    dialogClickHandler: function(d) {
      if(d.action == "confirm") {
          this.addTag = true;
          this.newForm.validate = !this.newForm.validate;
          setTimeout(()=>{
              console.log(this.addTag);
              if(this.addTag) {
                  this.$http.post(this.$Api+"users",JSON.stringify(this.addFormData)).then((res) => {
                      var d = res.json();
                      this.showFormDialog = !this.showFormDialog;
                      this.loadlist();
                      this.showMsg("success", "新增成功");
                      this.addFormData = {CardCode:"", CardName:"",phone:"",U_Type:"N",roles:""}
                  },(error) =>{
                    this.showMsg("error", error.msg);
                  })
              }
          })
      }
    },
    // 修改角色对话框
    rolesDialogClickHandler: function(d) {
        if(d.action == "confirm") {
              this.addTag = true;
              setTimeout(()=>{
                  if(this.addTag) {
                      this.changeOne({CardCode: this.curopData.CardCode, roles: this.curopData.roles}, () => {
                            this.showRolesDialog = !this.showRolesDialog;

                      })
                  }
              })
        }
    },
    changeOpen: function(type){
        this.changeOne({CardCode: this.curopData.CardCode, U_Type:type})
    },
    changeOne: function(params, cb){
      this.$http.put(this.$Api+"users",JSON.stringify(params)).then((res) => {
          var d = res.json();
          if(cb) cb()
          this.showMsg("success", "修改成功");
          this.loadlist();
          // this.addFormData = {CardCode:"", CardName:"",phone:"",U_Type:"N",roles:""}
      },(error) =>{
        this.showMsg("error", error.msg);
      })
    },
    // 表单模糊查询点击
    formDimClick: function(d) {
       Object.assign(this.addFormData,d);
    },
    // 重置密码
    confirmReset: function(d){
        console.log(this.curopData);
        this.$http.put(this.$Api+"/users/reset-passwd",{CardCode: this.curopData.CardCode}).then((res) => {
            this.showMsg("success", "重置成功");
            this.$set("resetDialog", !this.resetDialog);
        },(error) =>{
          this.showMsg("error", error.msg);
        })
    }
  },
  components: {formdim,formtext,formck,formrd, dialogtip},

}
</script>
