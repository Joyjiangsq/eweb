<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="css.mcSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）-->
      <pagepanel v-if="!isEAdmin">
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
                    <tb :headercaption="headercaption" url="material" :params="searchParams" :datas="rightData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
              <div style="clear:both"></div>
      </pagepanel>
      <!--新增材料分类对话框-->
        <materialitem :formData="newData" :title="title" @success="addSuccess" :show="showAdd" :level="levelEqualZero"></materialitem>
        <!--选品对话框-->
        <selectproductdialog :show="showSelectDialog" :params="{}" @getcheck="addCheckedList" ></selectproductdialog>
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
import mdialog from "component/blockcommon/mealDialog";

let headerData = [{type:"operator", name:"操作"},{name:"产品编码", labelValue:"ItemCode", type:"data"},
             {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"cizhuancc", component:mdialog},
             {name:"所属包", labelValue:"SWW", type:"data"},
             {name:"二级分类", labelValue:"FirmName", type:"data"},
             {name:"品牌", labelValue:"U_Brand", type:"data"},
             {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
              {name:"颜色", labelValue:"U_Colour", type:"data"},
             {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
             {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}];
export default {
    mixins:[pageBase],
    data(){
      return {
        css,
        title: '',
        reload: false,
        levelEqualZero: false,  //控制新增框所属包显示
        showSelectDialog: false,
        moduleName:"材料管理",
        curItem:{},               // 删除或者编辑当前的 数据
        headercaption: headerData,
        hideDialogIn: true,
        curAction:"add",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
        showAddMa: false,
        showAdd: false,     //弹框显示隐藏
        deleteTag: false,         // 删除确认弹框显示隐藏
        canAdd: false,  //控制新增按钮状态
        selectedLevel: 0,          //默认添加材料的等级
        datas: [],
        rightData: [],
        codeParams: {},
        da:{},
        addListLevel:1,
        totals:0,
        actionMap:{     //根据selectedLevel不同映射
            0:{url:"material-category/lv1",params:{}},
            1:{url:"material-category/lv2",params:{}},
            2:{url:"material-category/lv3",params:{}}
        },
        newData: {}, //materialItem組件
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
            return [{type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"产品名称: "},
                    {type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"型号: "}];
        },
        // 判断当前是否为e站（分站）
        isEAdmin: function(){
            return Utils.isEAdmin();
           
        }
    },
    ready(){
    },
    methods:{
        //materialItem组件弹框表单验证成功
        addSuccess: function() {
            if(this.selectedLevel >0) delete this.newData.pkg
            if(this.curAction == "add") {
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.newData, action.params);   //将参数优先
                    this.$http.post(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "新增成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
                        this.canAdd = false;
                    });
                }else {
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.newData, action.params);
                    this.$http.put(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "修改成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
                        this.canAdd = false;
                    });
                }
        },
        //表格数据
        getTableDetail: function(){
            this.load = !this.load;
        },
        //添加材料分类之后再次刷新渲染三级
        getData: function(){
            this.reload = !this.reload; 
        },
        addoneHandler: function() {

        },
        //选品添加
        addCheckedList: function(d) {
            
            for(let i = 0; i<d.length; i++){
                if(this.addListLevel == 1){
                    console.log(d);
                    console.log('第一极选品增加');
                    d[i].lv1_name = this.da.lv1_name;
                    d[i].lv1_code = this.da.lv1_code;
                    if(d[i].lv2_code && d[i].lv2_name && d[i].lv3_code && d[i].lv3_name){
                        delete d[i].lv2_code;
                        delete d[i].lv2_name;
                        delete d[i].lv3_code;
                        delete d[i].lv3_name;
                    }
                }else if(this.addListLevel == 2){
                    d[i].lv1_name = this.da.lv1_name;
                    d[i].lv1_code = this.da.lv1_code;
                    d[i].lv2_name = this.da.lv2_name;
                    d[i].lv2_code = this.da.lv2_code;
                    if(d[i].lv3_code && d[i].lv3_name){
                        delete d[i].lv3_code;
                        delete d[i].lv3_name;
                    }
                }else if(this.addListLevel == 3){
                    d[i].lv1_name = this.da.lv1_name;
                    d[i].lv1_code = this.da.lv1_code;
                    d[i].lv2_name = this.da.lv2_name;
                    d[i].lv2_code = this.da.lv2_code;
                    d[i].lv3_name = this.da.lv3_name;
                    d[i].lv3_code = this.da.lv3_code;
                }
            }
            this.$http.post(this.$Api+"material",JSON.stringify(d)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "新增成功");
                        this.getTableDetail();
             });
            this.showSelectDialog = !this.showSelectDialog;
        },
        toSelect: function(){
            if(!this.canAdd) return;
            this.showSelectDialog = !this.showSelectDialog;
        },
        addMenu: function(){
             this.$set("curAction", "add");
            this.title = "新增材料";
            this.showAdd = !this.showAdd;
            this.selectedLevel = 0;
            this.levelEqualZero = true;
        },
        treeClickHandler: function(d) {
            this.canAdd = true;
            this.selectLevel = true;
            if(d.level == 1) {
                this.da.lv1_name = d.one.name;
                this.da.lv1_code = d.one.code;
                this.addListLevel = 1;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code
            }
            else if(d.level == 2){
                this.da.lv2_name = d.sone.name;
                this.da.lv2_code = d.sone.code;
                this.addListLevel = 2;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code;
                this.searchParams.lv2_code = d.sone.code;
            }
            else if(d.level == 3){
                this.da.lv3_name = d.mone.name;
                this.da.lv3_code = d.mone.code;
                this.addListLevel = 3;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code;
                this.searchParams.lv2_code = d.sone.code;
                this.searchParams.lv3_code = d.mone.code;
            } 
            this.getTableDetail();
        },
        addClickHandler: function(d) {
            // 设置参数
            this.title = "新增材料";
            this.newData = {};
            //  this.addMenu();
            this.showAdd = !this.showAdd;
            this.selectedLevel = 0;
            this.levelEqualZero = true;
             if(d.action="add"){
                this.$set("curAction", "add");
             }
            if(d.level == 1){
                this.levelEqualZero = false;
                //添加參數lv1_code
                this.newData.lv1_code = d.one.code;
                this.selectedLevel =1;
            }else if(d.level ==2){
                this.levelEqualZero = false;
                this.newData.lv1_code = d.one.code;
                this.newData.lv2_code = d.sone.code;
                this.selectedLevel =2;
            }
        },
        deleteClickHandler: function(d) {
            
        },
        editClickHandler: function(d) {
            this.title = "编辑材料";
            // this.addMenu();
            this.showAdd = !this.showAdd;
            this.selectedLevel = 0;
            this.levelEqualZero = true;
            if(d.action="edit") this.$set("curAction", "edit");
            //编辑时显示原数据
             if(d.level == 1) {
                 this.levelEqualZero = true;
                 this.selectedLevel =0;
                  this.newData = Utils.cloneObj(d.one);
                 this.newData.lv1_code = d.one.code;
             }else if(d.level == 2) {
                 this.levelEqualZero = false;
                 this.selectedLevel =1;
                 // 克隆数据，不破坏源数据
                 this.newData = Utils.cloneObj(d.sone); 
                 if(this.newData.lv3) delete this.newData.lv3;
                 if(this.newData.code) delete this.newData.code;
                 if(!this.newData.selected) delete this.newData.selected;
                 if(!this.newData.show) delete this.newData.show;
                 this.newData.lv2_code = d.sone.code;
             }else if(d.level == 3) {
                 this.levelEqualZero = false;
                 this.selectedLevel =2;
                 this.newData = Utils.cloneObj(d.mone);
                 if(this.newData.code) delete this.newData.code;
                 if(!this.newData.selected) delete this.newData.selected;
                 if(!this.newData.show) delete this.newData.show;
                this.newData.lv2_code = d.sone.code; 
                this.newData.idx = d.index;
            }
        },
        confirmDelete: function(d){
            console.log('delete');
            console.log(this.curItem);
            console.log('delete');
            if(d.action == "confirm") {
                this.$http.delete(this.$Api+"material", {params: {"ItemCode": this.curItem.ItemCode}}).then((res)=>{
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