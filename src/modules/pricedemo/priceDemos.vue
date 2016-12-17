<template>
    <div :class="css.empBox">
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="css.tBox">
                <tb :headercaption="headercaption"  :totals.sync="totals"  :load="load" :params="searchParams" url="tpl-construction-quote" :events="tableEvents"></tb>
              </div>
              <pg :totals="totals" :curpage.sync="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";

import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"模板名称", labelValue:"tp_name", type:"data"},
                        {name:"组包名称", labelValue:"package_type",type:"data"},
                        {name:"状态", labelValue:"usableCaption",type:"data",adapterFun: function(d) { return d.usable =="1"? "启用":"停用"}},
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
            console.log(d);
            let btns = [{name:"修改",action:"edit",icon:"icon-edit", data: d}];
            if(d.usable == "1") btns.push({name:"停用", action:"stop",icon:"icon-forbidden",data:d})
            else btns.push({name:"启用", action:"open",icon:"icon-check",data:d})
            return btns
        },
        operatorHandler: function(d){
            if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
            else if (d.action == "edit") {
                this.$router.go({path:"/priceDemos/priceAdds", query:{id: d.data._id}})
            }
            else if(d.action == "stop") {
                this.changeTpl({_id:d.data._id, usable:"0"})
            }
            else if(d.action == "open") {
                this.changeTpl({_id:d.data._id, usable:"1"})
            }
        }
      },
      btnsData:[{name:"新增模板", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                this.$router.go({path:"/priceDemos/priceAdds"})
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
     changeTpl: function(params) {
         this.$http.put(this.$Api+"tpl-construction-quote", JSON.stringify(params)).then((res)=>{
            this.loadlist();
            this.showMsg("success", "修改成功");
         })
     }
  },
  components: {},

}
</script>
