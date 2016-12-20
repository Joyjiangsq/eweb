<template>
    <div :class="css.Box">
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader" @rowclick="rowclick" :redef="redef" scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="fdata" :events="tableEventsLeft"></lefttb> 
        </div>
        <div :class='css.rightBox'>
            <div v-if="gxhTip">{{gxhTip}}</div>
            <righttb :headercaption="rightHeader" @selectchange="selectchangeHandler"  scene="add_yes" :deleteindex="deleteindex" :datas="rightDatas.sub_list" :events="tableEventsRight" v-else></righttb>
        </div>
        <typedialog :show="showTypeDialog" @onecheck="typeCheck" url="material-category" v-if="from == 'c'"></typedialog>
        <showbuild :show="showBuildDialog" @buildconfirm="buildconfirm"></showbuild>
        <!--<showselect :show="showSelectDialog" :toload="toloadProduct" :params="selectParams" ></showselect>-->
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable";
import righttb from "component/grid/priceTypeTable";
import typedialog from "./typeDialog";
import adapter_left from "./adapterLeft.js";
import adapter from "./adapter.js";
import showselect from "component/blockcommon/selectProductByTypeDialog";
import showbuild from "component/blockcommon/selectBuildDialog";
import {showTips} from "actions/index";
import Vue from "vue";
export default {
  props: {
    from:{
      type: String,
      default: "c" // s
    },

    action: {
      type: String,
      default: "add" // detail // 编辑状态就是新增  多了id
    },

    validate:{
      type: Boolean,
      default: false
    },

    datas:{
      default: ()=> [],
      type: Array
    }
  },
  data: function () {
    return {
      css,
      gxhTip:"", // 个性化提示
      redef: false,
      fdata:[{name:"个性化", code:"gxh", selected: true, sub_data:{sub_list:[]}}],
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      rightDatas:{},
      showBuildDialog: false, // 显示施工产品对话框
      showTypeDialog: false, // 分类型对话框
      // showSelectDialog: false,
      // toloadProduct: false,
      // selectParams:{page: 1},
      deleteindex: {index: -1},
      tableEventsLeft:{
        operatorRender: function(d, index){
          return [{name:"删除", action:"delete",icon:"icon-delete", index:index}];
        },

        operatorHandler: function(d){
             if(d.action == "delete") {
                  this.fdata.splice(d.index, 1);
                  this.redef = !this.redef;
             }
        }
      },
      tableEventsRight:{
         operatorRender: function(d, index){
            return [{name:"删除", action:"delete",icon:"icon-delete", index: index}]
         },

         operatorHandler: function(d){
              // if(d.action == "select") {
              //   let stPage = this.selectParams.page;
              //   this.selectParams = {page: stPage};
              //   this.showSelectDialog = !this.showSelectDialog;
              //   if(d.data.level_n == 1) this.selectParams.lv1_code = d.data.lv_code;
              //   else if(d.data.level_n == 2) this.selectParams.lv2_code = d.data.lv_code;
              //   else this.selectParams.lv3_code = d.data.lv_code;
              //   this.toloadProduct = !this.toloadProduct
              // }
              if(d.action == "delete") {
                this.deleteindex = {index: d.index}
              }
         }
      }
    }
  },
  computed: {
    rightHeader: function() {
        if(this.from == "c") return  [{type:"operator", name:"操作"},
                                      {name:"分类编号", labelValue:"lv_code", type:"data"},
                                      {name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                                      {name:"是否允许减项", labelValue:"minu", type:"componentspec",component: mComp, cname:"deway"},
                                      {name:"是否允许互换", labelValue:"change", type:"componentspec",component: hComp, cname:"deway1"},
                                     ]

        else return [{type:"operator", name:"操作"},
                    {name:"项目名称", labelValue:"project_name", type:"data"},
                    {name:"工艺说明", labelValue:"description", type:"data"},
                    {name:"单位", labelValue:"unit", type:"data"}]
                 
    }
  },
  ready: function () {
    this.gxhTip = "个性化项目不需要选择";
    // if(this.datas.length != 0) {
    //   this.fdata = this.datas;
    // }
    // console.log(this.datas);
    // if(this.datas.length !=0) {
    //     for(let i = 0; i < this.datas.length; i++) {
    //          if(i == 0) this.datas[i].selected = true;
    //          else this.datas[i].selected = false;
    //          adapter_left(this.datas[i]);
    //     }
    //     this.fdata = this.datas;
    // }
  },
  attached: function () {},
  methods: {
    // getFrom: function(d, index) {
    //   // 材料
    //     if(this.from == "c") return [{name:"删除", action:"delete",icon:"icon-delete", index: index}]
    //   // 施工
    //     else if(this.from == "s") return [{name:"删除", action:"delete",icon:"icon-delete", index: index}]
    // },
    // getTypeUrl: function() {
    //   if(this.from =="c") return "material-category";
    //   else if(this.from =="s") return "construction-quote-category"
    // },
    leftAddOne: function() {
        let one = adapter_left({selected: false, sub_data:{sub_list:[]}});
        this.fdata.unshift(one);
    },
    typeCheck: function(d) {
        let data = Utils.cloneObj(d);
        // delete data.selected;
        this.rightDatas.sub_list.push(data);
    },
    rowclick: function(d) {
      if(d.code && d.code == "gxh") {
         this.gxhTip = "个性化项目不需要选择"
      }
      else {
        this.gxhTip = ""
        this.rightDatas = d.sub_data;
      }
    },
    buildconfirm: function(d) {
       let list = Utils.cloneObj(d);
       for(let i = 0; i < list.length; i++) {
          let one = list[i];
          this.rightDatas.sub_list.push(one);
       }
    },
    validateFun: function() {
        let lvRes = true;
        for(let i = 0; i < this.fdata.length; i++) {
           let one = this.fdata[i];
           for(let j in one) {
               if(!one[j].validateFun) continue;
               lvRes = one[j].validateFun();
               if(lvRes === false) break;
           }
           if(lvRes === false) break;

           for(let g = 0; g < one.sub_data.sub_list.length; g++) {
               let sone = one.sub_data.sub_list[g];
               for(let j in sone) {
                  if(!sone[j].validateFun) continue;
                  lvRes = sone[j].validateFun();
                  if(lvRes === false) break;
               }
               if(lvRes === false) break;
           }
           if(lvRes === false) break;
        }
        return lvRes
    },
    selectchangeHandler: function(){
        if(this.from == "c") this.showTypeDialog = !this.showTypeDialog
        else {
            this.showBuildDialog = !this.showBuildDialog;
        }
    }
  },
  components: {lefttb,righttb,typedialog,showselect,showbuild},
  watch: {
    "validate": function() {
        let validateRes = this.validateFun();
        if(!validateRes) this.$dispatch("fail");
        else {
            console.log(this.fdata);
            let newData = Utils.cloneObj(this.fdata);
            adapter(newData);
            console.log(newData);
            this.$dispatch("success", newData);
        }        
    },
    "rightDatas": {
      deep: true,
      handler: function() {
        console.log("Aa");
      }
    },
    "datas": {
      deep: true,
      handler: function(){
            if(this.datas.length !=0) {
                let nd = Utils.cloneObj(this.datas);
                for(let i = 0; i < nd.length; i++) {
                    if(nd[i].code == "gxh") nd[i].selected = true;
                    else nd[i].selected = false;
                    adapter_left(nd[i]);
                }
                this.fdata = nd;
            }
      }
    }
  }
}

import radiobx from "component/radiobox/radioBox";
var mComp = Vue.extend({
  data:function(){
    return {
      css,
      test:[{label:"是", id:"1", checked: false}, {label:"否", id:"0", checked: true}],
      value:"",
      checkEvents:{
        radioClick: function(d){
          console.log(this.selfData);
          this.selfData.minu = d;
        }
      }
    }

  },
  template: '<radiobx :datas="test" checkname="name" :events="checkEvents" :defaultkey="value"></radiobx>',
  ready: function(){
    this.value = this.selfData.minu || '0';
    this.selfData.minu = this.value;
  },
  components:{radiobx},
  methods:{
  }
})

var hComp = Vue.extend({
  data:function(){
    return {
      css,
      test:[{label:"是", id:"1", checked: false}, {label:"否", id:"0", checked: true}],
      value:"",
      checkEvents:{
        radioClick: function(d){
          this.selfData.change = d;
        }
      }
    }
  },
  template: '<radiobx :datas="test" checkname="name" :events="checkEvents" :defaultkey="value"></radiobx>',
  ready: function(){
    this.value = this.selfData.change || '0';
    this.selfData.change = this.value;
  },
  components:{radiobx},
  methods:{
  }
})
</script>
