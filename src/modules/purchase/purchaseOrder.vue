<template>
    <div :class="css.BoX">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div class="css.tBox">
                <orderlist></orderlist>
              </div>
              <pg :totals="totals" :curpage="getCurPage"  @pagechange="pagechange"></pg>
        </pagepanel>
    </div>
</template>

<script>
import {setTitle} from "actions";
import css from "./p.css";
import search from "component/search/search";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import dialogtip from "component/dialog/dialogTip";
import {showTips} from "actions/index";
import pageBase from "common/mixinPage.js";
import orderlist from "./purchaseList";
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      statusData:[{name:"已完成", id:1}],
      totals:0,                 // 表格load结束之后 传递给分页的页数
      searchParams: {}, // 初始查询依据
      load: true,                 // 表格是否加载开关
      searchEvents:{                  // 查询回调函数
        onSearch: function(params) {
            // this.$set("params", params);
        }
      },
      btnsData:[{name:"导出", icon:"icon-share", action:"export"},{name:"核价并购买", icon:"icon-check", action:"buy"},{name:"驳回", icon:"icon-back", action:"back"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "apply") {

            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"text",  value:q.purchaseOrder || "",  keyname:"purchaseOrder", labelcaption:"采购订单号:"},
              {type:"text",  value:q.salesOrder || "",  keyname:"salesOrder", labelcaption:"销售订单号:"},
              {type:"combobox", keyname:"orderStatus", labelname:"name", keyid:"name", value:q.orderStatus || "", datas:this.statusData, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"购买时间:"}];

    },

    getCurPage: function(){
      if(this.$route.query.page) return this.$route.query.page
      else return 1
    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
    pagechange: function(d){
        if(!d.page) return false;
        this.searchParams.page = d.page;
        this.loadlist();
    },

    loadlist: function(){
      this.$set("load", !this.load);
    }
  },
  components: {search,pagepanel,btnbar,dialog, pg, formcb,dialogtip, orderlist},
  route:{
    data: function(){
      setTitle(this.$store, "采购订单管理");
      this.pagechange(this.$route.query);
    }
  }
}
</script>
