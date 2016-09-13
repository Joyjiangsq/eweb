<template>
    <div :class="css.aa">
          <form class="" action="index.html" method="post">

          </form>

          <span>2</span>
          <span>2</span>
          <span>2</span>

          {{{a}}}
    </div>
</template>

<script>
/** url(上传的地址)  auto(是否自动上传) upload(控制上传)  onsuccess()(上传成功)  onerror()(上传失败)**/
import css from "./file.css";
import a from "./a.html";
console.log(a);
export default {
  props: {
      url: {
         default:"",
         type: String
      },

      auto: {
        default: true,
        type: Boolean
      }
  },
  data: function () {
    return {
      css,
      a: a
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>
