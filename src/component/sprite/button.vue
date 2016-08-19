<template>
    <button :class="[buttonCss.btn, buttonCss[btnname]]">
          <icontext v-show='iconinfo' :attach="iconinfo.attach"  :iconname="iconinfo.iconname"  :iconlabel="iconinfo.iconlabel"></icontext>
          {{btnlabel}}
    </button>
</template>

<script>
import buttonCss from "./button.css";
import icontext from "./icon.vue";
export default {
  props:{
      btnname:{
        type:String,
        default:"btn-default"
      }

      btnlabel:{
        type:String,
        default:"按钮"
      },

      iconinfo:{
        type:Object,
        default:() => {attach:"small", iconname: "icon-home", iconlabel: false}
      }
  },
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
