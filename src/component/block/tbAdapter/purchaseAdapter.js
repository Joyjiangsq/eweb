export default function adapterData(d) {
      // 设置验证参数规则
      d.useStores = {     //
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是整数";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写";
                return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

          }
      };

      // 设置验证参数规则
      d.purchaseCounts = {     //
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是整数";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写";
                return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

          }
      };

      d.Quantity = ""; // 转换数量

      return d;
}
