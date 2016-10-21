<template>
    <div>
        <pagepanel direct="bottom">
              <div>
                <search  pathname="" :datas="sdata" :hash="false" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
          <div :class="css.tBox">
            <tb :headercaption="headerCaption" :needindex="false"  :totals.sync="totals" :load="load" :params="searchParams" :datas="testData" :events="tableEvents"></tb>
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
import adapter from "../tbAdapter/jiejuAdapter";
import dialogtip from "component/dialog/dialogTip";
import basetb from "./tbMixins";
export default {
  mixins:[basetb],

  data: function () {
    return {
      css,
      testData:[{ItemCode:"xxx01", ItemName:"xxx洁具", SWW:"主材包", avalibleStores: 22, FirmName:"这是二级分类", U_ThreeL:"这是三级分类", U_Brand:"这是品牌哦", U_CardName:"供应商大卫", U_Modle:"03133",U_Series:"xxoo",U_MQuality:"金子",SalUnitMsr:"个", Spec:"哦，哦，哦，"},
                {ItemCode:"xxx01ww", ItemName:"xxx洁具", SWW:"主材包",avalibleStores: 22, FirmName:"这是二级分类", U_ThreeL:"这是三级分类", U_Brand:"这是品牌哦", U_CardName:"供应商大卫", U_Modle:"031x33",U_Series:"xxwoo",U_MQuality:"金w子",SalUnitMsr:"个w", Spec:"哦w，哦，哦，"}],
    }
  },
  computed: {
    sdata: function(){
      return [{type:"combobox", keyname:"jobname", labelname:"name", keyid:"name", value:"", datas:[], labelcaption:"产品项目："},
              {type:"text",  value:"",  keyname:"brand", labelcaption:"型号:"},
              {type:"text",  value:"",  keyname:"spec", labelcaption:"规格:"},
              {type:"combobox", keyname:"material", labelname:"name", keyid:"name", value:"", datas:[], labelcaption:"材质："},
              {type:"text",  value:"",  keyname:"color", labelcaption:"颜色:"}];

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
