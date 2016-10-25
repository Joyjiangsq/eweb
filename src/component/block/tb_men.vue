<template lang="html">
    <div class="">
          <div class="">
              <tb :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :datas="testdata" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
              <formtext labelname="备注：" :must="false" value="" placeholder=""  formname='remark' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div class="">

          </div>

          <!--选品对话框-->
          <dialog :flag="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 瓷砖分类
import Vue from "vue";
import tb from "component/grid/menTable";
import css from "./type.css";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import adapter from "./tbAdapter/menAdapter";
import baseMixins from "./itemMixins";

export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"men",
      validate:false,
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemName", type:"data"},
                    {name:"二级分类", labelValue:"FirmName", type:"data"},
                    {name:"三级分类", labelValue:"U_ThreeL", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"颜色", labelValue:"Color", type:"data"},
                    {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
                    {name:"门洞宽", labelValue:"U_DSWide", type:"edit"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                    {name:"门洞高", labelValue:"U_DSHigh", type:"edit"},
                    {name:"门洞深", labelValue:"U_DSThick", type:"edit"},
                    {name:"门扇宽", labelValue:"U_TDWide", type:"edit"},
                    {name:"门扇高", labelValue:"U_TDHigh", type:"edit"},
                    {name:"门扇厚", labelValue:"U_TDThick", type:"edit"},
                    {name:"合页品牌型号/规格", labelValue:"temp1", type:"component", cname:"heye", component: heyeComponent},   // 下拉组件
                    {name:"门吸品牌型号", labelValue:"temp2", type:"component",cname:"menxi",  component:menxiComponent},        // 下拉组件
                    {name:"开启方式", labelValue:"U_OpenWay", type:""},        // 下拉组件 TODO
                    {name:"是否开孔", labelValue:"U_IKeyHole", type:"component", cname:"kaikong",component: holeComponent},     // 下拉组件  TODO
                    {name:"智能门锁厚度", labelValue:"U_DThick", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度", labelValue:"U_LBLength", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板宽度", labelValue:"U_LBWide", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度", labelValue:"U_LBLength", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体档板左右螺丝十字中心孔距", labelValue:"U_AbDis", type:"edit", style:{width: '140px'}},
                    {name:"智能门锁锁体档板上下螺丝十字中心孔距", labelValue:"U_UDDis", type:"edit", style:{width: '130px'}},
                    {name:"智能门锁门边到锁面板右侧的距离", labelValue:"U_LTRDis", type:"edit", style:{width: '130px'}},
                    {name:"智能门锁门锁面板总长度", labelValue:"U_TLLength", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁门的类别", labelValue:"U_DType", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁门开向", labelValue:"U_DoorO", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"edit", style:{width: '100px'}},  //TODO
                    {name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                    {name:"可用库存量", labelValue:"avalibleStores",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"remark",type:"data"},
                    ],
      recData:{},
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  ready:function(){
  
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    }
  },
  components: {tb, formtext, cascadeform, dialog},
}
// 木门表格 内的自定义合页组建
import combobox from "component/combobox/combobox";
// 自定义  selfData 是自定义指令注入的参数  也是变更testdata的依据
// 合页
var heyeComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"xxx",id:1}, {name:"ooo", id:2}, {name:"aaa", id:3}, {name:"ccc", id:4}, {name:"ddd", id:5}]
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
      }
  },
  components: {combobox},
  computed: {

  }
})
// 门吸
var menxiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"xxx",id:1}, {name:"ooo", id:2}, {name:"aaa", id:3}, {name:"ccc", id:4}, {name:"ddd", id:5}]
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
      }
  },
  components: {combobox},
  computed: {

  }
})

// 是否开孔
var holeComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"是",id:1}, {name:"否", id:2}]
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick"  keyid="id" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
  },
  methods:{
      dropclick: function(d){
        console.log(d);
          // 变更对应的值
          this.selfData.U_IKeyHole = d;   // 控制表格显示隐藏
          var tf = d==1?false:true;
          this.selfData.U_DSWide.tb_disabled= tf;  // 门洞宽
          this.selfData.U_DSHigh.tb_disabled= tf; // 门洞高
          this.selfData.U_DSThick.tb_disabled= tf;  // 门洞深
          this.selfData.U_TDWide.tb_disabled= tf;  // 门扇宽
          this.selfData.U_TDHigh.tb_disabled= tf; // 门扇高
          this.selfData.U_TDThick.tb_disabled= tf;  // 门扇厚
      }
  },
  components: {combobox},
  computed: {

  }
})
</script>
