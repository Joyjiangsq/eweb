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
                    <codeview  url="material-category" :params="codeParams" :datas="datas" @treeclick="treeClickHandler" @addclick="addClickHandler" @editclick="editClickHandler" @deleteclick="deleteClickHandler"></codeview>
                 </div>
              </div>
              <div  :class="css.mcRight">
                 <btn :class="" @click="toSelect">选品</btn>
                 <div :class="css.rightBox">
                    <tb :headercaption="headercaption" url="users" :params="searchParams" :totals.sync = "totals" :load="load"  :events="tableEvents"></tb>
                    <pg :totals="totals" :curpage="searchParams.page"></pg>
                 </div>
              </div>
      </pagepanel>
      <!--新增材料分类对话框-->
        <materialitem :formData="newData" @success="addSuccess" :show="showAdd"></materialitem>
        <!--选品对话框-->
        <dialog :flag.sync="showSelectDialog" title="选品" >
            <div slot="containerDialog">
                <chuguitb :hash="false" :toload="toload" @addone="addoneHandler" :listdata.sync="vlist"></chuguitb>
            </div>
            <div slot="footerDialog"></div>
        </dialog>
       <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
  </div>
</template>

<script>
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
        showSelectDialog: false,
        isEAdmin: false,
        moduleName:"材料管理",
        headercaption: headerData,
        showFormDialog: false,
        hideDialogIn: true,
        btnsData:[{name:"新增", icon:"icon-add", action:"add"}],
        showAddMa: false,
        showAdd: false,
        addTag:false,
        deleteTag: false,         // 删除确认弹框显示隐藏
        validate: false,            // 表单验证动作的开关
        selectedLevel: 0,          //默认添加材料的等级
        datas: [],
        newData1: {},
        detail:{name:'',id:''},
        codeParams: {}, 
        newData: {}, //materialItem組件
        tableEvents:{
        operatorRender: function(d){
          return [{name:"编辑",action:"edit",icon:"icon-edit", data: d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
        },
        operatorHandler: function(d){
          this.$set("curItem", d.data);
          if(d.action == "delete") this.$set("deleteTag", !this.deleteTag);
          else if (d.action == "edit") {
            this.$set("optitle", "编辑");
            this.$set("curAction", "edit");
            this.addParams.CardName = d.data.CardName;
            this.addParams.phone = d.data.phone;
            this.addParams.roles = d.data.roles;
            this.flagdep = !this.flagdep;
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
        addSuccess: function() {
            if(this.selectedLevel ==0){
            this.$http.post(this.$Api+"material-category/lv1",JSON.stringify(this.newData)).then((res) => {
                    var d = res.json();
                    console.log(d);
                    this.self = true;
                    this.showMsg("success", "新增成功");
                    window.onbeforeunload  = function(){}
                    this.$router.go({path:"/material"})
                });
            }else if(this.selectedLevel == 1){
                console.log('2级增加');
                console.log(JSON.stringify(this.newData1));
                this.$http.post(this.$Api+"material-category/lv2",JSON.stringify(this.newData)).then((res) => {
                    var d = res.json();
                    console.log(d);
                    this.self = true;
                    this.showMsg("success", "新增成功");
                    window.onbeforeunload  = function(){}
                    this.$router.go({path:"/material"})
                });
            }else if(this.selectedLevel == 2){
                 console.log('3级增加');
                this.$http.post(this.$Api+"material-category/lv3",JSON.stringify(this.newData2)).then((res) => {
                    var d = res.json();
                    console.log(d);
                    this.self = true;
                    this.showMsg("success", "新增成功");
                    window.onbeforeunload  = function(){}
                    this.$router.go({path:"/material"})
                });
            }
        },
        addFail: function() {
            this.addTag = false;
        },
        addoneHandler: function() {

        },
        toSelect: function(){
            this.$set("toload", true);
            this.showSelectDialog = !this.showSelectDialog;
        },
        addMenu: function(){
            this.showAdd = !this.showAdd;
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
            if(d.level == 1){
                console.log('000');
                console.log(d);
                
                this.newData.lv1_code = d.one.code;
                // console.log(this.newData.lv1_name);
                // console.log('222');
                // d.sone = {name:'',};
                // var newdata = { name: this.newData.lv1_name, usable: this.newData.usable};
                // this.newData1   = newdata;
                // console.log('选择的等级是'+d.level);
                this.selectedLevel =1;
                // this.addSuccess()
            }else if(d.level ==2){
                var newdata = { name: newData.name, usable: newData.usable};
                this.newData2 = newdata;
                this.selectedLevel =2;
                // this.addSuccess()
            }
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
        resetData: function(d) {
            //编辑时显示原数据
            console.log(d);
            // this.materialList.lv1_name = d.lv1_name;
            // this.materialList.pkg = d.pkg;
            // this.materialList.usable = d.usable;
            // this.materialList.ValidFor = d.ValidFor;
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
    components:{codeview, icon,dialogtip,materialitem,chuguitb,btn}

}
</script>
{
        lv1_code: 'MC001', lv1_name: '国民包', usable: true, pkg: '国民包',
        lv2: [
            {
                code: 'MC0011001', name: '瓷砖', usable: true,
                lv3: [
                    { code: 'MC00110011001', name: '大地砖', usable: true }
                ]
            },
            { code: 'MC0011002', name: '厨柜', usable: false }
        ]
    }