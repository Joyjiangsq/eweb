<template>
    <div :class="css.itemList">
          <div class="" v-for="(index, formData) in materialList">
                <span :class="css.titlerow">材料信息</span>
                <div>
                    <formtext labelname="分类名称：" :must="false" :read="false" formname="" :value.sync="formData.lv1_name" placeholder="请输入分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                    <formcb keyid="name" labelname="所属包：" :read="curaction == 'detail'" dropfixed="dropfixed" :value.sync="formData.pkg"  keyname="name" :must="false" formname="" :datas="" :validatestart="validate" @onvalidate="validateHandler"></formcb>
                    <formrd labelname="启用：" :vertical="true" formname="" :value.sync="formData.usable" :datas="[{label:'是', id:'Y', checked: true},{label:'否', id:'N', checked: false},]"  :validatestart="newForm.validate" @onvalidate="newForm.validateHandler"></formrd>
                </div>
          </div>
    </div>
</template>

<script>
import formcb from "component/form/fmCombobox";
import css from './b.css';
import formrd from "component/form/formRadio";
import formtext from "component/form/formText";
import btn from "component/sprite/button";
import icon from "component/sprite/icon";
export default {
  props:{
    materialList:{
      type: Array,
      default:() => [{lv1_name:"", pkg:"",usable:false,}]
    },
  },
  data: function () {
    return {
      css,
    //   formData:{typeName:'',ownerBag:'',remark:'',ValidFor:''}
    newForm:{
          validate: false,
          validate1: false,
          validateHandler: function(d) {
              if(d.res == "fail") {
                  this.addTag = false;
              }
          },
          validateHandler1: function(d) {
              if(d.res == "fail") {
                  this.editTag = false;
              }
          }
      },
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
    validateHandler: function(d){
      if(d.res == "fail") this.$set("validateSuccess", false);
    },
    clickaction: function(){
        this.houselist.push({});
    },
    dealOne: function(index) {
        this.houselist.splice(index,1);
    },
    errorhp: function(){
      this.$dispatch("errorh")
    }
  },
  components: { btn,icon,formtext,formrd,formcb},
  watch:{

  }
}
</script>
