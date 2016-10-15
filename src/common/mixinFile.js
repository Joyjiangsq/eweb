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
            console.log(self);
            console.log(form);
            // var nf = new FormData(form);
            form.ajaxSubmit({
                method: "post",
                // params: nf,
                url: "http://172.20.8.109/v1/api/" + this.url, //默认是form action
                success: function(data) {
                    self.$set("loading", !self.loading);
                    console.log(data);
                    if(data.code == 200) showTips(self.$store, {type:"success", msg:"上传成功！"});
                    else {
                      showTips(self.$store, {type:"success", msg:data.msg});
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
            this.subChangeFiles(file);
        }
    },
    watch: {

    },
}

export default fileMixins
