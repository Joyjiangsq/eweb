import actionFun from "component/blockcommon/adapterAction";
import uqfun from "component/blockcommon/uqFun";
export default function adapter(d) {
      d.U_SWW = d.SWW; // 这里sap xxx 不解释了
      d.U_Pquantity = {     //
          def: d.U_Pquantity || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              uqfun(d);
              return actionFun(this, [
                {action:"a_number", msg:"采购数量填写不正确"},
                {action:"a_greater", msg:"采购数量必须大于0"},
                {action:"a_must", msg:"采购数量必须填写"}
              ], d)
          }
      };
      d.Quantity = d.Quantity || "";// 转化数量
      d.Freetxt = {     // 备注
          def: d.Freetxt || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){ return true; }
      };
}
