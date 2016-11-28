<template >
    <div class="">
          <div class="" v-show="show">
              <div :class="[css[direct], css.tiptip]">
                    <slot></slot>
              </div>
          </div>
    </div>
</template>

<script>
import css from "./tiptip.css";
export default {
  props:{
    direct:{
      default: "right"
    },
    show: {
      default: false
    }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
