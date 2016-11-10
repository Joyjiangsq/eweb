<template lang="html">
  <div class="css.customBox">
    <pagepanel classname="needpadding" direct="bottom">
          <div :class="css.userSearch">
            <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
          </div>
    </pagepanel>
    <pagepanel>
          <btnbar :buttons="btnsData" :events="btnEvents">
              <slot>
                <ft url="upload" :filter="['xls','xlsx']" text="导入" @upsuccess="upSuccessHandler"></ft><span class="upsu">{{statusRes}}</span><span class="uptip">(仅允许上传xls,xlsx格式的文件包)</span>
              <slot>
          </btnbar>
          <div class="">
            <tb :headercaption="headercaption" :load="load"  :totals.sync="totals" :params="searchParams" url="customers" :events="tableEvents"></tb>
          </div>
            <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
    </pagepanel>
    <!--新增对话框-->
    <dialog :flag="dialogMap.showFormDialog" :title="gettName" @dialogclick="dialogClickHandler" >
          <div slot="containerDialog" :class="css.dBox">
                <formcb keyid="name" labelname="客户来源：" :read="curAction!='add'" :value.sync="formData.U_ComeFrom"  keyname="name" formname="U_ComeFrom" :datas="fromAdapter" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                <!--需要分站id -->
                <formtext labelname="e站客服："  :read="curAction!='add'" :must="false"  :value.sync="formData.U_SlpCode1" formname="U_SlpCode1"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="客户名称：" :read="curAction!='add'"  :value.sync="formData.CardName" formname="CardName"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="手机号码：" :read="curAction!='add'"  :value.sync="formData.Phone2" formname="Phone2"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>

                <house :startvalidate="startvalidate" :curaction="curAction" :houselist="formData.house_list" @errorh="errorh"></house>
          </div>
    </dialog>

  </div>
</template>
<script>
import {fromConst} from "config/const";
import ft from "component/file/filedeal.vue";
import formcb from "component/form/fmCombobox";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import css from "./custom.css";
import formdim from "component/form/formDim";
import Utils from "common/Utils";
import house from "./houseOne";
import pageBase from "common/mixinPage.js";
let headerData = [{name:"业主编号", labelValue:"CardCode", type:"data"},{name:"业主名称", labelValue:"CardName",type:"data"},
                  {name:"业主联系方式", labelValue:"Phone2",type:"data"},{name:"客户来源", labelValue:"U_ComeFrom",type:"data"},
                  {name:"创建人", labelValue:"createdBy",type:"data"},  // TODO
                  {name:"创建时间", labelValue:"U_DateRgst", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                  {type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      moduleName:"客户管理",
      // 类型列表
      formArray:{
        fromConst: fromConst
      },
      curAction:"add", // 默认当前操作为add  其他操作有edit
      dialogMap: {
        showFormDialog: false // 新增对话框控制
      },
      startvalidate: false,
      formData:{      // 表单数据流
         validate: true,
         house_list:[{}]
      },
      statusRes:"",
      formControl:{
          validate: false,
          validateHandler: function(d){   // 表单验证
               if(d.res == "fail") {
                  this.formData.validate = false
               }
               else   this.formData.validate = true
          }
      },
      headercaption: headerData,
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑", action:"edit",icon:"icon-edit", data:d},{name:"详情",action:"detail",icon:"icon-tip", data:d}];
        },

        operatorHandler: function(d){
              if(d.action == "edit") {
                this.$set("curAction", "edit");
                this.formData = Utils.cloneObj(d.data);
                this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
              else if(d.action == "detail") {
                this.$set("curAction", "detail");
                this.formData = Utils.cloneObj(d.data);
                this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"}, {name:"导出", icon:"icon-share", action:"export"}],
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
      return [{type:"text",  value:q.CardCode || "",  keyname:"CardCode", labelcaption:"业主编号:"},
              {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"业主姓名:"},
              {type:"text",  value:q.Phone2 || "",  keyname:"Phone2", labelcaption:"业主联系方式:", property: "phone"},
              {type:"combobox", keyid:"name", value:q.U_ComeFrom || "", labelname:"name", keyname:"U_ComeFrom", labelcaption:"客户来源", datas:this.formArray.fromConst},
              {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"分站名称:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    },
    fromAdapter: function(){
      let one = Utils.cloneObj(this.formArray.fromConst);
      one.splice(0,1);
      console.log(one);
      return one
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
    // 模糊查询分站
    formDimClick: function(d) {

    },
    upSuccessHandler: function(){
      this.statusRes = "导入成功";
      this.loadlist();
    },
    errorh: function(){
        this.formData.validate = false;
    },
    // 新增对话框 按钮回调
    dialogClickHandler: function(d) {
        if(this.curaction == "detail") {
          this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
          return false;
        }
        if(d.action == "confirm") {
          this.formControl.validate = !this.formControl.validate;  // 开始基础数据验证
          this.startvalidate = !this.startvalidate; // 开始房屋信息验证
          setTimeout(()=>{
            if(this.formData.validate) {
                delete this.formData.validate;
                if(this.curAction == "add") this.addOne();
                else if(this.curAction == "edit") this.editOne();
            }
          })
        }
        else {
          this.formData = {   // 重置数据
            validate: true,
            house_list:[{}]
          }
        }
    },

    retInfo: function(){
      this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
      this.formData = {   // 重置数据
        validate: true,
        house_list:[{}]
      }
      this.loadlist();
    },
    editOne: function(){
      this.$http.put(this.$Api+"customers",JSON.stringify(this.formData)).then((res) => {
          var d = res.json();
          console.log(d);
          if(d.code == 200) {
            this.retInfo();
            this.showMsg("success", "修改成功");
          }
      },(error) =>{
        console.log(error);
      })
    },
    addOne: function(){
      this.$http.post(this.$Api+"customers",JSON.stringify(this.formData)).then((res) => {
          var d = res.json();
          if(d.code == 200) {
            this.retInfo();
            this.showMsg("success", "新增成功");
          }
      },(error) =>{
        console.log(error);
      })
    }
  },
  components: {formtext,cascadeform, formcb, formdim, house, ft},
}
</script>
