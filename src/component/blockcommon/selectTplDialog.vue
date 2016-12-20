<template>
    <div :class="css.Box">
        <!--类型对话框-->
        <dialog :flag.sync="showTag" title="选择模板"  @dialogclick="dialogClickHandler">
              <div  slot="containerDialog">
                   <div :class="css.tBox">
                      <tb :headercaption="headerCaption"  @radioclick="radioclick" :needindex="false" url="tpl-material-quote" :totals.sync="totals" :load="load" :params="params"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="params.page" :hash="false"></pg>
              </div>
              </div>
        </dialog>
    </div>
</template>

<script>
import dialog from "component/dialog/dialog";
import tb from "component/grid/tableListBase";
import pg from "component/pagination/pagination";
import Utils from "common/Utils.js";
import {showTips} from "actions/index";
import css from "./select.css";
export default {
  props:{
      show: {
          default: false,
          type: Boolean
      },
      url:{
          default:""
      }
  },
  data: function () {
    return {
      css,
      totals: 0,
      params:{page: 1},
      showTag: false,
      headerCaption: [{type: "radio", validateFun:function(d){return d.ItemCode == this.rcheck.ItemCode}},{name:"模板名称", labelValue:"tp_name", type:"data"},
                        {name:"组包名称", labelValue:"package_type",type:"data"},
                        {name:"状态", labelValue:"usableCaption",type:"data",adapterFun: function(d) { return d.usable =="1"? "启用":"停用"}}],
      load: false,
      curData:{}
    }
  },
  computed: {
  },
  ready: function () {
    //   this.$http.get(this.$Api + this.url, {}).then((res)=>{
            

    //   });
  },
  attached: function () {},
  methods: {
      radioclick: function(d) {
          this.curData = d;
      },
      dialogClickHandler: function(d) {
        if(d.action == "confirm") {
            console.log(this.curData);
             if(Object.keys(this.curData).length == 0) {
                showTips(this.$store, {type:"warn", msg:"没有选中任何模板", time: 2000});
             }
             else {
                 this.$dispatch("checkone", this.curData)
                 this.showTag = !this.showTag;
             }
        }
     },
      pagechange: function(d){
            if(!d.page) return false;
            this.params.page = d.page;
            this.load = !this.load;
      },
  },
  components: {dialog, tb, pg},
  watch:{
      "show": function(){
          this.showTag = true;
          this.load = !this.load;
      }
  }
}
</script>
