<template>
          <div :class="css.paddingType">
            <panel>
                <div slot="panelTitle">
                       客户信息
                </div>
                <div slot="panelContent">
                      <formtext labelname="客户姓名：" value="" placeholder="请输入姓名"  formname='name' length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="联系电话：" value="" placeholder=""  formname='phone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员：" value="" placeholder=""  formname='depid' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <formtext labelname="跟单员电话：" value="" placeholder=""  formname='depphone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                      <cascadeform  labelname="地址：" pid="" aid="" cid="" :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                </div>
            </panel>

            <panel>
                <div slot="panelTitle">
                       价格包信息
                </div>
                <div slot="panelContent">
                       <comboxform keyid="id" labelname="组包选择：" keyname="name" formname="parentName" :datas="packageDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                       <formtext labelname="房本面积：" value="" placeholder=""  formname='area' :number="true" length='5' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <formtext labelname="卫生间数量：" value="" placeholder=""  formname='wcs' :number="true" length='2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <comboxform keyid="id" labelname="是否有电梯：" keyname="name" formname="has" :datas="hasDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                       <formtext labelname="一口价：" value="" placeholder=""  formname='oneprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                       <formtext labelname="实收金额：" value="" placeholder=""  formname='realprice' :number="true" :validatestart="validate" @onvalidate="validateHandler"></formtext>
                </div>
            </panel>

          </div>
          <div class="">
            <tabbar :datas="tabDatas"  @tabclick="tabClickHandler">
              <div v-show="tabDatas[0].show" >
                <tb :headercaption="headercaption" :loadtag="loadtag" :datas="testData" codevalue="orderid" :events="tableEvents" enterdep="type"></tb>
              </div>

              <div  v-show="tabDatas[1].show">
                {{tabDatas[1] | json}}
              </div>

              <div  v-show="tabDatas[2].show">
                {{tabDatas[2] | json}}
              </div>

              <div  v-show="tabDatas[3].show">
                {{tabDatas[3] | json}}
              </div>

              <div  v-show="tabDatas[4].show">
                {{tabDatas[4] | json}}
              </div>

              <div  v-show="tabDatas[5].show">
                {{tabDatas[5] | json}}
              </div>

              <div  v-show="tabDatas[6].show">
                {{tabDatas[6] | json}}
              </div>
            </tabbar>
          </div>
</template>

<script>
import tb from "component/grid/tableSpec";
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import comboxform from "component/form/fmCombobox";
import tabbar from "component/tab/tabBar";
import css from "./sale.css";
import * as mData from "common/marteriaData.js";
export default {
  data: function () {
    return {
      css,
      validate: false,
      packageDatas: [{name:"国名包", id:1}, {name:"名品包", id:2}, {name:"尊享包", id:3}],
      hasDatas:[{name:'是', id:1},{name:'否', id:2}],
      tabDatas: mData.barData,
      headercaption:[{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额",labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"edit"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:""}],
      loadtag: false,
      testData: [{"orderid":"xxx1","name":"家装e站啦啦啦家装e站啦啦啦家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx2","name":"家装e站啦啦啦家装e站啦啦啦家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx3","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx4","name":"家装e站啦啦啦","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"}],
      tableEvents:{
        operatorRender: function(d){
          return [{action:"delete",icon:"icon-delete"}]
        },
        operatorHandler: function(d){
          console.log(d);
        }
      }
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    validateHandler: function(d){
        console.log(d);
    },
    tabClickHandler: function(d) {

    }
  },
  components: {panel, formtext, cascadeform,comboxform,tabbar, tb},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"下单管理", link:"/"}, {name:"下单"}]);
    }
  }
}
</script>

<style lang="css">
</style>
