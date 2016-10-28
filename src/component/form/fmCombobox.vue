<template>
    <div :class="[css.formOne, classname, vertical?css.verticalitem:'']">
        <label for=""  :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget">
            <comb :keyid="keyid" :labelname="keyname" :read="read" :dropfixed="dropfixed" :classname="css.limitCombo" :datas="datas" :value="value" @dropclick="dropclick"></comb>
            <div :class="css.errorMsg" v-show="error">
                {{errormsg}}
            </div>
        </div>
    </div>
</template>

<script>
import css from "./formItem.css";
import mixin from "common/mixinForm.js";
import comb from "component/combobox/combobox";
export default {
  mixins: [mixin],
  props:{
    read:{

    },
    keyid:{     // 月份选择的区间限制的 起始日期
        default:"id"
    },
    keyname:{
        default:"name"
    },
    dropfixed:{
      default:""
    },
    datas: {
      default:[]
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
      dropclick: function(value) {
         this.$set("error", false);
         this.$set("value", value);
         this.$dispatch("cashandler", {name: this.formname, value: value});
      }
  },
  components: {comb},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;
       this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
    },

    "value": function(){
      console.log(this.value);
    }
  }
}
</script>
