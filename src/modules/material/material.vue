<template lang="html">
   <pagepanel>
          <div :class="m.onebox">{{formdatas | json}}
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                            <!--<div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></div>-->
                      </div>
                </tabbar>
          </div>
          <div  :class="">
              <btn v-if="isEAdmin" :class="" @click="toAdd">新增</btn>
              <div :class="">
                <tb v-if="geXingHua" :headercaption="gxheadercaption"  url="rule-product" :params="searchParams" :datas="newData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                <tb v-else :headercaption="headercaption"  url="rule-product" :params="searchParams" :datas="newData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                <pg :totals="totals" :curpage="searchParams.page">
              </div>
          </div>
    </pagepanel>
    <!--新增对话框-->
      <dialog :flag.sync="showAdd" :title="title" @dialogclick="dialogClickHandler" >
            <div  slot="containerDialog">
                  <formtext :must="false" :read="true"  labelname="类别: " :vertical="true" :value.sync="formdatas.type" ></formtext>
            </div>
            <div  slot="containerDialog">
              {{formdatas | json}}
                  <div>  
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="产品选择: " @focushandler="showNoTypedialog" :vertical="true" :value.sync="formdatas.before_code" placeholder="请输入项目名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="产品名称：" :vertical="true" :value.sync="formdatas.before_name" placeholder="请输入物料名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="分类编码：" :vertical="true" :value.sync="formdatas.after_code" placeholder="请输入物料分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="分类名称：" :vertical="true" :value.sync="formdatas.after_name" placeholder="请输入分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品前分类: " @focushandler="showTypedialog(1)"  :vertical="true" :value.sync="formdatas.before_code" placeholder="请输入调品前分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品后分类：" @focushandler="showTypedialog(2)" :vertical="true" :value.sync="formdatas.after_code" placeholder="请输入调品后分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品前分类名称：" :vertical="true" :value.sync="formdatas.before_name" placeholder="请输入调品前分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品后分类名称：" :vertical="true" :value.sync="formdatas.after_name" placeholder="请输入调品后分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false"  :read="!isEAdmin" labelname="总部指导价：" :vertical="true" :value.sync="formdatas.rec_price" placeholder="请输入总部指导价" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!isEAdmin" labelname="分站自营价: " :vertical="true" :value.sync="formdatas.self_price" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>
      <!--非个性化分类弹框-->
      <typedialog :show="showNoPerDialog" url="material-category" @onecheck="oneCheck"></typedialog>
      <!--个性化分类弹框-->
      <selectbuilddialog :show="showTypeDialog" curol="material" @getone="getOne" ></selectbuilddialog>
    <!--删除提示-->
      <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
</template>

<script>
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
let headerData =[{name:"类别", labelValue:"type", type:"data"},{name:"调品前材料分类", labelValue:"before_code", type:"data"},{name:"调品前分类名称", labelValue:"before_name", type:"data"},
                  {name:"调品后类别", labelValue:"after_code", type:"data"},{name:"调品后分类名称", labelValue:"after_name", type:"data"},{name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},
                  {type:"operator", name:"操作"}];
let gxheaderData =[{name:"类别", labelValue:"type", type:"data"},{name:"物料分类", labelValue:"before_code", type:"data"},{name:"分类名称", labelValue:"before_name", type:"data"},
                    {name:"产品编码", labelValue:"after_code", type:"data"},{name:"产品名称", labelValue:"after_name", type:"data"},{name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},
                    {type:"operator", name:"操作"}];
let tabData =[{labelName:"升级", id: "", type:"升级",show:false},{labelName:"降级", id: "",type:"降级", show:false},{labelName:"增项", id: "", type:"增项",show:false},
              {labelName:"减项", id: "", type:"减项",show:false},{labelName:"互换", id: "", type:"互换",show:false},{labelName:"个性化", id: "", type:"个性化",show:false}];
