<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname" v-show="tableShow">
        <thead>
              <tr>
                <th v-for="tone in headercaption" style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag'>
                      {{tone.name}}
                      <span  v-if="tone.sort">升序</span>
                      <span  v-if="tone.sort">降序</span>
                </th>
              </tr>
        </thead>
        <tbody  v-show="!noresult">
              <tr v-for="done in dataList">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag'>
                          <span v-if="sone.type == 'data'" >{{done[sone.labelValue].name}} </span>
                          <span v-if="sone.type == 'operator'" >
                                <span v-for="vone in done['operator'].name"  @click="operatorHandler(done['operator'].id, vone.action)" >{{vone.name}}</span>
                          </span>
                    </td>
              </tr>
        </tbody>
    </table>
    <div v-show="noresult" :class='tableCss.noresult'>
          没有数据
    </div>
    <div v-show="!tableShow">
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
    }
  },
  data: function () {
    return {
        tableCss,
        dataList:[],
        noresult: false,
        tableShow:false
    }
  },



  computed: {

  },

  created: function(){
      this.loadData();
  },

  ready: function () {},
  attached: function () {},
  methods: {
    adapertData(d){
        if(!d.data || d.data.length == 0) {this.noresult = true; return false;}

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
        this.tableShow = true;
    },

    loadData: function() {
      return this.$http.get("/test",{params:this.params}).then((res) => {
          // 如果有数据 就渲染
         //  如果没有数据就显示没有数据
          this.adapertData(res.data);
      },(error) =>{
        console.log(error);
      })
    },

    operatorHandler(id, action){
        this.$dispatch("table_action", {id: id, action:action}); // 发射事件
    }
  },
  components: {},
  watch:{
    "params": function(){
        this.tableShow = false;
        this.loadData();
    }
  }
}
</script>
