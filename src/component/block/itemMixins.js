import adapter from "./tbAdapter/cizhuanAdapter";
export default {
  props :{
    subvalidate:{         // 开启验证的开关   验证结束会向父类派发success 和 fail 两个事件 并且附带品类名称
      default: false
    }
  },
  data: function () {
    return {
      tableEvents:{
          operatorRender: function(d){
            return [{action:"delete",icon:"icon-delete", data:d}]
          },
          operatorHandler: function(d){
              if(d.action == "delete") {
                for (var i = 0; i < this.testData.length; i++) {
                  let one = this.testData[i];
                  if(d.data.ItemCode == one.ItemCode) {
                    this.testData.splice(i,1);
                    break;
                  }
                }
              }
          }
      },
      showSelectDialog:false, // 选品对话框控制
      validateRec :true, // 验证 列表
      recData:{},
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  created: function () {
    // 初始化验证(如果有第一次)
    for (var i = 0; i < this.testData.length; i++) {
      let one = this.testData[i];
      adapter(one);
    }
  },
  attached: function () {},
  methods: {
    // 显示选品弹框
    moreClickHandler: function(){
          this.showSelectDialog = !this.showSelectDialog;
    },
    // 根据产品编码查询的结果
    oneSuccessHandler: function(d) {
      let one = adapter(d);
      console.log(JSON.stringify(one));
      this.testData.push(one);
    },
    // 收件信息验证函数
    validateHandler: function(d) {
        console.log(d);
        if(d.res == "fail") this.validateInfo = false;
        else {
            this.recData[d.name] = d.value;
        }
    },
    // 验证列表数据
    validateFun: function(){
        this.validateRec = true;
        for (var i = 0; i < this.testData.length; i++) {
          let one = this.testData[i];
            for(var key in one) {
              if(typeof(one[key]) == "object") {
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false; break;}
              }
          }
        }
        // 备注
        this.validate = !this.validate;
        setTimeout(()=>{
          if(!this.validateRec) this.$dispatch("fail", {project:this.curName});
          else this.$dispatch("success", {project: this.curName,data:{list: this.testData, rec_info: this.recData}});
        });
    },

    deleteoneHandler: function(d) {
        this.testData.split(d.index,1);
    },

    addoneHandler : function(d){
        let one = adapter(d.data);
        console.log(JSON.stringify(one));
        this.testData.push(one);
    }
  },
  ready: function(){

  },
  watch:{
    "subvalidate": function() {
        // 执行验证
        this.validateFun();
    }
  }
}
