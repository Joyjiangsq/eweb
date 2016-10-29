<template lang="html">
    <div >
      <cascadeform  labelname="客户地址："  :detailneed="true" :value.sync= "data.Address" :detailv.sync="data.detail" formname="Address" :vertical="true" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></cascadeform>
      <formtext labelname="面积：" unit="平米" :number="true" formname="U_Acreage" :must="false" :value.sync="data.U_Acreage" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <formdt labelname="交房时间："  dropfixed="dropfixed"  :must="false" formname="U_OthersDate" :value.sync="data.U_OthersDate" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formdt>
      <formtext labelname="装修预算："  :number="true" unit="元" :must="false" :value.sync="data.prePrice" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <formcb keyid="name" labelname="装修风格：" dropfixed="dropfixed" :value.sync="data.U_Renovation2"  keyname="name" :must="false" formname="U_Renovation2" :datas="formArray.decorateStyle" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
      <formcb keyid="name" labelname="房屋类型：" dropfixed="dropfixed" :value.sync="data.U_HouseType"  keyname="name" :must="false" formname="U_HouseType"  :datas="formArray.houseType" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
      <formtext labelname="卫生间数量："  :number="true" unit="个" :must="false" :value.sync="data.U_ToiletNum" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <!-- <formcb keyid="name" labelname="是否有电梯：" dropfixed="dropfixed" keyname="name" :must="false" formname="U_IsElevator"  value.sync="data.U_IsElevator" :datas="hasDianti" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb> -->
      <formcb keyid="name" labelname="是否有电梯：" dropfixed="dropfixed" :value.sync="data.U_IsElevator"  keyname="name" :must="false" formname="U_IsElevator"  :datas="hasDianti" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
      <formtext labelname="备注：" formname="Notes" :must="false" :value.sync="data.Notes" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <formtext labelname="天猫订单：" :must="false" formname="U_TmallOrderId" :value.sync="data.U_TmallOrderId" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <formtext labelname="天猫订单金额：" :must="false" formname="U_TmOrAmout" :value.sync="data.U_TmOrAmout" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <formtext labelname="旺旺号：" :must="false" formname="U_WWId" :value.sync="data.U_WWId" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext>
      <!-- <formtext labelname="销售订单号：" :must="false" :value.sync="data.U_FZSalesOrder" formname="U_FZSalesOrder" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formtext> -->
    </div>
</template>

<script>
import {decorateStyle, houseType} from "config/const";
import formdt from "component/form/formDate";
import formcb from "component/form/fmCombobox";
import css from "./house.css";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
export default {
  props:{
      data:{
        default: function(){
          return {}
        }
      },

      startvalidate:{
        default: false
      }
  },
  data: function () {
    return {
      css,
      hasDianti:[{name:'是', id:1},{name:'否', id:2}], // 是否有电梯
      // 类型列表
      formArray:{
        decorateStyle:decorateStyle,
        houseType: houseType
      },

      formControl:{
          validate: false,
          validateHandler: function(d){   // 表单验证
                if(d.res == "fail") this.$dispatch("errorhp");
          }
      },
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
          console.log(this.data);
    }, 1000)
  },
  attached: function () {},
  methods: {},
  components: {formdt, formcb, formtext, cascadeform},
  watch:{
    "startvalidate": function(){
        this.formControl.validate = !this.formControl.validate;
    }
  }
}
</script>
