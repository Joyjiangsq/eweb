<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）-->
      <pagepanel v-if="!isEAdmin">
              <div  :class="css.mcLeft"> 
                 <div :class='css.opRow'>
                    <span>施工分类</span>
                    <span :class='css.operBtn' @click="addMenu"><icon iconname="icon-add"></icon></span>
                 </div>
                 <div :class='css.codeBox'>
                    <codeview  url="construction-quote-category" :params="codeParams" :datas="datas" :reload="reload" @treeclick="treeClickHandler" @addclick="addClickHandler" @editclick="editClickHandler" @deleteclick="deleteClickHandler"></codeview>
                 </div>
              </div>
              <div  :class="css.mcRight">
                 <btn :class="" @click="toAdd">新增</btn>
                 <div :class="css.rightBox">
                    <tb :headercaption="headercaption" url="construction-quote" :params="searchParams" :datas="rightData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
              <div style="clear:both"></div>
      </pagepanel>
        <!--新增对话框-->
        <buildmgrpriceadd :formdata="newData" :formdatas="formdatas" @success="addSuccess" :show="showAdd" :catery="catery" :showtbedit="showtbedit"></buildmgrpriceadd>
       <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
  </div>
</template>

<script>
import icon from "component/sprite/icon";
import btn from "component/sprite/button.vue";
import chuguitb from "component/block/tblist/chuguiList";
import buildmgrpriceadd from "./buildMgrAdd";
import dialogtip from "component/dialog/dialogTip";
import css from './b.css';
import codeview from "component/tree/codeView";
import basePage from "common/mixinPage";
import propertytext from "component/form/propertyText.vue";
import formtext from "component/form/formText";
import Utils from "common/Utils.js";
let headerData =[{type:"operator", name:"操作"},{name:"项目分类编码", labelValue:"lv1_code", type:"data"},
             {name:"项目分类", labelValue:"lv1_name", type:"data"},
             {name:"项目编码", labelValue:"", type:"data"},
             {name:"项目名称", labelValue:"project_name", type:"data"},
             {name:"工艺说明", labelValue:"description", type:"data"},
             {name:"单位", labelValue:"unit", type:"data"},{name:"销售价", labelValue:"selling_price", type:"data"},
              {name:"成本价", labelValue:"cost_price", type:"data"}];
