export default function adapterData(d) {
      // 设置验证参数规则
      d.buyCounts = {     // 采购数量 限制不能购买0 个
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){

              if(data.useStores.errorMsg != "") {
                  if(this.def*1 >= data.useStores.def*1) {
                    data.useStores.defCss = "default";
                    data.useStores.errorMsg = "";
                  }
              }
              else if(this.def*1 <  data.useStores.def*1) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量必须大于或者等于使用的库存量";
                return false
              }
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

          }
      };

      return d;
}
