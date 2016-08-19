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
            <!-- <div class="" slot="footerDialog">
                  这是尾巴
            </div> -->
      </dialog>
</template>

<script>
import dialog from "component/dialog/dialog";
import panel from "component/panel/panel";
export default {
  data: function () {
    return {
      flagdep: false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
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
