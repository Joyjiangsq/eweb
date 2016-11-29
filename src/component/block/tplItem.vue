<template lang="html">
    <div class="">
      <div class="" v-if="item.type == 'men'">
          <div :class="css.typeitem" v-if="m_array.length !=0">
                <p :class="css.ptitle">门</p>
                <div :class="css.rowBox">
                  <tb :headercaption="m_header_d" :datas="m_array"  :load="false"  :detail="true" ></tb>
                </div>
          </div>
          <div :class="css.typeitem" v-if="m_five_array.length !=0">
                <p :class="css.ptitle">门控五金</p>
                <div :class="css.rowBox">
                  <tb :headercaption="m_five_header_d" :datas="m_five_array"  :load="false" :detail="true" ></tb>
                </div>
          </div>
          <div :class="css.typeitem" v-if="m_lock_array.length !=0">
                <p :class="css.ptitle">智能门锁</p>
                <div :class="css.rowBox">
                    <tb :headercaption="m_lock_header_d" :datas="m_lock_array"  :load="false" :detail="true" ></tb>
                </div>
          </div>
      </div>
      <div class="" v-if="item.type == 'chugui'">
        <div :class="css.typeitem" v-if="g_array.length !=0">
              <p :class="css.ptitle">柜体/门板/配件</p>
              <div :class="css.rowBox">
                <tb :headercaption="g_header_d" :datas="g_array"  :load="false" :curaction="curaction" :detail="detail" ></tb>
              </div>
        </div>
        <div :class="css.typeitem" v-if="t_array.length !=0">
              <p :class="css.ptitle">台面</p>
              <div :class="css.rowBox">
                <tb :headercaption="t_header_d" :datas="t_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
              </div>
        </div>
        <div :class="css.typeitem" v-if="w_array.length !=0">
              <p :class="css.ptitle">五金/厨电/水槽龙头</p>
              <div :class="css.rowBox">
                <tb :headercaption="w_header_d" :datas="w_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
              </div>
        </div>
      </div>
      <tbbase :headercaption="header" :datas="item.sub_orders" :load="false" v-else></tbbase>
    </div>
</template>

<script>
import mdialog from "component/blockcommon/mealDialog";
import css from "./type.css";
import tbbase from "component/grid/tableListBase";
import tb from "component/grid/menTable";
import {sale_chu_g_header_d,
        sale_chu_tm_header_d,
        sale_chu_f_header_d,
        sale_men_header_d,
        sale_men_five_header_d,
        sale_men_z_header_d} from "config/headerConst";
export default {
  props:{
    item:{
      default: function(){
        return {}
      }
    },

  },
  data: function () {
    return {
      css,
      m_array:[],
      m_five_array:[],
      m_lock_array:[],
      g_array:[],
      t_array:[],
      w_array:[],
      m_header_d:sale_men_header_d,
      m_five_header_d:sale_men_five_header_d,
      m_lock_header_d:sale_men_z_header_d,
      g_header_d: sale_chu_g_header_d,
      t_header_d:sale_chu_tm_header_d,
      w_header_d:sale_chu_f_header_d,
      header:[{name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"dop", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"产品规格", labelValue:"Spec", type:"data"},{name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},{name:"备注", labelValue:"Freetxt",type:"data"}],
    }
  },
  computed: {},
  ready: function () {
    for (var i = 0; i < this.item.sub_orders.length; i++) {
        let one = this.item.sub_orders[i];
        if(this.item.type == "men") {
          // 木门和铝框门的时候 渲染门的列表 m_array
          if(one.FirmName == '木门' || one.FirmName == '铝框门') {
              this.m_array.push(one);
              continue;
          }
          // 门控五金 非智能锁的时候 渲染 m_five_array
          if(one.FirmName == '门控五金' && one.U_ThreeL.indexOf("智能") == -1) {
              this.m_five_array.push(one);
              continue;
          }
          // 门控五金 智能门锁的时候  渲染 m_lock_array
          if(one.FirmName == '门控五金' && one.U_ThreeL.indexOf("智能") != -1) {
              this.m_lock_array.push(one);
              continue;
          }
        }
        else if(this.item.type == "chugui") {
           if(one.FirmName == '柜体' || one.FirmName == '门板' || one.FirmName == '配件（厨柜）') {
             this.g_array.push(one);
             continue;
           }
            // 门控五金 非智能锁的时候 渲染 t_array
           else if(one.FirmName == '台面') {
             this.t_array.push(one);
             continue;
           }
            // 门控五金 智能门锁的时候  渲染 w_array
           else  this.w_array.push(one);
        }
    }
  },
  attached: function () {},
  methods: {},
  components: {tbbase, tb}
}
</script>

<style lang="css">
</style>
