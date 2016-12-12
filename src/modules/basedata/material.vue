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
                 </div>
                 <div :class='css.codeBox'>
                    <codeview @treeclick="treeClickHandler" :edit="false"></codeview>
                 </div>
              </div>
              <div  :class="css.mcRight">
                 <div :class="css.rightBox">
                    <tb :headercaption="headercaption" url="users" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
      </pagepanel>
      <!--e站 no-btn-->
      <pagepanel v-else>
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
                    <tb :headercaption="headercaption" url="users" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
      </pagepanel>
      <!--新增对话框-->
      <dialog :flag.sync="showFormDialog" title="新增材料" @dialogclick="dialogClickHandler" >
          <div slot="containerDialog" :class="css.dBox">
              <div class="" v-if="hideDialogIn">
                <formtext labelname="分类编码" :read="true"  :value.sync="" formname=""  :validatestart="" @onvalidate="" ></formtext>
                <formtext labelname="分类名称" :read="true"  :value.sync="" formname=""  :validatestart="" @onvalidate="" ></formtext>
                <materialitem ></materialitem>
              </div>
          </div>
      </dialog>
  </div>
</template>

<script>
import materialitem from "./materialItem";
import Utils from "common/Utils.js";
import icon from "component/sprite/icon";
import formdim from "component/form/formDim";
import formck from "component/form/formCheckBox";
import formrd from "component/form/formRadio";
import css from './b.css';
import codeview from "component/tree/codeView";
import pageBase from "common/mixinPage.js";
import formtext from "component/form/formText";
let headerData = [{name:"选择", labelValue:"", type:"data"},{name:"材料分类", labelValue:"", type:"data"},{name:"材料分类", labelValue:"",type:"data"},
                  {name:"产品编码", labelValue:"",type:"data"},{name:"产品名称", labelValue:"",type:"data"},
                  {name:"品牌", labelValue:"", type:"data"},{name:"型号", labelValue:"", type:"data"},{name:"规格", labelValue:"", type:"data"},{name:"材质", labelValue:"", type:"data"},
                  {name:"颜色", labelValue:"", type:"data"},{name:"单位", labelValue:"", type:"data"},{name:"标签", labelValue:"", type:"data"},{name:"销售价", labelValue:"", type:"data"},
                  {name:"成本价", labelValue:"", type:"data"},{name:"供应商", labelValue:"", type:"data"},{name:"启用", labelValue:"", type:"data"},]
export default {
    mixins:[pageBase],
    data(){
      return {
        css,
        isEAdmin: false,
        moduleName:"材料管理",
        headercaption: headerData,
        showFormDialog: false,
        hideDialogIn: true,
        btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
        // tableEvents:{
        //     operatorRender: function(d){
        //         let bdatas = [{name:"密码重置", action:"rebuild",icon:"icon-key", data:d},{name:"编辑", action:"edit",icon:"icon-edit", data:d}];
        //         if(d.ValidFor == "N") bdatas.unshift({name:"启用", action:"open", icon:"icon-check", data:d})
        //         else bdatas.unshift({name:"禁用", action:"forbidden", icon:"icon-forbidden", data:d});
        //         return bdatas;
        //     },
        //     operatorHandler: function(d){
        //         this.curopData = Utils.cloneObj(d.data);
        //         if(d.action == "open") this.changeOpen("Y");
        //         else if(d.action == "forbidden") this.changeOpen("N");
        //         else if(d.action == "rebuild") this.$set("resetDialog", !this.resetDialog);
        //         else if(d.action == "edit") this.$set("showRolesDialog", !this.showRolesDialog);
        //     }
        // },
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
            return [{type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"产品名称: "},
                    {type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"型号: "}];
        },
        // 判断当前是否为e站（分站）
        isEAdmin() {
            if(Utils.isEAdmin()) {this.isEAdmin = true}
            else {this.isEAdmin = false};
        }
    },
    ready(){
    },
    methods:{
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
        },
        treeClickHandler: function(d) {
            console.log(d);
           
        },

    },
    components:{codeview, icon,formtext,formdim,formck,formrd,materialitem}

}
</script>
