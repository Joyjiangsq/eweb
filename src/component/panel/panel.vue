<template>
<div :class="panelCss.panelIn">
  <div :class="[classname, panelCss.panelBox]">
    <div :class="[panelCss.panelTitle,'gradent']">
      <slot name="panelTitle">这是标题</slot>
    </div>
    <div :class="panelCss.panelContainer">
      <slot  name="panelContent">这是panel</slot>
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
