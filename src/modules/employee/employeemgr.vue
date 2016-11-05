<template>
    <div :class="epCss.empBox">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="epCss.empSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="epCss.tBox">
                <tb :headercaption="headercaption"  :totals.sync="totals"  :load="load" :params="searchParams" url="employees" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
        <dialog :flag="flagdep" @dialogclick="diaologClick" :title="optitle">
              <div class="" slot="containerDialog">
                  <formtext labelname="姓名：" :value.sync="addParams.CardName"  placeholder="请输入姓名" :vertical="true" formname='CardName' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="电话：" :value.sync="addParams.phone"  placeholder="请输入电话" :vertical="true" :phone="true" formname='phone'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formcb keyid="name" labelname="职位：" dropfixed="dropfixed" keyname="name" formname="roles" :vertical="true" :value.sync="addParams.roles" :datas="getRoles" :validatestart="validate" @onvalidate="validateHandler"></formcb>
              </div>
        </dialog>
        <!--删除提示-->
        <dialogtip :flag="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
    </div>
</template>

<script>

import epCss from "./employee.css";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import {rolesE, rolesS} from "config/const.js";
import dialogtip from "component/dialog/dialogTip";

import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"员工编号", labelValue:"CardCode", type:"data"},
                        {name:"员工姓名", labelValue:"CardName",type:"data"},
                        {name:"职位", labelValue:"roles",type:"data"},
                        {name:"联系方式", labelValue:"phone",type:"data"},
                        {name:"创建人", labelValue:"createdByName",type:"data"},
                        {name:"时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      epCss,
      moduleName:"员工管理",
      validateSuccess: true,    // 判断表单验证是否通过
      curItem:{},               // 删除或者编辑当前的 数据
      curAction:"",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
      optitle:"",               // 弹框标题
      deleteTag: false,         // 删除确认弹框显示隐藏

      flagdep: false,           // 控制表格显示隐藏
      validate: false,          // 表单验证动作的开关
      addParams:{CardName:"", roles:"", phone:""}, // 新增、编辑的参数值
      headercaption:tableHeaderDatas, // 表格头部信息设置
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑",action:"edit",icon:"icon-edit", data: d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
        },
        operatorHandler: function(d){
          this.$set("curItem", d.data);
          if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
          else if (d.action == "edit") {
            this.$set("optitle", "编辑");
            this.$set("curAction", "edit");
            this.addParams.CardName = d.data.CardName;
            this.addParams.phone = d.data.phone;
            this.addParams.roles = d.data.roles;
            this.flagdep = !this.flagdep;
          }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
              this.$set("optitle", "新增");
              this.$set("curAction", "new");
              this.flagdep = !this.flagdep;
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"combobox", keyname:"roles", labelname:"name", keyid:"id", value:q.roles || "", datas:this.getRoles, labelcaption:"职位："},
              {type:"text",  value:q.CardCode || "",  keyname:"CardCode", labelcaption:"员工编号:"},
              {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"员工姓名:"}];

    },
    getRoles: function(){
      if(Utils.isEAdmin()) return rolesE
      return rolesS;
    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
    validateHandler: function(d){
      if(d.res == "fail") this.$set("validateSuccess", false);
    },

    diaologClick: function(d){
       if(d.action == "confirm") {
          this.$set("validate", !this.validate);
          setTimeout(()=>{
            if(this.validateSuccess) {
               if(this.curAction =="new") this.addEmp()
               else this.eidtEmp()
            }
            else this.$set("validateSuccess", true);
          })
       }
       else {
         this.resetParams(this.addParams);
       }
    },

    addEmp: function(){
       this.$http.post(this.$Api+"employees", this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            this.showMsg("success", "新增成功！");
       });
    },

    eidtEmp: function(){
       this.addParams._id = this.curItem._id;
       this.$http.put(this.$Api+"employees", this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            this.showMsg("success", "编辑成功！");
       });
    },

    confirmDelete: function(d){
      if(d.action == "confirm") {
          this.$http.delete(this.$Api+"employees", {params: {"_id": this.curItem._id}}).then((res)=>{
               this.$set("deleteTag", !this.deleteTag);
               this.loadlist()
               this.showMsg("success", "删除成功！");
          });
      }
    },


  },
  components: {formtext,formcb,dialogtip},

}
</script>
