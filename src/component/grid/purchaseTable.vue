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
              <tr v-for="(order, done)  in dataList" >
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <!-- <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag' :checked="checked" @click="clickOne(done[codevalue])"> -->
                          <span v-if="sone.type == 'data'" >
                            <span v-if="sone.attr == 'price'">￥</span>{{done[sone.labelValue] || '-'}}</span>
                          <div v-if="sone.type == 'edit'" >
                              <div :class="tableCss.iptBox">
                                  <input type="text" name="name" :class='tableCss[done[sone.labelValue].defCss]' :value="done[sone.labelValue].def" @blur="done[sone.labelValue].validateFun(done, index)" v-model="done[sone.labelValue].def">
                                  <div :class="tableCss.errorRow">{{done[sone.labelValue].errorMsg}}</div>
                              </div>
                          </div>
                          <span v-if="sone.type == 'operator'" >
                                <iconbar  :buttons="btnData(done)"  @btnclick="btnEventHandler"></iconbar>
                          </span>

                    </td>
              </tr>
              <tr v-if="curaction == 'add'">
                  <td  v-for="(index, sone) in headercaption">
                    <input type="text" name="name" value="" :class='tableCss.enterKey' @keyup.enter="onEnterLook" v-if="index == 1">
                    <span :class="tableCss.potert" @click="moreClikHandler"  v-if="index == 1">
                        <icon iconname="icon-elip"></icon>
                    </span>
                  </td>
              </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import Utils from "common/Utils";
import tableCss from "./tablespec.css";
import icon from "component/sprite/icon";
import iconbar from "component/sprite/iconbar";
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
        tableCss,
        dataList: this.curaction == "purchase"? [] : this.datas
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
        // });
        this.$dispatch("loadsuccess", {      // 默认产品规格
            "ItemCode":Math.random(),
            "ItemName":"这是产品名称",
            "SWW":"这是产品包",
            "FirmName":"这是二级分类",
            "U_ThreeL":"这是三级分类",
            "U_Brand":"这是品牌",
            "U_CardName":"这是供应商",
            "U_Modle":"这是型号",
            "U_Series":"这是系列",
            "U_MQuality":"这是材质",
            "Spec":"这是规格",
            "stock":20,
            "SalUnitMsr":"这是单位"
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
