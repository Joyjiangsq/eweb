<template>
      <div :class="pageCss.paginationBox" v-if="tPages > 1">
              <div :class="pageCss.pageCenter">
                    <span :class='indexBtn' @click="clickPage(1)">首页</span>
                    <span :class='prevBtn'  @click="clickPage(curpage-1)">上一页</span>
                    <span :class='pageCss.pageIndex'>
                          <span v-for="one in pageArry"  @click="clickPage(one)" :class="one == curpage?pageCss.active:''">{{one}}</span>
                    </span>
                    <span :class='nextBtn'  @click="clickPage(curpage*1+1)">下一页</span>
                    <span :class='lastBtn'  @click="clickPage(tPages)">尾页</span>
              </div>
              <div :class="pageCss.gotoBox">
                    跳转至
                    <input type="text" name="name"  v-model="targetpage  | intonly"/>
                    <span  :class='gotoBtn'  @click="clickPage(targetpage)">确定</span>
              </div>
      </div>
</template>

<script>
import pageCss from "./paginate.css";
export default {
  props:{
    curpage: { 
      // type: Number,
      default: 1
    },
    hash:{
      default: true
    },
    size:{
      type: Number,
      default: 10
    },

    totals:{
      type: Number,
      default: 0
    },

    pix:{
      type: Number,
      default: 5
    },
    events:{
      type: Object,
      default: function(){
        return {
          pageChange: function(newpage) {

          }
        }
      }
    }
  },
  data: function () {
    return {
      pageCss,
      tPages: 0,
      indexBtn:pageCss.defTheme,
      prevBtn:pageCss.defTheme,
      nextBtn:pageCss.defTheme,
      lastBtn:pageCss.defTheme,
      gotoBtn:pageCss.defTheme,
      targetpage:"",
      pageArry:[]
    }
  },
  created: function(){
      this.validateBtn();
  },
  computed: {
  },
  ready: function () {},
  attached: function () {},
  methods: {
    renderPages() {
        let ay = [];
        this.curpage = isNaN(this.curpage*1)? 1: this.curpage*1;
        for(var i = this.pix; i >0; i--) {
            if(this.curpage - i <= 0) continue;
            ay.push(this.curpage - i);
        }
        ay.push(this.curpage);
        for(var i = 1; i <= this.pix; i++) {
            if(this.curpage + i > this.tPages) break;
            ay.push(this.curpage + i);
        }
        this.pageArry = ay;
    },
    validateBtn() {
      this.indexBtn = this.prevBtn = this.lastBtn = this.nextBtn = this.pageCss.defTheme;
      if(this.curpage == 1) {this.indexBtn = this.prevBtn = this.pageCss.closeBtn;return false}
      if(this.curpage == this.tPages) {this.lastBtn = this.nextBtn = this.pageCss.closeBtn; return false}
    },
    clickPage(page) {
        if(!page || isNaN(page*1) || page < 1 || page > this.tPages) return false;
        let q = this.$route.query;
        let path = this.$route.path.split("?")[0];
        q.page = page*1;
        this.curpage = page*1;
        if(this.hash) this.$router.go({path:path, query: q});  // 路由驱动
        else this.$dispatch("pagechange", {page:this.curpage});      // 事件驱动
        this.validateBtn();

        this.renderPages();
    }
  },
  watch:{
    "totals": function(){
        this.tPages = Math.ceil(this.totals/this.size);
    },
    "tPages": function(){
      this.renderPages();
    }
  },
  components: {}
}
</script>
