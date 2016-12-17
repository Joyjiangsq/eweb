<template>
    <div :class="css.Box">
      <pagepanel>
            <div>
                   <formtext labelname="模板名称：":value.sync="formData.tp_name" placeholder=""  formname='' length='5' :validatestart="validateForm" @onvalidate="validateHandler"></formtext>
                   <formrd labelname="是否启用：" formname="usable"  :value="formData.usable" :datas="[{label:'是', id:'1',checked: false}, {label:'否', id:'0',checked: false}]" :validatestart="validateForm" @onvalidate="validateHandler"></formrd>
            </div>
            <parea :validate="validate" @success="successHandler" @fail="failHandler" from="s"  :datas.sync="fdata"></parea>
      </pagepanel>
      <div class="cfooter" style="margin-top: 20px;">
        <btn @clickaction="btnClickHandler" btnname="btn-primary" iconname="icon-check">确定</btn>
      </div>
    </div>
</template>

<script>
import pagepanel from "component/panel/pagepanel";
import css from "./price.css";
import Utils from "common/Utils.js";
import btn from "component/sprite/button";
import parea from "component/priceblock/priceArea";
import {setTitle} from "actions";
import formtext from "component/form/formText";
import {packageType} from "config/const";
import comboxform from "component/form/fmCombobox";
import formrd from "component/form/formRadio";
import {showTips} from "actions/index";
export default {
  data: function () {
    return {
      css,
      self: false,
      validate: false,
      packageType: packageType,
      validateForm: false,
      validateRes: true,
      fdata: [],
      curId:"",
      formData:{
        tp_name:"",
        usable: "1"   
      },
      curGlData:[]
    }
  },
  computed: {
  },
  ready: function () {
    
  },
  attached: function () {},
  methods: {
    validateHandler: function(d) {
        if(d.res == "fail") this.validateRes = false;
    },
    btnClickHandler: function() {
        this.validateRes = true;
        this.validate = !this.validate;
        this.validateForm = !this.validateForm;
        setTimeout(()=>{
            if(this.validateRes && this.curGlData.length != 0) {
                console.log(this.curGlData);
                let nData = Utils.cloneObj(this.formData);
                nData.prolist = this.curGlData;
                if(this.curId) this.edit(nData); // 修改
                else this.add(nData); // 新增
            }
        },30);
    },
    add: function(nData){
            this.$http.post(this.$Api + "tpl-construction-quote", JSON.stringify(nData)).then((res) => {
                console.log(res);
                showTips(this.$store, {type:"success", msg:"新增成功", time: 2000});
                window.history.back()
            })
    },
    edit: function(nData){
            nData._id = this.curId
            this.$http.put(this.$Api + "tpl-construction-quote", JSON.stringify(nData)).then((res) => {
                console.log(res);
                showTips(this.$store, {type:"success", msg:"修改成功", time: 2000});
                window.history.back()
            })
    },
    successHandler: function(d) {
        this.curGlData = d;
    },
    failHandler: function(d) {
        this.curGlData = [];
    },
    getDetail: function() {
        // fdata
        this.$http.get(this.$Api + "tpl-construction-quote/detail", {params:{_id: this.curId}}).then((res) => {
              console.log(res);
              let d = res.json().data;
              this.formData = {
                    tp_name:d.tp_name,
                    usable: d.usable
              }
              this.fdata = Utils.cloneObj(d.prolist);
              console.log(this.fdata);
        })
    }
  },
  components: {parea,pagepanel,btn,comboxform, formtext, formrd},
  route:{
    data: function(){
      setTitle(this.$store, [{name:"报价模板", type:"back"}, {name:"新增材料模板"}]);
      // window.onbeforeunload  = function(){return true;}
       let id = this.$route.query.id;
        if(id) {
          this.curId = id;
          this.getDetail();
        }
    },
    canDeactivate: function(transition){
        if(this.self) {
          transition.next();
          window.onbeforeunload  = function(){}
        }
        else {
           transition.next();
          // let tag = confirm("离开页面不会保存数据，请注意操作");
          // if(tag) {
          //   transition.next();
          //   window.onbeforeunload  = function(){}
          // }
          // else transition.abort();
        }
    }
  }
}
</script>
