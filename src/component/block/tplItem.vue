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
      m_header_d:[
                  {name:"产品编码", labelValue:"ItemCode", type:"data"},
                  {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"mencc", component:mdialog},
                  {name:"产品包", labelValue:"SWW", type:"data"},
                  {name:"品牌", labelValue:"U_Brand", type:"data"},
                  {name:"型号", labelValue:"U_Modle", type:"data"},
                  {name:"材质", labelValue:"U_MQuality", type:"data"},
                  {name:"规格", labelValue:"Spec", type:"data"},
                  {name:"颜色", labelValue:"U_Colour", type:"data"},
                  {name:"切角方式", labelValue:"U_CutAMe", type:"dataspec"},
                  {name:"玻璃类型", labelValue:"U_GType", type:"dataspec"},
                  {name:"门套线类型", labelValue:"U_DLType", type:"dataspec"},
                  {name:"门套线边数", labelValue:"U_DCLNum", type:"dataspec"},
                  {name:"门扇数", labelValue:"U_DLNum", type:"dataspec"},
                  {name:"门洞宽（mm）", labelValue:"U_DSWide", type:"data"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                  {name:"门洞高（mm）", labelValue:"U_DSHigh", type:"data"},
                  {name:"门洞深（mm）", labelValue:"U_DSThick", type:"data"},
                  {name:"门扇宽（mm）", labelValue:"U_TDWide", type:"data"},
                  {name:"门扇高（mm）", labelValue:"U_TDHigh", type:"data"},
                  {name:"门扇厚（mm）", labelValue:"U_TDThick", type:"data"},
                  {name:"是否开孔", labelValue:"U_IKeyHole", type:"data"},     // 下拉组件  TODO
                  {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"data"},   // 下拉组件
                  {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"data"},        // 下拉组件
                  {name:"开启方式", labelValue:"U_OpenWay", type:"data"},        // 下拉组件 TODO
                  {name:"销售数量", labelValue:"sale_counts", type:"data"},
                  {name:"可用库存量", labelValue:"stock",type:"data"},
                  {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                {name:"备注", labelValue:"Freetxt",type:"data"}],
      m_five_header_d:[
                      {name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"mencc", component:mdialog},
                      {name:"产品包", labelValue:"SWW", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"规格", labelValue:"Spec", type:"data"},
                      {name:"颜色", labelValue:"U_Colour", type:"data"},
                      {name:"销售数量", labelValue:"sale_counts", type:"data"},
                      {name:"可用库存量", labelValue:"stock",type:"data"},
                      {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                      {name:"备注", labelValue:"Freetxt",type:"data"}],
      m_lock_header_d:[
                      {name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"mencc", component:mdialog},
                      {name:"产品包", labelValue:"SWW", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"规格", labelValue:"Spec", type:"data"},
                      {name:"颜色", labelValue:"U_Colour", type:"data"},
                      {name:"智能门锁厚度", labelValue:"U_DThick", type:"data", style:{width: '100px'}},
                      {name:"智能门锁锁体挡板长度（mm）", labelValue:"U_LBLength", type:"data", style:{width: '100px'}},
                      {name:"智能门锁锁体挡板宽度（mm）", labelValue:"U_LBWide", type:"data", style:{width: '100px'}},
                      {name:"智能门锁锁体档板左右螺丝十字中心孔距（mm）", labelValue:"U_AbDis", type:"data", style:{width: '195px'}},
                      {name:"智能门锁锁体档板上下螺丝十字中心孔距（mm）", labelValue:"U_UDDis", type:"data", style:{width: '195px'}},
                      {name:"智能门锁门边到锁面板右侧的距离（mm）", labelValue:"U_LTRDis", type:"data", style:{width: '185px'}},
                      {name:"智能门锁门锁面板总长度（mm）", labelValue:"U_TLLength", type:"data", style:{width: '130px'}},
                      {name:"智能门锁门的类别", labelValue:"U_DType",  type:"data", style:{width: '100px'}},
                      {name:"智能门锁门开向", labelValue:"U_DoorO", type:"data", style:{width: '100px'}},
                      {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"data", style:{width: '100px'}},  //TODO
                      {name:"销售数量", labelValue:"sale_counts", type:"data"},
                      {name:"可用库存量", labelValue:"stock",type:"data"},
                      {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                      {name:"备注", labelValue:"Freetxt",type:"data"}],
      g_header_d: [
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
      t_header_d:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
      w_header_d:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"chuiguicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}],
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
           if(one.FirmName == '柜体' || one.FirmName == '门板' || one.FirmName == '配件') {
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
