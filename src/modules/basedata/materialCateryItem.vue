<template>
    <div :class="css.itemList">
          <!--<div class="" v-for="(index, one) in houselist">-->
                <span :class="css.titlerow">材料信息</span>
                <div>
                    <formtext labelname="分类编码: " :must="false"  :read="false" formname="" :value.sync="" :validatestart="" @onvalidate=""></formtext>
                    <formtext labelname="分类名称：" :must="false" :read="false" formname="" :value.sync="" :validatestart="" @onvalidate=""></formtext>
                    <formcb keyid="name" labelname="所属包：" :read="curaction == 'detail'" dropfixed="dropfixed" :value.sync="data.U_Renovation2"  keyname="name" :must="false" formname="U_Renovation2" :datas="formArray.decorateStyle" :validatestart="formControl.validate" @onvalidate="formControl.validateHandler"></formcb>
                    <formtext labelname="备注："  :must="false" :read="false" formname="" :value.sync="" :validatestart="" @onvalidate=""></formtext>
                    <formrd labelname="启用：" :vertical="true" formname="" :value.sync="" :datas="[{label:'是', id:'Y', checked: false},{label:'否', id:'N', checked: false},]"  :validatestart="" @onvalidate=""></formrd>
                </div>

          <!--</div>-->
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
   
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
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
