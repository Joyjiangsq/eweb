<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）-->
      <pagepanel v-if="!isEAdmin">
          {{newData | json}}
              <div  :class="css.mcLeft"> 
                 <div :class='css.opRow'>
                    <span>材料分类</span>
                    <span :class='css.operBtn' @click="addMenu"><icon iconname="icon-add"></icon></span>
                 </div>
                 <div :class='css.codeBox'>
                    <codeview  url="construction-quote-category" :params="codeParams" :datas="datas" :reload="reload" @treeclick="treeClickHandler" @addclick="addClickHandler" @editclick="editClickHandler" @deleteclick="deleteClickHandler"></codeview>
                 </div>
              </div>
              <div  :class="css.mcRight">
                 <btn :class="" @click="toSelect">选品</btn>
                 <div :class="css.rightBox">
                    <tb :headercaption="headercaption" url="construction-quote" :params="detail" :datas="rightData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>-->
                    <pg :totals="totals" :curpage="detail.page"></pg>
                 </div>
              </div>
              <div style="clear:both"></div>
      </pagepanel>
      <!--新增材料分类对话框-->
        <!--<buildmgradd :formData="newData" @success="addSuccess" :show="showAdd" ></buildmgradd>-->
        <!--选品对话框-->
        <!--<selectproductdialog :show="showSelectDialog" :params="{}" @getcheck="addCheckedList" ></selectproductdialog>-->
       <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
  </div>
</template>

<script>
import icon from "component/sprite/icon";
import btn from "component/sprite/button.vue";
import chuguitb from "component/block/tblist/chuguiList";
import buildmgradd from "./buildMgrAdd";
import dialogtip from "component/dialog/dialogTip";
import css from './b.css';
import codeview from "component/tree/codeView";
import basePage from "common/mixinPage";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
let headerData =[{type:"operator", name:"操作"},{name:"项目分类编码", labelValue:"", type:"data"},
             {name:"项目分类", labelValue:"", type:"data"},
             {name:"项目编码", labelValue:"", type:"data"},
             {name:"项目名称", labelValue:"", type:"data"},
             {name:"工艺说明", labelValue:"", type:"data"},
             {name:"单位", labelValue:"", type:"data"},{name:"销售价", labelValue:"", type:"data"},
              {name:"成本价", labelValue:"", type:"data"}];
export default {
    mixins:[basePage],
    data(){
      return {
        css,
        datas: [],
        codeParams: {},
        headercaption: headerData,
        isEAdmin: false, //判断是否为(e)分站
        showAdd: false, //弹框显示隐藏
        moduleName:"施工报价管理",
        detail: {page:1},
        rightData: [],
        totals: 0,
        tableEvents:{
            operatorRender: function(d){
                return [{name:"删除", action:"delete",icon:"icon-delete",data:d}]
            },
            operatorHandler: function(d){
             this.$set("curItem", d.data);
             if(d.action == "delete") {
                this.$set("deleteTag", !this.deleteTag);
             }
            }
        },
      }
    },
    computed:{
        sdata: function(){
            let q = this.$route.query;
            return [{type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"供应商名称: "}
                    ];
        },
        // 判断当前是否为e站（分站）
        isEAdmin: function(){
            if(Utils.isEAdmin()) {this.isEAdmin = true}
            else {this.isEAdmin = false};
        }
    },
    ready(){
    },
    methods:{
        //表格数据
        getTableDetail: function(){
            this.detail.page = 1;
            this.load = !this.load;
        },
        addMenu: function() {

        },
        //组件弹框表单验证成功
        addSuccess: function() {

        },
        treeClickHandler: function(d) {
            console.log(d);
        },
        addClickHandler: function(d) {

        },
        editClickHandler: function(d){

        },
        deleteClickHandler: function(d) {
            
        },
        toSelect: function(){
            // this.$set("toload", true);
            // this.showSelectDialog = !this.showSelectDialog;
        },
        confirmDelete: function(d){
            // console.log('delete');
            // console.log(d);
            // console.log('delete');
            // if(d.action == "confirm") {
            //     this.$http.delete(this.$Api+"material", {params: {"ItemCode": d.ItemCode}}).then((res)=>{
            //         this.$set("deleteTag", !this.deleteTag);
            //         this.loadlist();
            //         this.showMsg("success", "删除成功！");
            //     });
            // }
        },
    },
    components:{codeview, icon, propertytext,formtext,dialogtip,buildmgradd,chuguitb,btn}

}
</script>
