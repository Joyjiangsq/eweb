
<template lang="html">
    <dialog :flag.sync="showAdd" title="新增" @dialogclick="dialogClickHandler" >
            <div  class="" slot="containerDialog">
                  <formtext :must="false" :read="true"  labelname="类别：" :vertical="true" :value.sync="formdatas.type" ></formtext>
            </div>
            <div  class="" slot="containerDialog">
                  <div class="m.itemList"> 
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品前分类：" @focushandler="showTypedialog(1)"  :vertical="true" :value.sync="formdatas.before_code" placeholder="请选择分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品后分类：" @focushandler="showTypedialog(2)" :vertical="true" :value.sync="formdatas.after_code" placeholder="请选择分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品前分类名称：" :vertical="true" :value.sync="formdatas.before_name" placeholder="请输入调品前分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品后分类名称：" :vertical="true" :value.sync="formdatas.after_name" placeholder="请输入调品后分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext :must="true"  :read="!isEAdmin" labelname="总部指导价：" :number="true" :vertical="true" :value.sync="formdatas.rec_price" placeholder="请输入总部指导价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!isEAdmin"  :must="true" labelname="分站自营价: " :number="true" :vertical="true" :value.sync="formdatas.self_price" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>

</template>

<script>
import formtext from "component/form/formText";
import dialog from "component/dialog/dialog";
import m from "./material.css";
export default {
  props:{
        url: {
            default:"rule-product"
        },
        formdatas:{
           default: function() {
            return [];
          }
        },
        isEAdmin:{
            default: false,
            type: Boolean
        },
        show:{
            default: false,
            type: Boolean
        }
  },
  data: function () {
    return {
      m,
      showAdd: false,
      validate: false, //验证开关
      validateTag: false, //表单验证
      
    }
  },
  computed: {},
  ready: function () {
    
  },
  attached: function () {},
  methods: {
      validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
      },
      dialogClickHandler: function(){

      },
      showTypedialog: function(type){

      }
  },
  watch:{
      "show": function(){
          this.showAdd = !this.showAdd
      }
  },
  components: {formtext}
}
</script>