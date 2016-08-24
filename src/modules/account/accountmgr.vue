<template>
    <div :class="acCss.accountBox">
        <pagepanel classname="needpadding">
          <div :class="acCss.accountTitleBox">
              <div :class="acCss.accountTitleIn">
                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">账户余额:</div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>15000000</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                </span>

                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">账户余额:</div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>15000000</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                </span>

                <span :class='acCss.itemone'>
                      <div :class="acCss.itemTitle">账户余额:</div>
                      <div :class="acCss.itemBox">
                            <span :class='acCss.cash'>15000000</span>
                            <span :class='acCss.unit'>元</span>
                      </div>
                </span>
              </div>

              <div :class="acCss.searchBox">
                      <search  pathname="/demo/search" :datas="sdata" :events = 'searchEvents'></search>
              </div>
          </div>
        </pagepanel>
        <pagepanel classname="needtop">
              <div class="">导出</div>
              <div :class="acCss.tableIn">
                    <tb :headercaption="headercaption" :loadtag="loadtag" ></tb>
              </div>
        </pagepanel>
    </div>
</template>

<script>
import {setTitle} from "actions";
import acCss from "./account.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
export default {
  data: function () {
    return {
      acCss,
      headercaption:[{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额", labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"data"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:"操作", labelCaption:[{name:"删除", action:"delete"},{name:"编辑",action:"edit"}]}],
      loadtag: false,
      searchEvents:{
        onSearch: function(params) {
            // this.$set("params", params);
            // this.loadtag = !this.loadtag;
        }
      },
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      return [{type:"daterange", keynamestart:"start", keynameend:"end", start:q.start || "", end:q.end || "", labelcaption:"交易日期："}];

    }
  },
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {search,tb,pagepanel},
  route:{
    data: function(){
      setTitle(this.$store, "分站账户管理");
    }
  }
}
</script>
