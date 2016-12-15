<template>
    <div :class="css.empBox">
        <!--<pagepanel>
              <div :class="css.empSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>-->
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="css.tBox">
                <tb :headercaption="headercaption"  :totals.sync="totals"  :load="load" :params="searchParams" url="construction-fixed-price" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
        <dialog :flag.sync="flagdep" @dialogclick="diaologClick" :title="optitle">
              <div class="" slot="containerDialog">
                <div class="" v-if="hideDialogIn">
                  <formtext labelname="最小面积：" :value.sync="addParams.start" :number="true"  placeholder="请输入最小面积" :vertical="true" formname='start' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="最大面积：" :value.sync="addParams.end"  :number="true"  placeholder="请输入最大面积" :vertical="true" formname='end' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="卫生间数：" :value.sync="addParams.toilet_num" :number="true"   placeholder="请输入卫生间数量" :vertical="true"  formname='toilet_num'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  <formtext labelname="一口价：" :value.sync="addParams.price"  :number="true"   placeholder="请输入一口价" :vertical="true" formname='price'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
              </div>
        </dialog>
        <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
    </div>
</template>

<script>

import css from "./b.css";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import dialogtip from "component/dialog/dialogTip";

import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"最小面积", labelValue:"start", type:"data"},
                        {name:"最大面积", labelValue:"end",type:"data"},
                        {name:"卫生间数", labelValue:"toilet_num",type:"data"},
                        {name:"一口价", labelValue:"price",type:"data"},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      hideDialogIn: true,
      moduleName:"施工包一口价对照表",
      validateSuccess: true,    // 判断表单验证是否通过
      curItem:{},               // 删除或者编辑当前的 数据
      curAction:"",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
      optitle:"",               // 弹框标题
      deleteTag: false,         // 删除确认弹框显示隐藏

      flagdep: false,           // 控制表格显示隐藏
      validate: false,          // 表单验证动作的开关
      addParams:{start:"", end:"", toilet_num:"", price:""}, // 新增、编辑的参数值
      headercaption:tableHeaderDatas, // 表格头部信息设置
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑",action:"edit",icon:"icon-edit", data: d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
        },
        operatorHandler: function(d){
          this.$set("curItem", Utils.cloneObj(d.data));
          if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
          else if (d.action == "edit") {
            this.$set("optitle", "编辑");
            this.$set("curAction", "edit");
            this.addParams = this.curItem;
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
       if(this.addParams.start*1 > this.addParams.end*1) {
         this.showMsg("warn", "最小面积不能大于最大面积");
         return false
       }
       this.$http.post(this.$Api+"construction-fixed-price", this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            this.showMsg("success", "新增成功！");
       });
    },

    eidtEmp: function(){
       if(this.addParams.start*1 > this.addParams.end*1) {
         this.showMsg("warn", "最小面积不能大于最大面积");
         return false
       }
       this.addParams._id = this.curItem._id;
       this.$http.put(this.$Api+"construction-fixed-price", this.addParams).then((res)=>{
            this.$set("flagdep", !this.flagdep);
            this.loadlist()
            this.resetParams(this.addParams);
            this.showMsg("success", "编辑成功！");
       });
    },

    confirmDelete: function(d){
      if(d.action == "confirm") {
          this.$http.delete(this.$Api+"construction-fixed-price", {params: {"_id": this.curItem._id}}).then((res)=>{
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
