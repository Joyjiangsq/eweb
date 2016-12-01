import {getLevelOneTypeByName} from "config/codeMap";
export default function adapterData(d) {
      if(!d.stock || d.stock == 0) d.stock = "0";
      // 设置验证参数规则
      d.use_stores = {     //
          def: d.use_stores || "0",
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是整数";
                return false
              }
              else if(this.def*1 < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须大于0";
                return false
              }
              else if(this.def > d.stock) {
                this.defCss = "errorHappend";
                this.errorMsg = "不能大于库存数量";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                  if(d.U_Pquantity.def == 0 || d.U_Pquantity.def == "" || !d.U_Pquantity.def){
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
              else if((this.def*1 + d.U_Pquantity.def*1) < d.sale_counts*1) {
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

      // 设置验证参数规则
      d.U_Pquantity = {     //
          def: d.U_Pquantity || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              // 计算转化数量
              // 包装规格   SalPackUn   如果是厨柜 或者木门 则忽略定制品忽略
              if(d.ItmsGrpCod != getLevelOneTypeByName("厨柜") && d.ItmsGrpCod != getLevelOneTypeByName("门")) {
                if(d.ItmsGrpCod != getLevelOneTypeByName("地板")) {
                  d.SalPackUn = d.SalPackUn || 1;
                  let sy = Math.ceil(this.def/d.SalPackUn);
                  d.Quantity = d.SalPackUn*sy;
                  d.Quantity = d.Quantity.toFixed(3);
                  console.log(d.Quantity);
                }
                else {
                  // U_PMeasure
                  if(d.U_PMeasure*1 <= 0) {
                    d.Quantity = 0;
                    d.Quantity = d.Quantity.toFixed(3);
                  }
                  else {
                    d.Quantity = ((this.def/d.U_PMeasure*1)*d.U_PMeasure*1).toFixed(3);
                  }
                }
              }
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
      d.Quantity = ""; // 转化数量
      return d;
}
