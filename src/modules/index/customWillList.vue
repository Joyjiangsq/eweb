<template lang="html">
      <div class="">
            <div :class="css.listOne" v-for="one in datas">
              最新客户 《拿铁11》
              <span :class='css.date'>2016.06.29</span>
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
        return ["kehu112212 112122","kehu112212","kehu32323----"]
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
