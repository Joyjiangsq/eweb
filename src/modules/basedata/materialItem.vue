<template>
    <div :class="css.itemList">
                  <!--新增材料分类对话框-->
      <dialog :flag.sync="show" title="新增材料" @dialogclick="dialogClickHandler">
                <div  slot="containerDialog">
                        <span :class="css.titlerow">材料信息</span>
                         <div>   
                            <formtext labelname="分类名称：" :vertical="true"   :value.sync="formdata.name" placeholder="请输入分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formcb keyid="name" labelname="所属包：" dropfixed="dropfixed" :vertical="true" v-if="level"  :value.sync="formdata.pkg"  keyname="name"  formname="" :datas="getRoles" :validatestart="validate" @onvalidate="validateHandler"></formcb>
                            <formrd labelname="启用：" :vertical="true"  :value.sync="formdata.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
                        </div>
                </div>
        </dialog>
    </div>
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
    formdata:{name:"",pkg:"",usable:false},
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
      //所属包下拉值
      getRoles: function(){
        return packageType
      }
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
