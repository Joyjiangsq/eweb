<template>
      <div class="">
            <span v-if="curStatus == 'no-result'">没有数据</span>
            <span v-if="curStatus =='loading'">加载中</span>
            <div v-if="curStatus == 'renderData'">
                    <div :class="css.rowbox" v-for="one in dataList">
                          <div :class="css.rowhead">
                              <span :class="css.srow">采购订单号： {{one.U_PurchaseNum}}</span>
                              <span :class="css.srow">采购订单状态： 待采购</span>
                              <span :class="css.srow">供应商：xxx</span>
                          </div>
                          <div :class="css.tbbox">
                                <tb :datas="one['orderList']"></tb>
                          </div>
                    </div>
            </div>
      </div>
</template>

<script>
import css from "./p.css";
import list from "common/mixinList";
import tb from "component/block/tb_purchase.vue";
import icon from "component/sprite/icon";
export default {
  mixins:[list],
  props:{

  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
  },
  methods:{
    adapter: function(){
      this.curStatus = 'renderData';
      this.dataList =  [{
          U_PurchaseNum:Math.random(),
          orderList:[{"ItemCode":Math.random(),
          "ItemName":"这是产品名称",
          // "U_CutAMe":"切角方式",
          // "FirmName":"这是二级分类",
          // "U_ThreeL":"这是三级分类",
          "U_Brand":"这是品牌",
          // "U_CardName":"这是供应商",
          "U_Modle":"这是型号",
          // "U_Series":"这是系列",
          "U_MQuality":"这是材质",
          "Spec":"这是规格",
          "sale_counts":"10", // 销售数量
          "SalUnitMsr":"这是单位",
          "SalPackUn":3, // 一包的数量
          "SalPackMsr":"包装的单位",
          "remark":"---xxx",
          "avalibleStores":11}]
      },{
          U_PurchaseNum:Math.random(),
          orderList:[{"ItemCode":Math.random(),
          "ItemName":"这是产品名称",
          "U_CutAMe":"切角方式",
          "FirmName":"这是二级分类",
          "U_ThreeL":"这是三级分类",
          "U_Brand":"这是品牌",
          "U_CardName":"这是供应商",
          "U_Modle":"这是型号",
          "U_Series":"这是系列",
          "U_MQuality":"这是材质",
          "Spec":"这是规格",
          "SalPackUn":3, // 一包的数量
          "SalPackMsr":"包装的单位",
          "sale_counts":"10", // 销售数量
          "SalUnitMsr":"这是单位",
          "remark":"---xxx",
          "avalibleStores":11}]
      }]
    }
  },
  attached: function () {},
  components: {icon,tb}

}
</script>
