<template>
    <span :class='iconCss.iconBox'>
        <span :class='[iconCss.icon, iconCss[iconname], iconCss[attach]]'></span>
        <span :class='iconCss.iconlabel' v-show="iconlabel">{{iconlabel}}</span>
    </span>
</template>

<script>
import iconCss from "./icon.css";
export default {
  props:{
    iconname:{
      type:String,
      default: "icon-home"
    },

    attach:{
      type:String,
      default: "small"
    },

    iconlabel:{
      type:String
    }
  },
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
