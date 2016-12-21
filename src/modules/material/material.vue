<template lang="html">
   <pagepanel>
          <div :class="m.onebox">
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                          <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.cname}"></div>
                      </div>
                </tabbar>
          </div>
          <!--<div  :class="">
              <btn v-if="isEAdmin" :class="" @click="toAdd">新增 </btn>
              <div :class="">
                <tb :headercaption="getHeader"  url="rule-product" :params="searchParams"  :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                <pg :totals="totals" :curpage="searchParams.page">
              </div>
          </div>-->
    </pagepanel>
    <!--新增对话框-->
      <!--<dialog :flag.sync="showAdd" title="新增" @dialogclick="dialogClickHandler" >
            <div  class="" slot="containerDialog">
                  <formtext :must="false" :read="true"  labelname="类别：" :vertical="true" :value.sync="formdatas.type" ></formtext>
            </div>
            <div  class="" slot="containerDialog">
                  <div class="m.itemList"> 
                      <div v-if="geXingHua">
                        <formtext :must="true" :read="!isEAdmin" labelname="产品选择：" @focushandler="showNoTypedialog" :vertical="true" :value.sync="formdatas.ItemName" placeholder="请输选择产品" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin" labelname="分类编码：" :vertical="true" :value.sync="formdatas.lv_code" placeholder="" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="分类名称：" :vertical="true" :value.sync="formdatas.lv_name" placeholder="" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      </div>
                      <div v-else>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品前分类：" @focushandler="showTypedialog(1)"  :vertical="true" :value.sync="formdatas.before_code" placeholder="请选择分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品后分类：" @focushandler="showTypedialog(2)" :vertical="true" :value.sync="formdatas.after_code" placeholder="请选择分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品前分类名称：" :vertical="true" :value.sync="formdatas.before_name" placeholder="请输入调品前分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                        <formtext :must="true" :read="!isEAdmin"  labelname="调品后分类名称：" :vertical="true" :value.sync="formdatas.after_name" placeholder="请输入调品后分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      </div>
                      <formtext :must="true"  :read="!isEAdmin" labelname="总部指导价：" :number="true" :vertical="true" :value.sync="formdatas.rec_price" placeholder="请输入总部指导价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!isEAdmin"  :must="true" labelname="分站自营价: " :number="true" :vertical="true" :value.sync="formdatas.self_price" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>-->
      <!--非个性化分类弹框-->
      <!--<typedialog :show="showNoPerDialog" url="material-category" @onecheck="oneCheck"></typedialog>-->
      <!--个性化分类弹框-->
      <!--<selectbuilddialog :show="showTypeDialog" curol="material" @getone="getOne" ></selectbuilddialog>-->
    <!--删除提示-->
      <!--<dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>-->
</template>

<script>
import upgrade from "./upgrade.vue"
import degrade from "./degrade.vue"
import additem from "./addItem.vue"
import reduceitem from "./reduceItem.vue"
import exchange from "./exchange.vue"
import personal from "./personal.vue"



import selectbuilddialog from "component/blockcommon/selectBuildDialog";
import formtext from "component/form/formText";
import tabbar from "component/tab/tabBar.vue";
import dialogtip from "component/dialog/dialogTip";
import btn from "component/sprite/button.vue";
import Utils from "common/Utils.js";
import m from "./material.css";
import basePage from "common/mixinPage.js";
import {allRows} from "config/const";
import typedialog from "component/priceblock/typeDialog";
let gxheaderData =[{name:"类别", labelValue:"type", type:"data"},{name:"分类编码", labelValue:"lv_code", type:"data"},{name:"分类名称", labelValue:"lv_name", type:"data"},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},{name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},
                    {type:"operator", name:"操作"}];
let  tabData=[{labelName:"升级", show:true, type:"升级",cname:"xx",component: upgrade},{labelName:"降级", cname:"xxs",show:false, type:"降级",component: degrade},{labelName:"增项",cname:"xxx", show:false, type:"增项",component: additem},
              {labelName:"减项", show:false, type:"减项",cname:"xxh",component: reduceitem},{labelName:"互换",cname:"xxg", show:false, type:"互换",component: exchange},{labelName:"个性化", cname:"xxa", show:false, type:"个性化",component: personal}];
export default {
  mixins:[basePage],
  data(){
    return {
      curTabIndex:0,


      formdatas:{type:"升级"},      //表单数据type:'' ,before_code:'',before_name:'',after_code:'',after_name:'',self_price:'',rec_price:''
      m,
      gxheadercaption: gxheaderData, //个性化table
    //   headercaption: headerData,     //非个性化table
      totals: 0,
      moduleName:"调品规则",
      searchParams: {page:1, type:"升级"},
      showNoPerDialog: false,   //个性化弹框
      showTypeDialog: false,    //非个性化调品前后分类弹框
      geXingHua: false,         //切换tab个性化新增
      validate: false,          //验证开关
      validateTag: false,       //表单验证
      showAdd: false,
      deleteTag: false,         // 删除确认弹框显示隐藏
      curAction:'',             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
      type: 1,
      curItem:{},
      tbData: [],
      tabArray:tabData,          //tab内容初始化
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
  computed:{
    getHeader: function(){
      if(this.geXingHua) return gxheaderData
      else return headerData
    },
    // 判断当前是否为e站（分站）
    isEAdmin: function(){
      return true
      return Utils.isEAdmin();
    }
  },
  ready: function(){
  },
  methods: {
    //刷新表格数据
    getTableDetail: function(){
        this.load = !this.load;
    },
    dialogClickHandler: function(d) {
        this.validateTag = true;
        if(d.action == "confirm") {
            this.validate = !this.validate;
            setTimeout(()=> {
                if(this.validateTag) {
                  if(this.curAction == "add"){
                    this.$http.post(this.$Api+"rule-product",JSON.stringify(this.formdatas)).then((res) => {
                          this.showMsg("success", "新增成功");
                          this.showAdd = !this.showAdd;
                          this.formdatas = {};
                          this.loadlist();
                    });
                  }else if(this.curAction = "tbedit"){
                    this.$http.put(this.$Api+"rule-product",JSON.stringify(this.formdatas)).then((res) => {
                        this.showMsg("success", "修改成功");
                        this.showAdd = !this.showAdd;
                        this.formdatas ={};
                        this.loadlist();
                    });
                  }
                }
            },30)
        }
    },
    //tab点击事件
    tabClickHandler: function(d){
        this.tabArray[this.curTabIndex]["show"] = false;
        d.data.show = true;
        this.curTabIndex = d.index;
    },
    toAdd: function(){
        this.formdatas = {type: this.searchParams.type};
        this.$set("curAction","add");
        this.showAdd = true;
    },
    validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
    },
  
    showTypedialog: function(type){
       this.type = type; // 1 调品前   2 调品后
       this.showNoPerDialog = !this.showNoPerDialog;
    },
    showNoTypedialog: function(){
       this.showTypeDialog = !this.showTypeDialog;
    },
    //个性化focus弹框被选中
    getOne: function(d){
       this.formdatas = Object.assign({}, d);
    },
    //非个性化focus弹框被选中
    oneCheck: function(d){
       if(this.type == 1) {
         this.formdatas.before_code = d.lv_code;
         this.formdatas.before_name = d.lv_contact_name
        }else {
         this.formdatas.after_code = d.lv_code; 
         this.formdatas.after_name = d.lv_contact_name
        }
        this.formdatas = Object.assign({}, this.formdatas);
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
  components: {tabbar,btn,dialogtip,formtext,typedialog,selectbuilddialog,upgrade,degrade,additem,reduceitem,exchange,personal}
}
</script>
