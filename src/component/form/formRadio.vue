<template>
    <div :class="[css.formOne, classname, vertical?css.verticalitem:'']">
        <label for="" :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget" style="min-width: 200px">
            <radiobx :datas="datas" checkname="name" :events="checkEvents" :read="read" :defaultkey="value"></radiobx>
            <div :class="css.errorMsg" v-show="error">
                {{errormsg}}
            </div>
        </div>
    </div>
</template>

<script>
import css from "./formItem.css";
import mixin from "common/mixinForm.js";
import radiobx from "component/radiobox/radioBox";
export default {
  mixins: [mixin],
  props:{
      datas:{
        type:Array,
        default: () => []
      },
      read:{
        default: false
      }
  },
  data: function () {
    return {
      css,
      checkEvents: {
        radioClick: function(c) {
          this.$set("value", c);
          this.$set("error", false);
          this.$dispatch("itemclick", c);
        }
      }
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {

  },
  components: {radiobx},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;
       this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
    }
  }
}
</script>
