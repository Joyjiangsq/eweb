<template>
    <div :class="">
          <tabbar :datas="tabArray"  @tabclick="tabClickHandler">
                <div v-for="(index, one) in tabArray" v-show="one.show">
                      <pm  v-show="index == 0" :datas="curdata.prolist"></pm>
                      <pb v-show="index == 1" :datas="curdata.prolist"></pb>
                </div>
          </tabbar>
    </div>
</template>

<script>
import css from "./price.css";
import tabbar from "component/tab/tabBar";
import pb from "./price_build.vue";
import pm from "./price_material.vue";
export default {
  props:{
    curdata: {
      default: () => {prolist:[]}
    }
  },
  data: function () {
    return {
      css,
      tabArray: [{show: true, labelName:"主材报价"},{show: false, labelName:"施工报价"}],
    }
  },
  computed: {
  },
  ready: function () {
    
  },
  attached: function () {},
  methods: {
    tabClickHandler: function(d) {
       console.log(d);
    }
  },
  components: {tabbar, pb, pm},
  watch:{}
}
</script>
