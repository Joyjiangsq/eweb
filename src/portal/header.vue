<template>
  <div :class="protalCss.headerView">
        <div :class="protalCss.logoBox"><img :src="logo" alt="" /></div>
        <div :class="protalCss.headerBars">
              <span :class="protalCss.who">欢迎您！分站管理员！</span>
              <span :class="protalCss.operator">
                <span>修改密码</span>
                <span>退出</span>
              </span>
        </div>
  </div>
</template>

<script>
import protalCss from './portal.css';
import logo from 'asset/img/logo.png';
export default {
    data(){
      return {
        protalCss,
        logo: logo
      }
    }

}
</script>
