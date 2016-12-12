<template>
    <div>
          <div :class="css.sBox">
                <search pathname :datas="sdata" :hash="false" :needsearch="false" :events="searchEvents"></search>
              </div>
          <div :class="css.tBox">
            <tb :headercaption="headerCaption" :needindex="false" :url="products" :totals.sync="totals" :load="load" :params="searchParams" :events="tableEvents"></tb>
          </div>
          <pg @pagechange="pagechange" :totals="totals" :curpage.sync="searchParams.page" :hash="false"></pg>

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
import mdialog from "component/blockcommon/mealDialog";
import {getLevelOneTypeByName} from "config/codeMap"
export default {
  data: function () {
    return {
      css,
      twoLevelData:[],   // 二级分类
      threeLevelData:[], // 三级分类
      totals:0,                 // 表格load结束之后 传递给分页的页数
      searchParams: {page: 1}, // 初始查询依据  searchParams: {ItmsGrpNam:"装修辅料"}, // 初始查询依据
      load: this.toload,                 // 表格是否加载开关
      cateLoad: this.toload,             // 分类加载tag
      headerCaption:[
             {type:"operator", name:"", icon: true},
             {name:"产品编码", labelValue:"ItemCode", type:"data"},
             {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"cizhuancc", component:mdialog},
             {name:"所属包", labelValue:"SWW", type:"data"},
             {name:"二级分类", labelValue:"FirmName", type:"data"},
             {name:"品牌", labelValue:"U_Brand", type:"data"},
             {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
              {name:"颜色", labelValue:"U_Colour", type:"data"},
             {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
             {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}
      ],
        tableEvents:{
                operatorRender: function(d){
                },
                operatorHandler: function(d){
                }
        },
        searchEvents:{                  // 查询回调函数
            onSearch: function(params) {
                Object.assign(this.searchParams, params);
                this.searchParams.page = 1;
                this.loadlist();
            }
        },
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
