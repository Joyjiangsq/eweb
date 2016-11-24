import Utils from "common/Utils";
import mdialog from "component/blockcommon/mealDialog"; // 套餐弹框
// 定制品依赖组建
import {
  heyeComponent,        // 合页组建
  mensuoComponent,      // 门锁组件
  holeComponent,        // 是否开孔
  kaiqiComponent,       // 开启方向
  zhinengDirComponent,  // 智能门锁开向
  tdComponent,          // 是否有天地沟
  zhiComponent,          // 智能门锁类别
  qianyanComponent,     // 前沿造型
  taiyiComponent,       // 台盆工艺
  qiyuanComponent,      // 气源方式
  bashouComponent       // 把手
} from "./specCompMap.js";
// 列标准
let addCommon = function() {
  let initHeader = [
    {name:"产品编码", labelValue:"ItemCode", type:"data"},
    {name:"产品名称", labelValue:"ItemNameComponent", type:"componentspec",  component:mdialog},
    {name:"产品包", labelValue:"SWW", type:"data"},
    {name:"品牌", labelValue:"U_Brand", type:"data"},
    {name:"型号", labelValue:"U_Modle", type:"data"},
    {name:"颜色", labelValue:"Color", type:"data"},
    {name:"材质", labelValue:"U_MQuality", type:"data"},
    {name:"产品规格", labelValue:"Spec", type:"data"}]
  return initHeader
}
// 追加末尾
let addLast = function(arr, type = 'edit') {
    arr.unshift({type:"operator", name:""});
    arr.push({name:"单位", labelValue:"SalUnitMsr",type:"data"});
    arr.push({name:"备注", labelValue:"Freetxt",type: type});
}

// 追加销售数量列
// scene 分为 sale下单 和 back备货
let addByScene = function(arr, type, scene = 'sale', name=scene=='sale'?'销售数量':'采购数量') {
    if(scene == "sale") {
      arr.push({name:name, labelValue:"buyCounts",type:type, number: true});
      arr.push({name:"可用库存量", labelValue:"stock",type: "data"});
    }
    else {
      arr.push({name:name, labelValue:"U_Pquantity", type:type, number: true},);
      arr.push({name:"转换数量", labelValue:"Quantity",type: "data"});
      arr.push({name:"包装数量", labelValue:"SalPackUn",type: "data"});
      arr.push({name:"包装单位", labelValue:"SalPackMsr",type: "data"});
    }
}

// 下单 表品头 标准品类 可编辑属性
export const sale_standard_header = function(scene) {
    let one = addCommon();
    addByScene(one, 'edit', scene);
    addLast(one);
    return one
}

// 下单 表品头 标准品类 不可编辑属性
export const sale_standard_header_d = function(scene) {
    let one = addCommon();
    addByScene(one, 'data', scene);
    addLast(one, "data");
    return one
}

