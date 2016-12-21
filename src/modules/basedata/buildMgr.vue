<template>
  <div :class="css.mcBox">
      <pagepanel>
              <div :class="">
                <search  pathname="" :datas="sdata" :events = 'searchEvents'></search>
              </div>
      </pagepanel>
      <!-- （分站）-->
      <pagepanel v-if="isEAdmin">
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
        <buildmgrpriceadd :title="title" :formdata="newData" :formdatas="formdatas" @success="addSuccess" :show="showAdd" :catery="catery" :showtbedit="showtbedit"></buildmgrpriceadd>
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
             {name:"项目编码", labelValue:"code", type:"data"},
             {name:"项目名称", labelValue:"project_name", type:"data"},
             {name:"工艺说明", labelValue:"description", type:"data"},
             {name:"单位", labelValue:"unit", type:"data"},{name:"销售价", labelValue:"selling_price", type:"data"},
              {name:"成本价", labelValue:"cost_price", type:"data"}];
export default {
    mixins:[basePage],
    data(){
      return {
        css,
        title: '',       //弹框抬头标题
        datas: [],
        newData: {},
        formdatas: {},
        codeParams: {},
        curItem:{},
        headercaption: headerData,
        curLevelData:{level_n: 0}, // 当前层级数据对象
        reload: false,  //添加分类后刷新分类菜单
        showAdd: false, //弹框显示隐藏
        catery: false, //切换分类/报价弹出框
        showtbedit: false, //切换表格删除数据弹框
        moduleName:"施工报价管理",
        deleteTag: false,         // 删除确认弹框显示隐藏
        rightData: [],
        curAction:'',             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
        totals: 0,
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
                    this.title = "编辑材料";
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
            return [{type:"combobox", keyname:"ValidFor", labelname:"name", keyid:"id", value:q.ValidFor || "", datas:[{name:"启用", id: 'Y'}, {name:"禁用", id:"N"}], labelcaption:"供应商名称: "}];
        },
        // 判断当前是否为e站（分站）
        isEAdmin: function(){
            return true
            return Utils.isEAdmin();
        }
    },
    ready(){
    },
    methods:{
        //刷新表格数据
        getTableDetail: function(){
            this.load = !this.load;
        },
        addMenu: function() {
            this.title = "新增施工报价分类";
            this.$set("curAction", "add");
            this.formdatas = {};
            this.showAdd = !this.showAdd;
            this.catery = !this.catery;
            this.curLevelData.level_n = 0;
        },
        //弹框表单验证成功
        addSuccess: function() {
            if(this.curAction == "add") {
                    let action = this.actionMap[this.curLevelData.level_n];
                    Object.assign(this.formdatas, action.params);   //将参数优先
                    this.$http.post(this.$Api+action.url,JSON.stringify(this.formdatas)).then((res) => {
                        this.showMsg("success", "新增成功");
                        this.showAdd = !this.showAdd;
                        this.formdatas = {};
                        this.getData();
                     });
                }else if(this.curAction == "edit"){
                    let action = this.actionMap[this.curLevelData.level_n-1];
                    Object.assign(this.formdatas, action.params);
                    this.$http.put(this.$Api+action.url,JSON.stringify(this.formdatas)).then((res) => {
                        this.showMsg("success", "修改成功");
                        this.showAdd = !this.showAdd;
                        this.formdatas = {};
                        this.getData();
                    });
                }else if(this.curAction == "tbedit"){
                    if(this.newData._id) delete this.newData._id;
                    if(this.newData.createAt) delete this.newData.createAt;   
                    this.newData.code = this.curItem.code;
                    this.$http.put(this.$Api+"construction-quote",JSON.stringify(this.newData)).then((res) => {
                        this.showMsg("success", "修改成功");
                        this.showAdd = false;
                        this.newData ={};
                        this.getTableDetail();
                    });
                }else if(this.curAction == "tbadd") {
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
            this.curLevelData = {level_n: d.level}
            this.newData = {};
            if(d.level*1 >=1) {
                this.newData.lv1_name = this.curLevelData.lv_name = d.one.name;
                this.newData.lv1_code = this.curLevelData.lv_code = d.one.code;
                this.searchParams= {page:1, lv1_code: d.one.code} ;
            }
            if(d.level*1 >=2) {
                this.newData.lv2_name = this.curLevelData.lv_name = d.sone.name;
                this.newData.lv2_code = this.curLevelData.lv_code = d.sone.code;
                this.searchParams= {page:1, lv2_code: d.sone.code} ;
            }
             if(d.level*1 >=3) {
                this.newData.lv3_name = this.curLevelData.lv_name = d.mone.name;
                this.newData.lv3_code = this.curLevelData.lv_code = d.mone.code;
                this.searchParams= {page:1, lv3_code: d.mone.code} ;
            }
            this.loadlist();
        },
        addClickHandler: function(d) {
            this.title = "新增施工报价分类";
            this.formdatas={};
            this.catery = !this.catery;
            this.showAdd = !this.showAdd;
            this.$set("curAction", "add");
            if(d.level >= 1){   
                this.formdatas.lv1_code = d.one.code;
            }else if(d.level >=2){
                this.formdatas.lv2_code = d.sone.code;
            }
        },
        editClickHandler: function(d){
            this.title = "编辑施工报价分类";
            this.showAdd = !this.showAdd;
            this.catery = !this.catery;
            this.$set("curAction", "edit");
             if(d.level == 1) {
                 this.formdatas = {
                    lv1_code: d.one.code,
                    name: d.one.name,
                    usable: d.one.usable,
                    pkg: d.one.pkg,
                 }
             }else if(d.level == 2) {
                 this.formdatas = {
                    lv2_code: d.sone.code,
                    name: d.sone.name,
                    usable: d.sone.usable,
                 }
             }else if(d.level == 3) {
                 this.formdatas = {
                    lv2_code: d.sone.code,
                    name: d.mone.name,
                    usable: d.mone.usable,
                    idx: d.index
                }
             }
        },
        deleteClickHandler: function(d) { },
        toAdd: function(){
            if(this.curLevelData.level_n == 0) {
                this.showMsg("warn", "请先选择一个材料分类");
                return false
            }
            this.title = "新增材料";
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
