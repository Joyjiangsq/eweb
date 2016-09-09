<template>
  <div :class="portalCss.headerView">
        <div :class="portalCss.logoBox"><img :src="logo" alt="" /></div>
        <div :class="portalCss.headerBars">
              <span :class="portalCss.who">用户名</span>
              <span :class="portalCss.operator">
                <span  @click="changePasswd"><icon iconname="icon-key" iconlabel="修改密码"></icon></span>
                <span  @click="loginOutAction"><icon iconname="icon-downaction" iconlabel="退出"></icon></span>
              </span>
        </div>



        <dialogtip :flag="exitTag" @btnclick="confirmLogout" msg="你确定退出吗？">

        </dialogtip>
  </div>


</template>

<script>
import portalCss from './portal.css';
import logo from 'asset/img/logo.png';
import icon from "component/sprite/icon.vue";
import dialogtip from "component/dialog/dialogTip";
export default {
    data(){
      return {
        portalCss,
        logo: logo,
        exitTag: false
      }
    },
    methods:{
      changePasswd: function(){

      },

      loginOutAction: function(){
        console.log(11);
          this.$set("exitTag", !this.exitTag)
      },

      confirmLogout: function(d) {
          console.log(d);
      }
    },
    components:{
      icon, dialogtip
    }

}
</script>
