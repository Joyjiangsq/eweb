<template>
    <tabbar :datas="datas"  @tabclick="tabClickHandler">
      <div v-show="datas[0].show">
            这是类型1
      </div>

      <div  v-show="datas[1].show">
            这是类型2
      </div>
    </tabbar>
</template>

<script>
import tabbar from "component/tab/tabBar"
export default {
  data: function () {
    return {
      datas:[{show: true,  labelName:"类型1", id:1}, {show: false, labelName:"类型2", id:2}]
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    tabClickHandler: function(d){
        console.log(d);
    }
  },
  components: {tabbar}
}
</script>
