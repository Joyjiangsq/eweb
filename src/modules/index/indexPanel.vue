<template>
<div :class="classname">
  <div :class='css.indexPanel'>
      <div :class='css.pheader'>
        <slot name="panelTitle">这是标题</slot>
      </div>
      <div :class='css.pcontent'>
        <slot  name="panelContent">这是panel</slot>
      </div>
  </div>
</div>
</template>

<script>
import css from "./index.css";
export default {
  props:{
    classname: {
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
  attached: function () {
  },
  methods: {},
  components: {}
}
</script>
