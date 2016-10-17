<template>
    <div :class="[css.formOne,css.formOneTwo, classname, vertical?css.verticalitem:'']">
        <label for=""  :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget">
            <combocascade :value.sync="value" @combocase="combocaseClick"></combocascade>
            <input type="text" name="name" :value="detail" v-model="detail" :class="css.casinput" v-if="detailneed"/>
            <div :class="css.errorMsg" v-show="error">
                {{errormsg}}
            </div>
        </div>
    </div>
</template>

<script>
import css from "./formItem.css";
import mixin from "common/mixinForm.js";
import combocascade from "component/combobox/combocascade";
export default {
  mixins: [mixin],
  props:{
    value:{
      default:""
    },
    detail:{
      default:""
    },
    detailneed: {
      default: ""
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
      combocaseClick: function(value) {
          this.$set("error", false);
          // this.$set("value", value);
      }
  },
  components: {combocascade},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;

       if(this.value.split(",").length < 3 && this.must) {
         this.$dispatch("onvalidate", {res:"fail", msg: "请填写好地址"});
         this.$set("errormsg", "请填写好地址");
         this.$set("error", true);
         return false;
       }
       if(this.detailneed) {
         if(!this.detail || this.detail == "") {
           this.$dispatch("onvalidate", {res:"fail", msg: "请填写详细地址"});
           this.$set("errormsg", "请填写详细地址");
           this.$set("error", true);
           return false;
         }
       }
       if(this.value == "") this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
       else {
         this.value += "," + this.detail;
         this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
       }
    }
  }
}
</script>
