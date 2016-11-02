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

          <div :class="css.attachrow">
              <a :href="eclosure" target="_blank" v-if="eclosure">下载附件</a>
              <span :class='css.noattach' v-else>没有附件</span>
          </div>

    </div>
</template>
<script>

// 厨柜分类
import css from "./type.css";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import baseMixins from "./itemMixins";
export default {
  mixins:[baseMixins],
  props:{
    eclosure: {   // 附件特殊字段
      default:""
    }
  },
  data: function () {
    return {
      css,
      curName:"chugui",
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米线（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"Quantity",type:"edit"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Notes",type:"data"}
                    ],
      headerdetail:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleCode", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米线（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"Quantity",type:"edit"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Notes",type:"edit"}
                    ],
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
