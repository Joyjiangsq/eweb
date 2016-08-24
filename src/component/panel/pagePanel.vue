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
    classname:{     // needpadding 左右20px   needtop 上20px  needleft 左20px  needright 右20px
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
