<template lang="html">
    <div class="">
              <tb :headercaption="pheader" curaction="purchase"   @loadsuccess="oneSuccessHandler" :load="false" :datas="vlist" v-if="!detail"></tb>
              <tb :headercaption="dheader" curaction="purchase"  :load="false" :datas="vlist" v-else></tb>
    </div>
</template>
<script>
// 瓷砖分类
import tb from "component/grid/purchaseTable";
import css from "./type.css";
import baseMixins from "./itemMixins";
import adapter from "./purchaseadapter/purchaseAdapter";
import mdialog from "component/blockcommon/mealDialog";
import Utils from "common/Utils";
export default {
  mixins:[baseMixins],
  props:{
    datas:{
      default: ()=> []
    },
    ignorevalidate:{   // 是否忽略验证
      default: true
    },
    // orderid:{
    //   default:""  // 子订单id
    // },
    srcdata:{  // 数据源 更改状态

    },

  },
  data: function () {
    return {
      css,
      pheader:[{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},{name:"使用库存数", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"U_Pquantity",type:"edit"},
                    {name:"包装规格", labelValue:"pack_spc",type:"data", adapterFun: function(d) {
                        // 地板特殊
                        if(d.ItmsGrpCod == "115") return d.U_PMeasure+d.SalUnitMsr+"/"+(d.SalPackMsr || '')
                        else return d.SalPackUn+d.SalUnitMsr+"/"+(d.SalPackMsr || '')  
                    }},
                    {name:"转化数量", labelValue:"Quantity",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"},
                    ],
    dheader:[{name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"shigongfucaicc", component:mdialog},
                  {name:"产品包", labelValue:"SWW", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                  {name:"型号", labelValue:"U_Modle", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                  {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                  {name:"可用库存量", labelValue:"stock",type:"data"},{name:"使用库存数", labelValue:"use_stores",type:"edit", read: true},
                  {name:"采购数量", labelValue:"U_Pquantity",type:"edit", read: true},
                  {name:"包装规格", labelValue:"pack_spc",type:"data", adapterFun: function(d) {
                      // 地板特殊
                      if(d.ItmsGrpCod == "115") return d.U_PMeasure+d.SalUnitMsr+"/"+(d.SalPackMsr || '')
                      else return d.SalPackUn+d.SalUnitMsr+"/"+(d.SalPackMsr || '')
                  }},
                  {name:"转化数量", labelValue:"Quantity",type:"data"},
                  {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"},
                  ],
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
    },
    // 根据产品编码查询的结果
    oneSuccessHandler: function(d) {
      let one = this.adapterFun(d);
      this.vlist.push(one);
    },
    // 验证列表数据
    validateFun: function(){
        this.validateRec = true;
        if(this.ignorevalidate) return false
        for (var i = 0; i < this.vlist.length; i++) {
          let one = this.vlist[i];
            for(var key in one) {
              if(!one[key]) continue;
              if(typeof(one[key]) == "object") {
                  if(!one[key].validateFun) continue;
                  let res = one[key].validateFun(one, i);
                  if(!res) this.validateRec = false
              }
          }
        }
        console.log(this.srcdata);
        let params = {
            type: this.srcdata.type || "",  // 类型
            U_PurchaseNum:this.srcdata.U_PurchaseNum || "",   // 订单id
            U_ShortName:this.srcdata.station || "",  // 分站编码
            U_SupNum:this.srcdata.U_SupNum || "", // 供应商编码
            WhsCode:this.srcdata.WhsCode || "09", // 仓库
            sub_orders:this.vlist,
            rec_info: this.recdata,
            GroupName:this.srcdata.GroupName || Utils.getUserInfo().GroupName,
            base_info: this.srcdata.base_info || {},
            U_DeWay: this.srcdata.U_DeWay || "PS", //默认配送
            U_FZOrder:this.srcdata.U_FZOrder, //主订单号
            U_EDayD: this.srcdata.U_EDayD,
            // U_AddCode: this.srcdata.U_AddCode // 地址编码 转移到base_info
        }
        if(this.srcdata.U_Enclosure) params["U_Enclosure"] = this.srcdata.U_Enclosure;
        if(!this.validateRec) this.$dispatch("fail",this.srcdata);
        else this.$dispatch("success", params);
    },
    addoneHandler : function(d){
        let one = this.adapterFun(d.data);
        this.vlist.push(one);
    }
  },
  components: {tb},
  watch:{
    "ignorevalidate": function(){
      console.log(this.ignorevalidate);
    }
  }
}
</script>
