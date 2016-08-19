<template>
  <div :class="protalCss.silderBox">
        <!-- <div :class="protalCss.menuItem">
              <div :class="protalCss.subMenus">
                      <a v-link="'/index'">首页</a>
              </div>
        </div>
        <div :class="protalCss.menuItem">
              <div :class="protalCss.menuTitle">组织管理</div>
              <div :class="protalCss.subMenus">
                      <a v-link="'/userMgr'">用户管理</a>
              </div>
        </div>

        <div :class="protalCss.menuItem">
              <div :class="protalCss.menuTitle">客户管理</div>
              <div :class="protalCss.subMenus">
                      <a v-link="'/customMgr'">客户管理</a>
              </div>
        </div> -->
        <div :class="protalCss.menuItem" v-for="one in datamenu">
              <div :class="protalCss.menuTitle">{{one.name}}</div>
              <div :class="protalCss.subMenus">
                      <a v-link="subone.url"  v-for="subone in one.subMenus">{{subone.name}}</a>
              </div>
        </div>
  </div>
</template>

<script>
import protalCss from './portal.css';

export default {
    data(){
      return {
        protalCss,
        datamenu:[]
      }
    },

    created: function(){
      var demoinfo = {name:"开发文档", subMenus:[{url:"/demo/datepicker",name:"日历"}, {url:"/demo/dialog",name:"对话框"},{url:"/demo/paginate",name:"分页"},
                                              {url:"/demo/datatable",name:"表格"}, {url:"/demo/combobox",name:"下拉"},{url:"/demo/search",name:"查询"}]}
      this.datamenu.push(demoinfo);
    }

}
</script>
