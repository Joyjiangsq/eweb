import actionFun from "component/blockcommon/adapterAction";
import uqfun from "component/blockcommon/uqFun";
import {getLevelThreeTypeByName} from "config/codeMap";
export default function adapter(d) {
      d.U_SWW = d.SWW; // 这里sap xxx 不解释了
      d.U_Pquantity = {     //
          def: d.U_Pquantity || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              uqfun(d);
              let actions = [{action:"a_number", msg:"销售数量填写不正确"},{action:"a_int"}]
              if(d.Code != getLevelThreeTypeByName("台面")) {
                  actions.push({action:"a_greater", msg:"销售数量必须大于0"});
                  actions.push({action:"a_must", msg:"销售数量必须填写"});
              }
              else actions.push({action:"a_greatere", msg:"销售数量必须大于等于0"});
              return actionFun(this,actions, d);
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
