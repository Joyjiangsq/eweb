<template>
    <div :class="css.itemList">
          <div class="" v-for="(index, one) in houselist">
                <span :class="css.titlerow">房屋信息{{index+1}}</span>
                <span :class="css.closeone" v-if="houselist.length > 1 && curaction != 'detail'" @click="dealOne(index)"><icon iconname="icon-close"></icon></span>
                <houseitem :data="one" :startvalidate="startvalidate" @errorhp="errorhp" :curaction="curaction"></houseitem>
          </div>
          <div :class="css.btnrow" v-if="curaction != 'detail'">
              <btn  iconname="icon-add" @clickaction="clickaction">新增房屋信息</btn>
          </div>
    </div>
</template>

<script>
import btn from "component/sprite/button";
import houseitem from "./houseItem";
import css from "./house.css";
import icon from "component/sprite/icon";
export default {
  props:{
     houselist:{
       default:function() {
         return [{}]
       }
     },
     startvalidate:{
       default: false
     },
     curaction:{
       default:"edit"
     }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
    clickaction: function(){
        this.houselist.push({});
    },
    dealOne: function(index) {
        this.houselist.splice(index,1);
    },
    errorhp: function(){
      this.$dispatch("errorh")
    }
  },
  components: {houseitem, btn,icon},
  watch:{

  }
}
</script>
