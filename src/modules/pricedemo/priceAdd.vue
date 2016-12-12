<template>
    <div :class="epCss.empBox">
       <parea></parea>
    </div>
</template>

<script>

import epCss from "./price.css";
import Utils from "common/Utils.js";
import parea from "component/priceblock/priceArea";
export default {
  data: function () {
    return {
      epCss,
     
    }
  },
  computed: {
  },
  ready: function () {
  },
  attached: function () {},
  methods: {

  },
  components: {parea},

}
</script>
