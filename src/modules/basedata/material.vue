<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="css.mcSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）btn-新增&修改-->
      <pagepanel v-if="!isEAdmin">
          {{newData1 | json}}
              <div  :class="css.mcLeft"> 
                 <div :class='css.opRow'>
                    <span>材料分类</span>
                    <span :class='css.operBtn' @click="addMenu"><icon iconname="icon-add"></icon></span>
                 </div>
                 <div :class='css.codeBox'>
                    <codeview  url="material-category" :params="codeParams" :datas="datas" :reload="reload" @treeclick="treeClickHandler" @addclick="addClickHandler" @editclick="editClickHandler" @deleteclick="deleteClickHandler"></codeview>
                 </div>
              </div>
              <div  :class="css.mcRight">
                 <btn :class="" @click="toSelect">选品</btn>
                 <div :class="css.rightBox">
                    <tb :headercaption="headercaption" url="users" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
              <div style="clear:both"></div>
      </pagepanel>
      <!--新增材料分类对话框-->
        <materialitem :formData="newData" @success="addSuccess" :show="showAdd"></materialitem>
        <!--选品对话框-->
        <selectproductdialog :show="showSelectDialog" :params="{}" ></selectproductdialog>

        <!--<dialog :flag.sync="showSelectDialog" title="选品" >
            <div slot="containerDialog">
                <chuguitb :hash="false" :toload="toload" @addone="addoneHandler" :listdata.sync="vlist"></chuguitb>
            </div>
            <div slot="footerDialog"></div>
        </dialog>-->
       <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
  </div>
</template>

<script>
import selectproductdialog from "component/blockcommon/selectProductDialog";
import dialogtip from "component/dialog/dialogTip";
import btn from "component/sprite/button.vue";
import chuguitb from "component/block/tblist/chuguiList";
import materialitem from "./materialItem";
import Utils from "common/Utils.js";
import icon from "component/sprite/icon";
import css from './b.css';
import codeview from "component/tree/codeView";
import pageBase from "common/mixinPage.js";

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
        reload: false,
        showSelectDialog: false,
        isEAdmin: false,
        moduleName:"材料管理",
        headercaption: headerData,
        showFormDialog: false,
        hideDialogIn: true,
        curAction:"add",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
        btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
        showAddMa: false,
        showAdd: false,     //弹框显示隐藏
        addTag:false,
        deleteTag: false,         // 删除确认弹框显示隐藏
        validate: false,            // 表单验证动作的开关
        selectedLevel: 0,          //默认添加材料的等级
        datas: [],
        detail:{name:'',id:''},
        codeParams: {},
        index:1, 
        actionMap:{     //根据selectedLevel不同映射
            0:{
                url:"material-category/lv1",
                params:{}
            },
            1:{
                url:"material-category/lv2",
                params:{}
            },
            2:{
                 url:"material-category/lv3",
                params:{}
            }
        },
        newData: {}, //materialItem組件
        tableEvents:{
            operatorRender: function(d){
            return [{name:"编辑",action:"edit",icon:"icon-edit", data: d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
            },
            operatorHandler: function(d){
              if(d.action == "edit") {
                this.$set("curAction", "edit");
                // this.formData = Utils.cloneObj(d.data);
                // this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
              else if(d.action == "add") {
                this.$set("curAction", "add");
                // this.formData = Utils.cloneObj(d.data);
                // this.dialogMap.showFormDialog = !this.dialogMap.showFormDialog;
              }
        }
        },
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
        isEAdmin: function(){
            if(Utils.isEAdmin()) {this.isEAdmin = true}
            else {this.isEAdmin = false};
        }
    },
    ready(){
    },
    methods:{
        //materialItem组件弹框表单验证成功
        addSuccess: function() {
            if(this.curAction == "add") {
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.newData, action.params);   //将参数优先
                    if(this.selectedLevel >0){
                        delete this.newData.pkg
                    }
                    this.$http.post(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "新增成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
                    });
                }else {
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.newData, action.params);
                    if(this.selectedLevel >0){
                        delete this.newData.pkg
                    }
                    this.$http.put(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "新增成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
                    });
                }
        },
        //添加材料分类之后再次刷新渲染三级
        getData: function(){
            this.reload = !this.reload; 
        },
        addFail: function() {
            this.addTag = false;
        },
        addoneHandler: function() {

        },
        toSelect: function(){
            // this.$set("toload", true);
            this.showSelectDialog = !this.showSelectDialog;
        },
        addMenu: function(){
            this.showAdd = !this.showAdd;
            this.selectedLevel = 0;
            this.index = 1;
        },
        treeClickHandler: function(d) {
            console.log(d);
            console.log('d的等级是'+d.level);
            if(d.level == 1) {this.setData(d.one)}
            else if(d.level == 2) this.setData(d.sone)
            else if(d.level == 3) this.setData(d.mone);
        },
        setData: function(d){
            this.detail = {
                name:d.name, id:d.id  
            };
        },
        addClickHandler: function(d) {
            // 设置参数
             this.addMenu();
             if(d.action="add"){
                this.$set("curAction", "add");
             }
            if(d.level == 1){
                //添加參數lv1_code
                this.newData.lv1_code = d.one.code;
                this.selectedLevel =1;
            }else if(d.level ==2){
                this.newData.lv1_code = d.one.code;
                this.newData.lv2_code = d.sone.code;
                this.selectedLevel =2;
            }
            
        },
        deleteClickHandler: function(d) {

        },
        editClickHandler: function(d) {
            console.log(d);
            this.addMenu();
            if(d.action="edit"){
                this.$set("curAction", "edit");
             }
            //编辑时显示原数据
             if(d.level == 1) {
                 this.selectedLevel =0;
                  this.newData = d.one;
                //  {lv1_code: 'MC101',name: '国民包', usable: true, pkg: '国民包'}
                 this.newData.lv1_code = d.one.code;
             }else if(d.level == 2) {
                 this.selectedLevel =1;
                 this.newData = Utils.cloneObj(d.sone);
                 if(this.newData.lv3) delete this.newData.lv3;
                 if(this.newData.code) delete this.newData.code;
                 if(!this.newData.selected) delete this.newData.selected;
                 if(!this.newData.show) delete this.newData.show;
                //  {lv2_code: 'MC101101', name: '瓷砖', usable: true}
                 this.newData.lv2_code = d.sone.code;
             }else if(d.level == 3) {
                 console.log(d);
                 console.log(d.index);
                 this.selectedLevel =2;
                 this.newData = d.mone;
                 // {idx: 1, lv2_code: 'MC1011001', name: '大地砖', usable: true}
                this.newData.lv2_code = d.sone.code; 
                this.newData.idx = d.index;   
            }

            
        },
        resetData: function(d) {
            console.log(d);
        },
        confirmDelete: function(d){
            if(d.action == "confirm") {
                this.$http.delete(this.$Api+"employees", {params: {"CardCode": this.curItem.CardCode}}).then((res)=>{
                    this.$set("deleteTag", !this.deleteTag);
                    this.loadlist();
                    this.showMsg("success", "删除成功！");
                });
            }
        },

    },
    components:{codeview, icon,dialogtip,materialitem,chuguitb,btn,selectproductdialog}

}
</script>