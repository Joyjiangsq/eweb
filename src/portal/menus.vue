<template>
  <div :class="protalCss.silderBox">
        <div :class="protalCss.menuItem" v-for="one in datamenu">

              <div v-if="one.subMenus" :class="protalCss.menuTitle">
                <icon :iconname="one.icon" :class='protalCss.menuicon'></icon> {{one.name}}  <icon  :class="protalCss.directicon"  iconname="icon-right3"></icon>
              </div>
              <div  :class="protalCss.menuSubAction" v-else>
                    <a v-link="one.url"><icon :class='protalCss.menuicon' :iconname="one.icon"></icon> {{one.name}} <icon :class="protalCss.directicon"  iconname="icon-right3"></icon> </a>
              </div>
              <div :class="protalCss.subMenus" v-show="one.subMenus">
                      <a v-link="subone.url"  v-for="subone in one.subMenus">{{subone.name}}</a>
              </div>
        </div>
  </div>
</template>

<script>
import protalCss from './portal.css';
import icon from "component/sprite/icon";
export default {
    data(){
      return {
        protalCss,
        datamenu:[]
      }
    },

    created: function(){
      this.datamenu.push({name:"首页", url:"/index", icon:"icon-home"});
      var demoinfo = {name:"开发文档", icon:"icon-tip", subMenus:[{url:"/demo/datepicker",name:"日历"}, {url:"/demo/dialog",name:"对话框"},{url:"/demo/paginate",name:"分页"},
                                              {url:"/demo/datatable",name:"表格"}, {url:"/demo/combobox",name:"下拉"},{url:"/demo/search",name:"查询"}]}
      this.datamenu.push(demoinfo);
    },
    components:{
      icon
    }

}
</script>
