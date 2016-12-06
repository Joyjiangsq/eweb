<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <!-- <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag' @click="checkedAll" v-model="all"> -->
                      {{tone.name}}
                      <span  v-if="tone.sort">升序</span>
                      <span  v-if="tone.sort">降序</span>
                </th>
              </tr>
        </thead>
        <tbody  v-show="loading? false:noresult? false: true">
              <tr v-for="(order, done)  in dataList" :class="[done.selected && needselected?tableCss.selectedRow:'',order%2 == 1? tableCss.active:'']" @click="clickRow(order, done)">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <!-- <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag' :checked="done.checkTag" v-model = "done.checkTag"  @click="clickOne(done[codevalue])"> -->
                          <span v-if="sone.type == 'data'" :style="sone.style" :class='[tableCss.inoneitem, sone.attr == "price"?"price":""]'> {{{getText(done[sone.labelValue])}}}</span>
                          <span v-if="sone.type == 'component' || sone.type == 'componentspec'" >
                              <span v-widget="{widget: sone, data: done, cname: sone.cname}"></span>
                          </span>
                          <span v-if="sone.type == 'index'" >{{getIndex(order)}}</span>
                          <span v-if="sone.type == 'operator'" >
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
import Vue from "vue";
import Utils from "common/Utils";
import tableCss from "./tableCss.css";
import btnbar from "component/sprite/buttonbar";
import iconbar from "component/sprite/iconbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
     needindex:{
       default: true
     },
     
  },
  data: function () {
    return {
        tableCss,
        oldIndex: 0
    }
  },
  created: function(){
    if(this.headercaption[0].type) {
      if (this.headercaption[0].type != "index" && this.needindex) this.headercaption.unshift({type:"index"});
    }
  },
  methods:{
    clickRow: function(index, d) {
        if(d.selected !== false) return false
        this.dataList[this.oldIndex].selected = false;
        d.selected = true;
        this.$set("oldIndex", index);
        this.$dispatch("rowclick", d);
    },

    getText: function(one) {
      if(one == "") return "-"
      if(one == "undefined" || !one) return "-"
      return one;
    },

    getIndex: function(index) {
        let p = this.params.page || 1;
        p = p*1;
        return (index*1+1 + (p-1)*10)
    }
  },
  ready: function () {

  },
  attached: function () {},
  components: {btnbar, iconbar},
}
</script>
