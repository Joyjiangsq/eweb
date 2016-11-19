<template>
    <div :class="css.tabBox">
        <div :class="css.tabBar">
              <span v-for="(index, one) in datas" @click="oneClickHandler(index,one)" :class="['gradent', css.tabOne, one.show?css.active:'',small?css.smStyle:'']">
                  {{one[labelDep]}}
              </span>
        </div>

        <div :class="css.tabArea">
              <slot></slot>
        </div>
    </div>
</template>

<script>
import css from "./tab.css";
export default {
  props:{
    datas:{
      type: Array,
      default:[]
    },

    labelDep:{
      type:String,
      default: "labelName"
    },
    small: {
      default: false
    },
    idDep:{
      type:String,
      default: "id"
    }
  },
  data: function () {
    return {
      css,
      defaultValue:''
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    oneClickHandler: function(index,d) {
        if(!this.defaultValue || this.defaultValue == '') {
            for (var i = 0; i < this.datas.length; i++) {
                this.datas[i].show = false;
                if(i == index) this.datas[i].show = true;
            }
        }
        else {
          this.datas[this.defaultValue].show = false;
          this.datas[index].show = true;
        }
        this.$set("defaultValue", index);
        this.$dispatch("tabclick", {data: d, index: index});
    }
  },
  components: {}
}
</script>
