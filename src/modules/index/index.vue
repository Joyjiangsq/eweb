<template>
  <div :class="inCss.indexBox">
      <div :class="inCss.indexIn">
        <div :class="inCss.indexLeft">
                <div :class="inCss.levelBox">
                      <panel >
                          <div slot="panelTitle">
                                 <span :class='inCss.headRow'>
                                   <span :class='inCss.indexTile'><icon iconname="icon-edit"></icon></span>
                                   <span :class='inCss.titleOne'>待办事项 </span>
                                 </span>

                          </div>
                          <div slot="panelContent">
                                <div :class="inCss.oneBox">
                                      <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                                            <div :class="inCss.tabone" v-for="(index, one) in tabArray" v-show="one.show">
                                                    <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></div>
                                            </div>
                                      </tabbar>
                                </div>
                          </div>
                      </panel>
                      <panel>
                          <div slot="panelTitle">
                                 <span :class='inCss.headRow'>
                                   <span :class='inCss.indexTile'><icon iconname="icon-enclosure"></icon></span>
                                   <span :class='inCss.titleOne'>培训附件</span>
                                 </span>
                                 <div :class='inCss.operator'>
                                   <icon iconname="icon-left3"></icon>
                                   <icon iconname="icon-right3"></icon>
                                 </div>
                          </div>
                          <div slot="panelContent">
                            <div :class='inCss.twoBox'>
                                  <a :class="inCss.rowOne" v-for="one in parray" target="_blanck" :href="one.url">
                                      <span :class='inCss.inrow'>{{one.desc}}</span>
                                      <span :class='inCss.date'>{{one.createAt | dateformate 'yyyy/mm/dd'}}</span>
                                  </a>
                            </div>
                          </div>
                      </panel>
                </div>
        </div>
        <div :class="inCss.indexRight">
                <div :class="inCss.levelBox">
                  <panel>
                      <div slot="panelTitle">
                              <span :class='inCss.headRow'>
                                <span :class='inCss.indexTile'><icon iconname="icon-notice"></icon></span>
                                <span :class='inCss.titleOne'>通知公告</span>
                              </span>
                             <div :class='inCss.operator' >
                                  <icon iconname="icon-left3"></icon>
                                  <icon iconname="icon-right3"></icon>
                             </div>
                      </div>
                      <div slot="panelContent">
                        <div :class='inCss.threeBox'>
                            <a :class="inCss.rowOne"  v-for="one in tarray" target="_blanck" :href="one.url">
                              <span :class='inCss.inrow'>{{one.desc}}</span>
                              <span :class='inCss.date'>{{one.createAt | dateformate 'yyyy/mm/dd'}}</span>
                            </a>
                        </div>
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
import panel from "./indexPanel";
import icon from "component/sprite/icon.vue";
import tabbar from "component/tab/tabBar.vue";
import Utils from "common/Utils";
import saleList from "./saleWillList";
import purchaseList from "./purchaseWillList";
import backWillList from "./backWillStore";
import specWillList from "./specWillList";
import customWillList from "./customWillList";
import {allRows} from "config/const";
console.log(allRows);
export default {
  data: function () {
    return {
      inCss,
      curTabIndex:0,
      Utils: Utils,
      tabArray:[],
      parray:[],
      tarray:[]
    }
  },
  computed: {
  },
  ready: function () {
    
    this.setTab();
    console.log('this.tabArrays');
    console.log(this.tabArrays);
    this.$nextTick( () => {
       $("."+this.inCss.twoBox).css("height",(document.body.clientHeight/2 - 125 - 20) +"px");
    })
    this.getStaticDoc();
  },

  route:{
    data: function(){
      setTitle(this.$store, "首页");
    }
  },

  methods: {
    getStaticDoc: function(){
        this.$http.get(this.$Api + "training").then((res)=>{
              let one = res.json();
              this.parray = one.data.docs;
        })

        this.$http.get(this.$Api + "announcement").then((res)=>{
              let one = res.json();
              this.tarray = one.data.docs;
        })
    },
    setTab: function(){
     let tabDatas = this.Utils.getIndexTab();
     console.log(tabDatas);
      for (var i =0; i<tabDatas.length; i++){
        if(tabDatas[i].tab_name=="销售子订单") this.tabArray.push({labelName:"销售子订单", id: "xiaoshoucom", show:false, component: saleList});
        else if(tabDatas[i].tab_name=="采购订单") this.tabArray.push({labelName:"采购订单", id: "caigou", show:false, component: purchaseList});
        else if(tabDatas[i].tab_name=="备货订单") this.tabArray.push({labelName:"备货订单", id: "beihuo", show:false, component: backWillList});
        else if(tabDatas[i].tab_name=="定制品设计") this.tabArray.push({labelName:"定制品设计", id: "dingzhipin", show:false, component: specWillList});
        else if(tabDatas[i].tab_name=="客户数据") this.tabArray.push({labelName:"客户数据", id: "kehu", show:false, component: customWillList});
      }
      this.setFirstTab();
    },
    tabClickHandler: function(d){
      console.log('tabClickHander');
      console.log(d);
      console.log('tabClickHander');
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
