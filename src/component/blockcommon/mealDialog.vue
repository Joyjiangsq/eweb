<template lang="html">
    <div>
        {{value}}
        <span  :class="css.iconl" v-if="showTip" @click = "showDialog">
            <icon iconname="icon-tip"></icon>
        </span>

        <!--选品对话框-->
        <dialog :flag="showd" title="套餐商品" :classname="css.dcontent">
              <div slot="containerDialog">
                    <tb :headercaption="headercaption"  :datas="listDatas"></tb>
              </div>
              <div slot="footerDialog"></div>
        </dialog>
    </div>
</template>

<script>
import icon from "component/sprite/icon";
import tb from "component/grid/tableListBase";
import css from "./md.css";
import dialog from "component/dialog/dialog"
export default {
  data: function () {
    return {
        css,
        value:"",
        showTip: false,
        showd: false,
        listDatas:[{}],
        headercaption:[{name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemName", type:"data"},
                      {name:"产品包", labelValue:"SWW", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"颜色", labelValue:"Color", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"产品规格", labelValue:"Spec", type:"data"},{name:"数量", labelValue:"Quantity", type:"data"},
                      {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"},
                      ]
    }
  },
  computed: {

  },
  ready: function () {
    this.value = this.selfData.ItemName;
    if(!!this.selfData.ProductList && this.selfData.ProductList.length != 0) {
      this.showTip = true;
    }
  },
  attached: function () {},
  methods: {
    showDialog: function(){
          this.getData();
          this.showd = !this.showd;

    },
    getData: function(){
        console.log(this.selfData.ProductList);
        this.$http.post(this.$Api+"products/package",JSON.stringify(this.selfData.ProductList)).then((res)=>{
              let d = res.json();
              this.listDatas = d.data;
         }, (e)=>{

        });
    }
  },
  components: {icon,dialog,tb}
}
</script>

<style lang="css">
</style>
