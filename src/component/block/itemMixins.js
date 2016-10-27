export default {
  props :{
    subvalidate:{         // 开启验证的开关   验证结束会向父类派发success 和 fail 两个事件 并且附带品类名称
      default: false
    },
    testdata:{
      default: function(){
        return []
      },
       twoWay: true
    }

  },
  data: function () {
    return {
      tableEvents:{
          operatorRender: function(d){
            return [{action:"delete",icon:"icon-delete", data:d}]
          },
          operatorHandler: function(d){
            console.log(d);
              if(d.action == "delete") {
                for (var i = 0; i < this.testdata.length; i++) {
                  let one = this.testdata[i];
                  if(d.data.ItemCode == one.ItemCode) {
                    this.testdata.splice(i,1);
                    break;
                  }
                }
              }
          }
      },
      showSelectDialog:false, // 选品对话框控制
      validateRec :true, // 验证 列表
      recData:{},
      toload: false, // 展开选品对话框再加载
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  created: function () {
    // 初始化验证(如果有第一次)
    // for (var i = 0; i < this.testdata.length; i++) {
    //   let one = this.testdata[i];
    //   this.adapterFun(one);
    // }
  },
  attached: function () {},
  methods: {
    // 显示选品弹框
    moreClickHandler: function(){
          this.$set("toload", true);
          this.showSelectDialog = !this.showSelectDialog;
    },
    // 根据产品编码查询的结果
    oneSuccessHandler: function(d) {
      let one = this.adapterFun(d);
      console.log(this.testdata);
      this.testdata.push(one);
    },
    // 收件信息验证函数
    validateHandler: function(d) {
        if(d.res == "fail") this.validateInfo = false;
        else {
            this.recData[d.name] = d.value;
        }
    },
    // 验证列表数据
    validateFun: function(){
      console.log("11111111");
        this.validateRec = true;
        this.validateInfo = true;
        for (var i = 0; i < this.testdata.length; i++) {
          let one = this.testdata[i];
            for(var key in one) {
              if(typeof(one[key]) == "object") {
                  if(one[key].tb_disabled) continue;
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false;}
              }
          }
        }
        if(this.testdata.length != 0) {
          // 收件信息验证
          this.validate = !this.validate;
        }
        setTimeout(()=>{
          if(!this.validateRec || !this.validateInfo) this.$dispatch("fail", {project: this.curName});
          else this.$dispatch("success", {project:this.curName,data:{list: this.testdata, rec_info: this.recData}});
        })
    },
    // 验证列表数据
    // validateFun: function(){
    //   console.log(111);
    //     this.validateRec = true;
    //     for (var i = 0; i < this.testdata.length; i++) {
    //       let one = this.testdata[i];
    //         for(var key in one) {
    //           if(typeof(one[key]) == "object") {
    //               if(!one[key].validateFun) continue;
    //               if(one[key].tb_disabled) continue;
    //               let res = one[key].validateFun(one, i);
    //               if(!res) {this.validateRec = false;}
    //           }
    //       }
    //     }
    //     // 备注
    //     this.validate = !this.validate;
    //     setTimeout(()=>{
    //       if(!this.validateRec) this.$dispatch("fail", {project:this.curName});
    //       else this.$dispatch("success", {project: this.curName,data:{list: this.testdata, rec_info: this.recData}});
    //     });
    // },

    deleteoneHandler: function(d) {
        console.log(d);
        this.testdata.split(d.index,1);
    },

    addoneHandler : function(d){
        let one = this.adapterFun(d.data);
        this.testdata.push(one);
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
