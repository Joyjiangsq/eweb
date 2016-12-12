<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="css.mcSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）btn-新增&修改-->
      <pagepanel v-if="!isEAdmin">
              <btnbar :buttons="btnsData" :events="btnEvents"></btnbar>
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
                        <div v-else>
                            <tb :headercaption="headercaption" url="users" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
                            <pg :totals="totals" :curpage="searchParams.page"></pg>
                         </div>
                    </div>
              </div>
      </pagepanel>
      <!--e站 no-btn-->
      <pagepanel v-else>
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
      </pagepanel>
      <!--新增对话框-->
      <dialog :flag.sync="showFormDialog" title="新增材料" @dialogclick="dialogClickHandler" >
          <div slot="containerDialog" :class="css.dBox">
              <div class="" v-if="hideDialogIn">
                <formtext labelname="一级分类: " :read="true"  :value.sync="" formname=""  :validatestart="" @onvalidate="" ></formtext>
                <mcateryitem ></mcateryitem>
              </div>
          </div>
      </dialog>
        <dialog :flag.sync="showAdd" title="新增菜单" @dialogclick="dialogClickHandler">
                <div  slot="containerDialog">
                        <formtext labelname="菜单名称：" :value.sync="menuData.name" placeholder="请输入菜单名称" :vertical="true" formname='menuName'  :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
        </dialog>
  </div>
</template>

<script>
import mcateryitem from "./materialCateryItem";
import icon from "component/sprite/icon";
import css from './b.css';
import codeview from "component/tree/codeView";
import pageBase from "common/mixinPage";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
let headerData = [{name:"选择", labelValue:"", type:"data"},{name:"一级分类", labelValue:"", type:"data"},{name:"分类编码", labelValue:"",type:"data"},
                  {name:"分类名称", labelValue:"",type:"data"},{name:"是否允许减项", labelValue:"",type:"data"},
                  {name:"是否允许互换", labelValue:"", type:"data"},{name:"启用", labelValue:"", type:"data"},{name:"所属包", labelValue:"", type:"data"}]
                  
export default {
    mixins:[pageBase],
    data(){
      return {
        css,
        moduleName:"材料分类管理",
        detail:{},
        showAdd: false,
        menuData:{name:""},
        validate: false,
        headercaption: headerData,
        btnsData:[{name:"新增", icon:"icon-add", action:"add"},{name:"修改", icon:"icon-edit", action:"export"}],
        showFormDialog: false,
        hideDialogIn: true,
        btnEvents:{
            btnClick: function(d){
                if(d.action == "add") this.$set("showFormDialog", !this.showFormDialog);
                else if(d.action == "") {
                window.open(this.$Api+"users/download?" + $.param(this.searchParams));
                }
            }
        }     
      }
    },
    computed:{
        sdata: function(){
            let q = this.$route.query;
            return [{type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"分站: "},
                    {type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"分店: "}];
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
        },
         // 新增权限用户对话框
        dialogClickHandler: function(d) {
            if(d.action == "confirm") {
                this.addTag = true;
                this.newForm.validate = !this.newForm.validate;
                setTimeout(()=>{
                    if(this.addTag) {
                        this.$http.post(this.$Api+"users",JSON.stringify(this.addFormData)).then((res) => {
                            var d = res.json();
                            this.showFormDialog = !this.showFormDialog;
                            this.loadlist();
                            this.showMsg("success", "新增成功");
                            this.addFormData = {CardCode:"", CardName:"",phone:"",ValidFor:"Y",roles:"",position:""}
                        },(error) =>{
                            this.showMsg("error", error.msg);
                        })
                    }
                },30)
            }
        }
    },
    components:{codeview, icon, propertytext,formtext,mcateryitem}

}
</script>
