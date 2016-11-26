<template>
    <div :class="classname">
        <div :class="pCss.pagePanel">
          <slot></slot>
        </div>
    </div>
</template>

<script>
import pCss from "./panel.css";
export default {
  props:{
    classname:{     //
      type:String,
       default:""
    }
  },
  data: function () {
    return {
      pCss
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
