<template>
    <div :class="css.fileBox">
          <form :class="css.fileDeal"  method="post" enctype= "multipart/form-data">
            <input type="file" name="uploadFile" :class="css.fileTarget" @change="changeFile" v-for="one in list"/>
            <btn>{{text}} <span v-show="loading" :class="css.loading">...</span></btn>
          </form>
    </div>
</template>

<script>
/**
    这里使用jq 和 jq-form  因为要兼容ie9 所以 formData对象  fileReader对象 都不可以使用 vue-resource只支持formData对象
**/
import css from "./file.css";
import btn from "component/sprite/button";
import fileMixin from "common/mixinFile";
import formShim from "vendor/jquery.form.js";  // jq form 的依赖
export default {
  mixins:[fileMixin],
  data: function () {
    return {
      css,
      list:[1]  // 控制onchange的时候  选择相同文件
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
        toUpload: function(e){
          var form = $("."+this.css.fileDeal);
          this.upload(form);
          return false;
        },

        subChangeFiles: function(file){
            this.$set("loading", !this.loading);
            console.log(file);
            this.toUpload();
            this.list.pop();
            this.list.push(Math.random());
        }
  },
  components: {btn}
}
</script>
