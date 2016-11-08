import tb from "component/grid/tableSpec";
import tbbase from "component/grid/tableListBase";
import css from "./type.css";
import {showTips} from "actions/index";
import adapter from "./tbAdapter/purchaseAdapter";
import mdialog from "component/blockcommon/mealDialog";
export default {
  props :{
    subvalidate:{         // 开启验证的开关   验证结束会向父类派发success 和 fail 两个事件 并且附带品类名称
      default: false
    },
    testdata:{
      default: function(){
        return []
      },
    },
    recdata:{
      default: function(){
        return {
          Address2:"安徽省,合肥市,高新区,xxx街道"
        }
      },
    },
    curaction:{
      default: "add"
    },
    detail:{
      default: false,
    }
  },
  data: function () {
    return {
      css,
      vlist:[],
      headercaption:[{type:"operator", name:""},{name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},{name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"U_Pquantity",type:"edit"},{name:"转化数量", labelValue:"Quantity",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"},
                  ],
      headerdetail:[{name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"shigongfucaicc", component:mdialog},
                    {name:"所属包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},{name:"使用库存", labelValue:"use_stores",type:"data"},
                    {name:"采购数量", labelValue:"U_Pquantity",type:"data"},{name:"转化数量", labelValue:"Quantity",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"}],
      tableEvents:{
          operatorRender: function(d){
          },
          operatorHandler: function(d){
          }
      },
      validateRec :true, // 验证 列表
    }
  },
  computed: {
  },
  created: function () {

  },
  attached: function () {},
  methods: {

    // 验证列表数据
    validateFun: function(){
        this.validateRec = true;
        for (var i = 0; i < this.vlist.length; i++) {
          let one = this.vlist[i];
            for(var key in one) {
              if(typeof(one[key]) == "object") {
                  if(one[key].tb_disabled) continue;
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false;}
              }
          }
        }
        // 收件信息验证
        if(!this.validateRec) this.$dispatch("fail", {project: this.curName});
        else {
            let params = {sub_orders: this.vlist, rec_info: this.recdata};
            this.$dispatch("success", {project:this.curName,data:params});
        }
    }
  },
  ready: function(){
    if(!this.detail) {
      for (var i = 0; i < this.testdata.length; i++) {
        var one = this.testdata[i];
        this.vlist.push(adapter(one));
      }
    }
    if(this.curaction == "edit") {
      this.headercaption.splice(0,1);
    }
  },
  components: {tb, tbbase},
  watch:{
    "subvalidate": function() {
        // 执行验证
        this.validateFun();
    }
  }
}
