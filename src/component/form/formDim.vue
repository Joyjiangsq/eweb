<template>
    <div :class="[css.formOne, classname, vertical?css.verticalitem:'']">
        <label for="" :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget">
            <searchdim :url="url" :labelname="dimlabel" :placeholder="placeholder" :value="value" @dimclick="dimClick" @valuechange="valuechange"></searchdim>
            <div :class="css.errorMsg" v-show="error">
                {{errormsg}}
            </div>
        </div>
    </div>
</template>

<script>
import css from "./formItem.css";
import searchdim from "component/search/dimSearch";
import mixin from "common/mixinForm.js";
export default {
  mixins: [mixin],
  props:{
    url: {
      type:String,
      default:""
    },
    placeholder:{
      type:String,
      default:""
    },
    dimlabel:{
      type:String,
      default: "name"
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
      dimClick: function(d){
          this.$set("error", false);
          this.$dispatch("fromdim", d);
      },

      valuechange: function(value) {
          this.$set("value", value);
      }
  },
  components: {searchdim},
  watch:{
    "validatestart":function() {

       if(this.watchIgnore) return false;
       if(this.ingnore){
         this.$dispatch("onvalidate", {res:"success", msg: "被忽略的项目"});
         return false;
       }
        // 自定义验证
        if(this.validatefun && typeof(this.validatefun) == "function") {
            let result = this.validatefun.call(this._context, this.value);
            if(result.res == "fail") {
              this.$set("errormsg", result.msg);
              this.$set("error", true);
              return false;
            }
        }
        this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.value, name: this.formname});
    }
  }
}
</script>
