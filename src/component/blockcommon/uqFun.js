import {getLevelOneTypeByName} from "config/codeMap";
// 计算转化数量
export default function ufun(d) {
    // 计算转化数量
    // 包装规格   SalPackUn   如果是厨柜 或者木门 则忽略定制品忽略
    if(d.ItmsGrpCod != getLevelOneTypeByName("厨柜") && d.ItmsGrpCod != getLevelOneTypeByName("门")) {
    if(d.ItmsGrpCod != getLevelOneTypeByName("地板")) {
        d.SalPackUn = d.SalPackUn || 1;
        let sy = Math.ceil(d.U_Pquantity.def/d.SalPackUn);
        d.Quantity = d.SalPackUn*sy;
        d.Quantity = d.Quantity.toFixed(3);
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
}