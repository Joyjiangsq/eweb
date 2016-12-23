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
    this.$nextTick( () => {
       $("."+this.inCss.twoBox).css("height",(document.body.clientHeight/2 - 125 - 20) +"px");
    })
    this.permissionAdapert(this.tabArray);
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
    permissionAdapert: function(arr){
      //allRows 
        let userInfo = this.Utils.getUserInfo();
        let Roles = userInfo.roles;                      //=> [0:'分站管理员']
        let pArray = [];
        for(let i =0; i < allRows.length; i++) {
          let one = allRows[i];
          if(Roles.indexOf(one.name) != -1)  {          //=> 有权限
            pArray.push(one.permission);                //one.permission=>  [o:'sale',1:'purchase',2:'store',3:'spec',4:'custom']
            continue;
          }
        }
        if(pArray.length == 0) return false;
        else {
          let newArray = this.getUnique(pArray)
          console.log(newArray);                        //newArray=>  [o:'sale',1:'purchase',2:'store',3:'spec',4:'custom']
          newArray.map((one) => {
              if(one == "sale") this.addSale(arr);      //arr=> {labelName:"销售子订单", id: "xiaoshoucom", show:false, component: saleList}
              else if(one == "purchase") this.addPurchase(arr);
              else if(one == "store") this.addStore(arr);
              else if(one == "spec") this.addSpec(arr);
              else if(one == "custom") this.addCustom(arr);
              else {

              }
          })
        }
    },
    getUnique: function(pArray){                        //=>
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
    addSpec: function(array) {array.push({labelName:"定制品设计", id: "dingzhipin", show:false, component: specWillList})},
    addCustom: function(array) {array.push({labelName:"客户数据", id: "kehu", show:false, component: customWillList})},
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
