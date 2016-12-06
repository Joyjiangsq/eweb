<template>
  <div :class="css.mcBox">
      <div  :class="css.mcLeft"> 
        <div :class='css.opRow'>
            <span>材料分类</span>
            <span :class='css.operBtn' @click="addMenu"><icon iconname="icon-add"></icon></span>
        </div>
        <div :class='css.codeBox'>
             <codeview @treeclick="treeClickHandler" @addclick="addClickHandler" @editclick="editClickHandler" @deleteclick="deleteClickHandler"></codeview>
        </div>
      </div>
      <div  :class="css.mcRight">
          <div :class="css.rightBox">
              <div v-if="detail.name" :class="css.rightIn">
                    <propertytext key="分类名称" :value="detail.name"></propertytext>
                    <propertytext key="分类编码" :value="detail.id"></propertytext>
                    <!--<propertytext key="是否启用" :value="detail.open"></propertytext>-->
              </div>
              <div v-else>welcome </div>
          </div>
      </div>

        <dialog :flag.sync="showAdd" title="新增菜单" @dialogclick="dialogClickHandler">
                <div  slot="containerDialog">
                        <formtext labelname="菜单名称：" :value.sync="menuData.name" placeholder="请输入菜单名称" :vertical="true" formname='menuName'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
        </dialog>
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
    data() {
      return {
        css,
        moduleName:"施工分类管理",
        detail:{},
        showAdd: false,
        menuData:{name:""},
        validate: false,
       
      }
    },
    ready(){
    },
    methods:{
        treeClickHandler: function(d) {
            console.log(d);
            if(d.level == 1) this.setData(d.one)
            else if(d.level == 2) this.setData(d.sone)
            else if(d.level == 3) this.setData(d.mone);
        },
        setData: function(d){
            this.detail = {
                name:d.name, id:d.id
            }
        },
        addClickHandler: function(d) {
            // 设置参数
            this.addMenu();
        },
        deleteClickHandler: function(d) {

        },
        editClickHandler: function(d) {
            console.log(d);
            if(d.level == 1) this.resetData(d.one)
            else if(d.level == 2) this.resetData(d.sone)
            else if(d.level == 3) this.resetData(d.mone);
            this.addMenu();
        },
        validateHandler: function(d) {

        },
        dialogClickHandler: function(d) {

        },
        resetData: function(d) {
            this.menuData.name = d.name;
            this.menuData.id = d.id;
        },
        addMenu: function(){
            this.showAdd = !this.showAdd;
        }
    },
    components:{codeview, icon, propertytext,formtext}

}
</script>
