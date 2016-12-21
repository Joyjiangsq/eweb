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
              <tr v-for="(order, done)  in dataList" :class="[done.selected && needselected?css.selectedRow:'',order%2 == 1? css.active:'']"  @click="clickRow(order, done)">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="css[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='css.checkTag' :checked="done.checkTag" v-model = "done.checkTag" @click="clickOne(done,order)">
                          <span v-if="sone.type == 'data'" >
                                {{done[sone.labelValue] || '-'}}
                          </span>
                          <div v-if="sone.type == 'edit'" >
                              <div v-if="done.code == 'gxh' || done.code == 'zx'">
                                    {{done[sone.labelValue] || '-'}}
                              </div>
                              <div :class="css.iptBox" v-else>
                                  <input type="text" style="width:85px" name="name" :class='css[done[sone.labelValue].defCss]' :value="done[sone.labelValue].def"  @blur="done[sone.labelValue].validateFun(done, index)" v-model="done[sone.labelValue].def">
                                  <div :class="css.errorRow">{{done[sone.labelValue].errorMsg}}</div>
                              </div>
                          </div>
                          <span v-if="sone.type == 'operator'" >
                                <div v-if="done.code == 'gxh' || done.code == 'zx'">
                                    -
                                </div>
                                <iconbar  :buttons="btnData(done, order)"  @btnclick="btnEventHandler" v-else></iconbar>
                          </span>
                    </td>
              </tr>
              <tr v-if="scene == 'add_yes'">
                  <td  v-for="(index, sone) in headercaption">
                    <span v-if="index == 0" :class="css.addTarget" @click="addOneHandler">
                        <icon iconname="icon-add"></icon>
                    </span>
                  </td>
              </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
// 报价模板表格1
import Utils from "common/Utils";
import css from "./price.css";
import icon from "component/sprite/icon";
import iconbar from "component/sprite/iconbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
      scene: {      // 如果当前是模板新增页面 则开发增加按钮
          type: String,
          default: "add_no" // add_yes
      },

      redef: {          //  重置
          default: false
      }
  },
  data: function () {
    return {
        css,
      // oldIndex: 0
    }
  },
  created: function(){
  },
  ready: function () {
  },
  methods:{
       addOneHandler: function() {
             this.$dispatch("addone");
            //  this.oldIndex = this.oldIndex*1 +1;
       },
       clickRow: function(index, d) {
            if(d.selected !== false) return false
            for(let i = 0; i < this.dataList.length; i++) {
                  let one = this.dataList[i];
                  if(one.selected) {
                        one.selected = false;
                        break;
                  }
            }
            d.selected = true;
            // this.$set("oldIndex", index);
            this.$dispatch("rowclick", d);
      },
  },
  attached: function () {},
  components: {iconbar, icon},
  watch: {
        "redef": function(){
              this.$dispatch("rowclick", this.dataList[0]);
              for(let i = 0; i < this.dataList.length; i++) {
                  let one = this.dataList[i];
                  if(one.selected) {
                        one.selected = false;
                        break;
                  }
             }
             this.dataList[0]['selected'] = true;
        }
  }
}
</script>
