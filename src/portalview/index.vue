<template>
  <div id="app_view">
        <div class="app_header">
            <headerbox></headerbox>
        </div>
        <div class="app_left_menus_box">
          <menus></menus>
        </div>
        <div class="app_container">
            <div class="subTitle">
                <span class='curTitle'><icon iconname="icon-home" style="margin-right:4px;"></icon>当前位置： </span>
                <span v-if="titleIsArray">
                    <span v-for="(index, one) in getTitle">
                      <span v-if="index!=0" class='subSplit'>/</span>
                      {{one.name}}
                    </span>
                </span>
                <span v-else> {{getTitle}}</span>
                <span  v-if="titleIsArray" class='backbtn' @click="closeHandler">
                    <icon iconname="icon-back"></icon>
                </span>
            </div>
            <div class="app_container_in">
                  <router-view ></router-view>
            </div>
            <div class="clear"></div>
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
       $("#app_view").css("height",document.body.clientHeight +"px");
       $(".app_container_in").css("height", (document.body.clientHeight - 125) +"px");
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
