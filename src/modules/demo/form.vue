<template>
<div class="">

    <panel>
        <div slot="panelTitle">
             表单 - 文本输入测试
        </div>
        <div slot="panelContent">
              <formtext labelname="姓名：" value="伟哥" placeholder="请输入姓名" :read="true" formname='name' length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="年龄：" placeholder="请输入年龄" :validatefun="ageValidate" formname='age'  length='3' :number="true" :validatestart="validate"  @onvalidate="validateHandler"></formtext>
              <formtext labelname="邮箱：" placeholder="请输入邮箱"  formname='mail' :email="true" :validatestart="validate"  @onvalidate="validateHandler"></formtext>
              <formtext labelname="手机号：" placeholder="请输入手机号"  formname='phone' :phone="true" :validatestart="validate"  @onvalidate="validateHandler"></formtext>
        </div>
        <div slot="panelFooter">
            <span @click="chan(1)">xxxx</span>
            <div class="">
                  {{formData | json}}
            </div>
        </div>
    </panel>

    <panel>
        <div slot="panelTitle">
             表单 - 选择项测试
        </div>
        <div slot="panelContent">
            <formck labelname="请选择水果:" formname="friut" value="1" :datas="cdata" :validatestart="ckvalidate" @onvalidate="checkValidate"></formck>
            <formrd labelname="请选择水果:" formname="friut2" value="2" :datas="bdata" :validatestart="ckvalidate" @onvalidate="checkValidate"></formrd>
        </div>
        <div slot="panelFooter">
            <span @click="chan(2)">xxxx</span>
            <div class="">
                  {{ckdata | json}}
            </div>
        </div>
    </panel>

    <panel>
        <div slot="panelTitle">
             表单 - 日期选择项测试
        </div>
        <div slot="panelContent">
            <datem labelname="请选择日期:" formname="month"   :validatestart="dateflage" @onvalidate="datevalidate"></datem>
        </div>
        <div slot="panelFooter">
            <span @click="chan(3)">xxxx</span>
            <div class="">
                  {{dated | json}}
            </div>
        </div>
    </panel>
</div>
</template>

<script>
import formtext from "component/form/formText";
import formck from "component/form/formCheckBox";
import formrd from "component/form/formRadio";
import datem from "component/form/formMonth";

import {setTitle} from "actions/index.js";
import panel from "component/panel/panel";
export default {
  data: function () {
    return {
      validate: false,
      ckvalidate: false,
      formData:{},
      ckdata:{},
      cdata:[{label:"苹果", id:1, checked: false}, {label:"香蕉", id:2, checked: false}, {label:"菠萝", id:3, checked: false}],
      bdata:[{label:"苹果", id:1, checked: false}, {label:"香蕉", id:2, checked: false}, {label:"菠萝", id:3, checked: false}],
      dateflage:false,
      dated:{}
    }
  },
  route:{
    data: function(){
      setTitle(this.$store, "表单");
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    validateHandler: function(d) {
      if(d.res == "success") {
        this.formData[d.name] = d.value
      }
      this.$set("formData", Object.assign({}, this.formData));
    },

    checkValidate: function(d) {
      if(d.res == "success") {
        this.ckdata[d.name] = d.value || ""
      }
      this.$set("ckdata", Object.assign({}, this.ckdata));
    },

    datevalidate: function(d){
      console.log(d);
      if(d.res == "success") {
        this.dated[d.name] = d.value || ""
      }
      this.$set("dated", Object.assign({}, this.dated));
    },

    ageValidate: function(value) {
      let f = value.slice(0, 1);
      if(f == "0") return {res:"fail", msg:"年龄第一位不能是0"}
      return true;
    },
    chan: function(t){
      if(t == "1") this.validate = !this.validate
      else if(t == "2") this.ckvalidate = !this.ckvalidate
      else if(t == "3") this.dateflage = !this.dateflage
    }

  },
  components: {formtext,panel, formck, formrd, datem}
}
</script>
