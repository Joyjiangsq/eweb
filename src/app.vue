<template>
    <div id="app_view">
          <div class="app_header">
              <headerbox></headerbox>
          </div>
          <div class="app_container">
                <div class="app_left_menus_box">
                      <menus></menus>
                </div>
                <div class="app_main_container">
                      <div class="app_container_in">
                          <router-view></router-view>
                      </div>
                </div>
          </div>
          <div class="app_footer">
                <foot></foot>
          </div>
    </div>
</template>
<script>
import baseCss from "base.css";
import store from 'stores/store';
import headerbox from 'portal/header';
import menus from 'portal/menus';
import foot from 'portal/footer';
// import {getTest} from 'stores/getters'
export default {
    store,
    data(){
      return {

      }
    },

    components: {
      headerbox,menus,foot
    },

    ready(){
      this.$nextTick(function () {
        this.$el.querySelector(".app_container").style.minHeight = window.innerHeight - 120 + "px";
      })
    }
    // vuex: {
    //     getters: {
    //        barsdata: getTest//({commonStore}) => commonStore.text
    //      }
    //  }
}
</script>
