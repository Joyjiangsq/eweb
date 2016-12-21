<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" >
                  <span :style="tone.style" :class="tone.style?tableCss.wrap:''">
                    <!-- <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag' @click="checkedAll" v-model="all"> -->
                    {{tone.name}}</span>

                </th>
              </tr>
        </thead>
        <tbody >
              <tr v-for="(order, done)  in dataList" :class="order%2 == 1? tableCss.active:''">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <span v-if="sone.type == 'data'" >
                                <span v-if="sone.attr == 'price'">￥</span>{{done[sone.labelValue] || '-'}}
                          </span>
                          <span v-if="sone.type == 'dataspec'" >
                                <span v-if="sone.attr == 'price'">￥</span>{{done[sone.labelValue].def || done[sone.labelValue] || "-"}}
                          </span>
                          <div v-if="sone.type == 'edit'" >
                              <span v-if="done[sone.labelValue].tb_disabled">-</span>
                              <div :class="tableCss.iptBox" v-else>
                                  <input type="text" name="name" :class='tableCss[done[sone.labelValue].defCss]' :value="done[sone.labelValue].def" @blur="done[sone.labelValue].validateFun(done, index)" v-model="done[sone.labelValue].def">
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
                                <iconbar  :buttons="btnData(done, order)"  @btnclick="btnEventHandler"></iconbar>
                          </span>

                    </td>
              </tr>
              <!-- <tr v-if="curaction == 'add'">
                  <td  v-for="(index, sone) in headercaption">
                    <input type="text" name="name" value="" :class='tableCss.enterKey' @keyup.enter="onEnterLook" v-if="index == 1">
                    <span :class="tableCss.potert" @click="moreClikHandler"  v-if="index == 1">
                        <icon iconname="icon-elip"></icon>
                    </span>
                  </td>
              </tr> -->
        </tbody>
    </table>
  </div>
</template>

<script>
/**
  定制品的逻辑不好抽离  单独做一份 定制品的业务组件
**/
import Utils from "common/Utils";
import tableCss from "./tablespec.css";
import icon from "component/sprite/icon";
import iconbar from "component/sprite/iconbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
    curaction:{       // 身份不同 逻辑不同
      default:"add"
    },
    enterUrl: {
      type: String,
      default:""
    },

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
    onEnterLook: function(e) {
        // this.$http.get(this.$Api+ (this.enterUrl || ""),{params:{id: e.target.value}}).then((res) => {
        // },(error) =>{
        //   console.log(error);
        // })
        this.$dispatch("loadsuccess", {      // 默认产品规格
            "ItemCode":Math.random(),
            "ItemName":"这是产品名称",
            "U_CutAMe":"切角方式",
            "FirmName":"这是二级分类",
            "U_ThreeL":"这是三级分类",
            "U_Brand":"这是品牌",
            "U_CardName":"这是供应商",
            "U_Modle":"这是型号",
            "U_Series":"这是系列",
            "U_MQuality":"这是材质",
            "Spec":"这是规格",
            "stock":20,
            "U_IKeyHole":"1", // 手否开孔
            "Color":"红色",
            "SalUnitMsr":"这是单位",
            "remark":"---xxx",
            "stock":11

        });
    },

    moreClikHandler: function(){
        this.$dispatch("more");
    }
  },
  attached: function () {},
  components: {iconbar, icon},
}
</script>
