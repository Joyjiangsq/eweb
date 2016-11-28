<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag' @click="checkedAll" v-model="all">
                      {{tone.name}}
                </th>
              </tr>
        </thead>
        <tbody >
              <tr v-for="(order, done)  in dataList" :class="order%2 == 1? tableCss.active:''">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                            <input type="checkBox" name="name" value="" v-if="!done.closeCheckTag &&sone.checkbox"  :class='tableCss.checkTag' :checked="done.checkTag" v-model = "done.checkTag" @click="clickOne(done,order)">
                          <span v-if="sone.type == 'data'" >
                            <span v-if="sone.attr == 'price'">￥</span>{{{done[sone.labelValue] || '-'}}}</span>
                          <div v-if="sone.type == 'edit'" >
                              <div :class="tableCss.iptBox">
                                  <input type="text" name="name" :class='tableCss[done[sone.labelValue].defCss]' :value="done[sone.labelValue].def"  @blur="done[sone.labelValue].validateFun(done, index)" v-model="done[sone.labelValue].def">
                                  <div :class="tableCss.errorRow">{{done[sone.labelValue].errorMsg}}</div>
                              </div>
                          </div>
                          <div v-if="sone.type == 'component'">
                                <span v-if="done[sone.labelValue].tb_disabled">-</span>
                                <span v-widget="{widget: sone, data: done, cname: sone.cname}" v-else></span>
                                <div :class="tableCss.errorRow">{{done[sone.labelValue].errorMsg}}</div>
                          </div>
                          <div v-if="sone.type == 'componentspec'">
                                <span v-widget="{widget: sone, data: done, cname: sone.cname}"></span>
                          </div>
                          <span v-if="sone.type == 'operator'" >
                                <!-- <iconbar  :buttons="btnData(done)"  @btnclick="btnEventHandler"></iconbar> -->

                                <iconbar v-if="sone.icon"  :buttons="btnData(done,order)"  @btnclick="btnEventHandler"></iconbar>
                                <btnbar :buttons="btnData(done,order)"  @btnclick="btnEventHandler" v-else></btnbar>
                          </span>

                    </td>
              </tr>
        </tbody>
    </table>
    <div v-show="noresult" :class='tableCss.noresult'>
          没有数据
    </div>
    <div v-show="loading"  :class='tableCss.loading'>
          加载中...
    </div>
  </div>
</template>

<script>
import Utils from "common/Utils";
import tableCss from "./tablespec.css";
import icon from "component/sprite/icon";
import iconbar from "component/sprite/iconbar";
import btnbar from "component/sprite/buttonbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
    enterdep: {
      type: String,
      default:"id"
    },
    curaction:{       // 身份不同 逻辑不同
      default:"add"
    },
    enterUrl: {
      type: String,
      default:""
    }
  },
  data: function () {
    return {
        tableCss
    }
  },
  created: function(){
  },
  ready: function () {
  },
  methods:{
    adapertData(d){
        if(!d.data || d.data.length == 0) {this.noresult = true; this.loading = false; return false;}
        this.dataList = [];
        for (var i = 0; i < d.data.length; i++) {
            let one = d.data[i];
            let rowData = {};
            for (var j = 0; j < this.headercaption.length; j++) {
              var hone = this.headercaption[j];
              if(hone.type == "data") rowData[hone.labelValue] = one[hone.labelValue];
              if(hone.adapterFun) {
                 rowData[hone.labelValue] = hone.adapterFun.call(this._context, one);
              }
              rowData["_id"] = one["_id"];
              if(i == 0) rowData["selected"] = true;  // 选中行样式
              else rowData["selected"] = false;
              if(hone.checkbox) one.checkTag = false;
            }
            let nd = Object.assign(one, rowData);
            if(nd.U_OrderStatus != "待采购" && nd.U_OrderStatus != "e站驳回") nd.closeCheckTag = true;
            this.dataList.push(nd);
        }
          this.$set("loading", false);
    },
    getCheckeds: function() {
        let newa = [];
        for (var i = 0; i < this.dataList.length; i++) {
            let one = Utils.cloneObj(this.dataList[i]);
            if(one.U_OrderStatus != "待采购" && one.U_OrderStatus != "e站驳回") continue;
            delete one.checkTag;
            delete one.selected;
            delete one.U_Consignee;
            delete one.U_ConsigneePhone;
            if(this.dataList[i].checkTag) newa.push(one);
        }
        return newa;
    },
  },
  attached: function () {},
  components: {iconbar, icon, btnbar},
}
</script>
