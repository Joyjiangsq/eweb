<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
            <!-- <tb v-if="!detail" :headercaption="headercaption" @more="moreClickHandler" @loadsuccess="oneSuccessHandler" :curaction="curaction" :detail="detail"  :datas="vlist" codevalue="orderid" :events="tableEvents" enterdep="type" :load="false"></tb>
            <div :class="css.rowBox" v-else>
              <tbbase :headercaption="headerdetail" :datas="testdata"  :load="false"></tbbase>
            </div> -->
            <div class="" v-if="!detail">
                <div class=""  v-if="curaction == 'add'">
                  <btn @click="toSelect">选品</btn>
                </div>
                <div :class="css.rowBox">
                  <div :class="css.typeitem" v-if="g_array.length !=0">
                        <p :class="css.ptitle">柜体/门板/配件</p>
                        <tb :headercaption="g_header" :datas="g_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="t_array.length !=0">
                        <p :class="css.ptitle">台面</p>
                        <tb :headercaption="t_header" :datas="t_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                  <div :class="css.typeitem" v-if="w_array.length !=0">
                        <p :class="css.ptitle">五金/厨电/水槽龙头</p>
                        <tb :headercaption="w_header" :datas="w_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                  </div>
                </div>
            </div>
            <div class="" v-else>
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
                    <chuguitb :hash="false" :toload="toload" @addone="addoneHandler" @deleteone="deleteoneHandler" :listdata.sync="vlist"></chuguitb>
                </div>
                <div slot="footerDialog"></div>
          </dialog>
    </div>
</template>
<script>

// 厨柜分类
import ft from "component/file/filedeal";
import Vue from "vue";
import tb from "component/grid/menTable";
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
      g_array:[],
      t_array:[],
      w_array:[],
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
      if(this.scene == "sale") return saleAdapter(d)
      else return backAdapter(d);
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
  components: {tb,chuguitb, ft,btn},
}
import combobox from "component/combobox/combobox";

</script>
