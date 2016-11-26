<template>
<div :class="[panelCss.panelIn, classname]">
  <div :class="panelCss.panelBox">
    <div :class="[panelCss.panelTitle,'gradent']">
      <slot name="panelTitle"></slot>
    </div>
    <div :class="panelCss.panelContainer">
      <slot  name="panelContent"></slot>
    </div>

    <div :class="panelCss.panelFooter">
      <slot  name="panelFooter"></slot>
    </div>
  </div>
</div>
</template>

<script>
import panelCss from "./panel.css";
export default {
  props:{
    classname: {
      default:""
    }
  },
  data: function () {
    return {
      panelCss
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {
  },
  methods: {},
  components: {}
}
</script>
