<template>
        <div class="">
          <detail :data="detailData" type="back"></detail>
          <tblab  v-if="show" :tabs="tabs" :startvalidate="startvalidate"  :datamap="datamap" :detail.sync="detail"></tblab>
          <div :class="css.footerBar" v-if="detailData.U_OrderStatus =='待采购' || detailData.U_OrderStatus == 'e站驳回'">
              <!--在待采购  和 e站驳回的状态   才可以放开驳回按钮-->
              <span :class="css.itemone"><btn @clickaction="backClickHandler" btnname="btn-primary" iconname="icon-back">驳回</btn></span>
          </div>

          <dialog :flag.sync="showReDialog" title="请输入驳回原因" @dialogclick="dialogClickHandler">
                <div slot="containerDialog">
                      <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValueipt" placeholder="请填写驳回理由" ></textarea>
                </div>
          </dialog>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import css from "./p.css";
import detail from "modules/common/detailInfo";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLab";
import btn from "component/sprite/button";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      detail: true, // 不允许更改
      startvalidate: false,
      orderId:"",
      tabs:[],
      show: false,
      showReDialog: false,
      datamap:{}, //
      backValueipt:"",
      detailData:{}
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){
  },
  methods: {
    backClickHandler: function(){
        this.showReDialog = !this.showReDialog;
        // 如果是e站驳回  则默认显示e站的驳回理由
        if(this.detailData.U_OrderStatus == "e站驳回") this.backValueipt = this.detailData.U_CloseWhy || "";
    },
    dialogClickHandler: function(d){
        if(d.action == "confirm") {
            this.$http.put(this.$Api+"purchases",JSON.stringify([{U_PurchaseNum: this.orderId, U_OrderStatus:8, U_CloseWhy: this.backValueipt}])).then((res) => {
                var d = res.json();
                this.showMsg("success", "驳回成功");
                this.showReDialog = !this.showReDialog;
                // 静态变更状态
                this.detailData.U_OrderStatus = "店长驳回";
                this.detailData.U_CloseWhy = this.backValueipt;
            },(error) =>{
              console.log(error);
              this.showMsg("error", error.msg);
            })
        }
    },
    getData: function(id){
      this.$http.get(this.$Api+"purchases/detail",{params:{U_PurchaseNum: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.datamap[d.data.type] = d.data;
          this.detailData = d.data;
      },(error) =>{
        console.log(error);
      })
    },
  },
  components: {tblab,btn,detail},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"采购订单管理", type:"back"}, {name:"采购订单"}]);
    }
  }
}
</script>
