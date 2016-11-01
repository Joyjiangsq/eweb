<template>
      <div class="">
            <span v-if="curStatus == 'no-result'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">没有数据</span>
            <span v-if="curStatus =='loading'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">加载中</span>
            <div v-if="curStatus == 'renderData'">
                    <div :class="css.rowbox" v-for="one in viewData">
                          <div :class="css.rowhead">
                              <icon :classname="css.clicktarget" :iconname="one.show?'icon-down':'icon-right3'" @click="iconClick(one)"></icon>
                              <span :class="css.check">
                                    <checkbx  @checkclick="checkClick(one)"></checkbx>
                              </span>
                              <span :class="css.srow">采购订单号： {{one.U_PurchaseNum}}</span>
                              <span :class="css.srow">采购订单状态： 待采购</span>
                              <span :class="css.srow">供应商：xxx</span>
                          </div>
                          <div :class="css.tbbox" v-show="one.show">
                                <tb :datas="one['sub_orders']" :srcdata="one" :orderid="one.U_PurchaseNum" :ignorevalidate="one.ignorevalidate" :subvalidate="subvalidate" @fail="failHandler" @success="successHandler"></tb>
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
import checkbx from "component/checkbox/checkBox";
import utils from "common/Utils";
export default {
  mixins:[list],
  props:{
    subvalidate: {
      default:false
    }
  },
  data: function () {
    return {
      css,
      viewData:[]
    }
  },
  computed: {},
  ready: function () {

  },
  methods:{
    iconClick: function(one){
        one.show = !one.show
    },
    checkClick: function(one) {
        one.ignorevalidate = !one.ignorevalidate
    },
    successHandler: function(d) {
      console.log(d);
    },
    failHandler : function(d) {
      console.log(d);
      d.show = true;
    },
    adapter: function(datas){
      this.curStatus = 'renderData';
      this.dataList = datas;
      for (var i = 0; i < this.dataList.length; i++) {
          var one = this.dataList[i];
          one.show = false;
          one.ignorevalidate = true;
          this.viewData.push(utils.cloneObj(one));
      }
      // this.dataList =  [{
      //     U_PurchaseNum:Math.random(),
      //     orderList:[{"ItemCode":Math.random(),
      //     "ItemName":"这是产品名称",
      //     // "U_CutAMe":"切角方式",
      //     // "FirmName":"这是二级分类",
      //     // "U_ThreeL":"这是三级分类",
      //     "U_Brand":"这是品牌",
      //     // "U_CardName":"这是供应商",
      //     "U_Modle":"这是型号",
      //     // "U_Series":"这是系列",
      //     "U_MQuality":"这是材质",
      //     "Spec":"这是规格",
      //     "sale_counts":"10", // 销售数量
      //     "SalUnitMsr":"这是单位",
      //     "SalPackUn":3, // 一包的数量
      //     "SalPackMsr":"包装的单位",
      //     "remark":"---xxx",
      //     "stock":11}]
      // },{
      //     U_PurchaseNum:Math.random(),
      //     orderList:[{"ItemCode":Math.random(),
      //     "ItemName":"这是产品名称",
      //     "U_CutAMe":"切角方式",
      //     "FirmName":"这是二级分类",
      //     "U_ThreeL":"这是三级分类",
      //     "U_Brand":"这是品牌",
      //     "U_CardName":"这是供应商",
      //     "U_Modle":"这是型号",
      //     "U_Series":"这是系列",
      //     "U_MQuality":"这是材质",
      //     "Spec":"这是规格",
      //     "SalPackUn":3, // 一包的数量
      //     "SalPackMsr":"包装的单位",
      //     "sale_counts":"10", // 销售数量
      //     "SalUnitMsr":"这是单位",
      //     "remark":"---xxx",
      //     "stock":11}]
      // }]
    }
  },
  attached: function () {},
  components: {icon,tb,checkbx}

}
</script>
