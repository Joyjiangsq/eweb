import {showTips} from "actions/index";
import icon from "component/sprite/icon.vue";
let fileMixins = {
    props:{
      params:{
        default: function(){
          return {
            size: 10,
            page:1
          }
        }
      }
    },
    data: function() {
        return {
        }
    },
    computed: {},
    ready: function() {},
    attached: function() {},
    methods: {
        showMsg: function(type, msg, time){
            showTips(this.$store, {type:type, msg:msg, time: time});
        },
        loadSuccess: function(d){
          this.selfData.labelName = this.name + "("+this.totals+")";
          this.datas = d.data.docs;
        },
        goTo: function(id){
            this.$router.go({path:this.routerUrl, query:{orderid: id}})
        },
        nextAction: function(){
            let pages = Math.ceil(this.totals/this.params.size);
            if(this.params.page == pages) {
              this.showMsg("warn", "已经是最后一页了");
              return
            }
            else {
              this.params.page = this.params.page*1 +1;
              this.load = !this.load;
            }
        },

        prevAction: function(){
          if(this.params.page == 1) {
            this.showMsg("warn", "已经是第一页了");
            return
          }
          else {
            this.params.page = this.params.page*1 -1;
            this.load = !this.load;
          }
        }
    },
    watch: {

    },
    components: {icon}
}

export default fileMixins
