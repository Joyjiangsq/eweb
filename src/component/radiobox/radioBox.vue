<template>
    <div :class="css.radio">
        <span v-for="(index, one) in datas" :class='css.radione' @click="radioClick(index)">
              <icon  iconname="icon-radio" :iconlabel="one.label" v-if="!one.checked"></icon>
              <icon  iconname="icon-radio1" :iconlabel="one.label" v-else></icon>
        </span>
    </div>
</template>

<script>
import css from "./radio.css";
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
            radioClick: function(){

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
      checkedIndex:0
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){
    this.resetValues();
  },
  methods: {
    radioClick: function(index) {

      for(var i = 0; i < this.datas.length; i++) {
          this.datas[i]["checked"] = false;
      }

      this.datas[index].checked = true;
      this.resetValues();
    },

    resetValues: function(){
      // console.log(d);

      for(var i = 0; i < this.datas.length; i++) {
          if(this.datas[i]["checked"]) this.$set("value", this.datas[i][this.labelkey]);
      }
      this.events.radioClick.call(this._context, this.value);
      console.log(this.value);
    }
  },
  components: {icon}
}
</script>
