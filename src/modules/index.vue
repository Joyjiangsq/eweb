<template>
  <div class="">
    <span>
      <datepicker classname="startTime" :value="today" formate="yyyy-mm-dd" :stopdate="today"></datepicker>


    </span>
    <span class="">
      <datemonth classname="startMonth" :value="today"  :stopdate="today" :startdate="startDate"></datemonth>
    </span>

    <div @click="showModal">
      点击显示弹框
    </div>
    <div @click="testtowchange">
      点击显示弹框2
    </div>
  </br>
  <div style="margin-bottom:30px;"></div>
  <button type="button" name="button" @click="shua">加载</button>
    <div>
      <tablelist :headercaption="headercaption" codevalue="_id" :params="paramsObj" ></tablelist>
      <pagination :totals="500" :curPage="params.page"></pagination>
    </div>
  </div>


  <dialog :flag="flagdep">
        <div class="" slot="containerDialog">
          <tablelist :headercaption="headercaption" codevalue="_id" :params="paramsObj" :stylein="style"></tablelist>  <pagination :totals="500" :curPage="params.page"></pagination>
        </div>
        <div class="" slot="footerDialog">
          --------------------
        </div>
  </dialog>

  <dialog :flag="testtwo">

  </dialog>
</template>

<script>
// import {textChange} from 'actions/index'
import datepicker from "component/datepicker/datePicker";
import datemonth from "component/datemonth/dateMonth";
import tablelist from "component/grid/tableListBase";
import pagination from "component/pagination/pagination";
import dialog from "component/dialog/dialog";
export default {
    created() {
    },

    data() {
      return {
        today: new Date(),
        style:{
          width: "810px",
          height: "615px"
        },
        startDate: new Date(1990, 10, 1),
        flagdep: false,
        // curPage: 1,
        params :{
            page: 1,
            test: new Date().getTime()
        },
        testtwo: false,
        // curPage: 5,
        headercaption:[{name:"序号", labelValue:"_id", type:"data"},{name:"系列", labelValue:"catery",type:"data"}, {name:"联系人", labelValue:"contact",type:"data", attr:"price"},
                      {name:"地址", labelValue:"detailAddresses",type:"data"},{name:"电话", labelValue:"phone",type:"data"}, {name:"区域id", labelValue:"areaId", type:"data"},
                      {name:"供应商", labelValue:"providerName",type:"data"},{type:"operator", name:"操作", labelCaption:[{name:"删除", action:"delete"},{name:"编辑",action:"edit"}]}]
      }
    },
    components: {
      datepicker,datemonth,tablelist,pagination,dialog
    },

    methods:{
      showModal(){
          this.flagdep = !this.flagdep;
      },
      testtowchange(){
        this.testtwo = !this.testtwo
      }
    },
    computed:{

      paramsObj() {
          // console.log(this.$route.query);
          return this.params;
      },
    },
    ready() {
      // console.log(this);
      // console.log(this.$route.query);
      // this.curPage = isNaN(, this.$route.query.page*1) ? 1 : this.$route.query.page*1;
      // if(this.$route.query.test || this.$route.query.test=='') this.test = this.$route.query.test;
      this.params = $.extend(false,this.params, this.$route.query);
    },
    events: {
        'dayClick': function (p) {
              console.log(p);
              console.log(this);
        },

        'table_action': function(p) {
          console.log(p);
        },

        "pageChange": function(p) {
          this.params.page = p.page;
          this.params = $.extend(false,{}, this.params);
          this.$router.go({ name: 'index', query: this.paramsObj});
        }
      },

      watch:{

      }
    // vuex: {
    //      actions:{
    //        clickhandler: function (scope){
    //             textChange(scope, new Date().getTime())
    //        }
    //      }
    //  }
}
</script>
