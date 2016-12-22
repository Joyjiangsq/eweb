<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
            <div class="" v-if="!detail">
                <div class=""  v-if="curaction == 'add'">
                  <btn @click="toSelect">选品</btn>
                </div>
                <div :class="css.rowBox">
                  <div :class="css.typeitem" v-if="a_array.length !=0">
                        <p :class="css.ptitle">柜体/门板/配件</p>
                        <tb :headercaption="g_header" :datas="a_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="b_array.length !=0">
                        <p :class="css.ptitle">台面</p>
                        <tb :headercaption="t_header" :datas="b_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="c_array.length !=0">
                        <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                        <tb :headercaption="w_header" :datas="c_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                </div>
            </div>
            <div class="" v-else>
              <div :class="css.typeitem" v-if="a_array.length !=0">
                    <p :class="css.ptitle">柜体/门板/配件</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="g_header_d" :datas="a_array"  :load="false" :curaction="curaction" :detail="detail" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="b_array.length !=0">
                    <p :class="css.ptitle">台面</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="t_header_d" :datas="b_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                    </div>
              </div>
              <div :class="css.typeitem" v-if="c_array.length !=0">
                    <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                    <div :class="css.rowBox">
                      <tb :headercaption="w_header_d" :datas="c_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                    </div>
              </div>
            </div>

              <formtext labelname="收货人："  :read="detail" :value.sync="recdata.U_Consignee" placeholder=""  formname='U_Consignee' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtext labelname="收货人电话：" :read="detail"  :phone="true"  :length="11" :number="true" :value.sync="recdata.U_ConsigneePhone" placeholder=""  formname='U_ConsigneePhone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
              <formtextadd  labelname="收货地址：" :must="true"  :detailneed="true" :read="true" formname="Address2" :value.sync="recdata.Address2"  ></formtextadd>
              <formtext labelname="备注：" :read="detail" :must="false" :value.sync="recdata.Comments"  placeholder=""  formname='Comments' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
          <div v-else>
            <itemtpl :testdata="testdata" :header="headerdetail"></itemtpl>
          </div>

          <div :class="css.attachrow" v-if="curaction != 'alldetail' && !detail" style=" margin-bottom: 20px;">
                <ft url="upload" :filter="['zip', 'rar']" text="上传附件" @upsuccess="upSuccessHandler"></ft><span class="upsu">{{statusRes}}</span><span class="uptip">(仅允许上传zip,rar格式的文件包)</span>
          </div>
          <div v-if="curaction != 'alldetail' && !!detail" style=" margin-bottom: 20px;">
            <div :class="css.attachrow">
              <a :href="eclosure" target="_blank" v-if="eclosure">下载附件</a>
              <span :class='css.noattach' v-else>没有附件</span>
            </div>
          </div>
          <!--选品对话框-->
          <dialog :flag.sync="showSelectDialog" title="选品" >
                <div slot="containerDialog">
                    <chuguitb :hash="false" :toload="toload" :scene="scene" @addone="addoneHandler" :listdata.sync="vlist"></chuguitb>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 厨柜分类
import ft from "component/file/filedeal";
import Vue from "vue";
import tb from "component/grid/customTable";
import css from "./type.css";
import btn from "component/sprite/button";
import saleAdapter from "./saleadapter/chuguiAdapter.js";
import backAdapter from "./backadapter/chuguiAdapter.js";
import baseMixins from "./itemMixins";
import chuguitb from "./tblist/chuguiList";
import mdialog from "component/blockcommon/mealDialog";
import Utils from "common/Utils";
import {sale_chu_g_header,
        sale_chu_g_header_d,
        sale_chu_tm_header,
        sale_chu_tm_header_d,
        sale_chu_f_header,
        sale_chu_f_header_d} from "config/headerConst";
import {specFun, specSetOne, getType} from "component/blockcommon/specCommon.js";
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
      validate:false,
      statusRes:"",
      a_array:[],
      b_array:[],
      c_array:[],
      g_header: sale_chu_g_header(this.scene),
      t_header:sale_chu_tm_header(this.scene),
      w_header:sale_chu_f_header(this.scene),
      g_header_d: sale_chu_g_header_d(this.scene),
      t_header_d:sale_chu_tm_header_d(this.scene),
      w_header_d:sale_chu_f_header_d(this.scene),
      validateInfo: true, // 验证 收件信息
      tableEvents:{
          operatorRender: function(d, index){
              return [{action:"delete",icon:"icon-delete", data: d, index: index}]
          },
          operatorHandler: function(d){
              if(d.action == "delete") {
                  // 木门和铝框门的时候 渲染门的列表 a_array   配件（厨柜）
                  let type = getType(d.data, "chugui");
                  if(type == "a") this.a_array.splice(d.index,1)
                  else if(type == "b") this.b_array.splice(d.index,1)
                  else if(type == "c") this.c_array.splice(d.index,1)

                  for (var i = 0; i < this.vlist.length; i++) {
                    let one = this.vlist[i];
                    if(d.data.ItemCode == one.ItemCode) {
                      this.vlist.splice(i,1);
                      break;
                    }
                  }
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
    let collectionMap = specFun(this.vlist, "chugui");
    this.a_array = collectionMap.a;
    this.b_array = collectionMap.b;
    this.c_array = collectionMap.c;
  },
  attached: function () {},
  methods: {
    adapterFun: function(d) {
      if(this.scene == "sale") return saleAdapter(d)
      else return backAdapter(d);
    },
    toSelect: function(){
        this.$set("toload", true);
        this.showSelectDialog = !this.showSelectDialog;
    },
    concatFunc: function(){
        this.vlist = this.a_array.concat(this.b_array, this.c_array);
    },
    addoneHandler : function(d){
        d = Utils.cloneObj(d);
        let one = this.adapterFun(d);
        // 木门和铝框门的时候 渲染门的列表 a_array
        // 门控五金 非智能锁的时候 渲染 b_array
        // 门控五金 智能门锁的时候  渲染 c_array
        specSetOne(one, "chugui" ,this.a_array, this.b_array, this.c_array);
        this.vlist.push(one);
    },
    upSuccessHandler: function(d){
      console.log(d);
      this.eclosure = d.url; // 赋值附件的url
      this.statusRes = "上传成功" + (d.name || "")
    }
  },
  components: {tb,chuguitb, ft,btn},
}
import combobox from "component/combobox/combobox";

</script>
{
        lv1_code: 'MC001', lv1_name: '国民包', usable: true, pkg: '国民包',
        lv2: [
            {
                code: 'MC0011001', name: '瓷砖', usable: true,
                lv3: [
                    { code: 'MC00110011001', name: '大地砖', usable: true }
                ]
            },
            { code: 'MC0011002', name: '厨柜', usable: false }
        ]
    }
