<template>
    <div :class="css.Box">
      <pagepanel>
            <parea></parea>
      </pagepanel>
    </div>
</template>

<script>
import pagepanel from "component/panel/pagepanel";
import css from "./price.css";
import Utils from "common/Utils.js";
import parea from "component/priceblock/priceArea";
export default {
  data: function () {
    return {
      css,
     
    }
  },
  computed: {
  },
  ready: function () {
  },
  attached: function () {},
  methods: {

  },
  components: {parea,pagepanel},

}
</script>
