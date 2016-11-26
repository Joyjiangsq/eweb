<template>
    <span :class='classname'>
        <span :class='[iconCss.iconfont, iconCss[iconname]]'>
        </span>
        <span :class='iconCss.iconlabel' v-if="iconlabel">{{iconlabel}}</span>
    </span>
</template>

<script>
import iconCss from "./icon.css";
export default {
  props:{
    classname:{
        default:""
    },
    iconname:{                        // 图标样式
    },

    iconlabel:{
      // type:String
    }
  },
  data: function () {
    return {
      iconCss
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
