<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
              <div class="" v-if="!detail">
                  <div class=""  v-if="curaction == 'add'">
                    <btn @click="toSelect">选品</btn>
                  </div>
                  <div :class="css.rowBox">
                    <div :class="css.typeitem" v-if="m_array.length !=0">
                          <p :class="css.ptitle">门</p>
                          <tb :headercaption="m_header" :datas="m_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                    <div :class="css.typeitem" v-if="m_five_array.length !=0">
                          <p :class="css.ptitle">门控五金</p>
                          <tb :headercaption="m_five_header" :datas="m_five_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                    <div :class="css.typeitem" v-if="m_lock_array.length !=0">
                          <p :class="css.ptitle">智能门锁</p>
                          <tb :headercaption="m_lock_header" :datas="m_lock_header"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                  </div>
              </div>
              <div class="" v-else>
                <div :class="css.typeitem" v-if="m_array.length !=0">
                      <p :class="css.ptitle">门</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_header_d" :datas="m_array"  :load="false" :curaction="curaction" :detail="detail" ></tb>
                      </div>
                </div>
                <div :class="css.typeitem" v-if="m_five_array.length !=0">
                      <p :class="css.ptitle">门控五金</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_five_header_d" :datas="m_five_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                      </div>
                </div>
                <div :class="css.typeitem" v-if="m_lock_array.length !=0">
                      <p :class="css.ptitle">智能门锁</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_lock_header_d" :datas="m_lock_header"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                      </div>
                </div>
              </div>
              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail" :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtextadd  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtextadd>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Freetxt"  placeholder=""  formname='Freetxt' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
            <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <!--选品对话框-->
          <dialog :flag.sync="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                  <mentb  :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></mentb>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 瓷砖分类
