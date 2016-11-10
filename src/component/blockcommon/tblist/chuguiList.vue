<template>
    <div>
        <pagepanel direct="bottom">
              <div>
                <search  pathname="" :datas="sdata" :hash="false" :needsearch="false" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
          <div :class="css.tBox">
            <tb :headercaption="headerCaption" :needindex="false" :url="products"  :totals.sync="totals" :load="load" :params="searchParams" :datas="testData" :events="tableEvents"></tb>
          </div>
          <pg :totals="totals" :curpage="1" :hash="false"  @pagechange="pagechange"></pg>

    </div>
</template>

<script>
import css from "./list.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import adapter from "../tbAdapter/chuguiAdapter";
import dialogtip from "component/dialog/dialogTip";
import basetb from "./tbMixins";
import mdialog from "component/blockcommon/mealDialog";

export default {
  mixins:[basetb],

  data: function () {
    return {
      css,
      name:"厨柜",
      filter:["柜体","门板","五金","配件"],
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
             {name:"门套线类型", labelValue:"U_DLType", type:"data"},
             {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
             {name:"玻璃类型", labelValue:"U_GType", type:"data"},
             {name:"门扇数", labelValue:"U_DLNum", type:"data"},
             {name:"门套线边数", labelValue:"U_DCLNum", type:"data"},
             {name:"单位", labelValue:"SalUnitMsr",type:"data"}
      ],
      searchParams: {ItmsGrpNam:"厨柜"} // 初始查询依据
    }
  },

  ready: function () {
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    },

  },
  components: {search,tb,pagepanel, pg, dialogtip},
}
</script>
