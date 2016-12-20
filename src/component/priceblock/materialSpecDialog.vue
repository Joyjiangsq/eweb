<template>
    <div :class="css.Box">
        <!--个性化选品对话框-->
        <dialog :flag.sync="showTag" title="选择个性化主材">
              <div  slot="containerDialog">
                    <div :class='css.Box'>
                        <tb :heade></tb>
                    </div>
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
import tb from "component/grid/tableListBase";
export default {
  props:{
      show: {
          default: false,
          type: Boolean
      },
      params:{
          default: ()=>{type:"个性化"}
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
      data:[]
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
  components: {dialog, tb},
  watch:{
      "show": function(){
          this.showTag = !this.showTag;
      }
  }
}
</script>
