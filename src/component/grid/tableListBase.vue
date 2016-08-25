<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag'>
                      {{tone.name}}
                      <span  v-if="tone.sort">升序</span>
                      <span  v-if="tone.sort">降序</span>
                </th>
              </tr>
        </thead>
        <tbody  v-show="loading? false:noresult? false: true">
              <tr v-for="done in dataList">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag'>
                          <span v-if="sone.type == 'data'" >{{done[sone.labelValue]}} </span>
                          <span v-if="sone.type == 'operator'" >
                                <span v-for="vone in sone['labelCaption']"  @click="operatorHandler(done[codevalue], vone.action)" >{{vone.name}}</span>
                          </span>
                    </td>
              </tr>
        </tbody>
    </table>
    <div v-show="noresult" :class='tableCss.noresult'>
          没有数据
    </div>
    <div v-show="loading"  :class='tableCss.loading'>
          加载中...
    </div>
  </div>
</template>

<script>
import Utils from "common/Utils";
import tableCss from "./tableCss.css";
export default {
  props:{
    classname:{
      type:String,
      default: tableCss.tablelist
    },
    loadtag:{
      type: Boolean,
      default: true
    },
    stylein:{
      type:Object,
      default: () => {}
    },
    codevalue:{
      type:String,
      default:"id"
    },
    // 头信息
    headercaption:{             // [{name:"姓名", labelValue:"name", checkBox: true, type:"data", sort: true, attr:""}, {type:"operator", name:"操作", labelCaption:["删除"]}]
      type:Array,
      default:() => []
    },

    url:{
      type:String
    },

    params:{
      type:Object,
      default:() => {}
    },

    events: {
      type: Object,
      default:function(){
        return {operatorHandler: function(type, id){}}
      }
    }
  },
  data: function () {
    return {
        tableCss,
        dataList:[],
        noresult: false,
        loading:true
    }
  },



  computed: {

  },

  created: function(){
  },

  ready: function () {},
  attached: function () {},
  methods: {
    adapertData(d){
        // if(!d.data || d.data.length == 0) {this.noresult = true; this.loading = false; return false;}
        console.log(d);
        this.dataList = [];
        for (var i = 0; i < d.data.length; i++) {
            let one = d.data[i];
            let rowData = {};
            for (var j = 0; j < this.headercaption.length; j++) {
              var hone = this.headercaption[j];
              if(hone.type == "data") rowData[hone.labelValue] = {name: one[hone.labelValue], checkbok: hone.checkbox}
              else if(hone.type == "operator") rowData["operator"] = {name: hone.labelCaption, id:one[this.codevalue]}
            }
            this.dataList.push(rowData);
        }
        this.dataList.push({"orderid":"5795a1bb5dc803c328a75ca2","name":"杭州谷鼎暖通设备有限公司","date":"江干区三新北路中豪湘座A座403室","type":"杭州","contact":"朱寿","phone":"13989803757","areaId":"57958812515c79f1296c2556","cash":"12"});
        this.loading = false;
    },

    loadData: function() {
      return this.$http.get(this.$Api+ (this.url || ""),{params:this.params}).then((res) => {
          // 如果有数据 就渲染
         //  如果没有数据就显示没有数据
          this.adapertData({data: []});
      },(error) =>{
        console.log(error);
      })
    },

    operatorHandler(id, action){
        // this.$dispatch("table_action", {id: id, action:action}); // 发射事件
        this.events.operatorHandler.call(this._context, action, id);
    }
  },
  components: {},


  watch:{
    // "params": function(){
    //     this.tableShow = false;
    //     this.loadData();
    // },
    "loadtag": function(){
      this.loading = true;
      this.loadData();
    }
  }
}
</script>
