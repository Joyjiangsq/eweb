<template>
    <div :class="[css.formOne,css.formOneTwo, classname, vertical?css.verticalitem:'']">
        <label for=""  :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget">
            <combocascade :pid.sync="pid" :cid.sync="cid" :aid.sync="aid" @combocase="combocaseClick"></combocascade>
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
    pid: {
      default:0
    },

    cid:{
      default:0
    },

    aid:{
      default:0
    },

    value:{
      default:"comboxcas"
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
      css,
      length: 3
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
      combocaseClick: function(value, length) {
          this.$set("error", false);
          this.$set("value", value);
          this.$set("length", length);
      }
  },
  components: {combocascade},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;
       if(this.value == "comboxcas" && this.must) {
         this.$dispatch("onvalidate", {res:"fail", msg: "请选择地址"});
         this.$set("errormsg", "必选选择地址");
         this.$set("error", true);
         return false;
       }
       if(this.value.cid == 0) {
         this.$dispatch("onvalidate", {res:"fail", msg: "请选择城市"});
         this.$set("errormsg", "请选择城市");
         this.$set("error", true);
         return false;
       }
       if(this.value.aid == 0 && this.length == 3) {
         this.$dispatch("onvalidate", {res:"fail", msg: "请选择区县"});
         this.$set("errormsg", "请选择区县");
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
       if(this.value == "comboxcas") {
          this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:"", name: this.formname});
       }
       else {
         this.value.detail = this.detail;
         this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
       }
    }
  }
}
</script>
