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
        return ["beihuo 1dfoiuoiswjfosoif12122","beihudfoiuoiswjfosoifo","beihuodfoiuoiswjfosoif-dfoiuoiswjfosoif---"]
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
