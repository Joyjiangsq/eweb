import {setTitle} from "actions";
import {showTips} from "actions/index";
//

import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
let pageBase = {

        data: function(){
          return {
            load: false,                 // 表格是否加载开关
            searchEvents:{                  // 查询回调函数
              onSearch: function(params) {
                  this.$set("searchParams", params);
                  // Object.assign(searchParams)
              }
            },
            searchParams: {page:1}, // 初始查询依据
            totals:0,                 // 表格load结束之后 传递给分页的页数
          }
        },
        attached: function(){
            //处理复杂逻辑
            if(this.dealFun) setTimeout(()=>{this.dealFun();});
        },

        methods: {
          resetParams: function(params){
              for (var one in params) {
                params[one] = ""
              }
          },

          loadlist: function(){
            this.$set("load", !this.load);
          },

          showMsg: function(type, msg){
              showTips(this.$store, {type:type, msg:msg});
          }
        },

        route:{
          data: function(){
            setTitle(this.$store, this.moduleName);
            this.searchParams.page = this.$route.query.page || 1;
            this.loadlist();
          }
        },
        components: {search,tb,pagepanel,btnbar,dialog, pg},
   }

export default pageBase
