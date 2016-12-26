<template>
    <div :class="">
          <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
                <div v-for="(index, one) in tabArray" v-show="one.show">
                      <div  v-show="index == 0">
                          <pm  :datas="curdata.zc.prolist" :subvalidate = "validate" @msuccess="msuccess"></pm>
                      </div>
                      <div v-show="index == 1" >
                          <pb :datas="curdata.sg.prolist" :subvalidate = "validate" @ssuccess="ssuccess"></pb>
                      </div>
                </div>
          </tabbar>
    </div>
</template>

<script>
import css from "./price.css";
import tabbar from "component/tab/tabBar";
import pb from "./price_build.vue";
import pm from "./price_material.vue";
import Utils from "common/Utils.js";
import {showTips} from "actions/index";
export default {
  props:{
    curdata: {
      default: function() {
         return {sg: {prolist:[]}, zc: {prolist:[]}}
      }
    },
    startvalidate: {
      default: false
    }
  },
  data: function () {
    return {
      css,
      validate: false,
      finalData: {sg: {prolist:[]}, zc: {prolist:[]}},
      tabArray: [{show: true, labelName:"主材报价"},{show: false, labelName:"施工报价"}],
    }
  },
  computed: {
  },
  ready: function () {
    
  },
  attached: function () {},
  methods: {
    tabClickHandler: function(d) {
       console.log(d);
    },

    ssuccess: function(sg) {
        this.finalData.sg.prolist = sg;
    },

    msuccess: function(zc) {
        this.finalData.zc.prolist = zc;
    }
  },
  components: {tabbar, pb, pm},
  watch:{
    startvalidate: function() {
       this.validate = !this.validate;
       let ok = true;
       console.log("----")
       setTimeout(() => {
         // 验证
         for(let i in this.finalData) {
            let pone = this.finalData[i];
            for(let g = 0; g < pone.prolist.length; g++) {
                let one = pone.prolist[g];
                for(let j = 0; j < one.sub_data.sub_list.length; j++) {
                  let item = one.sub_data.sub_list[j];
                  for(let v in item) {
                    if(!item[v]) continue
                    if(!item[v].defCss) continue
                    console.log(item[v]);
                    ok = item[v].validateFun(item, j);
                    if(!ok) break;
                  }
                  if(!ok) break;
                }
                 if(!ok) break;
            }
             if(!ok) break;
         }
         if(!ok) {
            showTips(this.$store, {type:"warn", msg:"数据填写有误，请仔细检查", time: 2000});
         }
         else {
            // 数据格式化
            let oneData = Utils.cloneObj(this.finalData);
            for(let i in oneData) {
                let pone = oneData[i];
                for(let g = 0; g < pone.prolist.length; g++) {
                    let one = pone.prolist[g];
                    for(let j = 0; j < one.sub_data.sub_list.length; j++) {
                      let item = one.sub_data.sub_list[j];
                      for(let v in item) {
                        if(!item[v]) continue
                        if(!item[v].defCss) continue
                        let t = item[v].def || "";
                        item[v] = t;
                      }
                    }
                }
            }
            this.$dispatch("priceok", oneData);
         }
       }, 30)
    }
  }
}
</script>
