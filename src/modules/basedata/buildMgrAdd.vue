<template>
    <div>
    <!--<div :class="css.itemList" v-if="true"> -->
    <!--新增施工报价分类对话框-->
      <dialog :flag.sync="showConstructTag" :title="title" @dialogclick="dialogClickHandler" >
                <div  slot="containerDialog">
                         <div>  
                            <formtext labelname="项目名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formrd labelname="启用：" :vertical="true" formname="" :value.sync="formdatas.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
                        </div>
                </div>
      </dialog>
    <!--</div>-->
    <!--新增材料分类对话框-->
    <!--<div :class="css.itemList" v-else>-->
      <dialog :flag.sync="showMaterialTag" :title="title" @dialogclick="dialogClickHandler">
                <div  slot="containerDialog">
                         <div> 
                            <formtext labelname="项目名称：" :vertical="true" :value.sync="formdata.project_name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="单位：" :vertical="true" :value.sync="formdata.unit" placeholder="请输入单位" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="销售价：" :vertical="true" :number="true" :value.sync="formdata.selling_price" placeholder="请输入销售价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="成本价：" :vertical="true" :number="true" :value.sync="formdata.cost_price" placeholder="请输入成本价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="描述：" :vertical="true" :must="false"  :value.sync="formdata.description" placeholder=""></formtext>
                            <formrd labelname="启用：" :vertical="true" :value.sync="formdata.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
                        </div>
                </div>
       </dialog>
    <!--</div>--></div>
</template>

<script>
import formcb from "component/form/fmCombobox";
import css from './b.css';
import formrd from "component/form/formRadio";
import formtext from "component/form/formText";
import btn from "component/sprite/button";
import icon from "component/sprite/icon";
import {packageType} from "config/const.js";
import dialog from "component/dialog/dialog";
export default {
  props:{
    formdatas:{
        default: function(){
           return {name:'', usable:'1'}
        }
    },
    formdata:{
        default: function(){
           return {project_name:'', unit:'', selling_price:'', cost_price:'', description:'', usable:'1'}
        }
    },
    show:{
        default: false
    },
    showconstructtag:{
        default: false,
        type: Boolean
    },
    showmaterialtag:{
        default: false,
        type: Boolean
    },
    title:{
        default: ''
    }

  },
  data: function () {
    return {
      css,
      validate: false, //验证开关
      validateTag: false, //表单验证
      showConstructTag: false,  //增加施工分类弹框
      showMaterialTag: false,   //增加材料分类弹框
    }
  },
  computed: {
      
  },
  ready: function () {
  },
  attached: function () {},
  methods: {
    validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
    },
    dialogClickHandler: function(d) {
        this.validateTag = true;
        console.log(d.action);
        if(d.action == "confirm") {
            console.log('confirm');
            this.validate = !this.validate;
            console.log(this.validate);
            console.log(this.validateTag);
            setTimeout(()=> {
                if(this.validateTag) {
                    console.log('派发success');
                    this.$dispatch("success");
                }
                else {
                    
                }
            },30)
        }
    }
  },
  components: { btn,icon,formtext,formrd,formcb,dialog},
  watch:{
       "showconstructtag": function(){
           console.log('come in 2');
           this.showConstructTag = !this.showConstructTag;
      },
      "showmaterialtag": function(){
          console.log('come in 3');
          this.showMaterialTag = !this.showMaterialTag;
      }
  }

}
