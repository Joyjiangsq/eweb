<template>
    <div :class="css.Box">
        <!--类型对话框-->
        <dialog :flag.sync="showTag" title="选择分类">
              <div  slot="containerDialog">
                    <div :class='css.checkBox'>
                        <radiobx :datas="data"  @radioclick="radioclick" label="lv_contact_name" labelkey="lv_code" :vertical="true"></radiobx>
                    </div>
              </div>
              <div class="" slot="footerDialog">

              </div>
        </dialog>
    </div>
</template>

<script>
import dialog from "component/dialog/dialog";
import css from "./type.css";
import radiobx from "component/radiobox/radioBox";
import Utils from "common/Utils.js";
export default {
  props:{
      show: {
          default: false,
          type: Boolean
      },
      url:{
          default:""
      }
  },
  data: function () {
    return {
      css,
      showTag: false,
      data:[{name:"国民包-瓷砖-大地砖",code:"1,2,3", checked: false},{name:"国民包-瓷砖-小地砖",code:"1,2,4",checked: false}]
    }
  },
  computed: {
  },
  ready: function () {
      this.$http.get(this.$Api + this.url, {}).then((res)=>{
            let d = res.json().data.docs;
            let tpl = [];
            d.map((one)=>{
                if(one.lv2) {
                    one.lv2.map((sone)=> {
                            if(sone.lv3) {
                                sone.lv3.map((ssone) => {
                                    tpl.push({lv_code:ssone.code, level_n:3, lv_name:ssone.name, lv_contact_name: one.name+"-"+sone.name+"-"+ssone.name,checked: false})
                                })
                            }
                            else tpl.push({lv_code:sone.code, level_n:2, lv_name:sone.name, lv_contact_name: one.name+"-"+sone.name,checked: false})
                    })
                }
                else tpl.push({lv_code:one.code, level_n:1, lv_name:one.name, lv_contact_name: one.name,checked: false})
            })
            console.log(tpl);
            this.data = tpl

      });
  },
  attached: function () {},
  methods: {
      radioclick: function(one) {
          this.$dispatch("onecheck", one);
          this.showTag = false
      }
  },
  components: {dialog,radiobx},
  watch:{
      "show": function(){
          this.showTag = true;
      }
  }
}
</script>
