<template>
    <div :class="tpcss.box">
        <tabbar :datas="tabDatas"  @tabclick="tabClickHandler">
          <div v-show="tabDatas[0].show" >
            <tb :headercaption="headercaption" :loadtag="loadtag" :datas="testData" codevalue="orderid" :events="tableEvents" enterdep="type"></tb>
          </div>

          <div  v-show="tabDatas[1].show">
            {{tabDatas[1] | json}}
          </div>

          <div  v-show="tabDatas[2].show">
            {{tabDatas[2] | json}}
          </div>

          <div  v-show="tabDatas[3].show">
            {{tabDatas[3] | json}}
          </div>

          <div  v-show="tabDatas[4].show">
            {{tabDatas[4] | json}}
          </div>

          <div  v-show="tabDatas[5].show">
            {{tabDatas[5] | json}}
          </div>

          <div  v-show="tabDatas[6].show">
            {{tabDatas[6] | json}}
          </div>
        </tabbar>
    </div>
</template>

<script>
import tabbar from "component/tab/tabBar";
import tb from "component/grid/tableSpec";
import * as mData from "common/marteriaData.js";
import tpcss from "./type.css";
export default {
  data: function () {
    return {
      tpcss,
      tabDatas: mData.barData,
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
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    tabClickHandler: function(d) {

    }
  },
  components: {tabbar, tb}
}
</script>
