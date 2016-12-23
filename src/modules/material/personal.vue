<template lang="html">
    <div  :class="">
            <btn v-if="isEAdmin" :class="" @click="toAdd">新增 </btn>
            <tb :headercaption="getHeader"  url="rule-product" :params="sparams"  :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
            <pg :totals="totals" :curpage.sync="sparams.page" :hash="false"  @pagechange="pagechange"></pg>
    </div>
    <dialog :flag.sync="showAdd" title="新增" @dialogclick="dialogClickHandler" >
            <div  class="" slot="containerDialog">
                  <formtext :must="false" :read="true"  labelname="类别：" :vertical="true" :value.sync="formdatas.type" ></formtext>
            </div>
            <div  class="" slot="containerDialog">
                  <div class="m.itemList"> 
                        <formtext :must="true" :read="!isEAdmin" labelname="产品选择：" @focushandler="showNoTypedialog" :vertical="true" :value.sync="formdatas.ItemName" placeholder="请输选择产品" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="true" labelname="分类编码：" :vertical="true" :value.sync="formdatas.lv_code" placeholder="" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="true"  labelname="分类名称：" :vertical="true" :value.sync="formdatas.lv_name" placeholder="" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true"  :read="!isEAdmin"  labelname="总部指导价：" :number="true" :vertical="true" :value.sync="formdatas.rec_price" placeholder="请输入总部指导价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext v-if="!isEAdmin"  :must="true" labelname="分站自营价: " :number="true" :vertical="true" :value.sync="formdatas.self_price" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>
      <!--删除提示-->
      <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
      <!--个性化分类弹框-->
      <selectbuilddialog :show="showTypeDialog" curol="material" @getone="getOne" ></selectbuilddialog>
</template>

<script>
import materialUtil from "./material.js";
import selectbuilddialog from "component/blockcommon/selectBuildDialog";
import typedialog from "component/priceblock/typeDialog";
import formtext from "component/form/formText";
import dialog from "component/dialog/dialog";
import m from "./material.css";
import Utils from "common/Utils.js";
import tb from "component/grid/tableListBase";
import pg from "component/pagination/pagination";
import btn from "component/sprite/button.vue";
import dialogtip from "component/dialog/dialogTip";
let headerData =[{name:"类别", labelValue:"type", type:"data"},{name:"分类编码", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_name", type:"data"},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},{name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},
                    {type:"operator", name:"操作"}];
export default {
  mixins:[materialUtil],
  props:{},
  data: function () {
    return {
      m,
      curItem: {},
      getHeader: headerData,
      sparams:{page:1,type:'个性化'},
      showAdd: false,
      showTypeDialog: false,
      load: true,
      totals: 0,
      load: true,
      validate: false, //验证开关
      validateTag: false, //表单验证
      formdatas:{type:''},
      showNoPerDialog: false,
      deleteTag: false,
      curAction: '',
      tableEvents:{
          operatorRender: function(d){
              return [{name:"编辑", action:"edit",icon:"icon-edit",data:d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
          },
          operatorHandler: function(d){
              this.$set("curItem", d.data);
              if(d.action == "delete") {
                  this.$set("deleteTag", !this.deleteTag);
              }else if(d.action == "edit"){
                  this.title = "调品规则编辑";
                  this.$set("curAction","tbedit");
                  this.showAdd = !this.showAdd;
                  this.formdatas = Object.assign({}, d.data);
              }
          }
      },
    }
  },
  computed: {
      isEAdmin: function(){
          return Utils.isEAdmin();
      },
  },
  ready: function () {
      this.load= !this.load;
  },
  methods: {
      validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
      },
      toAdd: function(){
        this.formdatas.type="个性化";
        this.$set("curAction","add");
        this.showAdd = true;
      },
      dialogClickHandler: function(d){
        this.validateTag = true;
        if(d.action == "confirm") {
            this.validate = !this.validate;
            setTimeout(()=> {
                if(this.validateTag) {
                    if(this.curAction == "add"){
                        this.formdatas.rec_price = this.formdatas.rec_price*1;
                        this.$http.post(this.$Api+"rule-product",JSON.stringify(this.formdatas)).then((res) => {
                            this.showMsg("success", "新增成功");
                            this.showAdd = !this.showAdd;
                            this.formdatas = {};
                            this.load =!this.load
                        });
                    }else if(this.curAction = "tbedit"){
                        if(!this.isEAdmin){
                            this.formdatas.self_price = this.formdatas.self_price*1;
                        }else {
                            // delete this.formdatas.type;
                            // delete this.formdatas.createAt;
                            // delete this.formdatas.self_price;
                            this.formdatas.rec_price = this.formdatas.rec_price*1;
                        }
                        this.$http.put(this.$Api+"rule-product",JSON.stringify(this.formdatas)).then((res) => {
                            this.showMsg("success", "修改成功");
                            this.showAdd = !this.showAdd;
                            this.formdatas ={};
                            this.load =!this.load
                        });
                    }
                }
            },30)
        }
      },
      //个性化focus弹框被选中
      getOne: function(d){
        this.formdatas = Object.assign({}, this.formdatas, d);
      },
      showNoTypedialog: function(){
       this.showTypeDialog = !this.showTypeDialog;
      },
      confirmDelete: function(d){
        if(d.action == "confirm") {
            this.$http.delete(this.$Api+"rule-product", {params: {"_id": this.curItem._id}}).then((res)=>{
                this.$set("deleteTag", !this.deleteTag);
                this.loadlist();
                this.showMsg("success", "删除成功！");
            });
        }
      },
  },
  watch:{},
  components: {formtext,dialog,typedialog,btn,tb,pg,dialogtip,selectbuilddialog}
}
</script>