<template>
<div class="">
12321312234234324asdasdasdasdasdadasdasdasdasda
</div>
</template>

<script>
// import {textChange} from 'actions/index'
import datepicker from "component/datepicker/datePicker";
import datemonth from "component/datemonth/dateMonth";
import tablelist from "component/grid/tableListBase";
import pagination from "component/pagination/pagination";
import dialog from "component/dialog/dialog";
import combobox from "component/combobox/combobox";
export default {
    created() {
    },

    data() {
      return {}
      // return {
      //   loadtag: false,
      //   cdata:[{name:"jiangsu", key:"1"},{name:"浙江省", key:"2"},{name:"安徽省", key:"3"},{name:"贵州省", key:"4"},{name:"吉林省", key:"5"}],
      //   today: new Date(),
      //   style:{
      //     width: "810px",
      //     height: "615px"
      //   },
      //   startDate: new Date(1990, 10, 1),
      //   flagdep: false,
      //   dv:0,
      //   // curPage: 1,
      //   params :{
      //       page: 1,
      //       test: new Date().getTime()
      //   },
      //   testtwo: false,
      //   // curPage: 5,
      //   headercaption:[{name:"序号", labelValue:"_id", type:"data"},{name:"系列", labelValue:"catery",type:"data"}, {name:"联系人", labelValue:"contact",type:"data", attr:"price"},
      //                 {name:"地址", labelValue:"detailAddresses",type:"data"},{name:"电话", labelValue:"phone",type:"data"}, {name:"区域id", labelValue:"areaId", type:"data"},
      //                 {name:"供应商", labelValue:"providerName",type:"data"},{type:"operator", name:"操作", labelCaption:[{name:"删除", action:"delete"},{name:"编辑",action:"edit"}]}]
      // }
    },
    components: {
      datepicker,datemonth,tablelist,pagination,dialog,combobox
    },

    // methods:{
    //   showModal(){
    //       this.flagdep = !this.flagdep;
    //   },
    //   testtowchange(){
    //     this.testtwo = !this.testtwo
    //   },
    //   shua() {
    //     this.params.test = Math.random();
    //     this.$router.go({ name: 'index', query: this.params});
    //   }
    // },
    // computed:{
    //
    //   // paramsObj() {
    //   //     // console.log(this.$route.query);
    //   //     return this.params;
    //   // },
    // },
    // ready() {
    //   // console.log(this.params);
    //   // console.log(this);
    //   // console.log(this.$route.query);
    //   // this.curPage = isNaN(, this.$route.query.page*1) ? 1 : this.$route.query.page*1;
    //   // if(this.$route.query.test || this.$route.query.test=='') this.test = this.$route.query.test;
    //   // this.params = $.extend(false,this.params, this.$route.query);
    // },
    // events: {
    //     'dayClick': function (p) {
    //           console.log(p);
    //           console.log(this);
    //     },
    //
    //     'table_action': function(p) {
    //       console.log(p);
    //     },
    //
    //     "pageChange": function(p) {
    //       this.params.page = p.page;
    //       this.$router.go({ name: 'index', query: this.params});
    //     }
    //   },
    //
    //   route: {
    //     data: function (transition) {
    //         Object.assign(this.params, this.$route.query);
    //         this.loadtag = !this.loadtag;
    //     }
    //   },
    //   watch:{
    //         "dv" : function(){
    //           console.log(this.dv);
    //         }
    //   }
    // vuex: {
    //      actions:{
    //        clickhandler: function (scope){
    //             textChange(scope, new Date().getTime())
    //        }
    //      }
    //  }
}
</script>
