<template>
    <div :class="css.Box">
      <pagepanel>
            <div>
                   <formtext labelname="模板名称：":value.sync="formData.tp_name" placeholder=""  formname='' :number="true" length='5' :validatestart="validateForm" @onvalidate="validateHandler"></formtext>
                   <comboxform keyid="name" labelname="组包选择：":value.sync="formData.package_type" keyname="name" formname="" :datas="packageType" :validatestart="validateForm" @onvalidate="validateHandler"></comboxform>
                   <formrd labelname="是否启用：" formname="is_use"  :value="formData.is_use" :datas="[{label:'是', id:'1',checked: false}, {label:'否', id:'0',checked: false}]" :validatestart="validateForm" @onvalidate="validateHandler"></formrd>
            </div>
            <parea :validate="validate" @success="successHandler" @fail="failHandler" from="c"></parea>
      </pagepanel>
      <div class="cfooter" style="margin-top: 20px;">
        <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">确定</btn>
      </div>
    </div>
</template>

<script>
import pagepanel from "component/panel/pagepanel";
import css from "./price.css";
import Utils from "common/Utils.js";
import btn from "component/sprite/button";
import parea from "component/priceblock/priceArea";
import {setTitle} from "actions";
import formtext from "component/form/formText";
import {packageType} from "config/const";
import comboxform from "component/form/fmCombobox";
import formrd from "component/form/formRadio";
export default {
  data: function () {
    return {
      css,
      self: false,
      validate: false,
      packageType: packageType,
      validateForm: false,
      validateRes: true,
      formData:{
        tp_name:"",
        package_type:"",
        is_use: "1"
      },
      curGlData:[]
    }
  },
  computed: {
  },
  ready: function () {
    
  },
  attached: function () {},
  methods: {
    validateHandler: function(d) {
        if(d.res == "fail") this.validateRes = false;
    },
    btnClickHandler: function() {
        this.validateRes = true;
        this.validate = !this.validate;
        this.validateForm = !this.validateForm;
        setTimeout(()=>{
            if(this.validateRes && this.curGlData.length != 0) {
                console.log(this.curGlData);
            }
        },30);
    },
    successHandler: function(d) {
        this.curGlData = d;
    },
    failHandler: function(d) {
        this.curGlData = [];
    }
  },
  components: {parea,pagepanel,btn,comboxform, formtext, formrd},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"报价模板", type:"back"}, {name:"新增材料模板"}]);
      // window.onbeforeunload  = function(){return true;}
    },
    canDeactivate: function(transition){
        if(this.self) {
          transition.next();
          window.onbeforeunload  = function(){}
        }
        else {
           transition.next();
          // let tag = confirm("离开页面不会保存数据，请注意操作");
          // if(tag) {
          //   transition.next();
          //   window.onbeforeunload  = function(){}
          // }
          // else transition.abort();
        }
    }
  }
}
</script>
