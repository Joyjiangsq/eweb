<template>
      <div :class="dCss.box">
          <input type="text" name="name" :value="iptvalue" v-model="iptvalue" :placeholder="placeholder" @keydown="keydownHandler" @keyup="onUpHandler" :disabled="read">
          <div :class="dCss.dropBox" v-show="showDropBox">
              <span v-for="(index,one) in datas" @click="oneClickHandler(index)">{{one[labelname]}}</span>
          </div>
          <div :class="dCss.cover" v-show="showDropBox"  @click="changeDropAction"></div>
      </div>
</template>

<script>
import dCss from "./dimSearch.css";
import Utils from "common/Utils";
export default {
  props:{
    read:{
      default: false
    },
    adapter:{
      type: Function
    },
    placeholder: {
      type:String,
      default:""
    },
    labelname:{
      type: String,
      default:"name"
    },
    iptvalue:{  // 默认值
      default:"",
    },
    value:{
        default:""
    },
    id:{
      default: "id"
    },
    querylabel:{
      default: "name-or-phone"
    },
    url:{
      default:""
    },
    params:{
      default: function() {return {}}
    }
  },
  data: function () {
    return {
      dCss,
      datas:[],
      tplArr:[],
      showDropBox: false
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
      onUpHandler: function(e){
          if(e.keyCode == 8 && this.iptvalue == "") {
            this.datas = [];
            return false
          }
          if(this.iptvalue == "" || !this.iptvalue) return false;
          // 此时去查询数据
          setTimeout(()=>{
            this.$set("showDropBox", true);
            this.getData();
          },500)
      },

      keydownHandler: function(e){

      },

      getData: function(){
          this.params[this.querylabel] = this.iptvalue;
          this.$http.get(this.$Api+this.url,{params: this.params}).then((res)=>{
                var one = res.json();
                this.adapterDatas(one.data.docs);
          });
      },
      adapterDatas: function(ds){
            this.tplArr = ds;
            let newDs = Utils.cloneObj(ds);
            for (var i = 0; i < newDs.length; i++) {
              let one = newDs[i];
              if(this.adapter) {
                  one[this.labelname] = this.adapter(one);
              }
            }
            this.datas = newDs;
      },
      oneClickHandler: function(index){
          this.$set("value", this.tplArr[index][this.id]);
          this.$set("iptvalue", this.tplArr[index][this.labelname]);
          this.$set("showDropBox", !this.showDropBox);
          this.$dispatch("dimclick", this.tplArr[index]);
      },

      changeDropAction: function(){
          this.$set("showDropBox", !this.showDropBox);
          this.$set("value", "");
      }
  },
  components: {},
  watch:{
    "value": function(o) {
        // this.$dispatch("valuechange", o);
    }
  }
}
</script>
