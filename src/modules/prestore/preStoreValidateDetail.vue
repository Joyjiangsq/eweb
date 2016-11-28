<template>
        <div class="">
          <detail :data="detailData"></detail>
          <tblab  v-if="show" :tabs="tabs"  scene="back"  :startvalidate="startvalidate"  :datamap="datamap" :detail.sync="detail"></tblab>
          <div class="cfooter" v-if="detailData.U_OrderStatus == '待采购' || detailData.U_OrderStatus == 'e站驳回'">
              <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">驳回</btn>
          </div>

          <dialog :flag.sync="showBack" title="请输入驳回原因" @dialogclick="dialogclick">
                <div slot="containerDialog">
                      <textarea name="name" style="width: 100%" rows="8" cols="40" v-model="backValueIpt" placeholder="请填写驳回理由" ></textarea>
                </div>
          </dialog>
        </div>
</template>

<script>
import Utils from "common/Utils";
import {setTitle} from "actions";
import css from "./pre.css";
import detail from "modules/common/detailInfo";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLab";
import btn from "component/sprite/button";
import adapter from "./itemAdapter";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      detail: true,
      startvalidate: false,
      orderId:"",
      tabs:[],
      show: false,
      datamap:{},
      backValueIpt:"",
      detailData:{},
      showBack:false
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
      // this.startvalidate = !this.startvalidate;
        this.showBack = !this.showBack;
        // 如果是e站驳回  则默认显示e站的驳回理由
        if(this.detailData.U_OrderStatus == "e站驳回") this.backValueIpt = this.detailData.U_CloseWhy || "";
    },

    dialogclick: function(d) {
      if(d.action == "confirm") {
        this.$http.put(this.$Api+"stockpiles",JSON.stringify([{U_CloseWhy:this.backValueIpt, U_OrderStatus:8,U_PurchaseNum: this.orderId}])).then((res) => {
            var d = res.json();
            this.showMsg("success", "驳回成功");
            this.showBack = !this.showBack;
            this.detailData.U_CloseWhy = this.backValueIpt;
            this.detailData.U_OrderStatus = "店长驳回";
        },(error) =>{
          console.log(error);
          this.showMsg("error", error.msg);
        })
      }
    },
  },
  components: {tblab, detail, btn},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"备货订单", type:"back"}, {name:"详情"}]);
    }
  }
}
</script>
