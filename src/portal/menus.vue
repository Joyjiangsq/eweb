<template>
  <div :class="protalCss.silderBox">
        <div :class="protalCss.menuItem">
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
        </div>
  </div>
</template>

<script>
import protalCss from './portal.css';

export default {
    data(){
      return {
        protalCss
      }
    }

}
</script>
