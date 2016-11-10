<template lang="html">
    <div class="">
          <div >
            <tb v-if="!detail" :headercaption="headercaption" :curaction="curaction" :detail="detail"  :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <div :class="css.rowBox" v-else>
              <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false"></tbbase>
            </div>
            <formtext labelname="收货人："  :read="true" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' ></formtext>
            <formtext labelname="收货人电话：" :read="true"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' ></formtext>
            <cascadeform  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  :detailv.sync="recdata.detail" ></cascadeform>
            <formtext labelname="备注：" :read="true" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' ></formtext>
          </div>
    </div>
</template>
<script>

// 瓷砖分类
import css from "./type.css";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import baseMixins from "./itemMixins";
import mdialog from "component/blockcommon/mealDialog";
export default {
  mixins:[baseMixins],

  data: function () {
    return {
      css,
      curName:"men",
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
                    {name:"玻璃类型", labelValue:"U_GType", type:"data"},
                    {name:"门套线类型", labelValue:"U_DLType", type:"data"},
                    {name:"门套线边数", labelValue:"U_DCLNum", type:"data"},
                    {name:"门扇数", labelValue:"U_DLNum", type:"data"},
                    {name:"门洞宽", labelValue:"U_DSWide", type:"data"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                    {name:"门洞高", labelValue:"U_DSHigh", type:"data"},
                    {name:"门洞深", labelValue:"U_DSThick", type:"data"},
                    {name:"门扇宽", labelValue:"U_TDWide", type:"data"},
                    {name:"门扇高", labelValue:"U_TDHigh", type:"data"},
                    {name:"门扇厚", labelValue:"U_TDThick", type:"data"},
                    {name:"是否开孔", labelValue:"U_IKeyHole", type:"data"},     // 下拉组件  TODO
                    {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"data"},   // 下拉组件
                    {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"datadata"},        // 下拉组件
                    {name:"开启方式", labelValue:"U_OpenWay", type:"data"},        // 下拉组件 TODO
                    {name:"智能门锁厚度", labelValue:"U_DThick", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度", labelValue:"U_LBLength", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板宽度", labelValue:"U_LBWide", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体档板左右螺丝十字中心孔距", labelValue:"U_AbDis", type:"data", style:{width: '140px'}},
                    {name:"智能门锁锁体档板上下螺丝十字中心孔距", labelValue:"U_UDDis", type:"data", style:{width: '130px'}},
                    {name:"智能门锁门边到锁面板右侧的距离", labelValue:"U_LTRDis", type:"data", style:{width: '130px'}},
                    {name:"智能门锁门锁面板总长度", labelValue:"U_TLLength", type:"data", style:{width: '100px'}},
                    {name:"智能门锁门的类别", labelValue:"U_DType",  type:"data", style:{width: '100px'}},
                    {name:"智能门锁门开向", labelValue:"U_DoorO", type:"data", style:{width: '100px'}},
                    {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"data",style:{width: '100px'}},  //TODO
                    {name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"Quantity",type:"edit"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"},
                    ],
      headerdetail:[{name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
                    {name:"玻璃类型", labelValue:"U_GType", type:"data"},
                    {name:"门套线类型", labelValue:"U_DLType", type:"data"},
                    {name:"门套线边数", labelValue:"U_DCLNum", type:"data"},
                    {name:"门扇数", labelValue:"U_DLNum", type:"data"},
                    {name:"门洞宽", labelValue:"U_DSWide", type:"data"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                    {name:"门洞高", labelValue:"U_DSHigh", type:"data"},
                    {name:"门洞深", labelValue:"U_DSThick", type:"data"},
                    {name:"门扇宽", labelValue:"U_TDWide", type:"data"},
                    {name:"门扇高", labelValue:"U_TDHigh", type:"data"},
                    {name:"门扇厚", labelValue:"U_TDThick", type:"data"},
                    {name:"是否开孔", labelValue:"U_IKeyHole", type:"data"},
                    {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"data"},
                    {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"data"},
                    {name:"开启方式", labelValue:"U_OpenWay", type:"data"},
                    {name:"智能门锁厚度", labelValue:"U_DThick", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度", labelValue:"U_LBLength", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板宽度", labelValue:"U_LBWide", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体档板左右螺丝十字中心孔距", labelValue:"U_AbDis", type:"data", style:{width: '140px'}},
                    {name:"智能门锁锁体档板上下螺丝十字中心孔距", labelValue:"U_UDDis", type:"data", style:{width: '130px'}},
                    {name:"智能门锁门边到锁面板右侧的距离", labelValue:"U_LTRDis", type:"data", style:{width: '130px'}},
                    {name:"智能门锁门锁面板总长度", labelValue:"U_TLLength", type:"data", style:{width: '100px'}},
                    {name:"智能门锁门的类别", labelValue:"U_DType",  type:"data", style:{width: '100px'}},
                    {name:"智能门锁门开向", labelValue:"U_DoorO", type:"data",style:{width: '100px'}},
                    {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"data", style:{width: '100px'}},
                    {name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"使用库存", labelValue:"use_stores",type:"data"},
                    {name:"采购数量", labelValue:"Quantity",type:"data"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
    }
  },
  computed: {
  },
  ready:function(){

  },
  attached: function () {},
  methods: {

  },
  components: {formtext, cascadeform},
}
</script>
