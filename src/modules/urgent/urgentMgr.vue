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
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" :params="searchParams" ></tb>
              </div>
              <pg :totals="totals" :curpage="getCurPage"  @pagechange="pagechange"></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./urgent.css";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
let tableHeaderDatas = [{name:"序号", labelValue:"user_code", type:"data"},
                        {name:"加急卡号", labelValue:"name",type:"data"},
                        {name:"订单金额", labelValue:"roles",type:"data"},
                        {name:"关联采购单号", labelValue:"phone",type:"data"},
                        {name:"购买人", labelValue:"createdBy",type:"data"},
                        {name:"购买时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}},
                        {name:"订单状态", labelValue:"createdBy",type:"data"}]
export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      headercaption:tableHeaderDatas, // 表格头部信息设置
      btnsData:[{name:"申请购买", icon:"icon-share", action:"apply"}],
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
      return [{type:"text",  value:q.urgentId || "",  keyname:"urgentId", labelcaption:"加急订单号:"},
              {type:"text",  value:q.relateId || "",  keyname:"relateId", labelcaption:"关联订单号:"},
              {type:"combobox", keyname:"orderStatus", labelname:"name", keyid:"name", value:q.orderStatus || "", datas:this.statusData, labelcaption:"订单状态:"},
              {type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"购买时间:"}];

    }

  },
  ready: function () {
  },
  attached: function () {},
  methods: {
  },
  components: {btnbar},
  route:{
  }
}
</script>
