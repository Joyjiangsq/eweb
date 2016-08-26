<template>
    <div :class="classname">
        <div :class="[pCss.pagePanel]">
          <slot></slot>
        </div>
    </div>
</template>

<script>
import pCss from "./panel.css";
export default {
  props:{
    classname:{     // needpadding 左右20px 背景    needpaddingnull左右20px
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
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
