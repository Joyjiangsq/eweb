<template lang="html">
   <pagepanel>
          <div :class="m.onebox">{{formdatas | json}}
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                            <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></div>
                      </div>
                </tabbar>
          </div>
          <div  :class="">
              <btn v-if="!isEAdmin" :class="" @click="toAdd">新增</btn>
              <div :class="">
                <tb v-if="!geXingHua" :headercaption="gxheadercaption"  url="rule-product" :params="searchParams" :datas="newData" :totals.sync="totals" :load="load"  :events="tableEvents"></tb>
                <tb v-else :headercaption="headercaption"  :params="searchParams" :datas="newData" :totals.sync="totals" :load="false"  :events="tableEvents"></tb>
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
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="物料选择: " :vertical="true" :value.sync="formdatas" placeholder="请输入项目名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="物料名称：" :vertical="true" :value.sync="formdatas" placeholder="请输入物料名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="物料分类：" :vertical="true" :value.sync="formdatas" placeholder="请输入物料分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="geXingHua" labelname="分类名称：" :vertical="true" :value.sync="formdatas" placeholder="请输入分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品前分类: " @focushandler="showTypedialog"  :vertical="true" :value.sync="formdatas.before_code" placeholder="请输入调品前分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品后分类：" @focushandler="showTypedialog" :vertical="true" :value.sync="formdatas.after_code" placeholder="请输入调品后分类" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品前分类名称：" :vertical="true" :value.sync="formdatas.before_name" placeholder="请输入调品前分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" v-if="!geXingHua" labelname="调品后分类名称：" :vertical="true" :value.sync="formdatas.after_name" placeholder="请输入调品后分类名称" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext :must="isEAdmin == true? true:false" :read="!isEAdmin" labelname="总部指导价：" :vertical="true" :value.sync="formdatas.rec_price" placeholder="请输入总部指导价" :validatestart="isEAdmin" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!isEAdmin" labelname="分站自营价: " :vertical="true" :value.sync="formdatas.self_price" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>
      <!--调品前后分类弹框-->
      <!--<typedialog :show="showTypeDialog" url="" @onecheck="oneCheck"></typedialog>-->
    <!--删除提示-->
      <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
</template>

<script>
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
                    {name:"材料编码", labelValue:"after_code", type:"data"},{name:"材料名称", labelValue:"after_name", type:"data"},{name:"总部指导价", labelValue:"rec_price", type:"data"},{name:"分站自营价", labelValue:"self_price", type:"data"},
                    {type:"operator", name:"操作"}];
let tabData =[{labelName:"升级", id: "", type:"升级",show:false},{labelName:"降级", id: "",type:"降级", show:false},{labelName:"增项", id: "", type:"增项",show:false},
              {labelName:"减项", id: "", type:"减项",show:false},{labelName:"互换", id: "", type:"互换",show:false},{labelName:"个性化", id: "", type:"个性化",show:false}];
export default {
  mixins:[basePage],
  data(){
    return {
      formdatas:{type:''},      //表单数据
      selectType:{},
      m,
      newData:[],
      gxheadercaption: gxheaderData, //个性化table
      headercaption: headerData,     //非个性化table
      totals: 0,
      moduleName:"调品规则",
      searchParams: {page:1},
      title: '调品规则新增',     //弹框抬头标题
      showTypeDialog: false,    //显示（不显示）调品前后分类弹框
      isEAdmin: false,          //判断当前是否为e站
      geXingHua: false,         //切换tab个性化新增
      validate: false,          //验证开关
      validateTag: false,       //表单验证
      showAdd: false,
      deleteTag: false,         // 删除确认弹框显示隐藏
      curAction:'',             // 当前的动作 有编辑、新增(因为共用一个弹框 需要区分)
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
          console.log('第一步');
            if(Utils.isEAdmin()) {this.isEAdmin = true}
            else {this.isEAdmin = false;console.log('走这里了');};
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
                    this.$http.put(this.$Api+"rule-produc",JSON.stringify(this.formdatas)).then((res) => {
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
        console.log('tabClickHander');
        console.log(d);
        console.log('tabClickHander');
        this.searchParams = {page:1};
        this.searchParams.type = d.data.type;
        this.formdatas.type = d.data.type;
        console.log(this.selectType);
          this.geXingHua = true;
        // if(d.index == 5) {
        // }else {
        //   this.geXingHua = false
        // }
          this.tabArray[this.curTabIndex]["show"] = false;
          d.data.show = true;
          this.curTabIndex = d.index;
          this.getTableDetail();
    },
    toAdd: function(){
        this.$set("curAction","add");
        this.showAdd = !this.showAdd;
        console.log('this.selectType');
        console.log(this.selectType);
        this.formdatas.type = this.selectType;
        
    },
    validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
    },
    setFirstTab: function(){
       this.tabArray[0].show = true
    },
    showTypedialog: function(){
      console.log('focus事件被点击了');
      this.showTypeDialog = !this.showTypeDialog;
    },
    //分类弹框被选中的checkbox
    oneCheck: function(d){
      console.log(d);
      console.log('被选中的checkbox');
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
  components: {tabbar,btn,dialogtip,formtext,typedialog}
}
</script>
