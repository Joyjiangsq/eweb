<template>
    <div :class="cascadeCss.cascadeBox">
                  <combobox labelname="name" :classname="cascadeCss.limit" keyid="name" :read = "read"  :value.sync="provient" :datas="parry"  @dropclick="pClick"></combobox>
                  <combobox labelname="name" :classname="cascadeCss.limit"  keyid="name" :read = "read" :value.sync="cname"  :datas="carry"  @dropclick="cClick" ></combobox>
                  <combobox labelname="name" :classname="cascadeCss.limit"  keyid="name" :read = "read" :value.sync="aname"  :datas="aarry"  @dropclick="aClick"></combobox>

    </div>
</template>

<script>
import datas from "./city.json";
import cascadeCss from "./cascadeCss.css";
import combobox from "./combobox";
export default {
  props:{
      value:{
          default:"",
          type:String
      },
      read:{
          default: false
      }
  },
  data: function () {
    return {
        cascadeCss,
        datas:datas,
        parry:datas, // 省列表
        carry: [], // 城市列表
        aarry: [], // 区域列表
        provient:"",
        cname:"",
        aname: ""
    }
  },
  computed: {

  },
  created(){
  },
  ready: function () {
      var sp = this.value.split(",");
      this.provient = this.value.split(",")[0];
      this.renderCitys(this.provient); // 渲染市
      if(sp.length >= 1) {
        this.cname = sp[1];  // 设置默认市
        this.renderAreas(this.cname);   // 渲染区域
      }
      if(sp.length >=2) this.aname = sp[2];  // 设置默认区域
  },
  attached: function () {},
  methods: {
    pClick: function(value){
         this.renderCitys(value);
         this.provient = value;
         this.$dispatch("combocase", value);
    },

    cClick: function(value) {
          this.renderAreas(value);
          this.cname = value;
          this.$dispatch("combocase", value);
    },

    aClick: function(value) {
          this.aname = value;
          this.$dispatch("combocase", value);
    },
    renderAreas: function(value) {
      for (var i = 0; i < this.carry.length; i++) {
         var one = this.carry[i];
         if(one.name == value) {
             this.aarry = one.areas;
         }
      }
    },
    renderCitys: function(value) {
      for (var i = 0; i < this.datas.length; i++) {
         var one = this.datas[i];
         if(one.name == value) {
             this.carry = one.citys;
         }
      }
      this.aarry = [];
    },

    setTrigger:function(f){
        if(f == "p") this.$set("value", this.provient);
        else if(f == "c") this.$set("value", this.provient+","+this.cname);
        else this.$set("value", this.provient+","+this.cname+","+this.aname);
    }
  },
  components: {combobox},
  watch:{
    "provient": function(){
          this.setTrigger("p")
    },
    "cname": function(){
          this.setTrigger("c")
    },
    "aname": function(){
          this.setTrigger("a")
    },
    "value": function(o){
          if(!o || o == "") {
              this.provient = this.cname = this.aname = "";
          }
    }
  }
}
</script>
