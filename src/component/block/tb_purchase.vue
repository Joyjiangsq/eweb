<template lang="html">
    <div class="">
              <tb :headercaption="headercaption" curaction="purchase"  @loadsuccess="oneSuccessHandler" :load="false" :datas="testdata" ></tb>
    </div>
</template>
<script>
// 瓷砖分类
import tb from "component/grid/tableSpec";
import css from "./type.css";
import baseMixins from "./itemMixins";
import adapter from "./tbAdapter/purchaseAdapter";
export default {
  mixins:[baseMixins],
  props:{
    datas:{
      default: ()=> []
    }
  },
  data: function () {
    return {
      css,
      validate:false,
      headercaption:[{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"产品包", labelValue:"SWW", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"avalibleStores",type:"data"},{name:"使用库存数", labelValue:"useStores",type:"edit"},
                    {name:"采购数量", labelValue:"purchaseCounts",type:"edit"},{name:"包装规格", labelValue:"tt",type:"data", adapterFun: function(d) {console.log(d);return d.SalPackUn+d.SalUnitMsr+"/"+d.SalPackMsr}},
                    {name:"转化数量", labelValue:"Quantity",type:"data"},
                    {name:"包装规格", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"remark",type:"data"},
                    ],
      recData:{},
      lastDatas:[],
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  ready: function(){
      for (var i = 0; i < this.datas.length; i++) {
          var one = Object.assign({}, this.datas[i]);
          this.addoneHandler({data:one});
      }
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb},
}
</script>
