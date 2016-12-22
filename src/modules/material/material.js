import {setTitle} from "actions";
import {showTips} from "actions/index";
import {getLevelOneTypeByName, getLevelThreeTypeByName} from "config/codeMap"

import search from "component/search/search";
import tb from "component/grid/tableListBase";
import pagepanel from "component/panel/pagepanel";
import btnbar from "component/sprite/buttonbar";
import dialog from "component/dialog/dialog";
import pg from "component/pagination/pagination";
let materialUtil = {
        props:{
            toload: {
                default: false
            },
        },
        data: function(){
          return {
            load: this.toload,
            getLevelOneTypeByName: getLevelOneTypeByName,
            totals:0,                 // 表格load结束之后 传递给分页的页数
            searchParams: {page: 1}, // 初始查询依据  searchParams: {ItmsGrpNam:"装修辅料"}, // 初始查询依据  
          }
        },
        attached: function(){
        },
        created: function(){
        //   this.searchParams.ItmsGrpCod = this.getLevelOneTypeByName(this.name);
        //   console.log(this.searchParams.ItmsGrpCod );
        },

        methods: {
         pagechange: function(d){
             console.log('d.page');
             console.log(d.page);
                if(!d.page) return false;
                this.searchParams.page = d.page;
                this.loadlist();
        },
          loadlist: function(){
            this.$set("load", !this.load);
          },
          showMsg: function(type, msg, time){
              showTips(this.$store, {type:type, msg:msg, time: time});
          }
        },

        route:{
          data: function(){
            setTitle(this.$store, this.moduleName);
            this.searchParams.page = this.$route.query.page || 1;
            this.loadlist();
          }
        },
        watch: {
        "toload": function(){
                this.loadlist();
            }
        },
        components: {search,tb,pagepanel,btnbar,dialog, pg},
   }

export default materialUtil
