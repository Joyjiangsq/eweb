<template>
    <div>
           <!--根据类型选品对话框-->
          <dialog :flag.sync="showSelect" title="选品" @dialogclick="dialogClickHandler">
                <div slot="containerDialog">
                    <div :class="css.sBox">
                          <search pathname :datas="sdata" :hash="false" :needsearch="false"  :events="searchEvents"></search>
                        </div>
                    <div :class="css.tBox">{{params | json}}
                      <tb :headercaption="headerCaption" @checklist="checklist" :getchecks="getchecks" :needindex="false" url="material" :totals.sync="totals" :load="load" :params="params" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="params.page" :hash="false"></pg>
                </div>
          </dialog>
    </div>
</template>
<script> 
import css from "./selectProduct.css";
import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import mdialog from "component/blockcommon/mealDialog";
import dialog from "component/dialog/dialog";
    export default {
            props:{
                params: {
                    default:function() {return {page:1}}
                },
                toload:{
                    default: false // 控制加载开关
                },
                show:{
                    default: false
                }
            },
            data: function() {
                return {
                     css,
                     totals: 0,
                     showSelect: false,
                     searchEvents:{
                        onSearch: function(params) {
                            
                        }
                     },
                     headerCaption: [{name:"产品编码", labelValue:"ItemCode", type:"data"},
                                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"cizhuancc", component:mdialog},
                                    {name:"所属包", labelValue:"SWW", type:"data"},
                                    {name:"二级分类", labelValue:"FirmName", type:"data"},
                                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}],
                     load: false
                }
            },
            computed: {
                sdata: function() {
                    return [{type:"text",  value:"",  keyname:"ItemName", labelcaption:"产品名称:"}];
                }
            },
            ready: function() {
            },
            components:{search,tb,pg,dialog},
            methods:{
                checklist: function(list) {

                },

                loadList: function() {
                    this.load = !this.load;
                },
                pagechange: function(d){
                    if(!d.page) return false;
                    this.searchParams.page = d.page;
                    this.loadList();
                },
                dialogClickHandler: function() {

                }
            },
            watch: {
                "show": function() {
                    this.showSelect = !this.showSelect;
                },
                "toload": function() {
                    console.log("aaaa");
                    this.loadList();
                }
            }
    }
</script>