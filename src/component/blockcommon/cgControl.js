import {getLevelThreeTypeByName} from "config/codeMap";
// 定制品厨柜控制核心
export default function men_c(d) {
     // 根据业务表格抽象出类型
    // 关闭或者开启个性化
    let depSpec = function(tag){
            // 个性化宽
            d.U_PSWide.tb_disabled = tag;
            // 个性化高
            d.U_PSHigh.tb_disabled = tag;
            // 个性化深
            d.U_PSDeep.tb_disabled = tag;
    }
    // 关闭或开启关联门把手
    let depBs = function(tag) {
        d.U_HandleName.tb_disabled = tag;
    }

    // 台面特殊
    let depTm = function(tag) {
        d.U_ASWide.tb_disabled = tag; // 包管展开宽
        d.U_ASDeep.tb_disabled = tag; // 包管展开深
        d.U_BasinT.tb_disabled = tag; // 台盆工艺
        d.U_TableB.tb_disabled = tag; // 台面进深
        d.U_HeightWR.tb_disabled = tag; // 挡水高度
        d.U_FModeling.tb_disabled = tag; // 前沿造型
    }

    let lone = ["吊柜","地柜","高柜","半高柜","板件"]
    lone = lone.map(one => getLevelThreeTypeByName(one));
    if(lone.indexOf(d.Code) != -1) {
        depSpec(false);
        return d
    }

    let ltwo = ["柜门"]
    ltwo = ltwo.map(one => getLevelThreeTypeByName(one));
    if(ltwo.indexOf(d.Code) != -1) {
        depBs(false);
        return d
    }

    let lthree = ["台面"]
    lthree = lthree.map(one => getLevelThreeTypeByName(one));
    if(lthree.indexOf(d.Code) != -1) {
        depTm(false)
        return d
    }

    let lfour = ["灶台"]
    lfour = lfour.map(one => getLevelThreeTypeByName(one));
    if(lfour.indexOf(d.Code) != -1) {
        // 气源方式
        d.U_GSMe.tb_disabled = false;
        return d
    }
    return d;
}