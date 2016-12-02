export default function adapterData(d) {
      d.U_SWW = d.SWW; // 这里sap xxx 不解释了
      // delete d.SWW;
      d.U_SupNum = d.CardCode;
      delete d.CardCode;
      // 设置验证参数规则
      d.U_Pquantity = {     //
          def: d.U_Pquantity || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              // 计算转化数量
              // 包装规格   SalPackUn   如果是厨柜 或者木门 则忽略定制品忽略
              d.SalPackUn = d.SalPackUn || 1;
              let sy = Math.ceil(this.def/d.SalPackUn);
              d.Quantity = d.SalPackUn*sy;
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写";
                return false
              }
              if(this.def*1 < 0) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须是大于0";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "采购数量不能为0";
                  return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

          }
      };
        d.Quantity = d.Quantity || "";// 转化数量
      d.Freetxt = {     // 备注
          def: d.Freetxt || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){ return true; }
      };

      return d;
}
