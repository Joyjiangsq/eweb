// 不使用
export default function adapterData(d) {
      if(!d.stock || d.stock == 0) d.stock = "0";

      // 设置验证参数规则
      d.Quantity = {     //
          def: d.Quantity || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              // 计算转化数量
              // 包装规格   SalPackUn   如果是厨柜 或者木门 则忽略定制品忽略
              d.SalPackUn = d.SalPackUn || 1;
              let sy = Math.ceil(this.def/d.SalPackUn);
              d.U_Pquantity = d.SalPackUn*sy;
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是整数";
                return false
              }
              if(this.def*1 < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是大于0";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                  if(d.use_stores.def == 0 || d.use_stores.def == "" || !d.use_stores.def){
                      this.defCss = "errorHappend";
                      this.errorMsg = "采购数量与使用库存不能同时为0";
                      return false
                  }
                  else {
                    this.defCss = "default";
                    this.errorMsg = "";
                    return true;
                  }
              }
              else if((this.def*1 + d.use_stores.def*0) < d.sale_counts*1) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量与使用库存数小于销售数量";
                return true
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

          }
      };
      d.U_Pquantity = ""; // 转化数量
      return d;
}
