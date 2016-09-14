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
         if (cval != null)
             document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
     },

     clearUserInfo: function(){
         storejs("userInfo", "");
         this.delCookie("token");
         location.hash="login";
     },

     getUserInfo: function(){
        return storejs("userInfo") || false;
     }
 }

 export default Utils
