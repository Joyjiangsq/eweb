<template>
    <span :class='[classname, iconlabel?"":iconCss.iconfont, iconlabel?"":iconCss[iconname],iconlabel?"": iconCss[attach]]'>
        <span :class='[iconCss.iconfont, iconCss[iconname], iconCss[attach]]'  v-if="iconlabel"></span>
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

    attach:{                          // 附属样式
      type:String,
      default: "small"
    },

    iconlabel:{
      type:String
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
