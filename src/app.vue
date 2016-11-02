<template>
    <div>
      <router-view></router-view>
      <smalltip :msg="tipData.msg" :type="tipData.type" :datepicker="tipData.datePicker" :time="tipData.time"></smalltip>
    </div>
</template>
<script>

import baseCss from "base.css";
import store from 'stores/store';
import {getTipData} from "stores/getters";
import smalltip from "component/dialog/smallTip";
export default {
    store,
    data(){
      return {
          msg:""
      }
    },
    ready: function(){
    },
    vuex: {
        getters: {
           tipData: function(scope) {
             return  getTipData(scope) || {msg:"", type:"", datePicker:"", time: 2000};
           }
         }
    },

    components: {
      smalltip
    }
}
</script>
