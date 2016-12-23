<template>
    <div>
           <!--选品对话框-->
          <dialog :flag.sync="showSelect" title="选品" @dialogclick="dialogClickHandler">
                <div slot="containerDialog">
                    <div :class="css.sBox">
                          <search pathname :datas="sdata" :hash="false" :needsearch="false" :adapter="adapterSearch" :events="searchEvents"></search>
                        </div>
                    <div :class="css.tBox">
                      <tb :headercaption="headerCaption" @checklist="checklist" :getchecks="getchecks" :needindex="false" url="material/select-product-list" :totals.sync="totals" :load="load" :params="searchParams" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="searchParams.page" :hash="false"></pg>
                </div>
          </dialog>
    </div>
</template>

<script>
// 选品对话框  全部条件选品
import css from "./selectProduct.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import dialogtip from "component/dialog/dialogTip";
import mdialog from "component/blockcommon/mealDialog";
// import {getLevelOneTypeByName} from "config/codeMap";
import {codeData} from "common/marteriaData";
import dialog from "component/dialog/dialog";
console.log(codeData);
export default {
  props:{
    show: {
      type: false,
      default: false
    },
    params:{
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      css,
      showSelect: false,
      codeData: codeData,
      adapterSearch: false,
      getchecks: false,
      twoLevelData:[],   // 二级分类
      twoLevel: "",
      threeLevelData:[], // 三级分类
      totals:0,                 // 表格load结束之后 传递给分页的页数
      searchParams: {page: 1}, // 初始查询依据  searchParams: {ItmsGrpNam:"装修辅料"}, // 初始查询依据
      load: this.toload,                 // 表格是否加载开关
      cateLoad: this.toload,             // 分类加载tag
      headerCaption:[
             {checkbox: true, validateFun: function(d) { return true}},
             {name:"产品编码", labelValue:"ItemCode", type:"data"},
             {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"cizhuancc", component:mdialog},
             {name:"所属包", labelValue:"SWW", type:"data"},
             {name:"二级分类", labelValue:"FirmName", type:"data"},
             {name:"品牌", labelValue:"U_Brand", type:"data"},
             {name:"型号", labelValue:"U_Modle", type:"data"},
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
                Object.assign(this.searchParams, params, this.params);
                this.searchParams.page = 1;
                this.loadlist();
            },
            adapterSearch: function(params) {
                 params.FirmCode = "";
                params.Code = "";
            }
      },
    }
  },

  computed: {
    sdata: function() {
      return [
              {type:"combobox", keyname:"ItmsGrpCod", labelname:"label", datas: codeData, keyid:"code", value:"", labelcaption:"一级分类：", validaFor: function(d){
                  this.getLevelData(d.code)
              }, fun: true},
              {type:"combobox", keyname:"FirmCode", labelname:"name", datas: this.twoLevelData, keyid:"code", value: this.twoLevel, labelcaption:"二级分类："},
              {type:"combobox", keyname:"Code", labelname:"name", keyid:"code", datas: this.threeLevelData, labelcaption:"三级分类："},
              {type:"text",  value:"",  keyname:"ItemName", labelcaption:"产品名称:"},
              {type:"text",  value:"",  keyname:"U_Modle", labelcaption:"型号:"},
              {type:"text",  value:"",  keyname:"Spec", labelcaption:"规格:"},
              {type:"text",  value:"",  keyname:"U_Brand", labelcaption:"品牌:"},
              {type:"text",  value:"",  keyname:"U_Series", labelcaption:"系列:"},
              {type:"text",  value:"",  keyname:"U_MQuality", labelcaption:"材质:"},
              {type:"text",  value:"",  keyname:"U_colour", labelcaption:"颜色:"}]
    }
  },
  created: function(){
    // this.searchParams.ItmsGrpCod = this.getLevelOneTypeByName(this.name);
  },
  ready: function() {
  },
  attached: function() {},
  methods: {
    dialogClickHandler: function(d) {
        if(d.action == "confirm") {
            this.getchecks = !this.getchecks;
        }
    },
    getLevelData: function(code){
        this.$http.get(this.$Api + "products/firms", {params:{ItmsGrpCod: code}}).then((res)=>{
              let d = res.json().data[0];
              this.twoLevelData = d.firms;
              this.threeLevelData = [];
              for (var i = 0; i < d.firms.length; i++) {
                let one = d.firms[i];
                this.threeLevelData = one.next_firms.concat(this.threeLevelData);
              }
              // 重置二三级分类查询条件
              this.searchParams.FirmCode = "";
              this.searchParams.Code = "";
              this.adapterSearch = !this.adapterSearch;
        }, (e)=>{

        });
    },
    loadlist: function(){
      this.$set("load", !this.load);
    },
    pagechange: function(d){
        if(!d.page) return false;
        this.searchParams.page = d.page;
        this.loadlist();
    },
    //派发被选中的
    checklist: function(d) {
      this.$dispatch("getcheck", d); 
    }
  },
  watch: {
    "toload": function(){
        this.loadlist();
        if(this.twoLevelData.length == 0) {
            this.getLevelData();
        }
    },
    "show": function() {
        this.showSelect = !this.showSelect;
        this.loadlist();
    }
  },
  components: {search,tb,pagepanel, pg, dialogtip,dialog},
}
</script>
