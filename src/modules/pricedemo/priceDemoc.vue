<template>
    <div :class="css.empBox">
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="css.tBox">
                <tb :headercaption="headercaption"  :totals.sync="totals"  :load="load" :params="searchParams" url="employees" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";

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
      css,
      moduleName:"报价模板",
      headercaption:tableHeaderDatas, // 表格头部信息设置
      tableEvents:{
        operatorRender: function(d){
          return [{name:"修改",action:"edit",icon:"icon-edit", data: d},{name:"停用", action:"stop",icon:"icon-forbidden",data:d}]
        },
        operatorHandler: function(d){
          if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
          else if (d.action == "edit") {
              
          }
        }
      },
      btnsData:[{name:"新增模板", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                this.$router.go({path:"/priceDemoc/priceAddc"})
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
  },
  components: {},

}
</script>
