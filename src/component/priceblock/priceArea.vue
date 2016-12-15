<template>
    <div :class="css.Box">
        <div :class='css.leftBox'>
            <lefttb :headercaption="leftHeader" @rowclick="rowclick" :redef="redef" scene="add_yes"  :needselected= "true" @addone="leftAddOne" :datas="glData" :events="tableEventsLeft"></lefttb> 
            <div :class="css.attachInfo">
                <propertytext key="升级金额" :horizontal="true" value="0" v-if="this.from == 'c'"></propertytext>
                <propertytext key="降级金额" :horizontal="true" value="0" v-if="this.from == 'c'"></propertytext>
                <propertytext key="减项金额" :horizontal="true" value="0" v-if="this.from == 'c'"></propertytext>
                <propertytext key="互换金额" :horizontal="true" value="0" v-if="this.from == 'c'"></propertytext>
                <propertytext key="个性化金额" :horizontal="true" value="0"></propertytext>
            </div>
        </div>
        <div :class='css.rightBox'>
            <div v-if="gxhTip">{{gxhTip}}</div>
            <righttb :headercaption="rightHeader" @selectchange="selectchangeHandler"  scene="add_yes" :deleteindex="deleteindex" :datas="rightDatas.sub_list" :events="tableEventsRight" v-else></righttb>
            <propertytext v-if="!gxhTip" key="总额" :horizontal="true" :value="rightDatas.totalPrice"></propertytext>
        </div>
        <typedialog :show="showTypeDialog" @onecheck="typeCheck" :url="this.getTypeUrl()"></typedialog>
        <showselect :show="showSelectDialog" :toload="toloadProduct" :params="selectParams" ></showselect>
    </div>
</template>

<script>

import css from "./price.css";
import Utils from "common/Utils.js";
import lefttb from "component/grid/priceWhereTable";
import righttb from "component/grid/priceTypeTable";
import typedialog from "./typeDialog";
import propertytext from "component/form/propertyText.vue";
import adapter_left from "./adapterLeft.js";
import adapter_right from "./adapterRight.js";
import adapter from "./adapter.js";
import showselect from "component/blockcommon/selectProductByTypeDialog";
import {showTips} from "actions/index";
export default {
  props: {
    from:{
      type: String,
      default: "c" // s
    },

    action: {
      type: String,
      default: "add" // edit
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
      glData:[{name:"个性化", code:"gxh", selected: true, sub_data:{sub_list:[]}}],
      
      leftHeader: [{name:"名称", labelValue:"name",type:"edit"},{type:"operator", name:"操作"}],
      rightDatas:{totalPrice:0},
      showTypeDialog: false, // 分类型对话框
      showSelectDialog: false,
      toloadProduct: false,
      selectParams:{page: 1},
      deleteindex: {index: -1},
      tableEventsLeft:{
        operatorRender: function(d, index){
          return [{name:"删除", action:"delete",icon:"icon-delete", index:index}];
        },

        operatorHandler: function(d){
             if(d.action == "delete") {
                  this.glData.splice(d.index, 1);
                  this.redef = !this.redef;
             }
        }
      },
      tableEventsRight:{
         operatorRender: function(d, index){
            return this.getFrom(d, index);
         },

         operatorHandler: function(d){
              if(d.action == "select") {
                let stPage = this.selectParams.page;
                this.selectParams = {page: stPage};
                this.showSelectDialog = !this.showSelectDialog;
                console.log(this.selectParams);
                if(d.data.level_n == 1) this.selectParams.lv1_code = d.data.lv_code;
                else if(d.data.level_n == 2) this.selectParams.lv2_code = d.data.lv_code;
                else this.selectParams.lv3_code = d.data.lv_code;
                this.toloadProduct = !this.toloadProduct
              }
              else if(d.action == "delete") {
                this.deleteindex = {index: d.index}
              }
         }
      }
    }
  },
  computed: {
    rightHeader: function() {
        if(this.from == "c") return  [{type:"operator", name:"操作"},{name:"分类编号", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_contact_name", type:"data"},
                                      {name:"产品名称", labelValue:"product_name", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
                                      {name:"型号", labelValue:"U_Model", type:"data"},{name:"规格", labelValue:"U_Spec", type:"data"},
                                      {name:"单位", labelValue:"Unit", type:"data"}, {name:"数量" ,labelValue:"counts", type:"edit"},
                                      {name:"差价", labelValue:"diff_price", type:"edit"}, {name:"金额", labelValue:"price", type:"data"},
                                      {name:"备注", labelValue:"remark", type:"edit"}]

        else return [{type:"operator", name:"操作"},
                    {name:"项目名称", labelValue:"lv_name", type:"data"},
                    {name:"工艺说明", labelValue:"desc", type:"data"},
                    {name:"数量" ,labelValue:"counts", type:"edit"},
                    {name:"单价", labelValue:"diff_price", type:"edit"}, {name:"金额", labelValue:"price", type:"data"},
                    {name:"备注", labelValue:"remark", type:"edit"}]
                 
    }
  },
  ready: function () {
    this.gxhTip = "个性化项目不需要选择";
    if(this.datas.length != 0) {
      this.glData = this.datas;
    }
  },
  attached: function () {},
  methods: {
    getFrom: function(d, index) {
      // 材料
        if(this.from == "c") return [{name:"删除", action:"delete",icon:"icon-delete", index: index},{name:"选品", action:"select",icon:"icon-add", data:d}]
      // 施工
        else if(this.from == "s") return [{name:"删除", action:"delete",icon:"icon-delete", index: index},{name:"添加", action:"add",icon:"icon-add", data:d}]
    },
    getTypeUrl: function() {
      if(this.from =="c") return "material-category";
      else if(this.from =="s") return "construction-quote-category"
    },
    leftAddOne: function() {
        let one = adapter_left({selected: false, sub_data:{sub_list:[]}});
        this.glData.unshift(one);
    },
    typeCheck: function(d) {
        let data = Utils.cloneObj(adapter_right(d));
        delete data.selected;
        this.rightDatas.sub_list.push(data);
    },
    rowclick: function(d) {
      if(d.code && d.code == "gxh") {
         this.gxhTip = "个性化项目不需要选择"
      }
      else {
        this.gxhTip = ""
        this.rightDatas = d.sub_data;
        this.rightDatas.totalPrice = 0;
      }
    },
    validateFun: function() {
        let lvRes = true;
        for(let i = 0; i < this.glData.length; i++) {
           let one = this.glData[i];
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
        this.showTypeDialog = !this.showTypeDialog
    }
  },
  components: {lefttb,righttb,typedialog,showselect,propertytext},
  watch: {
    "validate": function() {
        let validateRes = this.validateFun();
        if(!validateRes) this.$dispatch("fail");
        else {
            let newData = Utils.cloneObj(this.glData);
            adapter(newData);
            this.$dispatch("success", newData);
        }        
    },
    "rightDatas": {
      deep: true,
      handler: function() {
        console.log("Aa");
          let list = this.rightDatas.sub_list;
          this.rightDatas.totalPrice = 0;
          for(let i =0; i < list.length; i++) {
              if(list[i].price) this.rightDatas.totalPrice += list[i].price*1;
          }
      }
    }
  }
}
</script>
