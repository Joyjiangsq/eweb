export const moduleMap = 'MODULEMAP'

// 常量配置 这里不用全大写
// 员工管理的职位配置
export const roleData = [
  {name:"设计师", id:1},
  {name:"销售", id:2},
  {name:"客服", id:3}
]
//装修风格
export const decorateStyle =[
  {name:"中式", id:1},
  {name:"简式", id:2},
  {name:"欧式", id:3},
  {name:"地中海式", id:4},
  {name:"田园", id:5},
  {name:"美式", id:6},
  {name:"其他", id:-2}
]

// 渠道配置
export const fromConst= [
  {name:"分站提供", id:"分站提供"},
  {name:"400", id:"400"},
  {name:"官网", id:"官网"},
  {name:"天猫", id:"天猫"},
  {name:"淘宝", id:"淘宝"},
  {name:"微信", id:"微信"},
  {name:"微商城", id:"微商城"},
  {name:"转介绍", id:"转介绍"},
  {name:"其他", id:"其他"}
]
// 房屋类型配置
export const houseType= [{name:"毛坯新房", id:1},{name:"二手房", id:2}]
// 组包类型配置
export const packageType = [
  {name:"国民包", id: 1},
  {name:"名品包", id: 2},
  {name:"尊享包", id: 3}
]

// 销售订单   单据类型   订单类型
export const orderType = [
  {name:"正常订单", id: 14},
  {name:"售后订单", id: 81}
  // 82-备货
]

//

// 订单状态  TODO 暂时前端写死
export const orderStatus = [
  {name:"待接单", id:"0"},
  {name:"待采购", id: "-1"},
  {name:"工厂提货", id: 1},
  {name:"D仓收货", id: 2},
  {name:"S仓提货", id: 3},
  {name:"S仓收货", id: 4},
  {name:"分站提货", id: 5},
  {name:"分站签收", id: 6},
  {name:"工厂接单", id: 7},
  {name:"店长驳回", id: 8},
  {name:"e站驳回", id: 9}
]

// 角色
export const rolesE = [
  {name:"总部客服", id:7},
  {name:"总部设计师", id:8},
]
export const rolesS = [
  {name:"店长", id:"店长"},
  {name:"精算师", id:"精算师"},
  {name:"销售员", id:"销售员"},
  {name:"材料员", id:"材料员"},
  {name:"财务", id:"财务"}
]

// 厨柜订制品参数集合
// 系列
export const series = [{name:"国民包", id:"国民包"},{name:"名品包", id:"名品包"},{name:"吸塑", id:"吸塑"},{name:"实木", id:"实木"},{name:"尊享包", id:"尊享包"}]
// 形状
export const shapeDatas = [{name:"一字型", id:"一字型"},{name:"L字型", id:"L字型"},{name:"U字型", id:"U字型"},{name:"其它", id:"其它"}]
// 冰箱位置
export const positionDatas=[{name:"厨房外", id:"厨房外"},{name:"厨房内", id:"厨房内"}]
// 水槽工艺
export const artDatas=[{name:"台上工艺", id:"台上工艺"},{name:"台下工艺", id:"台下工艺"}]
// 五金
export const fiveDatas = [{label:'调味篮', id:'调味篮', checked: false},{label:'碗碟篮', id:'碗碟篮', checked: false},{label:'锅篮', id:'锅篮', checked: false}]
// 下水主管datas
export const pipeDatas = [{name:"施工包下水主管", id:"施工包下水主管"},{name:"厨柜包下水主管", id:"厨柜包下水主管"}]
// 燃气管 数据集
export  const rq_pipeDatas = [{name:"厨柜包燃气管", id:"厨柜包燃气管"},{name:"台面包燃气管", id:"台面包燃气管"},{name:"不包燃气管", id:"不包燃气管"}]
