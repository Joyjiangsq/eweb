<template>
    <div>
          <div :class='css.sBox'>
            <search  pathname="" :datas="sdata" :hash="false" :needsearch="false" :events = 'searchEvents'></search>
          </div>
          <div :class="css.tBox">
            <tb :headercaption="headerCaption" :needindex="false" :url="products"  :totals.sync="totals" :load="load" :params="searchParams" :datas="testData" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :curpage.sync="searchParams.page"  :hash="false"  @pagechange="pagechange"></pg>

    </div>
</template>

<script>
import css from "./list.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import dialogtip from "component/dialog/dialogTip";
import basetb from "./tbMixins";
import mdialog from "component/blockcommon/mealDialog";

export default {
  mixins:[basetb],

  data: function () {
    return {
      css,
      name:"厨柜",
      filter:["柜体","门板","五金","配件（厨柜）"],
      headerCaption:[
             {type:"operator", name:"", icon: true},{name:"二级分类", labelValue:"FirmName", type:"data"},
             {name:"三级分类", labelValue:"U_ThreeL", type:"data"},
             {name:"产品编码", labelValue:"ItemCode", type:"data"},
             {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"chuguicc", component:mdialog},
             {name:"所属包", labelValue:"SWW", type:"data"},
             {name:"品牌", labelValue:"U_Brand", type:"data"},
             {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
             {name:"产品规格", labelValue:"Spec", type:"data"},
             {name:"颜色", labelValue:"U_Colour", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
             {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
             {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
             {name:"门型", labelValue:"U_DType", type:"data"},
             {name:"单位", labelValue:"SalUnitMsr",type:"data"}
      ],
    }
  },

  ready: function () {
  },
  attached: function () {},
  methods: {
  },
  components: {search,tb,pagepanel, pg, dialogtip},
}
</script>
