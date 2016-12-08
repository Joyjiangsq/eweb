<template>
  <div :class="inCss.indexBox">
      <div :class="inCss.indexIn">
        <div :class="inCss.indexLeft">
                <div :class="inCss.levelBox">
                      <panel >
                          <div slot="panelTitle">
                                 <span :class='inCss.headRow'>
                                   <span :class='inCss.indexTile'><icon iconname="icon-edit"></icon></span>
                                   <span :class='inCss.titleOne'>待办事项</span>
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
                                  <div :class="inCss.rowOne">
                                      <span :class='inCss.inrow'>销售管理操作手册.ppt</span>
                                      <span :class='inCss.date'>2016/06/29</span>
                                  </div>
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
                             <div :class='inCss.operator'>
                                  <icon iconname="icon-left3"></icon>
                                  <icon iconname="icon-right3"></icon>
                             </div>
                      </div>
                      <div slot="panelContent">
                        <div :class='inCss.threeBox'>
                            <div :class="inCss.rowOne">
                              <span :class='inCss.inrow'>分站下单.doc</span>
                              <span :class='inCss.date'>2016/06/29</span>
                            </div>
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
      tabArray:[]
    }
  },
  computed: {
  },
  ready: function () {
    this.$nextTick( () => {
       $("."+this.inCss.twoBox).css("height",(document.body.clientHeight/2 - 125 - 20) +"px");
    })
    this.permissionAdapert(this.tabArray);
  },

  route:{
    data: function(){
      setTitle(this.$store, "首页");
    }
  },

  methods: {
    permissionAdapert: function(arr){
      //allRows 
        let userInfo = this.Utils.getUserInfo();
        let Roles = userInfo.roles;
        let pArray = [];
        for(let i =0; i < allRows.length; i++) {
          let one = allRows[i];
          if(Roles.indexOf(one.name) != -1)  {
            pArray.push(one.permission);
            continue;
          }
        }

        if(pArray.length == 0) return false;
        else {
          let newArray = this.getUnique(pArray)
          console.log(newArray);
          newArray.map((one) => {
              if(one == "sale") this.addSale(arr);
              else if(one == "purchase") this.addPurchase(arr);
              else if(one == "store") this.addStore(arr);
              else if(one == "spec") this.addSpec(arr);
              else if(one == "custom") this.addCustom(arr);
              else {

              }
          })
        }
    },
    getUnique: function(pArray){
      let tpArr = [];
      let resArr = [];
      for(let i = 0; i < pArray.length; i++){
          tpArr = tpArr.concat(pArray[i]);
      }
      tpArr.map((one)=>{
          if(resArr.indexOf(one) == -1) resArr.push(one)
      })
      if(resArr.length != 0) {
        setTimeout(()=>{
          this.setFirstTab();
        }, 30)
      }
      return resArr;
    },
    addSale: function(array) {array.push({labelName:"销售子订单", id: "xiaoshoucom", show:false, component: saleList})},
    addPurchase: function(array) {array.push({labelName:"采购订单", id: "caigou", show:false, component: purchaseList})},
    addStore: function(array) {array.push({labelName:"备货订单", id: "beihuo", show:false, component: backWillList})},
    addSpec: function(array) {array.push({labelName:"定制品", id: "dingzhipin", show:false, component: specWillList})},
    addCustom: function(array) {array.push({labelName:"客户数据", id: "kehu", show:false, component: customWillList})},
    tabClickHandler: function(d){
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
