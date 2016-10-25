<template>
    <div :class="[combCss.combobox, classname]" v-show="true">
          <div :class="[combCss.comboLabel, read?combCss.read:'']"  @click="changeDropAction">
                  <span :class="[combCss.comboLabelspan]">{{defaultInfo.label}}</span>
                  <span :class='combCss.bticon'><icon iconname="icon-down"></icon></span>
          </div>
          <div :class="[combCss.dropBox, combCss[dropfixed]]" v-show="dropshow" :style="style">
              <div :class="combCss.dropOne" v-for="item in datas" @click="dropClick(item)">
                    {{item[labelname]}}
              </div>
          </div>
          <div :class="combCss.cover" v-show="dropshow"  @click="changeDropAction"></div>
    </div>
</template>

<script>
import combCss from "./combobox.css";
import icon from "component/sprite/icon.vue";
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
        default:0
      },

      keyid:{                     // 控件的id 依据  默认为id
        type:String,
        default:"id"
      },

      datas:{                    // combobox 数据集
        type:Array,
        default:() => []
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
      havedatas: true,
      style:{}
    }
  },
  computed: {
    defaultInfo: function(){
      let info ={label:"请选择", key:"-1"};
      if(!this.datas || this.datas.length == 0 || this.value == 0) return info;

      for(var i = 0; i < this.datas.length; i++){
        if(this.value == this.datas[i][this.keyid]) {
          info.label = this.datas[i][this.labelname];
          info.key = this.datas[i][this.keyid];
        }
      }
      return info;
    }      // 展示的默认值   不管是ajax  还是datas渲染  都要重新初始化这个值
  },
  created: function(){
    if(this.url) this.loadData();
  },
  ready: function () {},
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
          let x = e.x;                  // 点击相对body的位置
          let y = e.y;
          console.log(offx);
          if(e.target.className.indexOf("icon") != -1) x = x-w+15;    // 微调
          else if(e.target.className.indexOf("comboLabelspan") != -1) x= x -offx-10; // 微调
          else x = x -offx;
          this.style = {left: x +"px", top: (y+h-offy) + "px"}
        }
        this.dropshow = !this.dropshow;
    },

    dropClick(item) {
      this.defaultInfo = {
          label:item[this.labelname], key:item[this.keyid]
      }
      this.value = item[this.keyid];
      this.changeDropAction();
      this.$dispatch("dropclick", this.value);
    },

    loadData(p) {
      p = p? p: this.params;
      return this.$http.get(this.$Api+this.url,{params:p}).then((res) => {
        var d = res.json();
        this.datas = d.data;
      },(error) =>{
        console.log(error);
      })
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
      if(this.datas.length == 0) this.havedatas = false;
      else this.havedatas = true
    }
  }
}
</script>
