export default function adapterData(d) {
      // 设置验证参数规则
      d.buyCounts = {     // 采购数量 限制不能购买0 个
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量必须是整数";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写采购数量";
                return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

              d.xxoo = this.def;

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
      //         this.errorMsg = "使用库存量不能大于采购数量";
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
