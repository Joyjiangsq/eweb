<template>
    <div :class="css.itemList" v-if="exCatery">
    <!--新增施工报价分类对话框-->
      <dialog :flag.sync="show" title="新增施工报价分类" @dialogclick="dialogClickHandler" >
                <div  slot="containerDialog">
                        <span :class="css.titlerow">材料信息</span>
                         <div>   {{formdatas | json}}
                            <formtext labelname="项目名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formrd labelname="启用：" :vertical="true" formname="" :value.sync="formdatas.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
                        </div>
                </div>
      </dialog>
    </div>
    <!--新增材料分类对话框-->
    <div :class="css.itemList" v-else>
      <dialog :flag.sync="show" title="新增材料" @dialogclick="dialogClickHandler" v-else>
                <div  slot="containerDialog">
                        <span :class="css.titlerow">材料信息</span>
                         <div>   {{formdata | json}}
                            <formtext labelname="项目名称：" :vertical="true"  formname="" :value.sync="formdata.project_name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="单位：" :vertical="true"  formname="" :value.sync="formdata.unit" placeholder="请输入单位" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="销售价：" :vertical="true"  formname="" :value.sync="formdata.selling_price" placeholder="请输入销售价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="成本价：" :vertical="true"  formname="" :value.sync="formdata.cost_price" placeholder="请输入成本价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                            <formtext labelname="描述：" :vertical="true" :must="false" formname="" :value.sync="formdata.description" placeholder=""></formtext>
                            <formrd labelname="启用：" :vertical="true" formname="" :value.sync="formdata.usable" :datas="[{label:'是', id:'1', checked: true},{label:'否', id:'0', checked: false}]"  :validatestart="validate" @onvalidate="validateHandler"></formrd>
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
    level:{
        default: true,
        type: Boolean
    },
    catery:{
        default: false,
        type: Boolean
    },
    showtbedit:{
        default: false,
        type: Boolean
    },

  },
  data: function () {
    return {
      css,
      validate: false, //验证开关
      validateTag: false, //表单验证
      exCatery: false,
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
      "catery": function(){
          console.log('catery changed');
          this.exCatery = true;
          console.log(this.exCatery);
      },
       "showtbedit": function(){
          console.log('showtbedit changed');
          this.exCatery = false;
          console.log(this.exCatery);
      }
  }

}
</script>
