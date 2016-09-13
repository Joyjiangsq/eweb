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
                        <div class="subTitle">
                            <span v-if="titleIsArray">
                                <a v-link="one.link" v-for="(index, one) in getTitle">
                                  <span v-if="!index==0">/</span>
                                  {{one.name}}
                                </a>
                            </span>
                            <span v-else> {{getTitle}}</span>

                            <span class='rightClose' @click="closeHandler" v-if="titleIsArray">
                                <icon iconname="icon-close"></icon>
                            </span>
                        </div>
                        <router-view ></router-view>
                        <div class="clear"></div>
                    </div>
              </div>
        </div>
  </div>
</template>

<script>
import headerbox from 'portal/header';
import menus from 'portal/menus';
import foot from 'portal/footer';
import {getTitle} from 'stores/getters';
import icon from "component/sprite/icon";
export default {
  data: function () {
    return {
    }
  },
  computed: {

    titleIsArray: function(){
      return this.getTitle instanceof Array
    }

  },
  
  ready: function () {
    this.$nextTick(function () {
      //  this.$el.querySelector(".app_main_container").style.width = (1-200/window.innerWidth)*100 + "%";
    })
  },
  attached: function () {},
  methods: {
    closeHandler: function(){
       history.back();
    }
  },
  components: {headerbox,menus,foot,icon},
  vuex: {
      getters: {
         getTitle
       }
   }
}
</script>
