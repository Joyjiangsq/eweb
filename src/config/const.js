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
export const fromConst= [{name:"淘宝", id:1},{name:"门店", id:2}]
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
  {name:"工厂提货", id: 1},
  {name:"D仓收货", id: 2},
  {name:"S仓提货", id: 3},
  {name:"S仓收货", id: 4},
  {name:"分站提货", id: 5},
  {name:"分站签收", id: 6},
  {name:"e站驳回", id: 7},
  {name:"工厂接单", id: 8},
  {name:"待接单", id: 9},
  {name:"待采购", id: 10},
  {name:"店长驳回", id: 11}
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
