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
                          <tb :headercaption="m_lock_header" :datas="m_lock_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
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
                        <tb :headercaption="m_lock_header_d" :datas="m_lock_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
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
import saleAdapter from "./saleadapter/menAdapter.js";
import backAdapter from "./backadapter/menAdapter.js";
import baseMixins from "./itemMixins";
import mdialog from "component/blockcommon/mealDialog";
import {sale_men_header,
        sale_men_header_d,
        sale_men_five_header,
        sale_men_five_header_d,
        sale_men_z_header,
        sale_men_z_header_d} from "config/headerConst";
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
      m_header:sale_men_header(this.scene),
      m_five_header:sale_men_five_header(this.scene),
      m_lock_header:sale_men_z_header(this.scene),
      m_header_d:sale_men_header_d(this.scene),
      m_five_header_d:sale_men_five_header_d(this.scene),
      m_lock_header_d:sale_men_z_header_d(this.scene),
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
      if(this.scene == "sale") return saleAdapter(d)
      else return backAdapter(d);
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


</script>