import Vue from "vue";
import tb from "component/grid/menTable";
import btn from "component/sprite/button";
import css from "./type.css";
import mentb from "./tblist/menList.vue";
import adapter from "./tbAdapter/menAdapter";
import baseMixins from "./itemMixins";
import mdialog from "component/blockcommon/mealDialog";
export default {
  mixins:[baseMixins],
  data: function () {
    return {
      css,
      curName:"men",
      validate:false,
      tableEvents:{
          operatorRender: function(d, index){
              return [{action:"delete",icon:"icon-delete", data: d, index: index}]
          },
          operatorHandler: function(d){
              if(d.action == "delete") {
                // 木门和铝框门的时候 渲染门的列表 m_array
                if(d.data.FirmName == '木门' || d.data.FirmName == '铝框门') this.m_array.splice(d.index,1)
                // 门控五金 非智能锁的时候 渲染 m_five_array
                if(d.data.FirmName == '门控五金' && d.data.U_ThreeL.indexOf("智能") == -1) this.m_five_array.splice(d.index,1)
                // 门控五金 智能门锁的时候  渲染 m_lock_array
                if(d.data.FirmName == '门控五金' && d.data.U_ThreeL.indexOf("智能") != -1) this.m_lock_array.splice(d.index,1)
              }
          }
      },
      m_array:[],
      m_five_array:[],
      m_lock_array:[],
      m_header:[{type:"operator", name:""},
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
                {name:"门洞宽（mm）", labelValue:"U_DSWide", type:"edit"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                {name:"门洞高（mm）", labelValue:"U_DSHigh", type:"edit"},
                {name:"门洞深（mm）", labelValue:"U_DSThick", type:"edit"},
                {name:"门扇宽（mm）", labelValue:"U_TDWide", type:"edit"},
                {name:"门扇高（mm）", labelValue:"U_TDHigh", type:"edit"},
                {name:"门扇厚（mm）", labelValue:"U_TDThick", type:"edit"},
                {name:"是否开孔", labelValue:"U_IKeyHole", type:"component", cname:"kaikong",component: holeComponent},     // 下拉组件  TODO
                {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"component", cname:"heye", component: heyeComponent},   // 下拉组件
                {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"component",cname:"menxi",  component:mensuoComponent},        // 下拉组件
                {name:"开启方式", labelValue:"U_OpenWay", type:"component",cname:"kaiqi",  component:kaiqiComponent},        // 下拉组件 TODO
                {name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                {name:"可用库存量", labelValue:"stock",type:"data"},
                {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                {name:"备注", labelValue:"Freetxt",type:"edit"}],
      m_five_header:[{type:"operator", name:""},
                      {name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"mencc", component:mdialog},
                      {name:"产品包", labelValue:"SWW", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"规格", labelValue:"Spec", type:"data"},
                      {name:"颜色", labelValue:"U_Colour", type:"data"},
                      {name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                      {name:"可用库存量", labelValue:"stock",type:"data"},
                      {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                      {name:"备注", labelValue:"Freetxt",type:"edit"}],
      m_lock_header:[{type:"operator", name:""},
                      {name:"产品编码", labelValue:"ItemCode", type:"data"},
                      {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"mencc", component:mdialog},
                      {name:"产品包", labelValue:"SWW", type:"data"},
                      {name:"品牌", labelValue:"U_Brand", type:"data"},
                      {name:"型号", labelValue:"U_Modle", type:"data"},
                      {name:"材质", labelValue:"U_MQuality", type:"data"},
                      {name:"规格", labelValue:"Spec", type:"data"},
                      {name:"颜色", labelValue:"U_Colour", type:"data"},
                      {name:"智能门锁厚度", labelValue:"U_DThick", type:"edit", style:{width: '100px'}},
                      {name:"智能门锁锁体挡板长度（mm）", labelValue:"U_LBLength", type:"edit", style:{width: '100px'}},
                      {name:"智能门锁锁体挡板宽度（mm）", labelValue:"U_LBWide", type:"edit", style:{width: '100px'}},
                      {name:"智能门锁锁体档板左右螺丝十字中心孔距（mm）", labelValue:"U_AbDis", type:"edit", style:{width: '195px'}},
                      {name:"智能门锁锁体档板上下螺丝十字中心孔距（mm）", labelValue:"U_UDDis", type:"edit", style:{width: '195px'}},
                      {name:"智能门锁门边到锁面板右侧的距离（mm）", labelValue:"U_LTRDis", type:"edit", style:{width: '185px'}},
                      {name:"智能门锁门锁面板总长度（mm）", labelValue:"U_TLLength", type:"edit", style:{width: '130px'}},
                      {name:"智能门锁门的类别", labelValue:"U_DType",  type:"component", cname:"zhinenglei",component: zhiComponent, style:{width: '100px'}},
                      {name:"智能门锁门开向", labelValue:"U_DoorO", type:"component",cname:"zhinengdir", component:zhinengDirComponent, style:{width: '100px'}},
                      {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"component",cname:"zhinengdir", component:tdComponent, style:{width: '100px'}},  //TODO
                      {name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                      {name:"可用库存量", labelValue:"stock",type:"data"},
                      {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                      {name:"备注", labelValue:"Freetxt",type:"edit"}],
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
      headercaption:[{type:"operator", name:""},
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
                    {name:"门洞宽（mm）", labelValue:"U_DSWide", type:"edit"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                    {name:"门洞高（mm）", labelValue:"U_DSHigh", type:"edit"},
                    {name:"门洞深（mm）", labelValue:"U_DSThick", type:"edit"},
                    {name:"门扇宽（mm）", labelValue:"U_TDWide", type:"edit"},
                    {name:"门扇高（mm）", labelValue:"U_TDHigh", type:"edit"},
                    {name:"门扇厚（mm）", labelValue:"U_TDThick", type:"edit"},
                    {name:"是否开孔", labelValue:"U_IKeyHole", type:"component", cname:"kaikong",component: holeComponent},     // 下拉组件  TODO
                    {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"component", cname:"heye", component: heyeComponent},   // 下拉组件
                    {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"component",cname:"menxi",  component:mensuoComponent},        // 下拉组件
                    {name:"开启方式", labelValue:"U_OpenWay", type:"component",cname:"kaiqi",  component:kaiqiComponent},        // 下拉组件 TODO
                    {name:"智能门锁厚度", labelValue:"U_DThick", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度（mm）", labelValue:"U_LBLength", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板宽度（mm）", labelValue:"U_LBWide", type:"edit", style:{width: '100px'}},
                    {name:"智能门锁锁体档板左右螺丝十字中心孔距（mm）", labelValue:"U_AbDis", type:"edit", style:{width: '195px'}},
                    {name:"智能门锁锁体档板上下螺丝十字中心孔距（mm）", labelValue:"U_UDDis", type:"edit", style:{width: '195px'}},
                    {name:"智能门锁门边到锁面板右侧的距离（mm）", labelValue:"U_LTRDis", type:"edit", style:{width: '185px'}},
                    {name:"智能门锁门锁面板总长度（mm）", labelValue:"U_TLLength", type:"edit", style:{width: '130px'}},
                    {name:"智能门锁门的类别", labelValue:"U_DType",  type:"component", cname:"zhinenglei",component: zhiComponent, style:{width: '100px'}},
                    {name:"智能门锁门开向", labelValue:"U_DoorO", type:"component",cname:"zhinengdir", component:zhinengDirComponent, style:{width: '100px'}},
                    {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"component",cname:"zhinengdir", component:tdComponent, style:{width: '100px'}},  //TODO
                    {name:"销售数量", labelValue:"buyCounts", type:"edit", number: true},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"},
                    ],
      headerdetail:[{name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"mencc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"型号", labelValue:"U_Modle", type:"data"},
                    {name:"材质", labelValue:"U_MQuality", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
                    {name:"玻璃类型", labelValue:"U_GType", type:"data"},
                    {name:"门套线类型", labelValue:"U_DLType", type:"data"},
                    {name:"门套线边数", labelValue:"U_DCLNum", type:"data"},
                    {name:"门扇数", labelValue:"U_DLNum", type:"data"},
                    {name:"门洞宽（mm）", labelValue:"U_DSWide", type:"data"}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
                    {name:"门洞高（mm）", labelValue:"U_DSHigh", type:"data"},
                    {name:"门洞深（mm）", labelValue:"U_DSThick", type:"data"},
                    {name:"门扇宽（mm）", labelValue:"U_TDWide", type:"data"},
                    {name:"门扇高（mm）", labelValue:"U_TDHigh", type:"data"},
                    {name:"门扇厚（mm）", labelValue:"U_TDThick", type:"data"},
                    {name:"是否开孔", labelValue:"U_IKeyHole", type:"data"},
                    {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"data"},
                    {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"data"},
                    {name:"开启方式", labelValue:"U_OpenWay", type:"data"},
                    {name:"智能门锁厚度（mm）", labelValue:"U_DThick", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板长度（mm）", labelValue:"U_LBLength", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体挡板宽度（mm）", labelValue:"U_LBWide", type:"data", style:{width: '100px'}},
                    {name:"智能门锁锁体档板左右螺丝十字中心孔距（mm）", labelValue:"U_AbDis", type:"data", style:{width: '195px'}},
                    {name:"智能门锁锁体档板上下螺丝十字中心孔距（mm）", labelValue:"U_UDDis", type:"data", style:{width: '195px'}},
                    {name:"智能门锁门边到锁面板右侧的距离（mm）", labelValue:"U_LTRDis", type:"data", style:{width: '185px'}},
                    {name:"智能门锁门锁面板总长度（mm）", labelValue:"U_TLLength", type:"data", style:{width: '130px'}},
                    {name:"智能门锁门的类别", labelValue:"U_DType",  type:"data", style:{width: '100px'}},
                    {name:"智能门锁门开向", labelValue:"U_DoorO", type:"data",style:{width: '100px'}},
                    {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"data", style:{width: '100px'}},
                    {name:"销售数量", labelValue:"sale_counts", type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}],
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  ready: function(){
      if(this.detail) this.vlist = this.testdata;
      if(this.curaction == "edit") {
        this.m_lock_header.splice(0,1);
        this.m_five_header.splice(0,1);
        this.m_header.splice(0,1);
      }
      for (var i = 0; i < this.vlist.length; i++) {
          let one = this.vlist[i];
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
  },
  attached: function () {},
  methods: {
    addoneHandler : function(d){
        let one = this.adapterFun(d);
        // this.vlist.push(one);
        // 木门和铝框门的时候 渲染门的列表 m_array
        if(one.FirmName == '木门' || one.FirmName == '铝框门') this.m_array.push(one);
        // 门控五金 非智能锁的时候 渲染 m_five_array
       else if(one.FirmName == '门控五金' && one.U_ThreeL.indexOf("智能") == -1) this.m_five_array.push(one);
        // 门控五金 智能门锁的时候  渲染 m_lock_array
       else if(one.FirmName == '门控五金' && one.U_ThreeL.indexOf("智能") != -1) this.m_lock_array.push(one);
    },
    adapterFun: function(d) {
      return adapter(d);
    },
    toSelect: function(){
        this.$set("toload", true);
        this.showSelectDialog = !this.showSelectDialog;
    },
    concatFunc: function(){
        this.vlist = this.m_array.concat(this.m_five_array, this.m_lock_array);
    }
  },
  components: {tb,mentb,btn},
}
// 木门表格 内的自定义合页组建
import combobox from "component/combobox/combobox";
// 自定义  selfData 是自定义指令注入的参数  也是变更testdata的依据
// 合页   列表数据  U_HingeCodes
var heyeComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value:""
    }
  },
  template: '<div><combobox labelname="ItemName" @dropclick="dropclick" :value="value" keyid="ItemName" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      this.test = this.selfData.U_HingeCodes.def || [];
      this.value = this.selfData.U_HingeName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_HingeName.def = d;
            this.selfData.U_HingeName.tb_disabled= false;  // 合页
            this.selfData.U_HingeName.defCss= "default";  // 合页
            this.selfData.U_HingeName.errorMsg= "";  // 合页
      }
  },
  components: {combobox},
  computed: {

  }
})
// 门锁   U_LockCodes
var mensuoComponent = Vue.extend({
  data:function(){
    return {
      test:[],
      value:"",
    }
  },
  template: '<div><combobox labelname="ItemName" :value="value"  @dropclick="dropclick"  keyid="ItemName" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      this.test = this.selfData.U_LockCodes.def || [];
      this.value = this.selfData.U_LockName.def || "";
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
            console.log(d);
            this.selfData.U_LockName.def = d+"";
            this.selfData.U_LockName.tb_disabled= false; // 门锁
            this.selfData.U_LockName.defCss= "default";  // 门锁
            this.selfData.U_LockName.errorMsg= "";  // 门锁
      }
  },
  components: {combobox},
  computed: {

  }
})

// 是否开孔
var holeComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"是"}, {name:"否"}],
      value:"是"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_IKeyHole.def || "是";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_IKeyHole.def = d;   // 控制表格显示隐藏
          var tf = d=="是"?false:true;
          this.selfData.U_HingeName.tb_disabled= tf;  // 合页
          this.selfData.U_HingeName.defCss= "default";  // 合页
          this.selfData.U_HingeName.errorMsg= "";  // 合页
          this.selfData.U_LockName.tb_disabled= tf; // 门锁
          this.selfData.U_LockName.defCss= "default";  // 门锁
          this.selfData.U_LockName.errorMsg= "";  // 门锁
      }
  },
  components: {combobox},
  computed: {

  }
})

