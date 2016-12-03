<template>
    <div :class="[combCss.combobox, classname]" v-show="true">
          <div :class="[combCss.comboLabel, read?combCss.read:'']"  @click="changeDropAction">
                  <span :class="[combCss.comboLabelspan]">{{defaultInfo[labelname]}}</span>
                  <span :class='combCss.bticon'><icon iconname="icon-down"></icon></span>
          </div>
          <div :class="[combCss.dropBox, combCss[dropfixed]]" v-show="dropshow" :style="style">
              <div :class="combCss.dropOne" v-for="item in realData" @click="dropClick(item)">
                    {{item[labelname]}}
              </div>
          </div>
          <div :class="combCss.cover" v-show="dropshow"  @click="changeDropAction"></div>
    </div>
</template>

<script>
import combCss from "./combobox.css";
import icon from "component/sprite/icon.vue";
import Utils from "common/Utils";
export default {
  props:{
      classname:{

      },
      read:{
        default: false
      },
      dropfixed:{   //dropfixed
        default:""
      },
      labelname:{                  // 渲染dom 显示的可见名称
        type:String,
        default:"labelname"
      },

      value:{                     // 控件的实际值 使用者需要.sync才可以同步接收
        default:""
      },

      keyid:{                     // 控件的id 依据  默认为id
        type:String,
        default:"id"
      },

      datas:{                    // combobox 数据集  啊啊
        type:Array,
        default: function(){
          return [];
        }
      },

      url:{                     // 如果combobox是需要请求后台的
        type: String,
        default:""
      },

      params: {               // 请求参数
        type: Object,
        default: () => {}
      },


  },
  data: function () {
    return {
      combCss,
      dropshow: false,
      // havedatas: true,
      style:{},
      realData:[],
      defaultInfo:{}
    }
  },
  computed: {

  },
  created: function(){
    this.defaultInfo[this.keyid] = "";
    this.defaultInfo[this.labelname] = "请选择";
    if(this.url) this.loadData();
    // alert(JSON.stringify(this.defaultInfo));
  },
  ready: function () {
    this.resetList();
    this.setDef();
    // alert(JSON.stringify(this.defaultInfo));
  },
  attached: function () {},
  methods: {
    changeDropAction(e){
        if(this.read) return false;
        if(this.dropfixed == "dropfixed" && !!e) {

          // 下拉在fixed状态的时候 跟随点击位置走
          let offx = e.offsetX || 0;    // 点击相对点击的对象元素的偏移位置
          let offy = e.offsetY || 0;
          let w = e.currentTarget.clientWidth;   // 点击的对象的宽高
          let h = e.currentTarget.clientHeight;
          let x = e.x || e.clientX;                  // 点击相对body的位置
          let y = e.y || e.clientY;
          console.log(offx);
          if(e.target.className.indexOf("icon") != -1) x = x-w+15;
          else if(e.target.className.indexOf("xxx") != -1) x= 0;
          else x = x -offx;
          this.style = {left: x +"px", top: (y+h-offy) + "px"}
        }
        this.dropshow = !this.dropshow;
    },

    resetList: function(){
      if(!this.datas || this.datas.length == 0) return false;
      let p = {};
      p[this.keyid] ="";      // name 与 p最好不要一样
      p[this.labelname] ="请选择";
      this.defaultInfo = Utils.cloneObj(p);
      this.realData = Utils.cloneObj(this.datas);
      this.realData.unshift(p);
    },

    dropClick(item) {
      this.defaultInfo[this.keyid] = item[this.keyid];
      this.defaultInfo[this.labelname] = item[this.labelname];
      this.value = item[this.keyid];
      if(this.value == "请选择") this.value = "";
      this.changeDropAction();
      this.$dispatch("dropclick", this.value);
      this.$dispatch("itemclick", item);
    },

    loadData(p) {
      p = p? p: this.params;
      return this.$http.get(this.$Api + this.url,{params:p}).then((res) => {
        let d = res.json();
        this.datas = this.realData = d.data;
        this.resetList();
        this.setDef();
      },(error) =>{
        console.log(error);
      })
    },

    setDef: function(){
      if(!this.value) {
        this.defaultInfo[this.keyid] = "";
        this.defaultInfo[this.labelname] = "请选择";
        return false;
      }
      // if(this.realData.length == 0) this.realData = this.datas;
      for(var i = 0; i < this.realData.length; i++){
          if(this.value == this.realData[i][this.keyid]) {
            this.defaultInfo[this.labelname] = this.realData[i][this.labelname];
            this.defaultInfo[this.keyid] = this.realData[i][this.keyid];
          }
      }
    }
  },
  components: {icon},
  watch:{
    "params": {
      handler: function (val, oldVal) {
          this.loadData(val);
      },
      deep: true
    },
    "datas": function(){
      if(!this.datas) return false
      if(this.datas.length == 0) {
          this.realData = [];
          this.defaultInfo[this.keyid] = "";
          this.defaultInfo[this.labelname] = "请选择";
          this.value = "";
      }
     else  this.resetList();
    },
    "value":function(){
        this.setDef();
    }
  }
}
</script>
