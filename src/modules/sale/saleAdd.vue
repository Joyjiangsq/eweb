<template>
          <div :class="css.paddingType">
            <panel>
                <div slot="panelTitle">
                       客户信息
                </div>
                <div slot="panelContent">
                      <formtext labelname="客户姓名：" value="" placeholder="请输入姓名"  formname='name' length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="联系电话：" :phone="true" :number="true" :length="11" value="" placeholder=""  formname='phone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员：" value="" placeholder=""  formname='depid' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员电话：" :phone="true"  :length="11" :number="true" value="" placeholder=""  formname='depphone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <cascadeform  labelname="地址：" pid="" aid="" cid="" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                </div>
            </panel>

            <panel>
                <div slot="panelTitle">
                       价格包信息
                </div>
                <div slot="panelContent">
                       <comboxform keyid="id" labelname="组包选择：" keyname="name" formname="parentName" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                       <formtext labelname="房本面积：" unit="平米" value="" placeholder=""  formname='area' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <formtext labelname="卫生间数量：" unit="个" value="" placeholder=""  formname='wcs' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <comboxform keyid="id" labelname="是否有电梯：" keyname="name" formname="has" :datas="hasDianti" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                       <formtext labelname="一口价：" unit="元" value="" placeholder=""  formname='oneprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <formtext labelname="实收金额：" unit="元" value="" placeholder=""  formname='realprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
            </panel>

          </div>
          <div class="">
                <tblab></tblab>
          </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import comboxform from "component/form/fmCombobox";
import css from "./sale.css";
import tblab from "component/block/typeLab";
export default {
  data: function () {
    return {
      css,
      validate: false,
      packageDatas: [{name:"国名包", id:1}, {name:"名品包", id:2}, {name:"尊享包", id:3}],
      hasDianti:[{name:'是', id:1},{name:'否', id:2}], // 是否有电梯
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    validateHandler: function(d){
        console.log(d);
    },

  },
  components: {panel, formtext, cascadeform,comboxform, tblab},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"新增销售订单"}]);
    }
  }
}
</script>
