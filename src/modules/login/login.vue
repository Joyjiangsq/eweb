<template>
    <div :class="lCss.loginBox">
          <div :class="lCss.loginIn">
              <div :class="lCss.centerIn">
                  <img :src="logo1" alt="" :class='lCss.logo' />
                  <div :class="lCss.loginForm">
                      <div :class="lCss.loginFormIn">
                            <div :class="lCss.loginFormRow">
                                  <span :class='lCss.loginTitle'>用户登录</span>
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <icon iconname="icon-user" :classname="lCss.iconinfo"></icon>
                                  <input type="text" placeholder="请输入用户名" name="name" :value="userName" v-model="userName">
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <icon iconname="icon-key"  :classname="lCss.iconinfo"></icon>
                                  <input type="password" placeholder="请输入密码" name="name" :value="passwd" v-model="passwd">
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <icon iconname="icon-validate"  :classname="lCss.iconinfo"></icon>
                                  <input type="text" name="code" :class="lCss.codeInput" :value="code" v-model="code">
                                  <img :src="codeSrc" alt="点击更换验证验证码" title="点击更换验证验证码" @click="changeImg" :class='lCss.codeimg' />
                            </div>
                            <div :class="lCss.errorTip" v-show="error">
 -                               {{error}}
-                           </div>
                            <div :class="lCss.loginFormRow">
                                  <checkbx :datas="ckData" :events="checkedEevents"></checkbx>
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <btn btnname="btn-red" @clickaction="clickAction">登录</btn>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
</template>

<script>
import lCss from "./login.css";
import logo1 from "asset/img/logo1.png";
import icon from "component/sprite/icon";
import btn from "component/sprite/button";
import checkbx from "component/checkbox/checkBox";
import {setUser} from "actions/index.js";
import storejs from "storejs";
export default {
  data: function () {
    return {
      lCss,
      codeSrc:"http://172.20.8.109/check-code",
      logo1: logo1,
      ckData:[{label:"记住密码", checked: false}],
      checkedEevents: {
        checkClick: function(checked){
            this.$set("remember", checked);
        }
      },
      userName:storejs("userName") || "jz_123",
      passwd:storejs("passwd") || "123456",
      code: "",
      remember:false,
      error:""
    }
  },
  router:{
    data: function(){
        this.changeImg();
    }
  },
  computed: {
    // codeImg: function() {
    //   return "http://172.20.8.109/check-code";
    // }
  },
  ready: function () {
    if(storejs("userInfo"))  this.$router.go({path:"/index"});
    this.$nextTick(function () {
       this.$el.style.height = window.innerHeight + "px";
    });
    if(this.userName && this.passwd) {
      this.$set("ckData", [{label:"记住密码", checked: true}]);
      this.$set("remember", true);
    }
  },
  attached: function () {},
  methods: {
    changeImg: function(){
       this.$set("codeSrc", "http://172.20.8.109/check-code?v="+Math.random());
    },
    clickAction: function(){
        if(!this.userName || this.userName == "") {
            this.showTips("请填写用户名"); return false;
        }
        else if(!this.passwd || this.passwd == "") {
            this.showTips("请填写密码"); return false;
        }
        else if(!this.code || this.code == "") {
            this.showTips("请填写验证码"); return false;
        }
        // 记住用户名和密码
        if(this.remember) {
           storejs("userName", this.userName); storejs("passwd", this.passwd);
        }
        else {
          storejs("userName", ""); storejs("passwd", "");
        }

        this.loginAction();
    },

    loginAction: function(){
        this.$http.post(this.$Api + "login",{"user_code": this.userName,"passwd": this.passwd, "checkcode": this.code}).then((res) => {
              let d = res.json();
              if(d.code == 200) {
                storejs({"userInfo": d.data});
                setUser(this.$store, d.data);
                this.$router.go({path:"/index"});
              }
              else this.changeImg()
        },(error) => {
              this.changeImg();
              this.showTips(error.msg);
        })
    },
    showTips: function(msg){
          this.$set("error", msg);
          setTimeout(()=>{
                this.$set("error", "");
          }, 2000);
    }
  },
  components: {icon, btn, checkbx}
}
</script>
