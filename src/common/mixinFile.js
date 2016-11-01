import {showTips} from "actions/index";
let fileMixins = {
    props: {
        url: {
            default: "",
            type: String
        },

        auto: {
            default: true,
            type: Boolean
        },

        text: {
            default: "导入",
            type: String
        },
        filter:{
          default: function() {
            return [];
          }
        }
    },
    data: function() {
        return {
          file:{},
          loading: false
        }
    },
    computed: {},
    ready: function() {},
    attached: function() {},
    methods: {
        upload: function(form) {
            var self = this;
            // var nf = new FormData(form);
            form.ajaxSubmit({
                method: "post",
                // params: nf,
                url: this.$SpecApi + "v1/api/" + this.url, //默认是form action
                success: function(data) {
                    self.$set("loading", !self.loading);
                    console.log(data);
                    if(data.code == 200) {
                      showTips(self.$store, {type:"success", msg:"上传成功！"});
                      this.$dispatch("upsuccess", {});
                    }
                    else {
                      showTips(self.$store, {type:"warn", msg:data.msg});
                    }
                },
                error: function(d) {
                    self.$set("loading", !self.loading);
                    console.log(d);
                    showTips(self.$store, {type:"error", msg:"上传失败！"});
                }
            });
            return false;
        },

        changeFile: function(e) {
            var file = e.currentTarget.files[0];
            let name = file.name;
            let endName = name.split(".")[name.split(".").length -1];
            if(this.filter.length == 0) this.subChangeFiles(file);
            else {
              if(this.filter.indexOf(endName) == -1) {
                  showTips(this.$store, {type:"error", msg:"请上传正确的文件格式"});
                  this.reset();
              }
              else this.subChangeFiles(file);
            }

        }
    },
    watch: {

    },
}

export default fileMixins
