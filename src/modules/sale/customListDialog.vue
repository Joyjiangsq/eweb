<template lang="html">
  <dialog :flag="contr" title="选择客户地址">
        <div class="" slot="containerDialog">
              <div :class="css.rowItem" v-for="one in datas">
                    <div @click="oneClickHandler(one)">{{one.Address}}</div>
              </div>
        </div>
  </dialog>
</template>

<script>
import dialog from "component/dialog/dialog";
import css from "./sale.css";
export default {
  props:{
      datas:{
        default: function(){
          return [
          ]
        }
      },

      show:{
        default: false
      }
  },
  data: function () {
    return {
       css,
       contr: false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    oneClickHandler: function(one){
          this.show = !this.show;
          this.$dispatch("onecheck", one);
    }
  },
  components: {dialog},
  watch:{
    "show": function(){
      console.log(11);
        this.contr = !this.contr
      }
  }
}
</script>
