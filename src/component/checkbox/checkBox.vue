<template>
    <div :class="css.checkBox">
        <span v-for="(index, one) in datas" :class='css.checkone' @click="checkClick(index)">
              <icon  iconname="icon-checked" :iconlabel="one.label" v-if="!!one.checked"></icon>
              <icon  iconname="icon-uncheck" :iconlabel="one.label" v-else></icon>
        </span>
    </div>
</template>

<script>
import css from "./checkBox.css";
import icon from "component/sprite/icon";
export default {
  props:{
      datas:{
        type: Array,
        default:[]  // [{label:"足球", id: 1, checked: true}]
      },

      value:{

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
      css
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){
    this.resetValues();
  },
  methods: {
    checkClick: function(index) {
      this.datas[index].checked = !this.datas[index].checked;
      if(this.datas[index][this.labelkey] || this.datas[index][this.labelkey] == 0) this.resetValues();
      else  this.$set("value", this.datas[index].checked);
      this.events.checkClick.call(this._context, this.value);
      console.log(this.value);
    },

    resetValues: function(){
      let vs = [];
      for(var i = 0; i < this.datas.length; i++) {
            if(this.datas[i]["checked"]) vs.push(this.datas[i][this.labelkey]);
      }
      this.$set("value", vs.join(","));
    }
  },
  components: {icon}
}
</script>
