<template lang="html">
    <tb :headercaption="headercaption" :loadtag="loadtag" :datas="testData" codevalue="orderid" :events="tableEvents" enterdep="type"></tb>
</template>

<script>
import tb from "component/grid/tableSpec";
export default {
  data: function () {
    return {
      headercaption:[{name:"产品编码", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额",labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"data"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:""}],
      loadtag: false,
      testData: [],
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
  methods: {},
  components: {tb}
}
</script>

<style lang="css">
</style>
