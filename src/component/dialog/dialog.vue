<template>
    <div :class="dCss.dialogBox"  v-show="modalshow" transition="fadeModal">
        <div :class="dCss.dialogIn">
          <div :class="[dCss.dialog, 'bounce']">
                <div :class="dCss.dialogTitle">
                    {{title}}
                    <span :class="dCss.close" @click="hideShow">x</span>
                </div>

                <div :class="dCss.dialogContent">
                    <slot name='containerDialog'>这是内容</slot>
                </div>

                <div :class="dCss.dialogFooter">
                    <slot name="footerDialog">
                        <button type="button" name="button">确定</button>
                        <button type="button" name="button"  @click="hideShow">取消</button>
                    </slot>
                </div>
          </div>
        </div>
    </div>
</template>

<script>
import dCss from "./dialog.css"
export default {
  props:{
    flag: {
      type: Boolean,
      default: false
    },
    modalshow: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default:"标题"
    }
  },
  data: function () {
    return {
      dCss
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    hideShow() {
        this.modalshow = false;
    }
  },
  watch:{
    "flag": function(){
        this.modalshow = !this.modalshow;
    }
  },
  components: {}
}
</script>
