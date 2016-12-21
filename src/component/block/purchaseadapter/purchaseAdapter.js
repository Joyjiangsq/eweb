import uqfun from "component/blockcommon/uqFun";
import decimalIs from "component/blockcommon/decimal";

import {getLevelThreeTypeByName} from "config/codeMap";
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
                this.errorMsg = "库存数量填写不正确";
                return false
              }
              else if(!decimalIs(d, this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "库存必须是整数";
                return false
              }
              else if(this.def*1 < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "库存必须大于0";
                return false
              }
              else if(this.def > d.stock) {
                this.defCss = "errorHappend";
                this.errorMsg = "不能大于库存数量";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                  if(data.Code == getLevelThreeTypeByName("台面")) {
                      this.defCss = "default";
                      this.errorMsg = "";
                      return true;
                  }
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
              uqfun(d);

              // "U_TableB"                  // 台面进深
              // "U_HeightWR"             // 挡水高度
              // "U_ASWide"         // 包管展开宽
              // "U_ASDeep"                // 包管展开深
              // 如果是台面
              if(data.Code == getLevelThreeTypeByName("台面")) {
                  if(this.def == 0 || !this.def) {
                     this.def = 0;
                     this.defCss = "default";
                     this.errorMsg = "";
                     return true;
                  }
                  else  if(isNaN(this.def)) {
                    this.defCss = "errorHappend";
                    this.errorMsg = "采购数量填写不正确";
                    return false
                  }
                  else {
                    if((!data.U_TableB || data.U_TableB == 0) && (!data.U_HeightWR || data.U_HeightWR == 0)) {
                         this.defCss = "errorHappend";
                          this.errorMsg = "台面进深与挡水高度必须同时存在";
                          return false
                    }
                    else {
                          this.defCss = "default";
                          this.errorMsg = "";
                          return true;
                    }
                  }
              }
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量填写不正确";
                return false
              }
              else if(!decimalIs(d, this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量必须是整数";
                return false
              }
              if(this.def*1 < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量必须大于0";
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
