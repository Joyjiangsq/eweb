export default function adapterData(d) {
      // 设置验证参数规则
      d.buyCounts = {     // 销售数量 限制不能购买0 个
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def) || Math.ceil(this.def) != this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "销售数量必须是整数";
                return false
              }
              else if(this.def < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "销售数量必须大于0";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写销售数量";
                return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                d.xxoo = this.def;
                return true;
              }

          }
      };
      // d.useStores = {    // 使用库存量 限制不能超过可用库存量
      //     def: 0,
      //     defCss: "default",
      //     errorMsg:"",
      //     validateFun:function(data, index){
      //       if(isNaN(this.def)) {
      //         this.defCss = "errorHappend";
      //         this.errorMsg = "使用库存量必须是整数";
      //         return false
      //       }
      //       else if(this.def > data.avalibleStores) {
      //         this.defCss = "errorHappend";
      //         this.errorMsg = "使用库存量不能大于可用库存量";
      //         return false
      //       }
      //       else if(this.def > data.buyCounts.def) {
      //         this.defCss = "errorHappend";
      //         this.errorMsg = "使用库存量不能大于销售数量";
      //         return false
      //       }
      //       else {
      //         this.defCss = "default";
      //         this.errorMsg = "";
      //         return true;
      //       }
      //     }
      // };
      return d;
}
