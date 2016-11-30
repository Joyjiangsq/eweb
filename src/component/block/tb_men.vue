<template lang="html">
    <div class="">
          <div  v-if="curaction != 'alldetail'">
              <div class="" v-if="!detail">
                  <div class=""  v-if="curaction == 'add'">
                    <btn @click="toSelect">选品</btn>
                  </div>
                  <div :class="css.rowBox">
                    <div :class="css.typeitem" v-if="a_array.length !=0">
                          <p :class="css.ptitle">门</p>
                          <tb :headercaption="m_header" :datas="a_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                    <div :class="css.typeitem" v-if="b_array.length !=0">
                          <p :class="css.ptitle">门控五金</p>
                          <tb :headercaption="m_five_header" :datas="b_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                    <div :class="css.typeitem" v-if="c_array.length !=0">
                          <p :class="css.ptitle">智能门锁</p>
                          <tb :headercaption="m_lock_header" :datas="c_array"  :load="false" :curaction="curaction" :detail="detail" :events="tableEvents"></tb>
                    </div>
                  </div>
              </div>
              <div class="" v-else>
                <div :class="css.typeitem" v-if="a_array.length !=0">
                      <p :class="css.ptitle">门</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_header_d" :datas="a_array"  :load="false" :curaction="curaction" :detail="detail" ></tb>
                      </div>
                </div>
                <div :class="css.typeitem" v-if="b_array.length !=0">
                      <p :class="css.ptitle">门控五金</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_five_header_d" :datas="b_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
                      </div>
                </div>
                <div :class="css.typeitem" v-if="c_array.length !=0">
                      <p :class="css.ptitle">智能门锁</p>
                      <div :class="css.rowBox">
                        <tb :headercaption="m_lock_header_d" :datas="c_array"  :load="false" :curaction="curaction"  :detail="detail" ></tb>
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
import {specFun, specSetOne, getType} from "component/blockcommon/specCommon.js";
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
                let type = getType(d.data, "men");
                if(type == "a") this.a_array.splice(d.index,1)
                else if(type == "b") this.b_array.splice(d.index,1)
                else if(type == "c") this.c_array.splice(d.index,1)
                // 木门和铝框门的时候 渲染门的列表 a_array
                // 门控五金 非智能锁的时候 渲染 b_array
                // 门控五金 智能门锁的时候  渲染 c_array
              }
          }
      },
      a_array:[],
      b_array:[],
      c_array:[],
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
      let collectionMap = specFun(this.vlist, "men");
      this.a_array = collectionMap.a;
      this.b_array = collectionMap.b;
      this.c_array = collectionMap.c;
  },
  attached: function () {},
  methods: {
    addoneHandler : function(d){
        let one = this.adapterFun(d);
        // this.vlist.push(one);
        // 木门和铝框门的时候 渲染门的列表 a_array
        // 门控五金 非智能锁的时候 渲染 b_array
        // 门控五金 智能门锁的时候  渲染 c_array
        specSetOne(one, "men" ,this.a_array, this.b_array, this.c_array); 
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
        this.vlist = this.a_array.concat(this.b_array, this.c_array);
    }
  },
  components: {tb,mentb,btn},
}


</script>
