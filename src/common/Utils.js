import storejs from "storejs";

 let Utils = {
     formate: function(d, pattern){
         if (!d || d == "") return "";
         pattern = pattern || "yyyy-mm-dd HH:MM";
         let str = "";
         str = pattern.replace("yyyy", d.getFullYear());
         str = str.replace("mm", d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1);
         str = str.replace("dd", d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
         str = str.replace("HH", d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
         str = str.replace("MM", d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
         return str;
     },

     setCookie: function(c_name, value, expiredays) {　　　　
         var exdate = new Date();　　　　
         exdate.setDate(exdate.getDate() + expiredays);　　　　
         document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
     },

     getCookie: function(name) {
         var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
         if (arr = document.cookie.match(reg))
             return (arr[2]);
         else
             return null;
     },

     delCookie: function(name){
         var exp = new Date();
         exp.setTime(exp.getTime() - 1);
         var cval = this.getCookie(name);
         console.log(cval);
         if (cval != null)
             document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
     },

     clearUserInfo: function(){
         storejs("userInfo", "");
         this.delCookie("token");
         location.hash="login";
     },
     // 没有权限页面
     reGoNoPower: function() {
        location.hash="forbidden";
     },
     // 获取登录信息
     getUserInfo: function(){
        return storejs("userInfo") || "";
     },
     // 是不是e站
     isEAdmin: function(){
        if(this.getUserInfo().is_jzez) return true
        else return false
     },

     // 获取品类对应中文名
     getCateryCname: function(pinyin){
          var CateDatas = {
              'cizhuan': "瓷砖",
              'diban':"地板",
              'jieju':"洁具",
              'jichengdiaoding': "集成吊顶",
              'men':"门",
              'chugui': "厨柜",
              'shigongfucai':"施工辅材",
              'zhuangxiufucai': "装修辅料"
          }
          if(CateDatas[pinyin]) return CateDatas[pinyin]
          else return "";
     },
     //； 不会深拷贝
     insertArray: function(arr, one ,index) {
        return arr.splice(index, 0, one);
     },
     getStringCase: function(index){
        let res = "";
        for (var i = 0; i < index; i++) {
            let one = String.fromCharCode(97+Math.ceil(Math.random() * 25));
            res+= one;
        }
        return res;
     },
     cloneObj: function(obj){
         console.log(obj);
          var str, newobj = obj.constructor === Array ? [] : {};
          if(typeof obj !== 'object'){
              return;
          } else if(window.JSON){
              str = JSON.stringify(obj), //系列化对象
              newobj = JSON.parse(str); //还原
          } else {
              for(var i in obj){
                  newobj[i] = typeof obj[i] === 'object' ?
                  cloneObj(obj[i]) : obj[i];
              }
          }
          return newobj;
      }
 }

 export default Utils
