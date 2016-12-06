<template>
  <div :class="css.mcBox">
      <div  :class="css.mcLeft"> 
        <div :class='css.opRow'>
            <span>材料分类</span>
        </div>
        <div :class='css.codeBox'>
             <codeview @treeclick="treeClickHandler" :edit="false"></codeview>
        </div>
      </div>
      <div  :class="css.mcRight">
          <div :class="css.rightBox">
                table
          </div>
      </div>
  </div>
</template>

<script>
import icon from "component/sprite/icon";
import css from './b.css';
import codeview from "component/tree/codeView";
import basePage from "common/mixinPage";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
export default {
    mixins:[basePage],
    data(){
      return {
        css,
        moduleName:"施工报价管理",
      }
    },
    ready(){
    },
    methods:{
        treeClickHandler: function(d) {
            console.log(d);
           
        },

    },
    components:{codeview, icon, propertytext,formtext}

}
</script>
