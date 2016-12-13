<template>
  <div :class="css.tableBox">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='css.checkTag' @click="checkedAll" v-model="all">
                      {{tone.name}}
                </th>
              </tr>
        </thead>
        <tbody >
              <tr v-for="(order, done)  in dataList" :class="[order%2 == 1? css.active:'']" >
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="css[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='css.checkTag' :checked="done.checkTag" v-model = "done.checkTag" @click="clickOne(done,order)">
                          <span v-if="sone.type == 'data'" >
                                    {{done[sone.labelValue] || "-"}}
                          </span>
                           <span v-if="sone.type == 'dataspec'" >
                                    {{done[sone.labelValue].def || "-"}}
                          </span>
                          <div v-if="sone.type == 'edit'" >
                              <div v-if="done.code == 'gxh'">
                                    {{done[sone.labelValue] || '-'}}
                              </div>
                              <div :class="css.iptBox" v-if="!done[sone.labelValue].tb_disabled">
                                  <input type="text" style="width:85px" name="name" :class='css[done[sone.labelValue].defCss]' :value="done[sone.labelValue].def"  @blur="done[sone.labelValue].validateFun(done, index)" v-model="done[sone.labelValue].def">
                                  <div :class="css.errorRow">{{done[sone.labelValue].errorMsg}}</div>
                              </div>

                              <div v-else > -</div>
                          </div>
                          <span v-if="sone.type == 'operator'" >
                                <btnbar :buttons="btnData(done,order)"  @btnclick="btnEventHandler"></btnbar>
                          </span>
                    </td>
              </tr>
              <tr v-if="scene == 'add_yes'">
                  <td  v-for="(index, sone) in headercaption">
                    <span v-if="index == 0" :class="css.addTarget" >
                        <btn @clickaction="btnClickHandler" :iconname="icon-add" >选择分类</btn>
                    </span>
                  </td>
              </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
// 报价模板表格2
import Utils from "common/Utils";
import btn from "component/sprite/button";
import css from "./price.css";
import icon from "component/sprite/icon";
import btnbar from "component/sprite/buttonbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
      scene: {      // 如果当前是模板新增页面 则开发增加按钮
          type: String,
          default: "add_no" // add_yes
      }
  },
  data: function () {
    return {
        css,
      oldIndex: 0
    }
  },
  created: function(){
  },
  ready: function () {
  },
  methods:{
     btnClickHandler: function(){
         this.$dispatch("selectchange");
     }
  },
  attached: function () {},
  components: {btnbar, icon, btn},
}
</script>