// 开启方向
var kaiqiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"左开"}, {name:"右开"}],
      value:"左开"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_OpenWay.def || "左开";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_OpenWay.def = d;   // 控制表格显示隐藏
          this.selfData.U_OpenWay.tb_disabled= false;
          this.selfData.U_OpenWay.defCss= "default";
          this.selfData.U_OpenWay.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})


// 智能门锁开向
var zhinengDirComponent = Vue.extend({
  //左内开，左外开，右内开，右外开
  data:function(){
    return {
      test:[{name:"左内开"}, {name:"左外开"}, {name:"右内开"}, {name:"右外开"}],
      value:"左内开"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_DoorO.def || "左内开";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_DoorO.def = d;   // 控制表格显示隐藏
          this.selfData.U_DoorO.tb_disabled= false;
          this.selfData.U_DoorO.defCss= "default";
          this.selfData.U_DoorO.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})

// 智能门锁是否有田地钩
var tdComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"是"}, {name:"否"}],
      value:"是"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_IHEH.def || "是";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_IHEH.def = d;   // 控制表格显示隐藏
          this.selfData.U_IHEH.tb_disabled= false;
          this.selfData.U_IHEH.defCss= "default";
          this.selfData.U_IHEH.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})

// 智能门锁类别
var zhiComponent = Vue.extend({
  data:function(){
    return {
      test:[{name:"木门"}, {name:"铁门"}],
      value:"木门"
    }
  },
  template: '<div><combobox labelname="name" @dropclick="dropclick" :value="value" keyid="name" dropfixed="dropfixed" :datas="test"></combobox></div>',
  ready: function(){
      console.log(this);
      this.value = this.selfData.U_DType.def || "木门";
      console.log(this.value);
  },
  methods:{
      dropclick: function(d){
          // 变更对应的值
          this.selfData.U_DType.def = d;   // 控制表格显示隐藏
          this.selfData.U_DType.tb_disabled= false;
          this.selfData.U_DType.defCss= "default";
          this.selfData.U_DType.errorMsg= "";
      }
  },
  components: {combobox},
  computed: {

  }
})

</script>
