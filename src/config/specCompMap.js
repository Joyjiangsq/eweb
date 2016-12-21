// 木门表格 内的自定义合页组建
import combobox from "component/combobox/combobox";
import Vue from "vue";
// 自定义  selfData 是自定义指令注入的参数  也是变更testdata的依据
// 合页   列表数据  U_HingeCodes
//---------------------门--------------------
export const heyeComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value:"",
      adapter: function(d){
          d.multyNameLabel = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;
          return d
      }
    }
  },
  template: '<div><combobox labelname="multyNameLabel" :adapter="adapter" :need="false" @itemclick="dropclick" :value="value" keyid="multyNameLabel" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      this.test = this.selfData.U_HingeCodes.def || [];
      this.value = this.selfData.U_HingeName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_HiPro = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;;
            this.selfData.U_HingeName.def = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;
            this.selfData.U_HingeName.tb_disabled= false;  // 合页
            this.selfData.U_HingeName.defCss= "default";  // 合页
            this.selfData.U_HingeName.errorMsg= "";  // 合页
      }
  },
  components: {combobox},
  computed: {

  }
})
// 门锁   U_LockCodes
export const  mensuoComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value:"",
       adapter: function(d){
          d.multyLockLabel = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;
          return d
      }
    }
  },
  template: '<div><combobox labelname="multyLockLabel" :adapter="adapter" :need="false" :value="value"  @itemclick="dropclick"  keyid="multyLockLabel" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      this.test = this.selfData.U_LockCodes.def || [];
      this.value = this.selfData.U_LockName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_LoPro = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;
            this.selfData.U_LockName.def = d.U_Brand + "/" + d.U_Modle + "/" + d.Spec;
            this.selfData.U_LockName.tb_disabled= false; // 门锁
            this.selfData.U_LockName.defCss= "default";  // 门锁
            this.selfData.U_LockName.errorMsg= "";  // 门锁
      }
  },
  components: {combobox},
  computed: {

  }
})

// 是否开孔
export const  holeComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"是"}, {name:"否"}],
      value:"是"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_IKeyHole.def || "是";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_IKeyHole.def = d;   // 控制表格显示隐藏
          var tf = d=="是"?false:true;
          this.selfData.U_HingeName.tb_disabled= tf;  // 合页
          this.selfData.U_HingeName.defCss= "default";  // 合页
          this.selfData.U_HingeName.errorMsg= "";  // 合页
          this.selfData.U_LockName.tb_disabled= tf; // 门锁
          this.selfData.U_LockName.defCss= "default";  // 门锁
          this.selfData.U_LockName.errorMsg= "";  // 门锁
      }
  },
  components: {combobox},
  computed: {

  }
})

// 开启方向
export const  kaiqiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"左开"}, {name:"右开"}],
      value:"左开"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_OpenWay.def || "左开";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_OpenWay.def = d;   // 控制表格显示隐藏
          this.selfData.U_OpenWay.tb_disabled= false;
          this.selfData.U_OpenWay.defCss= "default";
          this.selfData.U_OpenWay.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})


// 智能门锁开向
export const  zhinengDirComponent = Vue.extend({
  //左内开，左外开，右内开，右外开
  data:function(){
    return {
      test:[{name:"左内开"}, {name:"左外开"}, {name:"右内开"}, {name:"右外开"}],
      value:"左内开"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_DoorO.def || "左内开";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_DoorO.def = d;   // 控制表格显示隐藏
          this.selfData.U_DoorO.tb_disabled= false;
          this.selfData.U_DoorO.defCss= "default";
          this.selfData.U_DoorO.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})

// 智能门锁是否有田地钩
export const  tdComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"是"}, {name:"否"}],
      value:"是"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_IHEH.def || "是";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_IHEH.def = d;   // 控制表格显示隐藏
          this.selfData.U_IHEH.tb_disabled= false;
          this.selfData.U_IHEH.defCss= "default";
          this.selfData.U_IHEH.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})

// 智能门锁类别
export const  zhiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"木门"}, {name:"铁门"}],
      value:"木门"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_DType.def || "木门";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_DType.def = d;   // 控制表格显示隐藏
          this.selfData.U_DType.tb_disabled= false;
          this.selfData.U_DType.defCss= "default";
          this.selfData.U_DType.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})
// ---------------------------厨柜---------------------------
//  U_FModeling  前沿造型   下拉组件 默认 、、  DM-008-直边、  DM-002-罗马边
export const  qianyanComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"DM-008-直边", id:"DM-008-直边"}, {name:"DM-002-罗马边", id:"DM-002-罗马边"}],
      value: ""
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    this.value = this.selfData.U_FModeling.def || "DM-008-直边"
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_FModeling.def = d;
            this.selfData.U_FModeling.tb_disabled= false;
            this.selfData.U_FModeling.defCss= "default";
            this.selfData.U_FModeling.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})

// U_BasinT  // 台盆工艺   下拉组件 默认  台上工艺、台下工艺
export const taiyiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"台上工艺", id:"台上工艺"}, {name:"台下工艺", id:"台下工艺"}],
      value:""
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
        this.value = this.selfData.U_BasinT.def || "台上工艺"
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_BasinT.def = d;
            this.selfData.U_BasinT.tb_disabled= false;
            this.selfData.U_BasinT.defCss= "default";
            this.selfData.U_BasinT.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})
//  d.U_GSMe  // 气源方式   下拉组件 默认 、、     液化气  天燃气
export const  qiyuanComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"液化气"}, {name:"天燃气"}],
      value: "天燃气"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :need="false" :value="value"  keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    this.value = this.selfData.U_GSMe.def || "天燃气";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_GSMe.def = d;
            this.selfData.U_GSMe.tb_disabled= false;
            this.selfData.U_GSMe.defCss= "default";
            this.selfData.U_GSMe.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})
//    // U_HandleCode  U_HandleName
export const  bashouComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value: ""
    }
  },
  template: '<div><combobox labelname="U_Modle" @dropclick="dropclick" :need="false" :value="value"  keyid="U_Modle" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
    //ItemName
    this.test = this.selfData.U_HandleCodes.def;
    this.value = this.selfData.U_HandleName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_HanType =  d;
            this.selfData.U_HandleName.def = d;
            this.selfData.U_HandleCode = d;
            this.selfData.U_HandleName.tb_disabled= false;
            this.selfData.U_HandleName.defCss= "default";
            this.selfData.U_HandleName.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {}
})
