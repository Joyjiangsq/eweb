<template>
      <div class="">
            <span v-if="curStatus == 'no-result'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">没有数据</span>
            <span v-if="curStatus =='loading'" style="text-align: center; color: gray; display: block; margin: 0 auto; padding: 50px;">加载中</span>
            <div v-if="curStatus == 'renderData'">
                    <div :class="css.rowbox" v-for="one in viewData">
                          <div :class="css.rowhead">
                              <span :class="css.check">
                                    <checkbx  @checkclick="checkClick(one)" :close="one.U_OrderStatus != '待采购' && one.U_OrderStatus != 'e站驳回'"></checkbx>
                              </span>
                              <icon :classname="css.clicktarget" class="gray" :iconname="one.show?'icon-down02':'icon-right2'" @click="iconClick(one)"></icon>
                              <span :class="css.srow">
                                    {{one.U_Date | dateformate}}
                                     订单号：
                                     <span class="atype" @click="toDetailHandler(one)">{{one.U_PurchaseNum}}</span>
                                     <span :class='css.osLine'></span>
                                     SAP订单号：
                                     <span :class="css.saptype">{{one.DocNum || '暂无'}}</span>
                                     </span>

                              <span :class="[css.srow, css.orderOne]">{{one.base_info.order_type}} <span :class='css.osLine'></span> <span v-if="one.U_OrderStatus == 'e站驳回' || one.U_OrderStatus == '店长驳回'" class='reback'>{{one.U_OrderStatus}}</span><span class='common' v-else>{{one.U_OrderStatus}}</span></span>
                              <span :class="[css.srow, css.orderTwo]">
                                  <img :src='typeimg':class='css.imgone' />品类品牌： {{getTypeName(one.type)}}<span :class='css.osLine'></span>  {{one.sub_orders[0]['U_Brand']}}
                              </span>

                              <span :class="css.wlBtn">
                                <a href="one.U_PageLink" target="_blank" class="atype" v-if="one.U_PageLink"><icon iconname="icon-search"></icon>查看物流</a>
                                <span class='gray'><icon iconname="icon-search" v-else></icon>查看物流</span>
                              </span>
                          </div>
                          <div :class="css.tbbox" v-if="one.U_OrderStatus == 'e站驳回' || one.U_OrderStatus == '待采购'" v-show="one.show">
                                <tb :datas="one['sub_orders']" :srcdata="one" :recdata="one.rec_info" :ignorevalidate="one.ignorevalidate" :subvalidate="subvalidate" @fail="failHandler" @success="successHandler"></tb>
                          </div>
                          <div :class="css.tbbox" v-show="one.show" v-else>
                                <tb :datas="one['sub_orders']" :detail="true"></tb>
                          </div>
                    </div>
            </div>
      </div>
</template>
<script>
//DocNum
import {showTips} from "actions/index";
import css from "./p.css";
import list from "common/mixinList";
import tb from "component/block/tb_purchase.vue";
import typeimg from "asset/img/type.png";
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
      typeimg:typeimg,
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
    getTypeName: function(t) {
        return utils.getCateryCname(t);
    },
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

        // this.changeIds(one.U_PurchaseNum);
        this.changeIds(one);
    },

    changeIds: function(one){
        if(this.orderids.length == 0) {
          this.orderids.push(one);
          return false;
        }
        else {
          let exist = true;
          let index = 0;
          for (var i = 0; i < this.orderids.length; i++) {
            let item = this.orderids[i];
            index = i;
            if(item.U_PurchaseNum == one.U_PurchaseNum) {
                exist = true;
                break;
            }
            else exist = false;
          }
          if(exist) this.orderids.splice(index, 1);
          else this.orderids.push(one);
        }
    },
    successHandler: function(d) {
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
    },
    loadSuccess: function(){
        this.checkList = [];
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
