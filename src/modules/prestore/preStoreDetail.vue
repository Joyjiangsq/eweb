<template>
        <div class="">
          <detail :data="detailData"></detail>
          <tblab  v-if="show" :tabs="tabs"  scene="back"   :startvalidate="startvalidate" @success="successHandler" @fail="failHandler" :datamap="datamap" :detail="detailData.U_OrderStatus!='店长驳回'"></tblab>
          <div :class="css.footerBar" v-show="detailData.U_OrderStatus =='店长驳回'">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">提交订单</btn>
          </div>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import css from "./pre.css";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLab";
import btn from "component/sprite/button";
import adapter from "./itemAdapter";
import detail from "modules/common/detailInfo";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      detail: false,
      startvalidate: false,
      orderId:"",
      tabs:[],
      show: false,
      datamap:{},
      detailData:{},
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    getData: function(id){
      this.$http.get(this.$Api+"stockpiles/detail", {params:{U_PurchaseNum: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          this.tabs.push(d.data.type);
          this.datamap[d.data.type] = d.data;
          this.detailData = d.data;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      this.startvalidate = !this.startvalidate;
    },
    successHandler: function(d){
        let one = adapter(Utils.cloneObj(d));
        // 这里的one只可能有一项
        if(one[this.detailData.type]) this.editAction(one[this.detailData.type]);
    },
    failHandler: function(d){
        console.log(d);
    },
    editAction: function(sub){
      //{ "U_PurchaseNum": "FZXS201611100132_101", "sub_orders": [{产品及数量等信息}]}
      let params = {
        U_PurchaseNum:this.orderId,
        sub_orders:sub.list || [],
        rec_info: sub.rec_info,
        U_OrderStatus: -1 // 待采购
      }
      if(sub.U_Enclosure) params.U_Enclosure = sub.U_Enclosure;
      this.$http.put(this.$Api+"stockpiles",JSON.stringify([params])).then((res) => {
          var d = res.json();
          this.showMsg("success", "提交成功");
          this.getData(this.orderId);
          this.show = !this.show;
          this.detail = true;
      },(error) =>{
        console.log(error);
        this.showMsg("error", error.msg);
      })
    }
  },
  components: {tblab,btn,detail},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"备货订单", type:"back"}, {name:"备货订单详情"}]);
    }
  }
}
</script>
