<template>
    <div class="">
      <!--产品集合-->
      <dialog :flag="show" title="产品集" >
            <div slot="containerDialog">
                <tb  :load="load" url="" :params="searchParams" :headercaption="headerCaption"></tb>
            </div>
            <div slot="footerDialog"></div>
      </dialog>
    </div>
</template>

<script>
import tb from "component/grid/tableListBase";
import dialog from "component/dialog/dialog";
export default {
  props:{
      plist: {
        default: function(){
          return []
        }
      },
      show:{
        default: false
      }
  },
  data: function () {
    return {
      headerCaption:[
             {type:"operator", name:"", icon: true, type:""},
             {name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
             {name:"产品包", labelValue:"SWW", type:"data"},{name:"二级分类", labelValue:"FirmName", type:"data"},
             {name:"三级分类", labelValue:"U_ThreeL", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
             {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
             {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
             {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}
      ],
      load: false,
      searchParams:{},
      testData:[]
    }
  },

  ready: function () {
  },
  attached: function () {},
  methods: {
  },
  components: {tb, dialog},
  "watch": {
    "plist":{
      deep: true,
      handler: function(){
          console.log(this.plist);
      }
    }
  }
}
</script>
