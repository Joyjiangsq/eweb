<template>
    <div>
        <!--升级选择类型对话框-->
        <dialog :flag.sync="showTag" title="选择升级项" @dialogclick="dialogClickHandler">
              <div  slot="containerDialog">
                    <div>
                        <tb :headercaption="headercaption"  :needindex="false" @radioclick="radioclick" :url="url" :totals.sync="totals" :load="load" :params="params" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="params.page" :hash="false"></pg>
              </div>
        </dialog>
    </div>
</template>

<script>
// 升级选择类型对话框
import dialog from "component/dialog/dialog";
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
              return {type:"升级", page: 1}
          }
      },
      url:{
          default:"rule-product"
      }
     
  },
  data: function () {
    return {
      showTag: false,
      data:[],
      load: false,
      totals: 0,
      curData:{},
      tableEvents:{
              operatorRender: function(d){
                 
              },
              operatorHandler: function(d){
                 
              }
      },
      headercaption:[{type:"radio"},{name:"调品前材料分类", labelValue:"before_code", type:"data"},{name:"调品前分类名称", labelValue:"before_name", type:"data"},
                  {name:"调品后类别", labelValue:"after_code", type:"data"},{name:"调品后分类名称", labelValue:"after_name", type:"data"},
                  {name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},]
    }
  },
  computed: {
  },
  ready: function () {
     //self_price
  },
  attached: function () {},
  methods: {
      radioclick: function(d) {
          console.log(d);
          this.curData = d;
      },

      dialogClickHandler: function(d) {
          if(d.action == "confirm") {
              let neDate = {
                  lv_code: this.curData.after_code,
                  lv_name: this.curData.after_name,
                  self_price: this.curData.self_price,
                  level_n: this.curData.after_level
              };
              this.$dispatch("onconfirm", neDate, this.curData.before_code);
              this.showTag = !this.showTag;
          }
      }
  },
  components: {dialog, tb, pg},
  watch:{
      "show": function(){
          this.showTag = !this.showTag;
          this.load = true;
      },
      params: {
          deep: true,
          handler: function() {
              console.log(this.params);
          }
      }
  }
}
</script>
