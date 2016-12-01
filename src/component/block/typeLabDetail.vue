<template>
    <div :class="tpcss.box">
        <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
          <div class="" v-for="(index, one) in tabArray">
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'cizhuan'">
                      <div class="" v-if="datamap.cizhuan">
                        <cizhuantb  @fail="failHandler" curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.cizhuan"   @success="successHandler" ></cizhuantb>
                      </div>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'diban'">
                      <div class="" v-if="datamap.diban">
                        <dibantb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.diban" @success="successHandler"></dibantb>
                      </div>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'jieju'">
                      <div class="" v-if="datamap.jieju">
                        <jiejutb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.jieju"  @success="successHandler" ></jiejutb>
                      </div>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'jichengdiaoding'">
                      <div class="" v-if="datamap.jichengdiaoding">
                        <jichengdiaodingtb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.jichengdiaoding" @success="successHandler" ></jichengdiaodingtb>
                      </div>
                </div>

                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'men'">
                      <div class="" v-if="datamap.men">
                        <mentb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.men" @success="successHandler" ></mentb>
                      </div>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'chugui'">
                        <div class="" v-if="datamap.chugui">
                          <chuguitb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.chugui" @success="successHandler" ></chuguitb>
                        </div>
                </div>

                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'zhuangxiufucai'">
                      <div class="" v-if="datamap.zhuangxiufucai">
                        <zhuangxiufucaitb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.zhuangxiufucai"  @success="successHandler"></zhuangxiufucaitb>
                      </div>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'shigongfucai'">
                      <div class="" v-if="datamap.shigongfucai">
                        <shigongfucaitb  @fail="failHandler"  curaction="alldetail"  :subvalidate="subvalidate" :testdata="datamap.shigongfucai"  @success="successHandler" ></shigongfucaitb>
                      </div>
                </div>
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
import mentb from "./tb_men";
import chuguitb from "./tb_chugui";
import jichengdiaodingtb from "./tb_jichengdiaoding";
import shigongfucaitb from "./tb_shigongfucai";
import zhuangxiufucaitb from "./tb_zhuangxiufucai";
export default {
  props:{
    tabs: {
        default: () => ["cizhuan", "diban", "jieju", "jichengdiaoding", "men", "chugui", "zhuangxiufucai", "shigongfucai"]
    },
    startvalidate: {
      default: false
    },
    datamap:{
      default: function(){
        return {}
      }
    },
    detail:{
      default: false
    }
  },
  data: function () {
    return {
      tpcss,
      index: 0, // 记录tab index
      // mapCount:0, // 数据记录器
      subvalidate: false,
      lastDataMap:{},
      tabTpl:{index:110, ename:""},
      tabArray: [{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false}, {show: false}],
    }
  },
  computed: {

  },

  ready: function () {
    // 控制品类的开放和关闭
    console.log(this.datamap);
    this.renderTabs();
  },
  attached: function () {

  },
  methods: {
    renderTabs: function(){
      this.tabArray = [];
      for (var i in mData.barData) {
          if(this.tabs.indexOf(i) != -1) {
              mData.barData[i].show = false;
              mData.barData[i].ename = i;
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
        // console.log(d);
        this.$dispatch("fail", d);
        var index = this.tabs.indexOf(d.project);
        if(index == -1) return false;
        if(index < this.tabTpl.index) {
            this.tabTpl.index = index;
            this.tabTpl.ename = d.project;
            for (var i = 0; i < this.tabArray.length; i++) {
               var one = this.tabArray[i];
               one.show = false;
               if(one.ename == d.project) {
                 one.show = true;
                 this.index = i;
               }
            }
        }
    },
    successHandler: function(d){
      //{project: "cizhuan", data: {list:'', rec_info:""}}
        console.log(d);
        this.lastDataMap[d.project] = d.data;
        let dataLenth = Object.keys(this.lastDataMap).length;
        console.log(dataLenth);
        if(dataLenth == 8) this.$dispatch("success", this.lastDataMap);
    }
  },
  components: {tabbar, cizhuantb, dibantb, jiejutb,mentb, chuguitb, jichengdiaodingtb,shigongfucaitb,zhuangxiufucaitb},
  watch:{
    "startvalidate": function() {
        this.subvalidate = !this.subvalidate;
        this.tabTpl.index = 100;
        this.lastDataMap = {};
    }
  }
}
</script>
