<template>
    <div :class="epCss.empBox">
        <pagepanel>
              <div :class="epCss.empSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="epCss.tBox">
                <tb :headercaption="headercaption"  url="employees" :totals.sync="totals"  :load="load" :params="searchParams" url="" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
        <dialog :flag.sync="flagdep" @dialogclick="diaologClick" :title="optitle">
              <div class="" slot="containerDialog">
                <div class="" v-if="hideDialogIn">
                  <formtext labelname="供应商名称：" :value.sync="addParams.CardName"  placeholder="请输入名称" :vertical="true" formname='CardName' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="联系人：" :value.sync="addParams.roles"  placeholder="请输入联系人" :vertical="true" formname='roles' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="电话：" :value.sync="addParams.phone"  placeholder="请输入电话" :vertical="true" :phone="true" formname='phone'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="备注：" :value.sync="addParams.createdByName" :must="false"  placeholder="备注" :vertical="true" formname='createdByName'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
              </div>
        </dialog>
        <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
    </div>
</template>

<script>

import epCss from "./b.css";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import dialogtip from "component/dialog/dialogTip";

import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"供应商编码", labelValue:"CardCode", type:"data"},
                        {name:"供应商名称", labelValue:"CardName",type:"data"},
                        {name:"联系人", labelValue:"roles",type:"data"},
                        {name:"联系电话", labelValue:"phone",type:"data"},
                        {name:"备注", labelValue:"createdByName",type:"data"},
                        {name:"时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      epCss,
      hideDialogIn: true,
      moduleName:"供应商管理",
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
      btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
              this.$set("optitle", "新增");
              this.$set("curAction", "new");
              this.flagdep = !this.flagdep;
            }
            else if(d.action="export") {
              window.open(this.$Api+"employees/download?" + $.param(this.searchParams));
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.CardCode || "",  keyname:"surName", labelcaption:"供应商名称："}];

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
          },30)
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
       this.addParams.station = this.curItem.station;
       this.$http.put(this.$Api+"employees", this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            this.showMsg("success", "编辑成功！");
       });
    },

    confirmDelete: function(d){
      if(d.action == "confirm") {
          this.$http.delete(this.$Api+"employees", {params: {"CardCode": this.curItem.CardCode}}).then((res)=>{
               this.$set("deleteTag", !this.deleteTag);
               this.loadlist()
               this.showMsg("success", "删除成功！");
          });
      }
    },
    "flagdep": function(){
        if(this.flagdep) this.hideDialogIn = this.flagdep
        else {
          setTimeout(()=>{
              this.hideDialogIn = this.flagdep
          }, 300)
        }
    }

  },
  components: {formtext,formcb,dialogtip},

}
</script>
