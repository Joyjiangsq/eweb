import actionFun from "component/blockcommon/adapterAction";
import {getLevelThreeTypeByName} from "config/codeMap";
export default function adapter(d) {
      d.U_SWW = d.SWW; // 这里sap xxx 不解释了
     
      // 设置验证参数规则
      d.sale_counts = {     // 销售数量 限制不能购买0 个
          def: d.sale_counts || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              let actions = [{action:"a_number", msg:"销售数量填写不正确"},{action:"a_int"}]
              if(d.Code != getLevelThreeTypeByName("台面")) {
                  actions.push({action:"a_greater", msg:"销售数量必须大于0"});
                  actions.push({action:"a_must", msg:"销售数量必须填写"});
              }
              else actions.push({action:"a_greatere", msg:"销售数量必须大于等于0"});
              return actionFun(this,actions, d);
          }
      };
      d.Freetxt = {     // 备注
          def: d.Freetxt || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){ return true; }
      };

      if(!d.stock || d.stock == 0) d.stock = "0";
}
