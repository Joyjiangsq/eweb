<template>
  <div :class="css.mcBox">
      <!--<pagepanel>
              <div :class="css.mcSearch">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>-->
      <!-- （分站）-->
      <pagepanel >
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
        <materialitem :formData="newData" :title="title" @success="addSuccess" :show="showAdd" ></materialitem>
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
             {name:"型号", labelValue:"U_Modle", type:"data"},
              {name:"颜色", labelValue:"U_Colour", type:"data"},
             {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
             {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}];
export default {
    mixins:[pageBase],
    data(){
      return {
        css,
        reload: false,
        showSelectDialog: false,
        moduleName:"材料管理",
        title:"新增",
        curItem:{},               // 删除或者编辑当前的 数据
        headercaption: headerData,
        hideDialogIn: true,
        curAction:"add",             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
        showAddMa: false,
        showAdd: false,     //弹框显示隐藏
        deleteTag: false,         // 删除确认弹框显示隐藏
        // canAdd: false,  //控制新增按钮状态
        selectedLevel: 0,          //默认添加材料的等级
        datas: [],
        rightData: [],
        codeParams: {},
        curLevelData:{level_n: 0}, // 当前层级数据对象
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
        
    },
    ready(){
    },
    methods:{
        //materialItem组件弹框表单验证成功
        addSuccess: function() {
            if(this.curAction == "add") {
                    let action = this.actionMap[this.curLevelData.level_n];
                    this.$http.post(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "新增成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
                    });
                }else {
                    let action = this.actionMap[this.curLevelData.level_n-1];
                    this.$http.put(this.$Api+action.url,JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "修改成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getData();
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
       
        //选品添加
        addCheckedList: function(d) { 
            let pArray = []
            console.log(this.curLevelData);
            for(let i =0; i < d.length; i++) {
                let one = Object.assign({}, d[i], this.curLevelData);
                pArray.push(one);
            }

            this.$http.post(this.$Api+"material",JSON.stringify(pArray)).then((res) => {
                var d = res.json();
                this.showMsg("success", "新增成功");
                this.loadlist();
             });
            this.showSelectDialog = !this.showSelectDialog;
        },
        toSelect: function(){
            if(this.curLevelData.level_n == 0) {
                this.showMsg("warn", "请先选择一个材料分类");
                return false
            }
            this.showSelectDialog = !this.showSelectDialog;
        },
        addMenu: function(){
            this.$set("curAction", "add");
            this.newData = {pkg:"国民包"};
            this.showAdd = !this.showAdd;
            this.curLevelData.level_n = 0;
        },
        treeClickHandler: function(d) {
            this.curLevelData = {level_n: d.level}
            if(d.level*1 >= 1) {
                this.curLevelData.lv1_name = this.curLevelData.lv_name = d.one.name;
                this.curLevelData.lv1_code = this.curLevelData.lv_code = d.one.code;
                this.searchParams= {page:1, lv1_code: d.one.code} ;
            }
            if(d.level*1 >= 2){
                this.curLevelData.lv2_name = this.curLevelData.lv_name = d.sone.name;
                this.curLevelData.lv2_code = this.curLevelData.lv_code = d.sone.code;
                this.searchParams= {page:1, lv2_code: d.sone.code} ;
            }
            if(d.level*1 >= 3){
                this.curLevelData.lv3_name = this.curLevelData.lv_name = d.mone.name;
                this.curLevelData.lv3_code = this.curLevelData.lv_code = d.mone.code;
                this.searchParams= {page:1, lv3_code: d.mone.code} ;
            } 
            this.loadlist();
        },

        addClickHandler: function(d) {
            // 设置参数
            this.title = "新增材料";
            this.newData = {};
            this.showAdd = !this.showAdd;
            this.$set("curAction", "add");
            let tpData = Object.assign({}, this.curLevelData);
            delete tpData.lv_code;
            delete tpData.lv_name;
            this.newData = tpData;
        },
        deleteClickHandler: function(d) {
            
        },
        editClickHandler: function(d) {
            this.title = "编辑材料";
            this.$set("curAction", "edit");
            this.showAdd = !this.showAdd;
            
            if(d.level == 1) this.newData = {
                lv1_code: d.one.code,
                name: d.one.name,
                usable: d.one.usable,
                pkg: d.one.pkg,
            }
            else if(d.level == 2) this.newData = {
                lv2_code: d.sone.code,
                name: d.sone.name,
                usable: d.sone.usable,
            }
            else this.newData = {
                lv2_code: d.sone.code,
                name: d.mone.name,
                usable: d.mone.usable,
                idx: d.index
            }
        },
        confirmDelete: function(d){
            if(d.action == "confirm") {
                this.$http.delete(this.$Api+"material", {params: {"ItemCode": this.curItem.ItemCode}}).then((res)=>{
                    this.$set("deleteTag", !this.deleteTag);
                    this.loadlist();
                    this.showMsg("success", "删除成功！");
                });
            }
        },
    },
    components:{codeview, icon,dialogtip,materialitem,btn,selectproductdialog}

}
</script>