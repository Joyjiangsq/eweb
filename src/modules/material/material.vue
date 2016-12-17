<template lang="html">
    <div slot="panelContent">
          <div :class="m.onebox">
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                              <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></div>
                      </div>
                </tabbar>
          </div>
    </div>
</template>

<script>
import tabbar from "component/tab/tabBar.vue";
import Utils from "common/Utils";
import m from "./material.css";
import {allRows} from "config/const"
export default {
  data: function () {
    return {
      m,
      moduleName:"调品规则",
      Utils: Utils,
      tabArray:[],
      curTabIndex:0,

    }
  },
  computed: {},
  ready: function () {
    this.permissionAdapert(this.tabArray);
  },
  attached: function () {},
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
    addSale: function(array) {array.push({labelName:"销售子订单", id: "xiaoshoucom", show:false})},
    addPurchase: function(array) {array.push({labelName:"采购订单", id: "caigou", show:false})},
    addStore: function(array) {array.push({labelName:"备货订单", id: "beihuo", show:false})},
    addSpec: function(array) {array.push({labelName:"定制品", id: "dingzhipin", show:false})},
    addCustom: function(array) {array.push({labelName:"客户数据", id: "kehu", show:false})},
    tabClickHandler: function(){
          this.tabArray[this.curTabIndex]["show"] = false;
          d.data.show = true;
          this.curTabIndex = d.index;
    },
    setFirstTab: function(){
       this.tabArray[0].show = true
    }

  },
  components: {tabbar}
}
</script>
