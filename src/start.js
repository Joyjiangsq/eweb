// warning: vue-router requires Vue 0.12.10+
require('es6-promise');
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    routerStart
} from 'config/router2';
import {
    config
} from 'config/config';
import {
    sync
} from 'vuex-router-sync';
import VueResource from 'vue-resource';
import store from 'stores/store';
import filter from 'frame/filter';
import directive from 'frame/directive';
import Utils from "common/Utils.js";
import {
    showTips
} from "actions/index";
// install router
Vue.use(VueRouter);
// create router
const router = new VueRouter({
    // history: true,
    hashbang: true,
    saveScrollPosition: true
});
sync(store, router);
routerStart(router);

console.log(process.env.NODE_ENV);
// 全局
Vue.prototype.$Api = config.serverUrl;
// Vue.prototype.$SpecApi = process.env.NODE_ENV == 'dev'? "http://172.20.8.109/" : config.serverUrl;
Vue.prototype.$CodeApi =  process.env.NODE_ENV == 'dev'? "http://172.20.8.109/" : "/";
// 自定义过滤器
new filter().init(Vue)

// 自定义指令
new directive().init(Vue)


// 定义fetch
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

//
// ajax 拦截
Vue.http.interceptors.push(function(request, next) {
    let _self = this;
    next((res) => {
        let d = res.json();
        if (!d.code) d = JSON.parse(d);
        if (d.code == 302) {        // 掉线重定向到登陆页
            Utils.clearUserInfo();
            showTips(_self.$store, {
                type: "error",
                msg: d.msg
            });
            return d
        }
        else if(d.code == 403) {    // 无权限页面
           Utils.reGoNoPower()
           return {}
        }
        else if (d.code != 200) {
            showTips(_self.$store, {
                type: "error",
                msg: d.msg
            });
            return d
        };
    });
});

const App = Vue.extend(require("app.vue"));
router.start(App, '#app');
Vue.config.debug = process.env.NODE_ENV === 'dev';
Vue.config.devtools = process.env.NODE_ENV === 'dev';


// just for debugging
// // window.router = router;
// // if(navigator.userAgent.indexOf("Firefox") != -1) reWriteFun();
// // reWriteFun();
// // let reWriteFun = function(){
//     // alert(1111)
//     var __sto = setTimeout;  
//     alert(111)
// 　　 window.setTimeout = function(callback,timeout,param) {
//     　　var args = Array.prototype.slice.call(arguments,2);  
//     　　var _cb = function() {
//             callback.apply(null,args);  
//         }
// 　　     __sto(_cb,1000);  
// 　　}  
// // }

