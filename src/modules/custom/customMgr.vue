<template lang="html">
  <div class="css.customBox">
    <pagepanel>
          <div :class="css.userSearch">
            <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
          </div>
    </pagepanel>
    <pagepanel>
          <btnbar :buttons="btnsData" :events="btnEvents">
              <slot >
                <ft  url="customers/upload" :filter="['xls','xlsx']" text="导入" :tipvalidate="tipvalidate" @upsuccess="upSuccessHandler"></ft><span class="upsu">{{statusRes}}</span><span class="uptip">(仅允许上传xls,xlsx格式的文件包)</span>
              <slot>
          </btnbar>
          <div class="">
            <tb :headercaption="headercaption" :load="load"  :totals.sync="totals" :params="searchParams" url="customers" :events="tableEvents"></tb>
          </div>
            <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
    </pagepanel>
    <!--新增对话框-->
    <dialog :flag.sync="dialogMap.showFormDialog" :title="gettName" @dialogclick="dialogClickHandler" >
          <div slot="containerDialog" :class="css.dBox">
              <div class="" v-if="hideDialogIn">
                <formcb keyid="name" labelname="客户来源：" v-if="isE" :read="curAction!='add'" :value.sync="formData.U_ComeFrom"  keyname="name" formname="U_ComeFrom" :datas="formArray.fromConst" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                <!--需要分站id -->
                <formtext labelname="e站客服：" v-if="isE"  :read="curAction!='add'" :must="false"  :value.sync="formData.U_SlpCode1" formname="U_SlpCode1"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="客户名称：" :read="curAction!='add'"  :value.sync="formData.CardName" formname="CardName"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formtext labelname="手机号码：" :read="curAction!='add'"  :value.sync="formData.Phone2" formname="Phone2"  :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" ></formtext>
                <formdim labelname="归属分站：" v-if="isE" :read="curAction!='add'"  placeholder="分站名称" querylabel='station_name' dimlabel="station_name" :value="formData.station_name" :iptvalue="formData.station_name" id="station_name"  @fromdim="formDimClick"  formname='station_name' :validatestart="formControl.validate" @onvalidate="formControl.validateHandler" url="station-account/search" :params="{page: 1, size: 5}"></formdim>
                <house :startvalidate="startvalidate" :curaction="curAction" :houselist="formData.house_list" @errorh="errorh"></house>
              </div>
          </div>
          <div slot="footerDialog" v-if="curAction=='detail'"></div>
    </dialog>
    <dialog :flag.sync="showRepeat" title="提示">
          <div class="" slot="containerDialog">
              {{descTip}}
          </div>
          <div class="" slot="footerDialog">
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

export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      descTip:"",
      moduleName:"客户管理",
      hideDialogIn: true,
      tipvalidate: function(d){
           if(d.code == 500 || d.code == "500") {
                if(d.data.length < 10) {
                  this.descTip = d.data.join(",") + "手机号重复";
                  this.showRepeat = !this.showRepeat;
                }
                else this.showMsg("warn", "发现十条以上重复手机号，请检查文件重新上传！", 4000);
           }
           else this.showMsg("warn", d.msg, 2000);
      },
      showRepeat: false,
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
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑", action:"edit",icon:"icon-edit", data:d},{name:"详情",action:"detail",icon:"icon-tip", data:d}];
        },

        operatorHandler: function(d){
              if(d.action == "edit") {
                this.$set("curAction", "edit");
                console.log(this.formData);
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
              else if(d.action == "export") {
                window.open(this.$Api+"customers/download?" + $.param(this.searchParams));
              }
        }
      }

    }
  },
  computed: {
    headercaption:function(){
        let headerData = [{name:"业主编号", labelValue:"CardCode", type:"data"},{name:"业主名称", labelValue:"CardName",type:"data"},
                          {name:"业主联系方式", labelValue:"Phone2",type:"data"},{name:"客户来源", labelValue:"U_ComeFrom",type:"data"}]
        if(this.isE) {
            // headerData.push({name:"客户来源", labelValue:"U_ComeFrom",type:"data"});
            headerData.push({name:"分站名称", labelValue:"station_name",type:"data"});
        }
        headerData.push({name:"创建人", labelValue:"createdByName",type:"data"});
        headerData.push({name:"创建时间", labelValue:"U_DateRgst", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}});
        headerData.push({type:"operator", name:"操作"});
        return headerData
    },
    sdata: function(){
      let q = this.$route.query;
      let sArr = [{type:"text",  value:q.CardCode || "",  keyname:"CardCode", labelcaption:"业主编号："},
                  {type:"text",  value:q.CardName || "",  keyname:"CardName", labelcaption:"业主姓名："},
                  {type:"text",  value:q.Phone2 || "",  keyname:"Phone2", labelcaption:"业主联系方式：", property: "phone"}]
      sArr.push({type:"combobox", keyid:"name", value:q.U_ComeFrom || "", labelname:"name", keyname:"U_ComeFrom", labelcaption:"客户来源：", datas:this.formArray.fromConst});
      if(this.isE) {
        sArr.push({type:"text",  value:q.station_name || "",  keyname:"station_name", labelcaption:"分站名称："});
      }
      sArr.push({type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间："});
      return sArr
    },
    // fromAdapter: function(){
    //   let one = Utils.cloneObj(this.formArray.fromConst);
    //   // one.splice(0,1);
    //   return one
    // },
    gettName: function(){
       let m = {"add":"新增", "edit":"编辑", "detail":"详情"}
       return m[this.curAction] || "编辑"
    },
    isE: function() {
      return Utils.isEAdmin();
    }
  },
  ready: function () {

  },
  attached: function () {},
  methods: {
    // 模糊查询分站
    formDimClick: function(d) {
        this.formData.station = d.station;
        this.formData.station_name = d.station_name;
    },
    // dimAdapter: function() {
    //     return "aa"
    // },
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
          },30)
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
        U_ComeFrom:"",
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
      // 适配分站的客户数据  的客户来源字段查询
      if(!this.isE) this.formData.U_ComeFrom = "分站提供";
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
  "watch": {
    "dialogMap": {
      deep:true,
      handler: function(){
          if(this.dialogMap.showFormDialog) this.hideDialogIn = this.dialogMap.showFormDialog
          else {
            setTimeout(()=>{
                this.hideDialogIn = this.dialogMap.showFormDialog
            }, 300)
          }
      }
    }
  }
}
</script>