// 门类别
let addMenCols = function(arr, type = 'edit') {
    let tp;
    if(type == 'edit') {
      tp = [{name:"是否开孔", labelValue:"U_IKeyHole", type:"component", component: holeComponent},     // 下拉组件  TODO
            {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"component", component: heyeComponent},   // 下拉组件
            {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"component",  component:mensuoComponent},        // 下拉组件
            {name:"开启方式", labelValue:"U_OpenWay", type:"component", component:kaiqiComponent}]        // 下拉组件 TODO
    }
    else {
      tp = [{name:"是否开孔", labelValue:"U_IKeyHole", type:"data"},     // 下拉组件  TODO
            {name:"合页品牌/型号/规格", labelValue:"U_HingeName", type:"data"},   // 下拉组件
            {name:"门锁品牌/型号/规格", labelValue:"U_LockName", type:"data"},        // 下拉组件
            {name:"开启方式", labelValue:"U_OpenWay", type:"data"}]        // 下拉组件 TODO
    }
    return arr.concat([
      {name:"切角方式", labelValue:"U_CutAMe", type:"data"},
      {name:"玻璃类型", labelValue:"U_GType", type:"data"},
      {name:"门套线类型", labelValue:"U_DLType", type:"data"},
      {name:"门套线边数", labelValue:"U_DCLNum", type:"data"},
      {name:"门扇数", labelValue:"U_DLNum", type:"dataspec"},
      {name:"门洞宽（mm）", labelValue:"U_DSWide", type:type}, // 特殊类型 需要考虑到 编辑的状态 如何去渲染与更改关联值
      {name:"门洞高（mm）", labelValue:"U_DSHigh", type:type},
      {name:"门洞深（mm）", labelValue:"U_DSThick", type:type},
      {name:"门扇宽（mm）", labelValue:"U_TDWide", type:type},
      {name:"门扇高（mm）", labelValue:"U_TDHigh", type:type},
      {name:"门扇厚（mm）", labelValue:"U_TDThick", type:type},
    ],tp);
}
// 门 类别的 列 可编辑属性
export const sale_men_header = function(scene) {
    let one = addCommon();
    one = addMenCols(one)
    addByScene(one, 'edit', scene);
    addLast(one);
    return one
}

// 门 类别的 列 不可编辑属性
export const sale_men_header_d = function(scene) {
    let one = addCommon();
    one = addMenCols(one, "data")
    addByScene(one, 'data', scene);
    addLast(one, "data");
    return one
}

// 门控五金类别
export const sale_men_five_header = function(scene) {
    let one = addCommon();
    addByScene(one, 'edit', scene);
    addLast(one);
    return one
}

export const sale_men_five_header_d = function(scene) {
    let one = addCommon();
    addByScene(one, 'data', scene);
    addLast(one, "data");
    return one
}
// 智能门锁类别
let addMenZLockCols = function(arr, type = 'edit') {
    let tp;
    if(type == 'edit') {
      tp = [{name:"智能门锁门的类别", labelValue:"U_DType",  type:"component",component: zhiComponent, style:{width: '100px'}},
            {name:"智能门锁门开向", labelValue:"U_DoorO", type:"component", component:zhinengDirComponent, style:{width: '100px'}},
            {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"component", component:tdComponent, style:{width: '100px'}}]  //TODO
    }
    else {
      tp = [{name:"智能门锁门的类别", labelValue:"U_DType",  type:"data", style:{width: '100px'}},
            {name:"智能门锁门开向", labelValue:"U_DoorO", type:"data", style:{width: '100px'}},
            {name:"智能门锁是否有天地钩", labelValue:"U_IHEH", type:"data", style:{width: '100px'}}]  //TODO
    }
    return arr.concat([
      {name:"智能门锁厚度", labelValue:"U_DThick", type:type, style:{width: '100px'}},
      {name:"智能门锁锁体挡板长度（mm）", labelValue:"U_LBLength", type:type, style:{width: '100px'}},
      {name:"智能门锁锁体挡板宽度（mm）", labelValue:"U_LBWide", type:type, style:{width: '100px'}},
      {name:"智能门锁锁体档板左右螺丝十字中心孔距（mm）", labelValue:"U_AbDis", type:type, style:{width: '195px'}},
      {name:"智能门锁锁体档板上下螺丝十字中心孔距（mm）", labelValue:"U_UDDis", type:type, style:{width: '195px'}},
      {name:"智能门锁门边到锁面板右侧的距离（mm）", labelValue:"U_LTRDis", type:type, style:{width: '185px'}},
      {name:"智能门锁门锁面板总长度（mm）", labelValue:"U_TLLength", type:type, style:{width: '130px'}},
    ], tp);
}
// 智能门锁类别
export const sale_men_z_header = function(scene) {
    let one = addCommon();
    one = addMenZLockCols(one)
    addByScene(one, 'edit', scene);
    addLast(one);
    return one
}

