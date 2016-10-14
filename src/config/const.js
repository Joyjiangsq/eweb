export const moduleMap = 'MODULEMAP'

// 常量配置 这里不用全大写
// 员工管理的职位配置
export const roleData = [
  {name:"设计师", id:1},
  {name:"销售", id:2},
  {name:"客服", id:3}
]

// 组包类型配置
export const packageType = [
  {name:"国民包", id: 1},
  {name:"民品包", id: 2},
  {name:"尊享包", id: 3}
]

// 销售订单  订单类型
export const orderType = [
  {name:"正单", id: 1},
  {name:"售后订单", id: 2}
]


// 订单状态  TODO 暂时前端写死
export const orderStatus = [
  {name:"待销售", id: 1},
  {name:"待采购", id: 2},
  {name:"分站审核", id: 3},
  {name:"部分驳回", id: 4},
  {name:"店长驳回", id: 5},
  {name:"工厂审核", id: 6},
  {name:"工厂驳回", id: 7},
  {name:"待扣款", id: 8},
  {name:"待生产", id: 9},
  {name:"待发货", id: 10},
  {name:"已发货", id: 11},
  {name:"已收货", id: 12}
]