export default {
    mixins:[basePage],
    data(){
      return {
        css,
        datas: [],
        newData: {},
        formdatas: {},
        codeParams: {},
        curItem:{},
        headercaption: headerData,
        canAdd: false,  //控制新增按钮状态
        reload: false,  //添加分类后刷新分类菜单
        isEAdmin: false, //判断是否为(e)分站
        showAdd: false, //弹框显示隐藏
        catery: false, //切换分类/报价弹出框
        showtbedit: false, //切换表格删除数据弹框
        moduleName:"施工报价管理",
        deleteTag: false,         // 删除确认弹框显示隐藏
        rightData: [],
        curAction:'',             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
        totals: 0,
        selectLevel: 0,            //修改表格数据时排除多余参数
        da:{},
        selectedLevel: 0,
        actionMap:{     //根据selectedLevel不同映射
            0:{url:"construction-quote-category/lv1",params:{}},
            1:{url:"construction-quote-category/lv2",params:{}},
            2:{url:"construction-quote-category/lv3",params:{}}
        },
        tableEvents:{
            operatorRender: function(d){
                return [{name:"修改", action:"edit",icon:"icon-edit",data:d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
            },
            operatorHandler: function(d){
                this.$set("curItem", d.data);
                if(d.action == "delete") {
                    this.$set("deleteTag", !this.deleteTag);
                }else if(d.action == "edit"){
                    this.$set("curAction","tbedit");
                    this.showtbedit = !this.showtbedit;
                    this.showAdd = !this.showAdd;
                     this.newData = Utils.cloneObj(this.curItem);
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
            this.load = !this.load;
        },
        addMenu: function() {
            this.$set("curAction", "add");
            this.formdatas = {};
            this.showAdd = !this.showAdd;
            this.catery = !this.catery;
        },
        //分类组件弹框表单验证成功
        addSuccess: function() {
            if(this.curAction == "add") {
                console.log('this.curAction == add');
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.formdatas, action.params);   //将参数优先
                    this.$http.post(this.$Api+action.url,JSON.stringify(this.formdatas)).then((res) => {
                        this.showMsg("success", "新增成功");
                        this.showAdd = !this.showAdd;
                        this.formdatas = {};
                        this.getData();
                     });
                }else if(this.curAction == "edit"){
                    console.log('this.curAction == edit');
                    let action = this.actionMap[this.selectedLevel];
                    Object.assign(this.formdatas, action.params);
                    this.$http.put(this.$Api+action.url,JSON.stringify(this.formdatas)).then((res) => {
                        this.showMsg("success", "修改成功");
                        this.showAdd = !this.showAdd;
                        this.formdatas = {};
                        this.getData();
                    });
                }else if(this.curAction == "tbedit"){
                    console.log('this.curAction == tbedit');
                    if(this.newData._id) delete this.newData._id;
                    if(this.newData.createAt) delete this.newData.createAt;   
                    this.newData.code = this.curItem.code;
                    this.$http.put(this.$Api+"construction-quote",JSON.stringify(this.newData)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "修改成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getTableDetail();
                    });
                }else if(this.curAction == "tbadd") {
                    console.log('this.curAction == tbadd');
                    this.$http.post(this.$Api+"construction-quote",JSON.stringify(this.newData)).then((res) => {
                        this.showMsg("success", "新增成功");
                        this.showAdd = !this.showAdd;
                        this.newData = {};
                        this.getTableDetail();
                     });
                }
        },
        //添加新增施工报价分类之后再次刷新渲染分类表单
        getData: function(){
            this.reload = !this.reload; 
        },
        treeClickHandler: function(d) {
            this.canAdd = true;
            this.newData = {};
            if(d.level == 1) {
                this.selectLevel = 1; 
                this.newData.lv1_name = d.one.name;
                this.newData.lv1_code = d.one.code;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code;
            }else if(d.level == 2){
                this.selectLevel = 2; 
                console.log('第一步');
                this.newData.lv1_name = d.one.name;
                this.newData.lv1_code = d.one.code;
                this.newData.lv2_name = d.sone.name;
                this.newData.lv2_code = d.sone.code;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code;
                this.searchParams.lv2_code = d.sone.code;
            }else if(d.level == 3){
                this.selectLevel = 3; 
                console.log('打开了第三级');
                this.newData.lv1_name = d.one.name;
                this.newData.lv1_code = d.one.code;
                this.newData.lv2_name = d.sone.name;
                this.newData.lv2_code = d.sone.code;
                this.newData.lv3_name = d.mone.name;
                console.log(d.mone.name);
                this.newData.lv3_code = d.mone.code;
                this.searchParams= {page:1} ;
                this.searchParams.lv1_code = d.one.code;
                this.searchParams.lv2_code = d.sone.code;
                this.searchParams.lv3_code = d.mone.code;
            } 
            this.getTableDetail();
        },
        addClickHandler: function(d) {
            console.log('点击了');
            this.formdatas={};
            this.catery = !this.catery;
            this.showAdd = !this.showAdd;
            if(d.action="add"){
                this.$set("curAction", "add");
            }
            if(d.level == 1){   
                this.formdatas.lv1_code = d.one.code;
                this.selectedLevel =1;
            }else if(d.level ==2){
                this.formdatas.lv1_code = d.one.code;
                this.formdatas.lv2_code = d.sone.code;
                this.selectedLevel =2;
            }
        },
        editClickHandler: function(d){
            this.addMenu();
            if(d.action="edit") this.$set("curAction", "edit");
            //编辑时显示原数据
             if(d.level == 1) {
                 this.selectedLevel =0;
                  this.formdatas = Utils.cloneObj(d.one);
                 this.formdatas.lv1_code = d.one.code;
             }else if(d.level == 2) {
                 this.selectedLevel =1;
                 // 克隆数据，不破坏源数据
                 this.formdatas = Utils.cloneObj(d.sone); 
                 if(this.formdatas.lv3) delete this.formdatas.lv3;
                 if(this.formdatas.code) delete this.formdatas.code;
                 if(!this.formdatas.selected) delete this.formdatas.selected;
                 if(!this.formdatas.show) delete this.formdatas.show;
                 this.formdatas.lv2_code = d.sone.code;
             }else if(d.level == 3) {
                 this.selectedLevel =2;
                 this.formdatas = Utils.cloneObj(d.mone);
                 if(this.formdatas.code) delete this.formdatas.code;
                 if(!this.formdatas.selected) delete this.formdatas.selected;
                 if(!this.formdatas.show) delete this.formdatas.show;
                this.formdatas.lv2_code = d.sone.code; 
                this.formdatas.idx = d.index;
             }
        },
        deleteClickHandler: function(d) {
            
        },
        toAdd: function(){
            if(!this.canAdd) return ;
            this.$set("curAction","tbadd");
            this.showtbedit = !this.showtbedit;
            this.showAdd = !this.showAdd;
        },
        confirmDelete: function(d){
            if(d.action == "confirm") {
                this.$http.delete(this.$Api+"construction-quote", {params: {"_id": this.curItem._id}}).then((res)=>{
                    this.$set("deleteTag", !this.deleteTag);
                    this.loadlist();
                    this.showMsg("success", "删除成功！");
                });
            }
        },
    },
    components:{codeview, icon, propertytext,formtext,dialogtip,buildmgrpriceadd,chuguitb,btn}

}
</script>
