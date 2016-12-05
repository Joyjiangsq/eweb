import {getLevelThreeTypeByName} from "config/codeMap";
import commonAdapter from "./common.js";
import cgAdapter from "component/blockcommon/cgCommonAdapter";
export default function adapterData(d) {
      commonAdapter(d)
      cgAdapter(d);
      d.U_HandleName.tb_disabled = true // 关闭把手型号
      if(d.Code == getLevelThreeTypeByName("柜门")) d.U_HandleName.tb_disabled = false
      //吊柜,地柜,高柜,半高柜,柜门,板件,顶线,灯线,罗马柱,木框玻璃门,上翻门,拉手,铰链,抽屉轨道,踢脚线,拉篮,台面,烟机,灶台,消毒柜,热水器,水槽,龙头
      let levelOne = ["板件","顶线","灯线","罗马柱","木框玻璃门","上翻门","拉手","铰链","抽屉轨道","踢脚线","拉篮","烟机","消毒柜","热水器","水槽","龙头"];
      let levelTwo = ["灶台", "台面"];
      levelOne = levelOne.map(one => getLevelThreeTypeByName(one));
      levelTwo = levelTwo.map(one => getLevelThreeTypeByName(one));
      // Code  三级分类编码
      if(levelTwo.indexOf(d.Code) == -1) {
            // 关闭  前沿造型/气源方式/台盆工艺/台面进深（mm）/挡水高度（mm）/包管展开宽（mm）/包管展开深（mm）
            // 第一层 "吊柜","地柜","高柜","半高柜","柜门",
            d.U_FModeling.tb_disabled = true;
            d.U_GSMe.tb_disabled = true;
            d.U_BasinT.tb_disabled = true;
            d.U_TableB.tb_disabled = true;
            d.U_HeightWR.tb_disabled = true;
            d.U_ASWide.tb_disabled = true;
            d.U_ASDeep.tb_disabled = true;
            if(levelOne.indexOf(d.Code) != -1) {
                d.U_PSDeep.tb_disabled = true; // 关闭进深
                d.U_HandleName.tb_disabled = true // 关闭把手型号
                if(d.Code != getLevelThreeTypeByName("板件")) {
                    d.U_PSWide.tb_disabled = true // 关闭宽
                    d.U_PSHigh.tb_disabled = true // 关闭高
                }
            }
      }
      else {
            d.U_PSDeep.tb_disabled = true; // 关闭进深
            d.U_PSWide.tb_disabled = true; // 关闭宽
            d.U_PSHigh.tb_disabled = true; // 关闭高
            d.U_HandleName.tb_disabled = true // 关闭把手型号
            if(d.Code == getLevelThreeTypeByName("灶台")) {
                //灶台  关闭 包管展开宽、包管展开高、台盆工艺、台面进深、挡水高度、前沿造型
                d.U_FModeling.tb_disabled = true;
                d.U_BasinT.tb_disabled = true;
                d.U_TableB.tb_disabled = true;
                d.U_HeightWR.tb_disabled = true;
                d.U_ASWide.tb_disabled = true;
                d.U_ASDeep.tb_disabled = true;
            }
            else {
                d.U_GSMe.tb_disabled = true; // 台面关闭气源
            }
      }
      return d;
}
