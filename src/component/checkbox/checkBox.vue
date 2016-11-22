<template>
    <div :class="css.checkBox">
        <span v-for="(index, one) in inDatas" :class='[css.checkone, one.checked?css.checked : css.unchecked]' @click="checkClick(index)">
              <icon  iconname="icon-checked" :iconlabel="one[labelname]" v-if="!!one.checked"></icon>
              <icon  iconname="icon-uncheck" :iconlabel="one[labelname]" v-else></icon>
        </span>
    </div>
</template>

<script>
import css from "./checkBox.css";
import icon from "component/sprite/icon";
import Utils from "common/Utils";
export default {
  props:{
      datas:{
        type: Array,
        default:function(){
          return [{checked: false}]
        } // [{label:"足球", id: 1, checked: true}]
      },
      read:{
        default: false
      },
      value:{
          default: function() {
            return []
          }
      },

      labelname:{
          type:String,
          default:"label"
      },
      labelkey:{
          type:String,
          default:"id"
      },
      events:{
        type: Object,
        default: function(){
          return {
            checkClick: function(){

            }
          }
        }
      },
      checkname:{
        type: String,
        default:""
      }
  },
  data: function () {
    return {
      css,
      inDatas:[]
    }
  },
  computed: {

  },
  ready: function () {
    // if(typeof(this.value) == "string") {
    //   this.value = [this.value];
    //   setTimeout(()=>{
    //     this.events.checkClick.call(this._context, this.value);
    //     this.$dispatch("checkclick", this.value);
    //   })
    // }
  },
  attached: function () {},
  created: function(){
      this.setRender();
  },
  methods: {
    checkClick: function(index) {
        if(this.read) return false;
        this.inDatas[index].checked = !this.inDatas[index].checked;
        this.resetValues();
        this.events.checkClick.call(this._context, this.value);
        this.$dispatch("checkclick", this.value);
    },

    resetValues: function(){
        let vs = [];
        for(var i = 0; i < this.inDatas.length; i++) {
              if(this.inDatas[i]["checked"]) vs.push(this.inDatas[i][this.labelkey]);
        }
        this.$set("value", vs);
    },

    setRender: function(){
        let keys = []
        let chks = [];
        let valueArr = this.value;
        for(var i = 0; i < this.datas.length; i++) {
            let one = Utils.cloneObj(this.datas[i]);
            chks.push(one);
            if(valueArr.indexOf(one[this.labelkey]) != -1) {
              one.checked = true;
            }
            if(one.checked) {
              keys.push(one[this.labelkey]);
              continue
            }
            one.checked = false;
        }
        this.inDatas = chks;
        // if(keys.length != 0) this.value = keys;
    }
  },
  components: {icon},
  watch:{
    "value": function(){
      console.log(this.value);
      if(typeof(this.value) == "string")  this.value = [this.value];
      else this.setRender();
    }
  }
}
</script>
