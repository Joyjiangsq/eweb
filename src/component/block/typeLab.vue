<template>
    <div :class="tpcss.box">
        <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
          <div v-show="tabArray[0].show" >
                <cizhuantb @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></cizhuantb>
          </div>

          <div  v-show="tabArray[1].show">
            <dibantb @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></dibantb>
          </div>

          <div  v-show="tabArray[2].show">
            <jiejutb  @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></jiejutb>
          </div>

          <div  v-show="tabArray[3].show">
            <jichengdiaodingtb  @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></jichengdiaodingtb>
          </div>

          <div  v-show="tabArray[4].show">
            {{tabArray[4] | json}}
          </div>

          <div  v-show="tabArray[5].show">
            {{tabArray[5] | json}}
          </div>

          <div  v-show="tabArray[6].show">
            <zhuangxiufucaitb  @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></zhuangxiufucaitb>
          </div>

          <div  v-show="tabArray[7].show">
            <shigongfucaitb  @fail="failHandler" :subvalidate="subvalidate" @success="successHandler"></shigongfucaitb>
          </div>
        </tabbar>
    </div>
</template>

<script>
import tabbar from "component/tab/tabBar";
import * as mData from "common/marteriaData.js";
import tpcss from "./type.css";
import cizhuantb from "./tb_cizhuan";
import dibantb from "./tb_diban";
import jiejutb from "./tb_jieju";

import jichengdiaodingtb from "./tb_jichengdiaoding";
import shigongfucaitb from "./tb_shigongfucai";
import zhuangxiufucaitb from "./tb_zhuangxiufucai";

export default {
  props:{
    tabs: {
        default: () => ["cizhuan", "diban", "jieju", "diaoding", "mumen", "chugui", "zhuangxiufucai", "shigongfucai"]
    },
    startvalidate: {
      default: false
    },
  },
  data: function () {
    return {
      tpcss,
      index: 0, // 记录tab index
      // mapCount:0, // 数据记录器
      subvalidate: false,
      lastDataMap:{},
      tabArray: [{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false}, {show: false}],

    }
  },
  computed: {

  },
  ready: function () {
      // 控制品类的开放和关闭
      this.renderTabs();
  },
  attached: function () {},
  methods: {
    renderTabs: function(){
      this.tabArray = [];
      for (var i in mData.barData) {
          if(this.tabs.indexOf(i) != -1) {
              this.tabArray.push(mData.barData[i])
          }
      }
      this.tabArray[0]["show"] = true;
      return this.tabArray;
    },
    tabClickHandler: function(d) {
        this.tabArray[this.index]["show"] = false;
        d.data.show = true;
        this.index = d.index;
    },

    // 监听几大类项目的验证结果
    failHandler: function(d) {
        // 只要有一个验证失败就不让过
        // 失败之后 重置数据集
        this.lastDataMap = {};
        this.$dispatch("fail", d);
    },
    successHandler: function(d){
      //{project: "cizhuan", data: {list:'', rec_info:""}}
        this.lastDataMap[d.project] = d.data;
        let dataLenth = Object.keys(this.lastDataMap).length;
        console.log(dataLenth);
        if(dataLenth == 6) this.$dispatch("success", this.lastDataMap);
    }
  },
  components: {tabbar, cizhuantb, dibantb, jiejutb,jichengdiaodingtb,shigongfucaitb,zhuangxiufucaitb},
  watch:{
    "startvalidate": function() {
        this.subvalidate = !this.subvalidate;
        this.lastDataMap = {};
    }
  }
}
</script>
