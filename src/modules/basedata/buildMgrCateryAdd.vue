<template>
    <div :class="css.itemList">
    <!--新增施工报价分类对话框-->
      <dialog :flag.sync="show" title="新增施工报价分类" @dialogclick="dialogClickHandler">
                <div  slot="containerDialog">
                        <span :class="css.titlerow">材料信息</span>
                         <div>   {{formdata | json}}
                            <formtext labelname="项目名称：" :vertical="true"  formname="" :value.sync="formdata.name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formrd labelname="启用：" :vertical="true" formname="" :value.sync="formdata.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
                        </div>
                </div>
        </dialog>
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
    formdata:{
        default: function(){
           return {name:'', usable:'1'}
        }
    },
    show:{
        default: false
    },
    level:{
        default: true,
        type :Boolean
    }
  },
  data: function () {
    return {
      css,
      validate: false, //验证开关
      validateTag: false, //表单验证
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
        if(d.action == "confirm") {
            this.validate = !this.validate;
            setTimeout(()=> {
                if(this.validateTag) this.$dispatch("success");
                else {
                    
                }
            },30)
        }
    }
  },
  components: { btn,icon,formtext,formrd,formcb,dialog},
  watch:{
    
  }
}
</script>
