<template lang="html">
      <div :style="ch">
          <icon iconname="icon-warn" :style="cn"></icon>  您没有权限访问此模块
      </div>
</template>

<script>
import icon from "component/sprite/icon";
import pageBase from "common/mixinPage.js";
export default {
  mixins:[pageBase],
  data: function () {
    return {
      moduleName:"--",
      cn:{
        fontSize: "20px",
        marginRight: "10px"
      },
      ch:{
        textAlign: "center",
        marginTop:"11%",
        color:"gray",
        fontSize: "20px"
      }
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {icon}
}
</script>