export const sale_men_z_header_d = function(scene) {
    let one = addCommon();
    one = addMenZLockCols(one, "data")
    addByScene(one, 'data', scene);
    addLast(one, "data");
    return one
}

// 厨柜类别
// 柜体 门板 配件
let addGCols = function(arr, type = 'edit') {
    let tp;
    if(type == 'edit') {
      tp = [{name:"把手型号", labelValue:"U_HandleName", type:"component", component:bashouComponent}]
    }
    else {
      tp = [{name:"把手型号", labelValue:"U_HandleName", type:"data"}]
    }
    return arr.concat([
      {name:"门板材质", labelValue:"U_DMaterial", type:"data"},
      {name:"柜体材质", labelValue:"U_CQuality", type:"data"},
      {name:"门型", labelValue:"U_DType", type:"data"}],
      tp,
      [{name:"宽度（mm）", labelValue:"U_PSWide", type:type},
      {name:"高度（mm）", labelValue:"U_PSHigh", type:type},
      {name:"进深（mm）", labelValue:"U_PSDeep", type:type}
    ]);
}

export const sale_chu_g_header = function(scene) {
    let one = addCommon();
    one = addGCols(one)
    if(scene == 'sale') addByScene(one, 'edit', scene, "延米（m）/销售数量");
    else addByScene(one, 'edit', scene, "延米（m）/采购数量");
    addLast(one);
    return one
}

export const sale_chu_g_header_d = function(scene) {
    let one = addCommon();
    one = addGCols(one, "data")
    if(scene == 'sale') addByScene(one, 'data', scene, "延米（m）/销售数量");
    else addByScene(one, 'data', scene, "延米（m）/采购数量");
    addLast(one, "data");
    return one
}


// 台面
let addTMCols = function(arr, type = 'edit') {
    let tp;
    if(type == 'edit') {
      tp = [{name:"前沿造型", labelValue:"U_FModeling", type:"component", cname:"qianyan", component:qianyanComponent},
            {name:"气源方式", labelValue:"U_GSMe",  type:"component", cname:"qiyuan", component:qiyuanComponent},
            {name:"台盆工艺", labelValue:"U_BasinT",  type:"component", cname:"taiyi", component:taiyiComponent}]
    }
    else {
      tp = [{name:"前沿造型", labelValue:"U_FModeling", type:"data"},
            {name:"气源方式", labelValue:"U_GSMe",  type:"data"},
            {name:"台盆工艺", labelValue:"U_BasinT",  type:"data"}]
    }
    return arr.concat(tp, [
      {name:"台面进深（mm）", labelValue:"U_TableB", type:type},
      {name:"挡水高度（mm）", labelValue:"U_HeightWR", type:type},
      {name:"包管展开宽（mm）", labelValue:"U_ASWide", type:type},
      {name:"包管展开深（mm）", labelValue:"U_ASDeep", type:type},
    ]);
}

export const sale_chu_tm_header = function(scene) {
    let one = addCommon();
    one = addTMCols(one)
    if(scene == 'sale') addByScene(one, 'edit', scene, "延米（m）/销售数量");
    else addByScene(one, 'edit', scene, "延米（m）/采购数量");
    addLast(one);
    return one
}

export const sale_chu_tm_header_d = function(scene) {
    let one = addCommon();
    one = addTMCols(one, "data")
    if(scene == 'sale') addByScene(one, 'data', scene, "延米（m）/销售数量");
    else addByScene(one, 'data', scene, "延米（m）/采购数量");
    addLast(one, "data");
    return one
}

//五金/厨电/水槽龙头
export const sale_chu_f_header = function(scene) {
  let one = addCommon();
  addByScene(one, 'edit', scene);
  addLast(one);
  return one
}

export const sale_chu_f_header_d = function(scene) {
  let one = addCommon();
  addByScene(one, 'data', scene);
  addLast(one);
  return one
}
