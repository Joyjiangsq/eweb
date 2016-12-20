<template>
    <div :class="css.Box">
        <!--个性化选品对话框-->
        <dialog :flag.sync="showTag" title="选择个性化主材">
              <div  slot="containerDialog">
                    <div :class='css.Box'>
                        <tb :headercaption="headercaption"  :needindex="false" :url="url" :totals.sync="totals" :load="load" :params="params" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="params.page" :hash="false"></pg>
              </div>
              <div class="" slot="footerDialog">

              </div>
        </dialog>
    </div>
</template>

<script>
import dialog from "component/dialog/dialog";
import css from "./type.css";
import Utils from "common/Utils.js";
import pg from "component/pagination/pagination";
import tb from "component/grid/tableListBase";
export default {
  props:{
      show: {
          default: false,
          type: Boolean
      },
      params:{
          default: function() {
              return {type:"个性化", page: 1}
          }
      },
      url:{
          default:"rule-product"
      },
      datas:{
          default: () => []
      }
  },
  data: function () {
    return {
      css,
      showTag: false,
      data:[],
      load: false,
      totals: 0,
      tableEvents:{
              operatorRender: function(d){
                  let btn = [{icon:"icon-add", action:"add", data: d}];
                  for(let i = 0;i < this.datas.length; i++) {
                      if(d.ItemCode == this.datas[i].ItemCode) {
                          btn= [];
                          break;
                      }
                  }
                  return btn
              },
              operatorHandler: function(d){
                  if(d.action == "add") {
                        let ndata = Object.assign({}, d.data);
                        this.$dispatch("addone",ndata);
                  }
              }
      },
      headercaption:[{type:"operator", name:"操作",icon: true},{name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemName", type:"data"},
                      {name:"所属包", labelValue:"SWW", type:"data"},
                      {name:"二级分类", labelValue:"FirmName", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"颜色", labelValue:"U_Colour", type:"data"},
                      {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}]
    }
  },
  computed: {
  },
  ready: function () {
     //self_price
  },
  attached: function () {},
  methods: {
     
  },
  components: {dialog, tb, pg},
  watch:{
      "show": function(){
          this.showTag = !this.showTag;
          this.load = true;
      }
  }
}
</script>
