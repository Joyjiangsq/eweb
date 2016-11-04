<template>
        <div class="">
          <div :class="css.paddingType">
            <panel>

                <div slot="panelTitle">
                       基础信息
                </div>

                <div slot="panelContent">
                      <formtext labelname="分站名称：" :must="false"  :read="true"  :value.sync="baseInfo.CardName" formname='CardName' ></formtext>
                      <cascadeform  labelname="分站地址：" :detailneed="true" :read="true"  :value.sync= "baseInfo.Address"  formname="Address" ></cascadeform>
                      <formtext labelname="跟单员：" :value.sync="baseInfo.U_CntctCode" placeholder=""  formname='U_CntctCode' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员电话：" :phone="true"  :value.sync="baseInfo.U_CntctPhone" :length="11" :number="true"  placeholder=""  formname='U_CntctPhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
            </panel>

          </div>
          <div :class="css.dataArea">
                <tblab @fail="failHandler" :startvalidate="startvalidate" @success="successHandler" v-if="show"></tblab>
          </div>
          <div :class="css.footerBar">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
        </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import css from "./pre.css";
import btn from "component/sprite/button.vue";
import tblab from "component/bblock/typeLab";
import preAdapter from "./itemAdapter.js";
import formdim from "component/form/formDim";
import Utils from "common/Utils";
import {showTips} from "actions/index";
import utils from "common/Utils";
export default {
  data: function () {
    return {
      css,
      validate: false,
      startvalidate: false, // 这参数作为大类 数据验证开始的依据  只要改变就开始验证
      show: false,
      self: false,
      baseInfo:{
        CardCode:"", //分站编码
        CardName:"分站名称",
        Address:"安徽省,合肥市,高新区,xxx街道",// 客户地址  这里的客户就是分站
        U_Phone : "分站联系人电话", //TODO  分站地址
        CntctCode: "分站联系人姓名",
        U_CntctCode:"", // 跟单员
        U_CntctPhone:"", // 跟单员电话
        Series:"82", //代表备货
        validate: true // 验证依据
      }
    }
  },
  computed: {},
  ready: function () {
    setTimeout(()=>{
        this.show = true;
    })
  },
  attached: function () {},
  methods: {
    validateHandler: function(d){
        if(d.res == "fail") this.baseInfo.validate = false;
    },
    // 失败回调
    failHandler: function(d) {
        // console.log(d);
    },
    // 成功回调
    successHandler: function(d) {
        let ndata = utils.cloneObj(d);
        // 基础信息验证失败 则不执行
        if(!this.baseInfo.validate) return false;
        // 几大类 数据适配
        preAdapter(ndata);
        if(Object.keys(ndata).length == 0) {
          showTips(this.$store, {type:"warn", msg:"没有选择任何项目"});
          return false;
        }
        this.self = false;
        // 复制一份基础数据
        let newInfo = Utils.cloneObj(this.baseInfo);
        delete newInfo.validate;    // 删除验证字段
        // 下备货单
        this.$http.post(this.$Api+"/sales/stock",JSON.stringify({sub_orders:ndata, base_info:newInfo})).then((res) => {
            var d = res.json();
            console.log(d);
            // this.self = true;
            // showTips(this.$store, {type:"success", msg:"新增成功"});
            // window.onbeforeunload  = function(){}
            // this.$router.go({path:"/prestore"})
        },(error) =>{
          console.log(error);
          showTips(this.$store, {type:"success", msg:"新增失败"});
        })
    },
    btnClickHandler: function() {
      this.baseInfo.validate = true;
      this.startvalidate = !this.startvalidate;
      this.validate = !this.validate; // 表单
    },
  },
  components: {panel, formtext, cascadeform, tblab, btn},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"备货管理", type:"back"}, {name:"备货申请"}]);
      window.onbeforeunload  = function(){return true;}
    },
    canDeactivate: function(transition){
        if(this.self) {
          transition.next();
          window.onbeforeunload  = function(){}
        }
        else {
          let tag = confirm("离开页面不会保存数据，请注意操作");
          if(tag) {
            transition.next();
            window.onbeforeunload  = function(){}
          }
          else transition.abort();
        }
    }
  }
}
</script>
