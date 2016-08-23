<template>
aaa
</template>

<script>
import {setTitle} from "actions/index.js";
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  created: function () {
  },

  route:{
    data: function(){
      setTitle(this.$store, "首页");
    }
  },
  
  methods: {},
  components: {}
}
</script>
