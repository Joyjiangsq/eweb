<template>
  <div :class="portalCss.headerView">

        <div :class="portalCss.logoBox"><img :src="logo" alt="" /><span :class='portalCss.stationName'>{{station_name}}</span></div>
        <div :class="portalCss.headerBars">
              <span :class="portalCss.operator">
                <span  @click="changePasswd"><icon iconname="icon-key" iconlabel="修改密码"></icon></span>
                <span  @click="loginOutAction"><icon iconname="icon-downaction" iconlabel="退出"></icon></span>
              </span>
        </div>

        <!--退出提示-->
        <dialogtip :flag.sync="exitTag" @dialogclick="confirmLogout" msg="你确定退出吗？">

        </dialogtip>
        <!--修改密码-->
        <dialog :flag.sync="flagdep" @dialogclick="dialogclick" title="修改密码">
              <div class="" slot="containerDialog">
                      <formtext labelname="原密码：" inputtype="password" formname='old_passwd' :vertical="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="新密码：" inputtype="password" formname='new_passwd' :vertical="true" :validatestart="validate" @onvalidate="validateHandler" :value.sync="passwd1"></formtext>
                      <formtext labelname="确认密码：" inputtype="password" formname='new_passwd' :vertical="true"   :validatestart="validate" @onvalidate="validateHandler" :value.sync="passwd2" :validatefun="validatePasswd2"></formtext>
              </div>
        </dialog>

        <stip type="error" :msg = "msg"  :flag.sync = "shouTips"></stip>
  </div>


</template>

<script>
import {showTips} from "actions/index";
import portalCss from './portal.css';
import logo from 'asset/img/logo1.png';
import icon from "component/sprite/icon.vue";
import dialogtip from "component/dialog/dialogTip";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import stip from "component/dialog/smallTip";
import storejs from "storejs";
import {getUser} from "stores/getters.js";
import Utils from "common/Utils.js";
export default {
    data(){
      return {
        portalCss,
        logo: logo,
        exitTag: false,
        station_name:"",
        flagdep: false,
        validate: false,
        passwd1:"",
        passwd2:"",
        formData: {},
        formLength:0,
        shouTips: false,
        msg:""
      }
    },
    ready: function(){
        let userInfo = Utils.getUserInfo();
        if(userInfo) this.$set("station_name", userInfo.station_name);
    },
    methods:{
      changePasswd: function(){
          this.$set("flagdep", !this.flagdep);
      },

      loginOutAction: function(){
          this.$set("exitTag", !this.exitTag)
      },

      confirmLogout: function(d) {
          if(d.action == "confirm") {
              this.$set("exitTag", !this.exitTag);
              // Utils.clearUserInfo(); // 改成登出接口   cookie 设置了 httponly  js无法操作cookie了
              this.$http.get(this.$Api + "logout",{}).then((res) => {
                  storejs("userInfo", "");
                  // location.hash="login";
                  this.$router.go({path:"/login"});
              },(error) => {
                    console.log(error);
              })
          }
      },

      validatePasswd2: function() {
        if(this.passwd1 == this.passwd2) return true;
        else return  {res:"fail", msg:"新密码不一致"}
      },

      validateHandler: function(d){
        if(d.res == "success") {
          this.formData[d.name] = d.value;
          this.formLength += 1
        }
        if(this.formLength == 3) {
          this.formLength = 0;
          this.doChange();
        }
      },

      dialogclick: function(d) {
         if(d.action == "confirm") {
              this.$set("validate", !this.validate);

         }
      },

      doChange: function() {
        this.$http.put(this.$Api+"users/change-passwd", this.formData).then((res) => {
              // this.$set("msg", "密码修改成功，即将跳转到登录页面...");
              // this.$set("shouTips", !this.shouTips);
              this.$set("flagdep", !this.flagdep);
              showTips(this.$store, {type:"success", msg:"密码修改成功， 请重新登录"});
              Utils.clearUserInfo();
        }, (error) => {
              this.$set("msg", error.msg);
              this.$set("shouTips", !this.shouTips);
        });
      }
    },
    vuex: {
        getters: {
           user: getUser
         }
    },
    components:{
      icon, dialogtip, dialog, formtext, stip
    }

}
</script>
