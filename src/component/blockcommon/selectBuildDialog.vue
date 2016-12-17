<template>
    <div>
          <dialog :flag.sync="showSelect" title="选择施工项目" @dialogclick="dialogClickHandler">
                <div slot="containerDialog">
                    <div :class="css.leftBox">
                         <div :class="css.leftTitle">施工分类</div>
                         <codeview  url="construction-quote-category" :edit="false" :reload="reload" @treeclick="treeClickHandler" ></codeview>
                    </div>
                    <div :class="css.rightBox">
                      <tb :headercaption="headerCaption" @checklist="checklist" :getchecks="getchecks" :needindex="false" url="construction-quote" :totals.sync="totals" :load="load" :params="searchParams" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="searchParams.page" :hash="false"></pg>
                </div>
          </dialog>
    </div>
</template>

<script>
// 选择施工项目对话框
import codeview from "component/tree/codeView";
import css from "./selectProduct.css";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import dialogtip from "component/dialog/dialogTip";
import dialog from "component/dialog/dialog";
import {showTips} from "actions/index";
export default {
  props:{
    show: {
      type: false,
      default: false
    }
  },
  data: function () {
    return {
      css,
      searchParams:{page: 1},
      showSelect: false,
      getchecks: false,
      totals:0,                 // 表格load结束之后 传递给分页的页数
      load: this.toload,                 // 表格是否加载开关
      headerCaption:[
             {checkbox: true, validateFun: function(d) { return true}},
             {name:"项目编码", labelValue:"_id", type:"data"},
             {name:"项目名称", labelValue:"project_name", type:"data"},
             {name:"工艺说明", labelValue:"description", type:"data"},
             {name:"销售价", labelValue:"selling_price", type:"data"},
             {name:"成本价", labelValue:"cost_price", type:"data"},
             {name:"单位", labelValue:"unit",type:"data"}
      ],
      tableEvents:{
              operatorRender: function(d){
              },
              operatorHandler: function(d){
              }
      }
    }
  },

  computed: {
  },
  created: function(){
  },
  ready: function() {
  },
  attached: function() {},
  methods: {
    dialogClickHandler: function(d) {
        if(d.action == "confirm") {
            this.getchecks = !this.getchecks;
        }
    },
    loadlist: function(){
      this.$set("load", !this.load);
    },
    pagechange: function(d){
        if(!d.page) return false;
        this.searchParams.page = d.page;
        this.loadlist();
    },
    //派发被选中的
    checklist: function(d) {
      if(d.length < 1) {
         showTips(this.$store, {type:"warn", msg:"至少选择一项", time: 2000});
         return false;
      }
      let res = [];
      for(let i = 0; i < d.length; i++) {
          let one = Utils.cloneObj(d[i]);
          res.push(one)
      }
      this.$dispatch("buildconfirm", res); 
      this.showSelect = !this.showSelect;
    },

    treeClickHandler: function(d) {
        this.searchParams = {page: 1};
        let level = d.level*1;
        if(level >=1 ) this.searchParams.lv1_code = d.one.code
        if(level >= 2) this.searchParams.lv2_code = d.sone.code
        if(d.level >= 3) this.searchParams.lv3_code = d.mone.code
        this.loadlist();
    },
  },
  watch: {
    "toload": function(){
        this.loadlist();
    },
    "show": function() {
        this.showSelect = !this.showSelect;
        this.loadlist();
    }
  },
  components: {tb,pagepanel, pg, dialogtip,dialog, codeview},
}
</script>
