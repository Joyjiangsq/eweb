<template>
  <div :class="inCss.indexBox">
      <div :class="inCss.indexIn">
        <div :class="inCss.indexLeft">
                <div :class="inCss.levelBox">
                      <div :class="inCss.spcpanelhalf">
                            <tabbar :datas="tabArray"  @tabclick="tabClickHandler" :small="true">
                                  <div :class="inCss.tabone" v-for="(index, one) in tabArray" v-show="one.show">
                                          <span v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></span>
                                  </div>
                            </tabbar>
                      </div>
                      <panel  :classname='inCss.panelhalf'>
                          <div slot="panelTitle">
                                 培训附件
                                 <div :class='inCss.operator'>
                                      <icon iconname="icon-left3"></icon>
                                      <icon iconname="icon-right3"></icon>
                                 </div>
                          </div>
                          <div slot="panelContent">
                            xxxx
                          </div>
                      </panel>
                </div>
        </div>
        <div :class="inCss.indexRight">
                <div :class="inCss.levelBox">
                  <panel :classname='inCss.panelall'>
                      <div slot="panelTitle">
                             公告栏
                             <div :class='inCss.operator'>
                                  <icon iconname="icon-left3"></icon>
                                  <icon iconname="icon-right3"></icon>
                             </div>
                      </div>
                      <div slot="panelContent">
                        xxxx
                      </div>
                  </panel>
                </div>
        </div>
      </div>
  </div>
</template>

<script>
import {setTitle} from "actions/index.js";
import inCss from "./index.css";
import panel from "component/panel/panel";
import icon from "component/sprite/icon.vue";
import tabbar from "component/tab/tabBar.vue";

import saleList from "./saleWillList";
import purchaseList from "./purchaseWillList";
import backWillList from "./backWillStore";
import specWillList from "./specWillList";
import customWillList from "./customWillList";
export default {
  data: function () {
    return {
      inCss,
      curTabIndex:0,
      tabArray:[{labelName:"销售订单", id: "xiaoshoucom", show:false, component: saleList},
                {labelName:"采购订单", id: "caigou", show:false, component: purchaseList},
                {labelName:"备货订单", id: "beihuo", show:false, component: backWillList},
                {labelName:"订制品", id: "dingzhipin", show:false, component: specWillList},
                {labelName:"客户数据", id: "kehu", show:false, component: customWillList}]
    }
  },
  computed: {},
  ready: function () {
    this.$nextTick(function () {
      // console.log(this.$el);
      $("body").css("background-color", "#e6e6e6");
    })
    this.setFirstTab();
  },

  detached(){
      $("body").css("background-color", "white");
  },
  created: function () {

  },

  route:{
    data: function(){
      setTitle(this.$store, "首页");
    }
  },

  methods: {
    tabClickHandler: function(d){
          console.log(d);
          this.tabArray[this.curTabIndex]["show"] = false;
          d.data.show = true;
          this.curTabIndex = d.index;
    },
    setFirstTab: function(){
       this.tabArray[0].show = true
    }
  },
  components: {panel,icon,tabbar}
}
</script>
