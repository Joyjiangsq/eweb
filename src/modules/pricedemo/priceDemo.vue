<template>
    <div :class="epCss.empBox">
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="epCss.tBox">
                <tb :headercaption="headercaption"  :totals.sync="totals"  :load="load" :params="searchParams" url="employees" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
        <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
    </div>
</template>

<script>

import epCss from "./price.css";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import {rolesE, rolesS} from "config/const.js";
import dialogtip from "component/dialog/dialogTip";

import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"模板名称", labelValue:"tpl_name", type:"data"},
                        {name:"组包名称", labelValue:"package_type",type:"data"},
                        {name:"状态", labelValue:"status",type:"data"},
                        {name:"类别", labelValue:"type",type:"data"},
                        {type:"operator", name:"操作"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      epCss,
      moduleName:"报价模板",
      deleteTag: false,         // 删除确认弹框显示隐藏
      headercaption:tableHeaderDatas, // 表格头部信息设置
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑",action:"edit",icon:"icon-edit", data: d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
        },
        operatorHandler: function(d){
          if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
          else if (d.action == "edit") {
              
          }
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
              
            }
        }
      }
    }
  },
  computed: {
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
    confirmDelete: function(d){
      if(d.action == "confirm") {
          this.$http.delete(this.$Api+"employees", {params: {"CardCode": this.curItem.CardCode}}).then((res)=>{
               this.$set("deleteTag", !this.deleteTag);
               this.loadlist()
               this.showMsg("success", "删除成功！");
          });
      }
    }

  },
  components: {formtext,formcb,dialogtip},

}
</script>
