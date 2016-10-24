
let list = {
  props:{
    classname:{
      type:String,
      default: ""
    },

    load:{            // 加载控制
      type: Boolean,
      default: false
    },

    url:{              // url
      type:String
    },

    params:{          // 参数
      type:Object,
      default:function(){return {}}
    },
    totals:{
        twoway: true
    },

    size: {
      type: Number,
      default: 10
    },

    datas:{
      type:Array,
      default:() => []
    }
  },
  data: function () {
    return {
      dataList: this.datas || [],
      curStatus:"no-result"
    }
  },
  ready: function () {
      if(this.datas.length != 0) this.$set("curStatus", "renderData");  // 如果是静态的datas
      if(this.load) this.loadData();
      this.adapter();
  },
  methods: {
    loadData: function() {
      this.$set("curStatus", "loading");
      if(!this.params.size) this.params.size = this.size;
      return this.$http.get(this.$Api+ (this.url || ""),{params:this.params}).then((res) => {
          // 如果有数据 就渲染
         //  如果没有数据就显示没有数据
          let datas = res.json();
          this.dataList = [{name:"1", id: 0}];
          // 回调totals
          this.$set("totals", datas.data.count);
          this.$set("curStatus", "renderData");
      },(error) => {this.$set("curStatus", "no-result");})
    }
  },
  watch:{
    "load": function(){
        this.loadData();
    }
  }
}

export default list
