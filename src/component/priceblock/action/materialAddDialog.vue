<template>
    <div>
        <!--增项选择类型对话框-->
        <dialog :flag.sync="showTag" title="选择增项">
              <div  slot="containerDialog">
                    <div>
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
// 增项选择类型对话框
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
              return {type:"增项", page: 1}
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
      showTag: false,
      data:[],
      load: false,
      totals: 0,
      tableEvents:{
              operatorRender: function(d){
                  let btn = [{icon:"icon-add", action:"add", data: d}];
                  for(let i = 0;i < this.datas.length; i++) {
                      if(d._id == this.datas[i]._id) {
                          btn= [];
                          break;
                      }
                  }
                  return btn
              },
              operatorHandler: function(d){
                  if(d.action == "add") {
                        let ndata = Object.assign({}, d.data);
                        ndata.lv_contact_name = ndata.lv_name;
                        ndata.level_n = ndata.lv_level;
                        this.$dispatch("addone",ndata);
                  }
              }
      },
      headercaption:[{type:"operator", name:"操作",icon: true},{name:"增项分类名", labelValue:"lv_name", type:"data"},
                      {name:"增项分编码", labelValue:"lv_code", type:"data"},
                      {name:"e站指导价", labelValue:"rec_price", type:"data"},
                      {name:"分站自营价", labelValue:"self_price", type:"data"}]
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
