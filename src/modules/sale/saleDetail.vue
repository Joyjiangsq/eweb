<template>
        <div class="">
          <div :class="css.paddingType">
                <detail :data="baseInfo"></detail>
          </div>
          <div :class="css.dataArea">
                <tblab  v-if="show" :tabs="tabs" :startvalidate="startvalidate" :datamap="datamap" ></tblab>
          </div>
        </div>
</template>

<script>
import {setTitle} from "actions";
import css from "./sale.css";
import basePage from "common/mixinPage";
import tblab from "component/block/typeLabDetail";
import detail from "modules/common/detailInfo";
export default {
  mixins:[basePage],
  data: function () {
    return {
      css,
      startvalidate: false,
      orderId:"",
      baseInfo:{},
      tabs:[],
      show: false,
      datamap:{}
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  created: function(){

  },
  methods: {
    getData: function(id){
      this.$http.get(this.$Api+"sales/detail",{params:{U_FZOrder: id}}).then((res) => {
          var d = res.json();
          this.show = !this.show;
          for (var i = 0; i < d.data.sub_orders.length; i++) {
              var one = d.data.sub_orders[i];
              if(!this.datamap[one.type]) {
                this.datamap[one.type] = [];
                this.datamap[one.type].push(one);
              }
              else {
                this.datamap[one.type].push(one);
              }
          }
          this.tabs = Object.keys(this.datamap);
          this.baseInfo = d.data;
      },(error) =>{
        console.log(error);
      })
    },
    btnClickHandler: function(){
      this.startvalidate = !this.startvalidate;
    }
  },
  components: {tblab, detail},
  route:{
    data: function(){
      if(!this.$route.query.orderid) history.back();
      else {
          this.orderId = this.$route.query.orderid;
      }
      this.getData(this.orderId);
      setTitle(this.$store, [{name:"销售订单管理", type:"back"}, {name:"订单详情"}]);
    }
  }
}
</script>
