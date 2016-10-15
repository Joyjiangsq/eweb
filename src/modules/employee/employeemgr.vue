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
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" :params="searchParams" url="employees" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals"  @pagechange="pagechange"></pg>
        </pagepanel>
        <dialog :flag="flagdep" @dialogclick="diaologClick" :title="optitle">
              <div class="" slot="containerDialog">
                  <formtext labelname="姓名：" :value.sync="addParams.name"  placeholder="请输入姓名" :vertical="true" formname='name' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="电话：" :value.sync="addParams.phone"  placeholder="请输入电话" :vertical="true" :phone="true" formname='phone'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formcb keyid="name" labelname="职位：" keyname="name" formname="roles" :vertical="true" :value.sync="addParams.roles" :datas="roleData" :validatestart="validate" @onvalidate="validateHandler"></formcb>
              </div>
        </dialog>
        <!--删除提示-->
        <dialogtip :flag="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
    </div>
</template>

<script>
import {setTitle} from "actions";
import epCss from "./employee.css";
import formtext from "component/form/formText";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import {roleData} from "config/const.js";
import dialogtip from "component/dialog/dialogTip";
import {showTips} from "actions/index";
import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"员工编号", labelValue:"user_code", type:"data"},
                        {name:"员工姓名", labelValue:"name",type:"data"},
                        {name:"职位", labelValue:"roles",type:"data"},
                        {name:"联系方式", labelValue:"phone",type:"data"},
                        {name:"创建人", labelValue:"createdBy",type:"data"},
                        {name:"时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      epCss,
      validateSuccess: true,    // 判断表单验证是否通过
      curItem:{},               // 删除或者编辑当前的 数据
      curAction:"",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
      optitle:"",               // 弹框标题
      deleteTag: false,         // 删除确认弹框显示隐藏
      totals:0,                 // 表格load结束之后 传递给分页的页数
      roleData: roleData,       // 角色配置项目
      flagdep: false,           // 控制表格显示隐藏
      validate: false,          // 表单验证动作的开关
      searchParams: {page:1}, // 初始查询依据
      addParams:{name:"", roles:"", phone:""}, // 新增、编辑的参数值
      headercaption:tableHeaderDatas, // 表格头部信息设置
      load: true,                 // 表格是否加载开关
      searchEvents:{                  // 查询回调函数
        onSearch: function(params) {
            // this.$set("params", params);
        }
      },

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
            this.addParams.name = d.data.name;
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
      return [{type:"combobox", keyname:"jobname", labelname:"name", keyid:"name", value:q.jobname || "", datas:this.roleData, labelcaption:"职位："},
              {type:"text",  value:q.empcode || "",  keyname:"empcode", labelcaption:"员工编号:"},
              {type:"text",  value:q.empname || "",  keyname:"empname", labelcaption:"员工姓名:"}];

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
            showTips(this.$store, {type:"success", msg:"新增成功！"});
       });
    },

    eidtEmp: function(){
       this.$http.put(this.$Api+"employees/"+this.curItem._id, this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            showTips(this.$store, {type:"success", msg: "编辑成功！"});
       });
    },

    confirmDelete: function(d){
      if(d.action == "confirm") {
          this.$http.delete(this.$Api+"employees/"+this.curItem._id, {}).then((res)=>{
               this.$set("deleteTag", !this.deleteTag);
               this.loadlist()
               showTips(this.$store, {type:"success", msg:"删除成功！"})
          });
      }
    },

    loadlist: function(){
      this.$set("load", !this.load);
    }
  },
  components: {search,tb,pagepanel,btnbar,dialog, pg, formtext,formcb,dialogtip},
  route:{
    data: function(){
      setTitle(this.$store, "员工管理");
    }
  }
}
</script>
