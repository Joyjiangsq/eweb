import {getLevelThreeTypeByName} from "config/codeMap";
import commonAdapter from "./common.js";
import cgAdapter from "component/blockcommon/cgCommonAdapter";
import cgControl from "component/blockcommon/cgControl";
export default function adapterData(d) {
     commonAdapter(d)
     cgAdapter(d);
     return cgControl(d);
}