export default {
  mixins:[basePage],
  data(){
    return {
      formdatas:{type:'',before_code:'',before_name:'',after_code:'',after_name:'',self_price:'',rec_price:''},      //表单数据
      selectType:{},
      m,
      newData:[],
      gxheadercaption: gxheaderData, //个性化table
      headercaption: headerData,     //非个性化table
      totals: 0,
      moduleName:"调品规则",
      searchParams: {page:1,params:''},
      title: '调品规则新增',     //弹框抬头标题
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
      curTabIndex:0,
      tableEvents:{
          operatorRender: function(d){
              return [{name:"编辑", action:"edit",icon:"icon-edit",data:d},{name:"删除", action:"delete",icon:"icon-delete",data:d}]
          },
          operatorHandler: function(d){
              this.$set("curItem", d.data);
              if(d.action == "delete") {
                  this.$set("deleteTag", !this.deleteTag);
              }else if(d.action == "edit"){
                  // this.title = "编辑材料";
                  this.$set("curAction","tbedit");
                  this.showAdd = true;
                  this.formdatas = Utils.cloneObj(this.curItem);
                  this.formdatas._id=this.curItem._id;
                  console.log('this.formdatas');
                  console.log(this.formdatas);
              }
          }
      },
    }
  },
  computed:{
    // 判断当前是否为e站（分站）
    isEAdmin: function(){
      return Utils.isEAdmin();
    }
  },
  ready: function(){
    this.setFirstTab();
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
                          this.getTableDetail();
                    });
                  }else if(this.curAction = "tbedit"){
                      if(!this.isEAdmin){
                        let param = this.formdatas.self_price;
                        this.formdatas={}; //清空多余参数
                        this.formdatas._id=this.curItem._id;
                        this.formdatas.self_price = param;
                      }
                    this.$http.put(this.$Api+"rule-product",JSON.stringify(this.formdatas)).then((res) => {
                        var d = res.json();
                        this.showMsg("success", "修改成功");
                        this.showAdd = false;
                        this.formdatas ={};
                        this.getTableDetail();
                    });
                  }
                }
            },30)
        }
    },
    tabClickHandler: function(d){
        this.searchParams = {page:1};
        this.searchParams.type = d.data.type;
        this.formdatas.type = d.data.type;
        this.selectType = d.data.type;
        if(d.index == 5)  this.geXingHua = true;
        else this.geXingHua = false;
        this.getTableDetail();
    },
    toAdd: function(){
        if(this.isEAdmin) this.formdatas = {type:'',before_code:'',before_name:'',after_code:'',after_name:'',self_price:'',rec_price:''};
        else this.formdatas = {type:'',self_price:''}
        this.formdatas.type = this.selectType;
        this.$set("curAction","add");
        this.showAdd = true;
    },
    validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
    },
    setFirstTab: function(){
        this.tabArray[0].show = true;
    },
    showTypedialog: function(param){
       if(param == 1) {console.log('this.type = before');this.type = 1}
       else this.type = 2;
       this.showNoPerDialog = !this.showNoPerDialog;
    },
    showNoTypedialog: function(){
       this.showTypeDialog = !this.showTypeDialog;
    },
    //个性化focus弹框被选中
    getOne: function(d){
       console.log(d);
       this.formdatas.after_code =  d.ItemCode; //产品编码
       this.formdatas.after_name = d.ItemName; //产品名称
       if(d.lv3_name && d.lv3_code){
         this.formdatas.before_code = d.lv3_code;
         this.formdatas.before_name = d.lv3_name;
         return;
       }else if(d.lv2_name && d.lv2_code){
         this.formdatas.before_code = d.lv2_code;
         this.formdatas.before_name = d.lv2_name;
         return;
       }else {
         this.formdatas.before_code = d.lv1_code;
         this.formdatas.before_name = d.lv1_name;
       }
    },
    //非个性化focus弹框被选中
    oneCheck: function(d){
       console.log(d);
       if(this.type == 1) {
         this.formdatas.before_code = d.lv_code;
         this.formdatas.before_name = d.lv_contact_name
        }else {
         this.formdatas.after_code = d.lv_code; 
         this.formdatas.after_name = d.lv_contact_name
        }
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
  components: {tabbar,btn,dialogtip,formtext,typedialog,selectbuilddialog}
}
</script>
