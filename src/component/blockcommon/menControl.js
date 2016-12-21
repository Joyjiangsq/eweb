import {getLevelThreeTypeByName} from "config/codeMap";
// 定制品门控制核心
export default function men_c(d) {
     // 根据业务表格抽象出类型
    // 关闭或者开启智能门锁
    let depZNkeys = function(tag){
            // 智能门锁厚度
            d.U_DThick.tb_disabled = tag;
            // // 智能门锁锁体挡板长度
            d.U_LBLength.tb_disabled = tag;
            // 智能门锁锁体挡板宽度
            d.U_LBWide.tb_disabled = tag;
            // 智能门锁锁体档板左右螺丝十字中心孔距
            d.U_AbDis.tb_disabled = tag;
            // 智能门锁锁体档板上下螺丝十字中心孔距
            d.U_UDDis.tb_disabled = tag;
            // 智能门锁门边到锁面板右侧的距离
            d.U_LTRDis.tb_disabled = tag;
            // 智能门锁门锁面板总长度
            d.U_TLLength.tb_disabled = tag;
            // 智能门锁门的类别
            d.U_DType.tb_disabled = tag;
            // 智能门锁门开向
            d.U_DoorO.tb_disabled = tag;
            // 智能门锁是否有天地钩
            d.U_IHEH.tb_disabled = tag;
    }
    // 关闭或开启门洞宽高深
    let depMhole = function(tag) {
        d.U_DSWide.tb_disabled = tag; // 门洞宽
        d.U_DSHigh.tb_disabled = tag; // 门洞高
        d.U_DSThick.tb_disabled = tag; // 门洞深
    }

    // 关闭或开启门扇宽高厚
    let depMshan = function(tag) {
        d.U_TDWide.tb_disabled = tag; // 门扇宽
        d.U_TDHigh.tb_disabled = tag; // 门扇高
        d.U_TDThick.tb_disabled = tag; // 门扇厚
    }

    // 关闭或开启（开启方式、是否开锁孔，门锁，合页）
    let depMbs = function(tag) {
        d.U_IKeyHole.tb_disabled = tag; // 是否开孔
        d.U_HingeName.tb_disabled = tag; // 合页
        d.U_LockName.tb_disabled = tag; // 门锁
        d.U_OpenWay.tb_disabled = tag; // 开启方式
    }
    console.log("---------------------------------------");
    let lone = ["平开门（木门）","平开门（铝框门）"]
    lone = lone.map(one => getLevelThreeTypeByName(one));
    if(lone.indexOf(d.Code) != -1) {
        depMhole(false); depMshan(false);depMbs(false);
        return d
    }

    let ltwo = ["移门（木门）", "移门（铝框门）"]
    ltwo = ltwo.map(one => getLevelThreeTypeByName(one));
    if(ltwo.indexOf(d.Code) != -1) {
        depMhole(false); depMshan(false);
        d.U_OpenWay.tb_disabled = true; // 开启方式
        return d
    }

    let lthree = ["门扇（木门）", "门扇（铝框门）"]
    lthree = lthree.map(one => getLevelThreeTypeByName(one));
    if(lthree.indexOf(d.Code) != -1) {
        depMshan(false);depMbs(false);
        return d
    }

    let lfour = ["筒子板（木门）", "门套（木门）","垭口（木门）","窗套","飘窗板","筒子板（铝框门）","门套（铝框门）","飘窗板"]
    lfour = lfour.map(one => getLevelThreeTypeByName(one));
    if(lfour.indexOf(d.Code) != -1) {
        depMhole(false);
        return d
    }

    let lfive = ["遮轮板（铝框门）", "遮轮板（木门）"]
    lfive = lfive.map(one => getLevelThreeTypeByName(one));
    if(lfive.indexOf(d.Code) != -1) {
        d.U_DSWide.tb_disabled = false; // 门洞宽
        return d
    }

    let lsix = ["门套线（铝框门）","配件及其他（门）","门套线（木门）","五金","普通门锁","吊轮","拉手（门）","吊轨","合页","门吸"]
    lsix = lsix.map(one => getLevelThreeTypeByName(one));
    if(lsix.indexOf(d.Code) != -1) {
        return d
    }

    let ZNcode = getLevelThreeTypeByName("智能锁");
    if(ZNcode == d.Code) {
        depZNkeys(false);
        return d;
    }
    return d;
}