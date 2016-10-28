<template>
    <div :class="css.BoX">
        <pagepanel classname="needpadding" direct="bottom">
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
              <div :class="css.tBox">
                <orderlist :subvalidate="subvalidate" ></orderlist>
              </div>
              <pg :totals="totals" :curpage="searchParams.page" ></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./p.css";
import Utils from "common/Utils.js";
import formcb from "component/form/fmCombobox";
import dialogtip from "component/dialog/dialogTip";
import pageBase from "common/mixinPage.js";
import orderlist from "./purchaseList";
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      subvalidate: false,
      moduleName:"采购订单管理",
      statusData:[{name:"已完成", id:1}],
      btnsData:[{name:"导出", icon:"icon-share", action:"export"},{name:"核价并购买", icon:"icon-check", action:"buy"},{name:"驳回", icon:"icon-back", action:"back"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "buy") {
                  this.subvalidate = !this.subvalidate;
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

    }
  },
  ready: function () {
  },
  attached: function () {},
  methods: {

  },
  components: {formcb,dialogtip, orderlist},
}
</script>
