<template lang="html">
      <div class="">
            <div :class="css.listOne" v-for="one in datas">
                  {{one}}
            </div>
      </div>
</template>

<script>
import  baselist from "common/mixinList";
import css from "./index.css";
export default {
  mixins:[baselist],
  props:{
    datas:{
      default: function(){
        return ["dingzhipin","dingzhipin11111","dingzhipi--n"]
      }
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

<style lang="css">
</style>
