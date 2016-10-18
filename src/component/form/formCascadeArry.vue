<template>
    <div :class="[css.formOne,classname, vertical?css.verticalitem:'']">
        <label for=""  :class='css.labelDesc'><span v-if="must" :class="css.must">*</span>{{labelname}}</label>
        <div :class="css.formtarget">
            <div :class="css.casrowone" v-for="(index,addone) in addresses">
                <combocascade :value.sync="addone.value"  @combocase="combocaseClick"></combocascade>
                <input type="text" name="name" :value="addone.detail" v-model="addone.detail" :class="css.casinputArr"/>
                <span v-if="this.addresses.length > 1" :class="css.casclosebtn" @click="removeRow(index)"><icon iconname="icon-close" ></icon></span>
            </div>
            <btn @clickaction="addNew" >新增地址</btn>
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
import btn from "component/sprite/button";
import icon from "component/sprite/icon";
export default {
  mixins: [mixin],
  props:{
    addresses:{
      type: Array,
      default:() => [{value:"", detail:""}]
    },

    value:{
      default:"-"
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
      // setInterval(()=>{
      //   console.log(JSON.stringify(this.addresses));
      // }, 1000)
  },
  attached: function () {},
  methods: {
      removeRow: function(index){
          this.addresses.splice(index,1);
      },
      addNew: function(){
          this.addresses.push({value:"", detail:""});
      },
      combocaseClick: function(value, length) {
          this.$set("error", false);
      },
      checkValue: function(){
          let success = true;
          for (var i = 0; i < this.addresses.length; i++) {
            let one = this.addresses[i];
            if(one.value== "" || !one.value) {success = false; break}
            if(one.detail== "" || !one.detail) {success = false; break}
          }
          return success;
      }
  },
  components: {combocascade,btn, icon},
  watch:{
    "validatestart":function() {
       if(this.watchIgnore) return false;
       if(!this.checkValue()) {
         this.$dispatch("onvalidate", {res:"fail", msg: "地址必须填写完整"});
         this.$set("errormsg", "地址必须填写完整");
         this.$set("error", true);
         return false;
       }
       this.$dispatch("onvalidate", {res:"success", msg: "验证成功", value:this.addresses, name: this.formname});
    }
  }
}
</script>
