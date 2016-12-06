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
      <tbbase :headercaption="header" :datas="item.sub_orders" :load="false" v-if="item.type != 'chugui' && item.type != 'men'"></tbbase>
    </div>
</template>

<script>
import mdialog from "component/blockcommon/mealDialog";
import css from "./type.css";
import tbbase from "component/grid/tableListBase";
import tb from "component/grid/customTable";
import {specFun, specSetOne, getType} from "component/blockcommon/specCommon.js";
import {sale_chu_g_header_d,
        sale_chu_tm_header_d,
        sale_chu_f_header_d,
        sale_men_header_d,
        sale_men_five_header_d,
        sale_men_z_header_d,
        sale_standard_header_d} from "config/headerConst";
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
      m_header_d:sale_men_header_d(),
      m_five_header_d:sale_men_five_header_d(),
      m_lock_header_d:sale_men_z_header_d(),
      g_header_d: sale_chu_g_header_d(),
      t_header_d:sale_chu_tm_header_d(),
      w_header_d:sale_chu_f_header_d(),
      header:sale_standard_header_d()
    }
  },
  computed: {},
  ready: function () {
    if(this.item.type == "men") {
        let menMap = specFun(this.item.sub_orders, "men");
        this.m_array = menMap.a;
        this.m_five_array = menMap.b;
        this.m_lock_array = menMap.c;
    }
    else if(this.item.type == "chugui") {
        let chuguiMap = specFun(this.item.sub_orders, "chugui");
        this.g_array = chuguiMap.a;
        this.t_array = chuguiMap.b;
        this.w_array = chuguiMap.c;
    }
  },
  attached: function () {},
  methods: {},
  components: {tbbase, tb}
}
</script>

<style lang="css">
</style>
