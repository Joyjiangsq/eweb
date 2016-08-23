<template>
      <panel>
          <div slot="panelTitle">
                弹框
          </div>
          <div slot="panelContent">
                <button type="button" name="button" @click="changeDialog">点击</button>
          </div>
          <div slot="panelFooter">

          </div>


      </panel>

      <dialog :flag="flagdep">
            <div class="" slot="containerDialog">
                这是内容区域
            </div>
      </dialog>
</template>

<script>
import dialog from "component/dialog/dialog";
import panel from "component/panel/panel";
import {setTitle} from "actions/index.js";
export default {
  data: function () {
    return {
      flagdep: false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  route:{
    data: function(){
      setTitle(this.$store, "对话框");
    }
  },
  methods: {
    changeDialog() {
          this.flagdep = !this.flagdep;
    }
  },
  components: {
    panel, dialog
  }
}
</script>
