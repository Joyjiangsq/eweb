<template lang="html">
   <pagepanel>
          <div :class="m.onebox">
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                          <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.cname}"></div>
                      </div>
                </tabbar>
          </div>
    </pagepanel>
</template>

<script>
import upgrade from "./upgrade.vue"
import degrade from "./degrade.vue"
import additem from "./addItem.vue"
import reduceitem from "./reduceItem.vue"
import exchange from "./exchange.vue"
import personal from "./personal.vue"
import tabbar from "component/tab/tabBar.vue";
import m from "./material.css";
import basePage from "common/mixinPage.js";
import {allRows} from "config/const";
let  tabData=[{labelName:"升级", show:true, type:"升级",cname:"xx",component: upgrade},
{labelName:"降级", cname:"xxs",show:false, type:"降级",component: degrade},{labelName:"增项",cname:"xxx", show:false, type:"增项",component: additem},
              {labelName:"减项", show:false, type:"减项",cname:"xxh",component: reduceitem},{labelName:"互换",cname:"xxg", show:false, type:"互换",component: exchange},{labelName:"个性化", cname:"xxa", show:false, type:"个性化",component: personal}
              ];
export default {
  mixins:[basePage],
  data(){
    return {
      curTabIndex:0,
      m,
      moduleName:"调品规则",
      tabArray:tabData,          //tab内容初始化
    }
  },
  computed:{},
  ready: function(){},
  methods: {
    //tab点击事件
    tabClickHandler: function(d){
        this.tabArray[this.curTabIndex]["show"] = false;
        d.data.show = true;
        this.curTabIndex = d.index;
    },
  },
  components: {tabbar,upgrade,degrade,additem,reduceitem,exchange,personal}
}
</script>
