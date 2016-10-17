<template>
      <div :class="dCss.box">
          <input type="text" name="name" :value="iptvalue" @keydown="keydownHandler" @keyup="onUpHandler">
          <div :class="dCss.dropBox" v-show="showDropBox">
              <span v-for="one in datas" @click="oneClickHandler(one)">{{one.name}}</span>
          </div>
          <div :class="dCss.cover" v-show="showDropBox"  @click="changeDropAction"></div>
      </div>
</template>

<script>
import dCss from "./dimSearch.css";
export default {
  props:{
    labelname:{
      type: String,
      default:"name"
    },
    iptvalue:{
      default:"",
    },
    value:{
        default:""
    },
    id:{
      default: "id"
    }
  },
  data: function () {
    return {
      dCss,
      datas:[],
      showDropBox: false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
      onUpHandler: function(e){
          if(e.keyCode == 32) {
            e.preventDefault();
            return false;
          }
          // 此时去查询数据
          setTimeout(()=>{
            this.$set("showDropBox", true);
            this.datas = [{name:"adaas", id:1},{name:"vvvv", id:13},{name:"ddd", id:12},{name:"vvv", id:11}]
            this.getData();
          },500)
      },

      keydownHandler: function(e){
          if(e.keyCode == 32) {
            e.preventDefault();
            return false;
          }
      },

      getData: function(){
          this.$http.post(this.$Api+this.url, {params: this.value}).then((res)=>{
          });
      },

      oneClickHandler: function(one){
          this.$set("value", one[this.id]);
          this.$set("iptvalue", one[this.labelname]);
          this.$set("showDropBox", !this.showDropBox);
          this.$dispatch("dimclick", one);
      },

      changeDropAction: function(){
          this.$set("showDropBox", !this.showDropBox);
          this.$set("value", "");
      }
  },
  components: {},
  watch:{
    "value": function(o) {
        this.$dispatch("valuechange", o);
    }
  }
}
</script>
