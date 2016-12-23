<template lang="html">
    <div>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="">
                <tb :headercaption="headercaption" url="project-quote" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>
import dialogtip from "component/dialog/dialogTip";
import pageBase from "common/mixinPage.js";
let headerData =[{name:"报价状态", labelValue:"", type:"data"},{name:"客户编号", labelValue:"", type:"data"},{name:"客户名称", labelValue:"",type:"data"},
                  {name:"业主联系方式", labelValue:"", type:"data"},{name:"业主地址", labelValue:"", type:"data"},{name:"组包选择", labelValue:"", type:"data"},
                  {name:"一口价", labelValue:"", type:"data"},{name:"优惠金额", labelValue:"", type:"data"},{name:"主材个性化金额", labelValue:"", type:"data"},
                  {name:"施工个性化金额", labelValue:"", type:"data"},{name:"报价总金额", labelValue:"", type:"data"},{type:"operator", name:"操作"}];
export default {
  mixins:[pageBase],
  data: function () {
    return {
      moduleName:'预算报价',
      headercaption: headerData,
      searchParams:{page:1},
      totals: 0,
      showFormDialog: false,  // 显示表单对话框
      btnsData:[{name:"新增报价", icon:"icon-add", action:"add"},{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                  this.$router.go({path:"renderprice/addRender"})
            }
            else if(d.action == "export") {
              window.open(this.$Api+"users/download?" + $.param(this.searchParams));
            }
        }
      },
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
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
