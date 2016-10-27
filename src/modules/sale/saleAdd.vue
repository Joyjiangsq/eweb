<template>
          <div :class="css.paddingType">
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>
                <div slot="panelContent">
                      <formdim labelname="客户信息："  placeholder="姓名/手机号" :value=""  @fromdim="formDimClick"  formname='userName' :validatestart="validate" @onvalidate="validateHandler"></formdim>
                      <cascadeform :read="true"  labelname="业主地址：" :detailneed="true" :must="false" value= "安徽省,芜湖市,弋江区,惺惺惜x惺惺" formname="address"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                      <comboxform keyid="id" labelname="组包选择：" keyname="name" formname="parentName" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="房本面积：" unit="平米" value="" placeholder=""  formname='area' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="卫生间数量：" unit="个" value="" placeholder=""  formname='wcs' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <comboxform keyid="id" labelname="是否有电梯：" keyname="name" formname="has" :datas="hasDianti" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext :read="true"  labelname="一口价：" unit="元" value="" placeholder=""  formname='oneprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="实收金额：" unit="元" value="" placeholder=""  formname='realprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <comboxform keyid="id" labelname="订单类型：" keyname="name" formname="parentName" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                      <formtext labelname="跟单员：" value="" placeholder=""  formname='depid' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员电话：" :phone="true"  :length="11" :number="true" value="" placeholder=""  formname='depphone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
            </panel>




          </div>
          <div :class="css.dataArea">
                <tblab @fail="failHandler" :startvalidate="startvalidate" @success="successHandler" v-if="show"></tblab>
          </div>
          <div :class="css.footerBar">
              <btn @clickaction="btnClickHandler" >下单</btn>
          </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import comboxform from "component/form/fmCombobox";
import css from "./sale.css";
import btn from "component/sprite/button.vue";
import tblab from "component/block/typeLab";
import saleAdapter from "./adapter.js";
import formdim from "component/form/formDim";
export default {
  data: function () {
    return {
      css,
      validate: false,
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      packageDatas: [{name:"国名包", id:1}, {name:"名品包", id:2}, {name:"尊享包", id:3}],
      hasDianti:[{name:'是', id:1},{name:'否', id:2}], // 是否有电梯
      show: false
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.show = true;
    })
  },
  attached: function () {},
  methods: {
    validateHandler: function(d){
        console.log(d);
    },
    // 失败回调
    failHandler: function(d) {
        // console.log(d);
    },
    // 成功回调
    successHandler: function(d) {
        // console.log(d);
        console.log(JSON.stringify(d));
        saleAdapter(d);
        this.$http.post(this.$Api+"sales",JSON.stringify({sub_orders:d})).then((res) => {
            var d = res.json();
            console.log(d);
        },(error) =>{
          console.log(error);
        })
    },
    btnClickHandler: function() {
      this.startvalidate = !this.startvalidate;
      this.validate = !this.validate; // 表单
    },
    formDimClick: function(d) {
        console.log(d);

    }
  },
  components: {panel, formtext, cascadeform,comboxform, tblab, btn,formdim},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"新增销售订单"}]);
    }
  }
}
</script>
