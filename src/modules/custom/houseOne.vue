<template>
    <div :class="css.itemList">
          <div class="" v-for="(index, one) in houselist">
                <span :class="css.titlerow">房屋信息{{index+1}}</span>
                <houseitem :data="one" :startvalidate="startvalidate"></houseitem>
          </div>
          <div :class="css.btnrow">
              <btn  iconname="icon-add" @clickaction="clickaction">新增房屋信息</btn>
          </div>
    </div>
</template>

<script>
import btn from "component/sprite/button";
import houseitem from "./houseItem";
import css from "./house.css";
export default {
  props:{
     houselist:{
       default:function() {
         return [{}]
       }
     },
     startvalidate:{
       default: false
     }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
    setInterval(()=>{
      console.log(JSON.stringify(this.houselist));
    }, 1000);
  },
  attached: function () {},
  methods: {
    clickaction: function(){
        this.houselist.push({});
    }
  },
  components: {houseitem, btn},
  watch:{

  }
}
</script>
