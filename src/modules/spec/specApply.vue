<template lang="html">
    <div :class="css.allBox">
      <div :class="css.dbox">
        <panel>
          <div slot="panelTitle">
                 基础信息
          </div>
          <div slot="panelContent">
                <formtext labelname="客户信息：" :value.sync="baseInfo.user_name" placeholder=""  formname='user_name' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                <cascadeform  labelname="业主地址：" :detailneed="true" :must="false" :value.sync= "baseInfo.user_address" :detailv.sync="baseInfo.detail" formname="user_address"  :validatestart="validate" @onvalidate="validateHandler"></cascadeform>
                <formtext labelname="测量员：" :value.sync="baseInfo.ce_people" placeholder=""  formname='ce_people' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                <formtext labelname="联系电话：" :phone="true"  :value.sync="baseInfo.ce_phone"  :number="true"  placeholder=""  formname='ce_phone' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                <formtext labelname="扣款金额：" :value.sync="baseInfo.minMoney" placeholder="" :read="true" formname='minMoney' :validatestart="validate" @onvalidate="validateHandler"></formtext>
          </div>
        </panel>
        <panel>
          <div slot="panelTitle">
                 需求明细
          </div>
          <div slot="panelContent">
                <div :class="css.inBox">
                    <div :class="css.rowItem">
                          <span :class="css.title">门板</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem'  labelname="门板颜色：" :value.sync="baseInfo.mb_color" placeholder=""  formname='mb_color' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="门板型号：" :value.sync="baseInfo.mb_brand" placeholder=""  formname='mb_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">台面</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem' labelname="台面颜色：" :value.sync="baseInfo.tm_color" placeholder=""  formname='tm_color' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">系列</span>
                          <div :class="css.formRow">
                                <comboxform :class='css.formitem' keyid="name" labelname="系列选择："  :value.sync="baseInfo.series" keyname="name" formname="series" :datas="comData.seriesDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">形状</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem' labelname="形状：" :value.sync="baseInfo.shape" placeholder="" :datas="comData.shapeDatas"  formname='shape' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">烟机灶具</span>
                          <div :class="css.formRow">
                                <formrd :class='css.formitem' labelname="厨柜包烟机：" formname="chugui_byj" :value="baseInfo.chugui_byj" :datas="[{label:'是', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                                <formtext :class='css.formitem' labelname="烟机品牌：" :value.sync="baseInfo.yj_brand" placeholder=""  formname='yj_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="烟机型号：" :value.sync="baseInfo.yj_series" placeholder=""  formname='yj_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="灶具品牌：" :value.sync="baseInfo.zj_brand" placeholder=""  formname='zj_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="灶具型号：" :value.sync="baseInfo.zj_series" placeholder=""  formname='zj_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">冰箱</span>
                          <div :class="css.formRow">
                                <comboxform :class='css.formitem' keyid="name" labelname="位置：" @itemclick="bxClickHandler"  :value.sync="baseInfo.position_bx" keyname="name" formname="position_bx" :datas="comData.positionDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                                <formtext :class='css.formitem' labelname="冰箱品牌：" :must="bxControl" :value.sync="baseInfo.U_CntctCode" placeholder=""  formname='U_CntctCode' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="冰箱型号：" :must="bxControl" :value.sync="baseInfo.U_CntctCode" placeholder=""  formname='U_CntctCode' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">水槽</span>
                          <div :class="css.formRow">
                                <comboxform :class='css.formitem' keyid="name" labelname="水槽工艺："  :value.sync="baseInfo.sc_art" keyname="name" formname="sc_art" :datas="comData.artDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                                <formtext :class='css.formitem' labelname="水槽品牌：" :value.sync="baseInfo.sc_brand" placeholder=""  formname='sc_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="水槽型号：" :value.sync="baseInfo.sc_series" placeholder=""  formname='sc_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">五金</span>
                          <div :class="css.formRow">
                                <formck :class='css.formitem' labelname="五金选择：" :must="false" formname="fivek" value="baseInfo.fivek" :datas="comData.fivekDatas" :validatestart="validate" @onvalidate="validateHandler"></formck>
                                <formtext :class='css.formitem' labelname="其它：" :must="false" :value.sync="baseInfo.fivek_other" placeholder=""  formname='fivek_other' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formrd :class='css.formitem' labelname="客户是否自备：" formname="fivek_self" :value="baseInfo.fivek_self" :datas="[{label:'是', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">嵌入式电器</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem' labelname="消毒柜品牌：" :must="false" :value.sync="baseInfo.xdg_brand" placeholder=""  formname='xdg_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="消毒柜型号：" :must="false" :value.sync="baseInfo.xdg_series" placeholder=""  formname='xdg_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="烤箱品牌：" :must="false" :value.sync="baseInfo.kx_brand" placeholder=""  formname='kx_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="烤箱型号：" :must="false" :value.sync="baseInfo.kx_series" placeholder=""  formname='kx_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="洗碗机品牌：" :must="false" :value.sync="baseInfo.xwj_brand" placeholder=""  formname='xwj_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="洗碗机型号：" :must="false" :value.sync="baseInfo.xwj_series" placeholder=""  formname='xwj_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="嵌入式微波炉品牌：" :must="false" :value.sync="baseInfo.qwbl_brand" placeholder=""  formname='qwbl_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="嵌入式微波炉型号："  :must="false" :value.sync="baseInfo.qwbl_series" placeholder=""  formname='qwbl_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="蒸箱品牌：" :must="false" :value.sync="baseInfo.zx_brand" placeholder=""  formname='zx_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="蒸箱型号：" :must="false" :value.sync="baseInfo.zx_series" placeholder=""  formname='zx_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="其它品牌：" :must="false" :value.sync="baseInfo.other_brand" placeholder=""  formname='other_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' labelname="其它型号：" :must="false" :value.sync="baseInfo.other_series" placeholder=""  formname='other_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">管道</span>
                          <div :class="css.formRow">
                                <comboxform keyid="name"  :class='css.formitem' labelname="下水主管："   :value.sync="baseInfo.pipe" keyname="name" formname="pipe" :datas="comData.pipeDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                                <comboxform keyid="name"  :class='css.formitem' labelname="燃气管："   :value.sync="baseInfo.rq_pipe" keyname="name" formname="rq_pipe" :datas="comData.rq_pipeDatas" :validatestart="validate" @onvalidate="validateHandler"></comboxform>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">燃气</span>
                          <div :class="css.formRow">
                                <formrd :class='css.formitem' labelname="燃气是否改造：" formname="rq_has_change" :value="baseInfo.rq_has_change" :datas="[{label:'是（在布局简图中说明）', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                                <formck :class='css.formitem' labelname="" formname="chugui_bao" @itemclick="rqClickHandler" :value="baseInfo.chugui_bao" :datas="[{label:'橱柜包燃气表', id:'橱柜包燃气表', checked: false},{label:'橱柜包燃气热水器', id:'橱柜包燃气热水器', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formck>
                                <br/><formtext :class='css.formitem' :must="rqControl" labelname="燃气热水器品牌：" :value.sync="baseInfo.rr_brand" placeholder=""  formname='rr_brand' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formtext :class='css.formitem' :must="rqControl" labelname="燃气热水器型号：" :value.sync="baseInfo.rr_series" placeholder=""  formname='rr_series' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">暖气</span>
                          <div :class="css.formRow">
                                <formrd :class='css.formitem' labelname="是否有暖气：" formname="nq_has" :value="baseInfo.nq_has" :datas="[{label:'是', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                                <formrd :class='css.formitem' labelname="暖气是否改造：" :must="false" formname="nq_has_change" :value="baseInfo.nq_has_change" :datas="[{label:'是', id:'是', checked: false},{label:'否（在布局简图中说明）', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">厨房高度</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem' labelname="厨房吊顶完成面到地砖面高度：" unit="mm" :value.sync="baseInfo.height1" placeholder=""  formname='height1' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                                <formrd :class='css.formitem' labelname="吊顶与顶之间是否加封板：" :must="false" formname="hase_ban" :value="baseInfo.hase_ban" :datas="[{label:'是', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">腰线</span>
                          <div :class="css.formRow">
                                <formrd :class='css.formitem' labelname="墙面是否有腰线：" @itemclick="yClickHandler" formname="yao_has" :value="baseInfo.yao_has" :datas="[{label:'是', id:'是', checked: false},{label:'否', id:'否', checked: false}]" :validatestart="validate" @onvalidate="validateHandler"></formrd>
                                <formtext :class='css.formitem' labelname="腰线下沿距离地面完成面高度：" :must="yControl" unit="mm" :value.sync="baseInfo.height2" placeholder=""  formname='height2' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowItem">
                          <span :class="css.title">备注</span>
                          <div :class="css.formRow">
                                <formtext :class='css.formitem' labelname="备注：" :must="false" :value.sync="baseInfo.remark" placeholder=""  formname='U_CntctCode' :validatestart="validate" @onvalidate="validateHandler"></formtext>
                          </div>
                    </div>
                    <div :class="css.rowOne">
                          <span :class="css.title">附件上传</span>
                          <div :class="css.formRow">
                          </div>
                    </div>
                </div>
          </div>
        </panel>
        <div :class='css.footer'>
          <span><btn btnname="btn-primary" iconname="icon-check" @clickaction="subOrder">提交订单</btn></span>
        </div>
        <div :class='css.footer'>
          <span :class="css.bitem"><btn btnname="btn-primary" iconname="icon-check">设计交付</btn></span>
          <span :class="css.bitem"><btn btnname="btn-default" iconname="icon-back">退回</btn></span>
        </div>
        <div :class='css.footer'>
          <span :class="css.bitem"><btn btnname="btn-primary" iconname="icon-check">确认</btn></span>
          <span :class="css.bitem"><btn btnname="btn-default" iconname="icon-back">重新提交</btn></span>
        </div>
      </div>
    </div>
</template>

<script>
import {setTitle} from "actions";
import panel from "component/panel/panel";
import formtext from "component/form/formText";
import cascadeform from "component/form/formCascade";
import formdim from "component/form/formDim";
import comboxform from "component/form/fmCombobox";
import formck from "component/form/formCheckBox";
import formrd from "component/form/formRadio";
import btn from "component/sprite/button";
import {series,shapeDatas,positionDatas,artDatas, fiveDatas, pipeDatas,rq_pipeDatas} from "config/const";
import css from "./d.css";
export default {
  data: function () {
    return {
        css,
        comData:{
          seriesDatas: series, //系列数据
          shapeDatas: shapeDatas, // 形状数据
          positionDatas: positionDatas,// 冰箱位置
          artDatas: artDatas, // 水槽工艺选项
          fivekDatas: fiveDatas, // 五金
          pipeDatas: pipeDatas, // 下水主管数据
          rq_pipeDatas: rq_pipeDatas, // 燃气管数据集
        },
        bxControl: false, // 冰箱控制参数
        rqControl: false, // 燃气控制参数
        yControl: false, // 是否有腰线
        validate:false,
        validateRes: true,
        baseInfo:{
            minMoney: 100, // 扣款金额
        },

    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    bxClickHandler: function(d) {
        if(d.name == "厨房内") {
            this.bxControl = true;
        }
        else this.bxControl = false;
    },
    rqClickHandler: function(d){
        console.log(d);
        if(d.indexOf("橱柜包燃气热水器") != -1) {
              this.rqControl = true;
        }
        else this.rqControl = false
    },
    yClickHandler: function(d) {
        console.log(d);
        if(d == "是") {
            this.yControl = true;
        }
        else this.yControl = false;
    },
    validateHandler: function(d) {
        console.log(d);
        if(d.res == "fail") this.validateRes = false;
    },

    subOrder: function(){
      this.validate = !this.validate
      this.validateRes = true;
      setTimeout(()=>{
          if(this.validateRes) {

          }
      })
    }
  },
  components: {panel,formtext,cascadeform,formdim,comboxform,formrd,formck, btn},
  route:{
    data: function(){
      setTitle(this.$store, "定制品申请");
    }
  },
}
</script>

<style lang="css">
</style>
