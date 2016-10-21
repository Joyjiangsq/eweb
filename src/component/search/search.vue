<template>
    <div :class="sCss.searchinfo">
          <span v-for="(index, one) in datas" :class="sCss.searchItem">
            <!--城市级联-->
            <span v-if="one.type == 'cascade'" :class="[sCss.sone, sCss.itemtwo]"><label for="">{{one.labelcaption}}</label>
              <cascade :pid.sync="params.pid" :cid.sync="params.cid" :aid.sync="params.aid"></cascade>
              <span :class='[sCss.searchbtn, sCss.typeTwo]' v-if="lastType == one.type"><btn @click="searchHandler" iconname="icon-search" btnname="btn-primary">查询</btn></span>
            </span>
            <!--文本输入-->
            <span v-if="one.type == 'text'"  :class="sCss.sone"><label for="">{{one.labelcaption}}</label>
              <input type="text" name="name" @keydown="textKeyDownHandler(one)" :value="params[one.keyname]" v-model="params[one.keyname]">
            </span>
            <!--日选择-->
            <span v-if="one.type == 'datepicker'"  :class="sCss.sone"><label for="">{{one.labelcaption}}</label>
               <datepicker  :value.sync="params[one.keyname]" :formate="one.formate" ></datepicker>
             </span>
             <!--模糊下拉-->
             <span v-if="one.type == 'dim'"  :class="sCss.sone"><label for="">{{one.labelcaption}}</label>
                <dim :url="one.url" :labelname="one.labelName" :id="one.code" :iptvalue="one.iptvalue" :value.sync="params[one.keyname]" @dimclick="dimClick" @valuechange="valuechange"></dim>
             </span>

            <!--范围选择-->
            <span v-if="one.type == 'daterange'" :class="[sCss.sone, sCss.itemtwo]"><label for="">{{one.labelcaption}}</label>
                <daterange :start.sync="params[one.keynamestart]" :end.sync="params[one.keynameend]" :formate="one.formate"></daterange>
                <span :class='[sCss.searchbtn, sCss.typeTwo]' v-if="lastType == one.type"><btn @click="searchHandler" iconname="icon-search" btnname="btn-primary">查询</btn></span>
            </span>
            <!--月选择-->
            <span v-if="one.type == 'datemonth'"  :class="sCss.sone"><label for="">{{one.labelcaption}}</label>
                <datemonth classname="startMonth" :value.sync="params[one.keyname]" ></datemonth>
            </span>

            <!--下拉选择-->
            <span v-if="one.type == 'combobox'"  :class="sCss.sone"><label for="">{{one.labelcaption}}</label>
                <combobox :labelname="one.labelname" :classname="sCss.dself" :keyid="one.keyid"  :datas="one.datas" :url="one.url" :value.sync="params[one.keyname]"></combobox>
            </span>

            <span :class='sCss.searchbtn' v-if="needShow(index)"><btn @click="searchHandler" iconname="icon-search" btnname="btn-primary">查询</btn></span>

        </span>
    </div>
</template>

<script>
import sCss from "./search.css";
import combobox from "component/combobox/combobox";
import datemonth from "component/datemonth/dateMonth";
import datepicker from "component/datepicker/datePicker";
import daterange from "component/datepicker/dateRange";
import cascade from "component/combobox/combocascade";
import dim from "./dimSearch";
import {triggerChange} from "actions/index";
import btn from "component/sprite/button.vue";
export default {
  props:{
    /**
        [

          {type:"datepicker", keyname:"xxDate", value:"", startdate:"", stopdate:"", formate:"yyyy-mm-dd", labelcaption:""},   // 日输入框
          {type:"daterange", keynamestart:"start", keynameend:"start", start:"", end:"", formate:"yyyy-mm-dd", labelcaption:""}, // 日范围输入框
          {type:"datemonth", keyname:"monthDate", value:"", startdate:"", stopdate:"", formate:"yyyy-mm-dd", labelcaption:""}, // 月输入框
          {type:"combobox", keyname:"name", , labelname:"", keyid:"", value:"", datas:[], labelcaption:""}, // 下拉框输入框
          {type:"cascade",pid:"0", cid:"0", aid:"0", labelcaption:""}, // 级联地址
          {type:"text", keyname:"detail", value:"", labelcaption:""}
      ]
    **/
    hash:{
      default: true
    },
    datas:{
      type:Array,
      default:() => [
        {type:"cascade", pid:1, cid:1, aid:1, labelcaption:"地址"},
        {type:"daterange", keynamestart:"start", keynameend:"end", start:"", end:"", formate:"yyyy-mm-dd", labelcaption:"范围选择"}, // 级联地址
        {type:"text", limit:"", num:"", value:"",  keyname:"detail", labelcaption:"详细地址"},
        {type:"datepicker", keyname:"datename", value:"", startdate:"", stopdate:"", formate:"yyyy-mm-dd", labelcaption:"日期"},
        {type:"datemonth", keyname:"monthDate", value:"", startdate:"", stopdate:"", formate:"yyyy-mm-dd", labelcaption:"月选择"},
        {type:"combobox", keyname:"name", labelname:"name", keyid:"id", value:"", datas:[{name:"test",id:1},{name:"test1",id:2}], labelcaption:"下拉"}]
    },
    pathname:{
        type: String
    },

    events:{
        type:Object,
        default: function() {return {onSearch: function(){}}}
    }
  },
  data: function () {
    return {
      sCss,
      params:{},
      length: this.datas.length-1,
      lastType: this.datas[this.datas.length-1]["type"]
    }
  },
  computed: {

  },
  ready: function () {
  },
  created(){
    for(var i=0; i < this.datas.length; i++) {
        let one = this.datas[i];
        if(one.type == "datepicker" || one.type == "datemonth" || one.type == "combobox" || one.type == "text") {
            this.$set("params."+one.keyname, one.value);
        }
        else if(one.type == "daterange") {
           this.$set("params."+one.keynamestart, one.start);
           this.$set("params."+one.keynameend, one.end);
        }
        else if(one.type == "cascade") {
          this.$set("params.pid", one.pid);
          this.$set("params.cid", one.cid);
          this.$set("params.aid", one.aid);
        }
        else if(one.type == "dim") {
          this.$set("params." + one.keyname, one.value);
          this.$set("params.dimLabel", one.iptvalue);
          // this.$set("params.dimLabel", one.cid);
        }
    }

    this.searchHandler();
  },
  attached: function () {},
  methods: {
      dimClick: function(d) {
        console.log(d);
        this.$set("params.dimLabel", d.name);
      },
      valuechange: function(){

      },
      searchHandler: function(e){
        this.events.onSearch.call(this._context, this.params);
        let cPage = this.$route.query.page;
        if(cPage) this.params.page = cPage;
        if(e && this.hash) this.$router.go({ path: this.pathname, query: this.params});
      },
      // 控制格式
      needShow: function(index){
        if(this.datas.length-1 != index) return false
        if(this.lastType == "cascade" || this.lastType == "daterange") return false
        return true
      },
      // 控制文本输入的类型有 邮件类型/手机号
      textKeyDownHandler: function(d){

      }
  },

  components: {combobox,datemonth,datepicker,daterange,cascade, btn, dim},
  watch:{
    "p": {
      handler: function(v,o){
          console.log(v);
      },
      deep: true
    }
  }
}
</script>
