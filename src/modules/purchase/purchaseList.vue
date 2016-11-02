<template>
      <div class="">
            <span v-if="curStatus == 'no-result'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">没有数据</span>
            <span v-if="curStatus =='loading'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">加载中</span>
            <div v-if="curStatus == 'renderData'">
                    <div :class="css.rowbox" v-for="one in viewData">
                          <div :class="css.rowhead">
                              <icon :classname="css.clicktarget" :iconname="one.show?'icon-down':'icon-right3'" @click="iconClick(one)"></icon>
                              <span :class="css.check">
                                    <checkbx  @checkclick="checkClick(one)"></checkbx>
                              </span>
                              <span :class="css.srow">采购订单号： <span :class="css.inrow" @click="toDetailHandler(one)">{{one.U_PurchaseNum}}</span></span>
                              <span :class="css.srow">采购订单状态： 待采购</span>
                              <span :class="css.srow">供应商：xxx</span>
                          </div>
                          <div :class="css.tbbox" v-show="one.show">
                                <tb :datas="one['sub_orders']" :srcdata="one" :recdata="one.rec_info" :type="one.type" :orderid="one.U_PurchaseNum" :ignorevalidate="one.ignorevalidate" :subvalidate="subvalidate" @fail="failHandler" @success="successHandler"></tb>
                          </div>
                    </div>
            </div>
      </div>
</template>

<script>
import {showTips} from "actions/index";
import css from "./p.css";
import list from "common/mixinList";
import tb from "component/pblock/tb_purchase.vue";
import icon from "component/sprite/icon";
import checkbx from "component/checkbox/checkBox";
import utils from "common/Utils";
import adapter from "./itemAdapter.js";
export default {
  mixins:[list],
  props:{
    subvalidate: {
      default:false
    },
    orderids:{
      default: function(){
        return []
      }
    }
  },
  data: function () {
    return {
      css,
      viewData:[],
      checkList:[],
      orderMap:[],
      counts:0
    }
  },
  computed: {},
  ready: function () {

  },
  methods:{
    toDetailHandler: function(one) {
        this.$router.go({path:"purchase/purchasedetail", query:{orderid: one.U_PurchaseNum}})
    },
    iconClick: function(one){
        one.show = !one.show
    },
    checkClick: function(one) {
        one.ignorevalidate = !one.ignorevalidate;
        if(!one.ignorevalidate) this.checkList.push(1);
        else this.checkList.pop();

        this.changeIds(one.U_PurchaseNum);
    },
    changeIds: function(id){
        let index = this.orderids.indexOf(id);
        if(index == -1) this.orderids.push(id);
        else {
            this.orderids.splice(index, 1);
        }
    },
    successHandler: function(d) {
        d.sub_orders = d.data;
        delete d.data;
        let newObj = utils.cloneObj(d);
        adapter(newObj.sub_orders);
        this.orderMap.push(newObj);
        this.counts += 1;
        if(this.checkList.length == this.counts) {
           this.$dispatch("success", this.orderMap);
        }
    },
    failHandler : function(d) {
        d.show = true;
    },
    adapter: function(datas){
      this.viewData = [];
      this.curStatus = 'renderData';
      this.dataList = datas;
      for (var i = 0; i < this.dataList.length; i++) {
          var one = this.dataList[i];
          one.show = false;
          one.ignorevalidate = true;
          this.viewData.push(utils.cloneObj(one));
      }
    }
  },
  attached: function () {},
  components: {icon,tb,checkbx},
  "watch": {
    "subvalidate": function(){
        this.orderMap = [];
        if(this.checkList.length == 0) {
          showTips(this.$store, {type:"warn", msg:"至少选择一项"});
        }
        this.counts = 0;
    }
  }
}
</script>
