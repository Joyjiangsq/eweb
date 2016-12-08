<template>
    <div :class="css.BoX">
        <pagepanel>
              <div :class="css.searchBox">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
        </pagepanel>
        <pagepanel>
              <btnbar :buttons="btnsData" :events="btnEvents" v-if="!isE"></btnbar>
              <div class="css.tBox">
                <tb :headercaption="headercaption" :totals.sync="totals" :load="load" url="custom-products" :params="searchParams" ></tb>
              </div>
              <pg :totals="totals" :curpage="searchParams.page"></pg>
        </pagepanel>
    </div>
</template>

<script>
import css from "./d.css";
import btnbar from "component/sprite/buttonbar";
import Utils from "common/Utils.js";
import pageBase from "common/mixinPage.js";
import Vue from "vue";
// 自定义
var orderurgent = Vue.extend({
  data:function(){
    return {
      css,
      totals:0
    }
  },
  template: '<div :class="css.inRow" @click="clickHandler">{{totals}}</div>',
  ready: function(){
    this.totals = this.selfData.design_serial;
  },
  methods:{
    clickHandler: function(){
        this.$router.go({path:"specmgr/apply", query:{orderid: this.totals}})
    }
  }
})

export default {
  mixins: [pageBase],
  data: function () {
    return {
      css,
      moduleName:"定制品设计管理",
      headercaption: [ {name:"设计申请单号", labelValue:"design_serial",type:"component", component: orderurgent, cname:"orderurgent2"},
                        {name:"品类", labelValue:"series",type:"data"},
                        {name:"测量员", labelValue:"ce_people",type:"data"},
                        {name:"测量员电话", labelValue:"ce_phone",type:"data"},
                        {name:"订单状态", labelValue:"status",type:"data",adapterFun: function(d) {
                            let mp = {
                               "1":"待交付","2":"待确认", "3":"已完成", "4":"退回修改"
                            }
                            return mp[d.status]
                        }}], // 表格头部信息设置
      btnsData:[{name:"设计申请", icon:"icon-add", action:"add"}],
      btnEvents:{
        btnClick: function(d){
            if(d.action == "add") {
                this.$router.go({path:"specmgr/apply"})
            }
        }
      }
    }
  },
  computed: {
    sdata: function(){
      let q = this.$route.query;
      let sd = [{type:"text",  value:q.design_serial || "",  keyname:"design_serial", labelcaption:"设计申请单号:"},
              {type:"combobox", keyname:"status", labelname:"name", keyid:"id", value:q.status || "", datas:[{name:"待交付", id:1},{name:"待确认", id:2},{name:"退回修改", id:4},{name:"已完成", id:3}], labelcaption:"订单状态:"}];
      if(this.isE) sd.push({type:"text",  value:q.station_name || "",  keyname:"station_name", labelcaption:"分站名称:"});
      sd.push({type:"daterange",  keynamestart:"start", keynameend:"end", start:q.start || "",  end:q.end || "", formate:"yyyy-mm-dd", labelcaption:"申请时间:"});
      return sd

    },
    isE: function() {
      return Utils.isEAdmin();
    },
  },
  created: function(){
  },
  ready: function () {
    if(this.isE) {
        this.headercaption.push({name:"分站名称", labelValue:"station_name",type:"data"});
    }
    this.headercaption.push({name:"申请时间", labelValue:"createAt", type:"data",adapterFun: function(d) {return Utils.formate(new Date(d.createAt), "yyyy-mm-dd");}});
  },
  attached: function () {},
  methods: {
  },
  components: {btnbar},

}
</script>
