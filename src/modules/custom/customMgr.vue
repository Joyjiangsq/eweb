<template lang="html">
  <div class="css.customBox">
    <pagepanel classname="needpadding" direct="bottom">
          <div :class="css.userSearch">
            <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
          </div>
    </pagepanel>
    <pagepanel>
          <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
          <div class="">
            <tb :headercaption="headercaption" :load="load" :datas="testData" url="" :events="tableEvents"></tb>
          </div>
          <pg :totals="100" ></pg>
    </pagepanel>

  </div>
</template>
<script>
import {setTitle} from "actions";
import css from "./custom.css";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import pg from "component/pagination/pagination";
import search from "component/search/search";
import pageBase from "common/mixinPage.js";
let headerData = [{name:"用户名", labelValue:"type", type:"data"},{name:"角色", labelValue:"orderid",type:"data"},
                  {name:"状态", labelValue:"cash",type:"data", attr:"price"},{name:"创建人", labelValue:"account",type:"data"},
                  {name:"创建时间", labelValue:"name", type:"data"},{type:"operator", name:"操作"}]
export default {
  mixins:[pageBase],
  data: function () {
    return {
      css,
      searchEvents:{          // 查询数据
        onSearch: function(params) {
            // this.$set("params", params);
            // this.loadtag = !this.loadtag;
        }
      },
      headercaption: headerData,
      load: false,
      testData:[{type:"110202222219201", orderid:"卡拉", status: 1},{type:"1102019201", orderid:"卡拉", status:2}],
      tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑", action:"edit",icon:"icon-edit", id:d.id},{name:"详情", action:"detail",icon:"icon-detail", id:""}];
        },

        operatorHandler: function(d){
              console.log(d);
        }
      },
      btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"导出", icon:"icon-share", action:"export"}],
      btnEvents:{
        btnClick: function(d){
              console.log(d);
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.customName || "",  keyname:"customName", labelcaption:"业主姓名:"},
              {type:"text",  value:q.phone || "",  keyname:"phone", labelcaption:"业主联系方式:", property: "phone"},
              {type:"combobox", keyid:"id", value:q.from || "", labelname:"name", keyname:"from", labelcaption:"渠道", datas:[{name:"淘宝", id:1},{name:"门店", id:2}]},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"创建时间:"}];
    }
  },
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {search,pagepanel,btnbar,pg,tb},
  route:{
    data: function(){
      setTitle(this.$store, "客户管理");
    }
  }
}
</script>

<style lang="css">
</style>
