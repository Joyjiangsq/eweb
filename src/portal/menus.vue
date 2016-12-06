<template>
  <div class="">
    <div :class="portalCss.menuHeaderDesc">
      <div :class="portalCss.descIn">
        <img :src="defimg" alt="">
        <span :class='portalCss.drowItem'>
                              {{userInfo.position || '管理员'}}  | {{userInfo.CardName}}
                          </span>
      </div>
    </div>
    <div :class="portalCss.silderBox">
      <div :class="portalCss.menuItem" v-for="(order, one) in datamenu">
        <div v-if="one.subMenus" :class="portalCss.menuTitle" @click="changeSubBox(one)">
          <icon :iconname="one.icon" :class='portalCss.menuicon'></icon><span> {{one.name}}</span>
          <icon :class="portalCss.directicon" iconname="icon-open" v-if="!one.show"></icon>
          <icon :class="portalCss.directicon" iconname="icon-shrink" v-else></icon>
        </div>
        <div :class="portalCss.menuSubAction" v-else>
          <a v-link="one.url">
            <icon :class='portalCss.menuicon' :iconname="one.icon"></icon> {{one.name}}
            <!-- <icon :class="portalCss.directicon"  iconname="icon-right3"></icon>  -->
          </a>
        </div>
        <div :class="portalCss.subMenus" v-show="one.show">
          <a v-link="subone.url" v-for="subone in one.subMenus">{{subone.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import portalCss from './portal.css';
import icon from "component/sprite/icon";
import {getUser} from "stores/getters.js";
import def from 'asset/img/default.png';
import Utils from "common/Utils";
let staticMenus = [
  {name:"首页", url:"/index", icon:"icon-left-home"},
  {name:"账户管理", url:"/accountmgr", icon:"icon-account"},
  {name:"员工管理", url:"/employee", icon:"icon-staff"},
  {name:"客户管理", url:"/custom", icon:"icon-customer"},
  {name:"销售订单管理", url:"/sale", icon:"icon-sale"},
  {name:"采购管理", icon:"icon-purchase",show: false,subMenus:[{
          url:"/purchase",name:"采购订单管理"
      },{
          url:"/prestore",name:"备货申请"
      },{
          url:"/prestorevalidate",name:"备货审核"
      },{
          name:"加急卡管理", url:"/urgent"
      }]
  },
  {name:"定制品设计管理", url:"/specmgr", icon:"icon-custom-made"},

  {name:"报表管理", url:"/tbmgr", icon:"icon-report"},
  {name:"用户管理", url:"/user", icon:"icon-user-manager"}
]
export default {
    data(){
      return {
        portalCss,
        defimg:def,
        oneArry:[],
        userInfo:Utils.getUserInfo(),
        datamenu: Utils.getUserInfo().menus || staticMenus
      }
    },

    ready: function(){
      let path = this.$route.name;
      for (let i = 0; i < this.datamenu.length; i++) {
            let one = this.datamenu[i];
            if(!one.subMenus || one.subMenus.length == 0) continue;
            let subStr = JSON.stringify(one.subMenus);
            if(subStr.indexOf(path) != -1) {
              one.show = true;
              break;
            }
      }
      var self = this;

      this.datamenu.push({name:"基础数据", icon:"icon-purchase",show: false,subMenus:[{
            url:"/material",name:"材料管理"
        },{
            url:"/materialCatery",name:"材料分类管理"
        },{
            url:"/supplier",name:"供应商数据"
        },{
            url:"/buildMgr",name:"施工报价管理"
        },{
            url:"/buildCatery",name:"施工报价分类管理"
        },{
            url:"/buildPrice",name:"施工包一口价对照表"
        }]
      })
    },

    computed: {
    },
    created: function(){

      // var demoinfo = {name:"开发文档", icon:"icon-tip", subMenus:[{url:"/demo/datepicker",name:"日历"},
      //                                           {url:"/demo/dialog",name:"对话框"},{url:"/demo/paginate",name:"分页"},{url:"/demo/tab",name:"tab"},
      //                                           {url:"/demo/datatable",name:"表格"}, {url:"/demo/combobox",name:"下拉"},  {url:"/demo/filetest",name:"文件上传"},
      //                                           {url:"/demo/search",name:"查询"},{url:"/demo/form",name:"表单"},{url:"/demo/tablesp", name:"手风琴表格"}], show: false}
      // this.datamenu.push(demoinfo);
    },
    methods:{
      changeSubBox: function(one) {
          one.show = !one.show;
      }
    },
    components:{
      icon
    },
    vuex: {
        getters: {
           user: getUser
         }
    }

}
</script>