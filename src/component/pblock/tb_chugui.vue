<template lang="html">
    <div class="">
          <div >
            <div class="" v-if="!detail">

            </div>
            <div class="" v-else>
              <div :class="css.typeitem" v-if="g_array.length !=0">
                    <p :class="css.ptitle">柜体/门板/配件</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="g_header_d" :datas="g_array"  :load="false" :detail="true" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="t_array.length !=0">
                    <p :class="css.ptitle">台面</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="t_header_d" :datas="t_array"  :load="false"  :detail="true" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="w_array.length !=0">
                    <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="w_header_d" :datas="w_array"  :load="false" :detail="true" ></tb>
                    </div>
              </div>
            </div>

            <formtext labelname="收货人："  :read="true" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' ></formtext>
            <formtext labelname="收货人电话：" :read="true"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' ></formtext>
            <!-- <formtext  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtext> -->
            <formtextadd  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtextadd>
            <formtext labelname="备注：" :read="true" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' ></formtext>
          </div>

          <div :class="css.attachrow">
              <a :href="eclosure" target="_blank" v-if="eclosure">下载附件</a>
              <span :class='css.noattach' v-else>没有附件</span>
          </div>

    </div>
</template>
<script>

// 厨柜分类
import css from "./type.css";
import baseMixins from "./itemMixins";
import Utils from "common/Utils";
import tb from "component/grid/menTable";
import mdialog from "component/blockcommon/mealDialog";
export default {
  mixins:[baseMixins],
  props:{
    eclosure: {   // 附件特殊字段
      default:""
    }
  },
  data: function () {
    return {
      css,
      curName:"chugui",
      g_array:[],
      t_array:[],
      w_array:[],
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
      headercaption:[{type:"operator", name:""},
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleName", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"Quantity",type:"edit"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"data"}
                    ],
      headerdetail:[
                    {name:"产品编码", labelValue:"ItemCode", type:"data"},
                    {name:"产品名称", labelValue:"ItemNameComponent", type:"component", cname:"shigongfucaicc", component:mdialog},
                    {name:"产品包", labelValue:"SWW", type:"data"},
                    {name:"品牌", labelValue:"U_Brand", type:"data"},
                    {name:"规格", labelValue:"Spec", type:"data"},
                    {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
                    {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
                    {name:"系列", labelValue:"U_Series", type:"data"},
                    {name:"颜色", labelValue:"U_Colour", type:"data"},
                    {name:"门型", labelValue:"U_DType", type:"data"},
                    {name:"把手型号", labelValue:"U_HandleCode", type:"data"},
                    {name:"前沿造型", labelValue:"U_FModeling", type:"data"},
                    {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
                    {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"},
                    {name:"宽度（mm）", labelValue:"U_PSWide", type:"data"},
                    {name:"高度（mm）", labelValue:"U_PSHigh", type:"data"},
                    {name:"进深（mm）", labelValue:"U_PSDeep", type:"data"},
                    {name:"台面进深（mm）", labelValue:"U_TableB", type:"data"},
                    {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:"data"},
                    {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:"data"},
                    {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:"data"},
                    {name:"延米（m）/销售数量", labelValue:"sale_counts", type:"data"},   // 不需要验证不填的状态
                    {name:"使用库存", labelValue:"use_stores",type:"edit"},
                    {name:"采购数量", labelValue:"Quantity",type:"edit"},
                    {name:"转化数量", labelValue:"U_Pquantity",type:"data"},
                    {name:"可用库存量", labelValue:"stock",type:"data"},
                    {name:"单位", labelValue:"SalUnitMsr",type:"data"},
                    {name:"备注", labelValue:"Freetxt",type:"edit"}
                    ],
        tableEvents:{
            operatorRender: function(d, index){
                return [{action:"delete",icon:"icon-delete", data: d, index: index}]
            },
            operatorHandler: function(d){
                if(d.action == "delete") {
                  // 木门和铝框门的时候 渲染门的列表 g_array
                  if(d.data.FirmName == '柜体' || d.data.FirmName == '门板' ||  d.data.FirmName == '配件') this.g_array.splice(d.index,1)
                  // 门控五金 非智能锁的时候 渲染 t_array
                  else if(d.data.FirmName == '台面') this.t_array.splice(d.index,1)
                  // 门控五金 智能门锁的时候  渲染 w_array
                  else this.w_array.splice(d.index,1)
                }
            }
        },
    }
  },
  computed: {
  },
  ready:function(){
    if(this.detail) this.vlist = this.testdata;
    if(this.curaction == "edit") {
      this.g_header.splice(0,1);
      this.t_header.splice(0,1);
      this.w_header.splice(0,1);
    }
    for (var i = 0; i < this.vlist.length; i++) {
        let one = this.vlist[i];
        // 木门和铝框门的时候 渲染门的列表 g_array
        if(one.FirmName == '柜体' || one.FirmName == '门板' ||  one.FirmName == '配件') {
            this.g_array.push(one);
            continue;
        }
        // 门控五金 非智能锁的时候 渲染 t_array
        if(one.FirmName == '台面') {
            this.t_array.push(one);
            continue;
        }
        // 门控五金 智能门锁的时候  渲染 w_array
        this.w_array.push(one);
    }
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      return adapter(d);
    },
    toSelect: function(){
        this.$set("toload", true);
        this.showSelectDialog = !this.showSelectDialog;
    },
    concatFunc: function(){
        this.vlist = this.g_array.concat(this.t_array, this.w_array);
    },
    addoneHandler : function(d){
        d = Utils.cloneObj(d);
        let one = this.adapterFun(d);
        // this.vlist.push(one);
        // 木门和铝框门的时候 渲染门的列表 g_array
        if(one.FirmName == '柜体' || one.FirmName == '门板' || one.FirmName == '配件') this.g_array.push(one);
        // 门控五金 非智能锁的时候 渲染 t_array
       else if(one.FirmName == '台面') this.t_array.push(one);
        // 门控五金 智能门锁的时候  渲染 w_array
       else  this.w_array.push(one);
    },
    upSuccessHandler: function(d){
      console.log(d);
      this.eclosure = d.url; // 赋值附件的url
      this.statusRes = "上传成功" + (d.name || "")
    }
  },
  components: {tb},
}
</script>
