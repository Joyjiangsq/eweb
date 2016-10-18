<template>
    <div :class="tpcss.box">
        <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
          <div v-show="tabArray[0].show" >
                <cizhuantb></cizhuantb>
          </div>

          <div  v-show="tabArray[1].show">
            {{tabArray[1] | json}}
          </div>

          <div  v-show="tabArray[2].show">
            {{tabArray[2] | json}}
          </div>

          <div  v-show="tabArray[3].show">
            {{tabArray[3] | json}}
          </div>

          <div  v-show="tabArray[4].show">
            {{tabArray[4] | json}}
          </div>

          <div  v-show="tabArray[5].show">
            {{tabArray[5] | json}}
          </div>

          <div  v-show="tabArray[6].show">
            {{tabArray[6] | json}}
          </div>
        </tabbar>
    </div>
</template>

<script>
import tabbar from "component/tab/tabBar";
import * as mData from "common/marteriaData.js";
import tpcss from "./type.css";
import cizhuantb from "./tb_cizhuan";
export default {
  props:{
    tabs: {
        default: () => ["cizhuan", "diban", "jieju", "diaoding", "mumen", "chugui", "fucai"]
    }
  },
  data: function () {
    return {
      tpcss,
      index: 0,
      tabArray: [],
      headercaption:[{name:"产品编码", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额",labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"edit"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:""}],
      loadtag: false,
      testData: [{"orderid":"xxx1","name":"家装e站啦啦啦家装e站啦啦啦家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx2","name":"家装e站啦啦啦家装e站啦啦啦家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx3","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx4","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"}],
      tableEvents:{
        operatorRender: function(d){
          return [{action:"delete",icon:"icon-delete"}]
        },
        operatorHandler: function(d){
          console.log(d);
        }
      }
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
    }
  },
  components: {tabbar, cizhuantb}
}
</script>
