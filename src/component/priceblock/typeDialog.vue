<template>
    <div :class="css.Box">
        <!--类型对话框-->
        <dialog :flag.sync="showTag" title="选择分类">
              <div  slot="containerDialog">
                    <div :class='css.checkBox'>
                        <radiobx :datas="data"  @radioclick="radioclick" label="name" :vertical="true"></radiobx>
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
import radiobx from "component/radiobox/radioBox";
import Utils from "common/Utils.js";
export default {
  props:{
      show: {
          default: false,
          type: Boolean
      }
  },
  data: function () {
    return {
      css,
      showTag: false,
      data:[{name:"国民包-瓷砖-大地砖",code:"1,2,3", checked: false},{name:"国民包-瓷砖-小地砖",code:"1,2,4",checked: false}]
    }
  },
  computed: {
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
      radioclick: function(one) {
          console.log(one);
          this.$dispatch("onecheck", one);
          this.showTag = false
      }
  },
  components: {dialog,radiobx},
  watch:{
      "show": function(){
          this.showTag = true;
      }
  }
}
</script>
