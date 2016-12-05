import {getLevelThreeTypeByName} from "config/codeMap";
import commonAdapter from "./common.js";
import menAdapter from "component/blockcommon/menCommonAdapter";
import menControl from "component/blockcommon/menControl";
export default function adapterData(d) {
    // 基础列
    commonAdapter(d);
    // 门列
    menAdapter(d);
    // 默认销售与备注是放开的
    d.sale_counts.tb_disabled = false;
    d.Freetxt.tb_disabled = false;
    return menControl(d);
}
