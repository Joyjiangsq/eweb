<template>
    <div :class="[css.formOne, classname, vertical?css.verticalitem:'']">
        <label v-if="labelname" for="" :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget" style="min-width: 200px">
            <checkbx :datas="datas" checkname="name" :read="read" :events="checkEvents" :labelname="lname" :labelkey="lkey" :value.sync="value"></checkbx>
            <div :class="css.errorMsg" v-show="error">
                {{errormsg}}
            </div>
        </div>
    </div>
</template>

<script>
import css from "./formItem.css";
import mixin from "common/mixinForm.js";
import checkbx from "component/checkbox/checkBox";
export default {
  mixins: [mixin],
  props:{
      datas:{
        type:Array,
        default: () => []
      },
      lname:{
        default:"label"
      },
      lkey:{
        default: "id"
      },
      read:{
        default: false
      }
  },
  data: function () {
    return {
      css,
      checkEvents: {
        checkClick: function(c) {
          this.$set("value", c);
          this.$set("error", false);

        }
      }
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {

  },
  components: {checkbx},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;
       this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
    },

    "value": function(){
      this.$dispatch("itemclick", this.value);
    }
  }
}
</script>
