<template>
    <div :class="tpcss.box">
        <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
          <div class="" v-for="(index, one) in tabArray">
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'cizhuan'">
                      <div class="" v-if="datamap.cizhuan">
                        <cizhuantb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.cizhuan.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.cizhuan.rec_info"></cizhuantb>
                        <cizhuantb  @fail="failHandler" curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.cizhuan.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.cizhuan.rec_info" v-else></cizhuantb>
                      </div>
                      <cizhuantb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></cizhuantb>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'diban'">
                      <div class="" v-if="datamap.diban">
                        <dibantb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.diban.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.diban.rec_info"></dibantb>
                        <dibantb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.diban.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.diban.rec_info" v-else></dibantb>
                      </div>
                      <dibantb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></dibantb>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'jieju'">
                      <div class="" v-if="datamap.jieju">
                        <jiejutb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.jieju.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.jieju.rec_info"></jiejutb>
                        <jiejutb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.jieju.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.jieju.rec_info" v-else></jiejutb>
                      </div>
                      <jiejutb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></jiejutb>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'jichengdiaoding'">
                      <div class="" v-if="datamap.jichengdiaoding">

                        <jichengdiaodingtb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.jichengdiaoding.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.jichengdiaoding.rec_info"></jichengdiaodingtb>
                        <jichengdiaodingtb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.jichengdiaoding.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.jichengdiaoding.rec_info" v-else></jichengdiaodingtb>
                      </div>
                      <jichengdiaodingtb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></jichengdiaodingtb>
                </div>

                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'men'">
                      <div class="" v-if="datamap.men">
                        <mentb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.men.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.men.rec_info"></mentb>
                        <mentb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.men.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.men.rec_info" v-else></mentb>
                      </div>
                      <mentb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></mentb>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'chugui'">
                      <div class="" v-if="datamap.chugui">
                        <chuguitb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.chugui.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.chugui.rec_info" ></chuguitb>
                        <chuguitb  @fail="failHandler"  curaction="edit"   :subvalidate="subvalidate" :testdata="datamap.chugui.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.chugui.rec_info" v-else></chuguitb>
                      </div>
                      <chuguitb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></chuguitb>
                </div>

                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'zhuangxiufucai'">
                      <div class="" v-if="datamap.zhuangxiufucai">
                        <zhuangxiufucaitb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.zhuangxiufucai.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.zhuangxiufucai.rec_info"></zhuangxiufucaitb>
                        <zhuangxiufucaitb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.zhuangxiufucai.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.zhuangxiufucai.rec_info" v-else></zhuangxiufucaitb>
                      </div>
                      <zhuangxiufucaitb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></zhuangxiufucaitb>
                </div>
                <div v-show="tabArray[index].show"  :class="tpcss.row"  v-if="one.ename == 'shigongfucai'">
                      <div class="" v-if="datamap.shigongfucai">
                        <shigongfucaitb v-if="detail"  @fail="failHandler"  :subvalidate="subvalidate" :testdata="datamap.shigongfucai.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.shigongfucai.rec_info"></shigongfucaitb>
                        <shigongfucaitb  @fail="failHandler"  curaction="edit"  :subvalidate="subvalidate" :testdata="datamap.shigongfucai.sub_orders" :detail="detail"  @success="successHandler" :recdata="datamap.shigongfucai.rec_info" v-else></shigongfucaitb>
                      </div>
                      <shigongfucaitb  @fail="failHandler"  :subvalidate="subvalidate"  @success="successHandler"  v-else></shigongfucaitb>
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
        this.$dispatch("fail");
    },
    successHandler: function(d){
      //{project: "cizhuan", data: {list:'', rec_info:""}}
        this.$dispatch("success", d.data);
    }
  },
  components: {tabbar, cizhuantb, dibantb, jiejutb,mentb, chuguitb, jichengdiaodingtb,shigongfucaitb,zhuangxiufucaitb},
  watch:{
    "startvalidate": function() {
        this.subvalidate = !this.subvalidate;
        this.lastDataMap = {};
    }
  }
}
</script>
