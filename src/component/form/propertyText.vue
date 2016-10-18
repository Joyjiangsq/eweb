<template>
    <div :class="[pCss.propertyOne, horizontal?pCss.horizontal:'', pCss[type],classname]">
          <span :class="pCss.key">{{key}}：</span>
          <span :class="pCss.value">{{value}}</span>
    </div>
</template>

<script>
import pCss from "./propertyText.css";
export default {
  props:{
    classname:{     // 外部指定样式
      type: String,
      default:""
    },
    type: {
      default:"",
      type:String
    },
    horizontal:{    // 是否是水平排列
      type: Boolean,
      default: false
    },
    key: {
      type: String,
      default:"键"
    },

    value:{
      default:"值"
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
