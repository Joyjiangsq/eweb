<template lang="html">
   <pagepanel>
          <div :class="m.onebox">
                <tabbar :datas="tabArray"  @tabclick="tabClickHandler" theme="indexTab">
                      <div :class="" v-for="(index, one) in tabArray" v-show="one.show">
                            <div v-if="one.component" v-widget="{widget: {component:one.component}, data: one, cname: one.id}"></div>
                      </div>
                </tabbar>
          </div>
          <div  :class="">
              <btn :class="" @click="toAdd">新增</btn>
              <div :class="">
                <tb v-if="!geXingHua" :headercaption="gxheadercaption"  :params="searchParams" :datas="[]" :totals.sync="totals" :load="false"  :events="tableEvents"></tb>
                <tb v-else :headercaption="headercaption"  :params="searchParams" :datas="[]" :totals.sync="totals" :load="false"  :events="tableEvents"></tb>
                <pg :totals="totals" :curpage="searchParams.page">
              </div>
          </div>
    </pagepanel>
    <!--新增对话框-->
      <dialog :flag.sync="show" :title="title" @dialogclick="dialogClickHandler" >
            <div  slot="containerDialog">
                  <div>  
                      <formtext v-if="geXingHua" labelname="物料选择: " :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入项目名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="geXingHua" labelname="物料名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入物料名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="geXingHua" labelname="物料分类：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入物料分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="geXingHua" labelname="分类名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!geXingHua" labelname="调品前分类: " :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入调品前分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!geXingHua" labelname="调品后分类：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入调品后分类" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!geXingHua" labelname="调品前分类名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入调品前分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext v-if="!geXingHua" labelname="调品后分类名称：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入调品后分类名称" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="总部指导价：" :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入总部指导价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="分站自营价: " :vertical="true"  formname="" :value.sync="formdatas.name" placeholder="请输入分站自营价" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                  </div>
            </div>
      </dialog>
    <!--删除提示-->
        <dialogtip :flag.sync="deleteTag" @dialogclick="confirmDelete" msg="你确定删除吗？"></dialogtip>
</template>

<script>
import formtext from "component/form/formText";
import tabbar from "component/tab/tabBar.vue";
import dialogtip from "component/dialog/dialogTip";
import btn from "component/sprite/button.vue";
import Utils from "common/Utils";
import m from "./material.css";
import pageBase from "common/mixinPage.js";
import {allRows} from "config/const";
let headerData =[{name:"类别", labelValue:"", type:"data"},{name:"调品前材料分类", labelValue:"", type:"data"},{name:"调品前分类名称", labelValue:"", type:"data"},
                  {name:"调品后类别", labelValue:"", type:"data"},{name:"调品后分类名称", labelValue:"", type:"data"},{name:"总部指导价", labelValue:"", type:"data"},{name:"分站自营价", labelValue:"", type:"data"},
                  {type:"operator", name:"操作"}];
let gxheaderData =[{name:"类别", labelValue:"", type:"data"},{name:"物料分类", labelValue:"", type:"data"},{name:"分类名称", labelValue:"", type:"data"},
                    {name:"材料编码", labelValue:"", type:"data"},{name:"材料名称", labelValue:"", type:"data"},{name:"总部指导价", labelValue:"", type:"data"},{name:"分站自营价", labelValue:"", type:"data"},
                    {type:"operator", name:"操作"}];
let tabData =[{labelName:"升级", id: "", show:false},{labelName:"降级", id: "", show:false},{labelName:"增项", id: "", show:false},
              {labelName:"减项", id: "", show:false},{labelName:"互换", id: "", show:false},{labelName:"个性化", id: "gexinghua", show:false}];
export default {
  mixins:[pageBase],
  data: function () {
    return {
      formdatas:{},      //表单数据
      m,
      gxheadercaption: gxheaderData, //个性化table
      headercaption: headerData,     //非个性化table
      totals: 0,
      moduleName:"调品规则",
      searchParams: {page:1},
      Utils: Utils,
      title: '调品规则新增',     //弹框抬头标题
      geXingHua: false,         //切换tab个性化新增
      validate: false,          //验证开关
      validateTag: false,       //表单验证
      show: false,
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
                    this.showtbedit = !this.showtbedit;
                    this.showAdd = !this.showAdd;
                     this.newData = Utils.cloneObj(this.curItem);
                }
            }
        },
    }
  },
  computed: {},
  ready: function () {

  },
  methods: {
    dialogClickHandler: function(d) {
        this.validateTag = true;
        if(d.action == "confirm") {
            this.validate = !this.validate;
            setTimeout(()=> {
                if(this.validateTag) {

                }
            },30)
        }
    },
    tabClickHandler: function(d){
      console.log('tabClickHander');
      console.log(d);
      console.log('tabClickHander');
        if(d.index == 5) {
          this.geXingHua = true
        }else {
          this.geXingHua = false
        }
          this.tabArray[this.curTabIndex]["show"] = false;
          d.data.show = true;
          this.curTabIndex = d.index;
    },
    toAdd: function(){
        this.show = !this.show
    },
    validateHandler: function(d){
        if(d.res == "fail") this.validateTag = false;
    },
    confirmDelete: function(){
            // if(d.action == "confirm") {
            //     this.$http.delete(this.$Api+"construction-quote", {params: {"_id": this.curItem._id}}).then((res)=>{
            //         this.$set("deleteTag", !this.deleteTag);
            //         this.loadlist();
            //         this.showMsg("success", "删除成功！");
            //     });
            // }
    },

  },
  components: {tabbar,btn,dialogtip,formtext}
}
</script>
