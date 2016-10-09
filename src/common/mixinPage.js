
let pageBase = {
        attached: function(){
            //处理复杂逻辑
            if(this.dealFun) setTimeout(()=>{this.dealFun();});
        },

        methods: {
          resetParams: function(params){
              for (var one in params) {
                params[one] = ""
              }
          }
        }
   }

export default pageBase
