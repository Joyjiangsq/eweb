import Utils from "common/Utils";
import index from 'portalview/index.vue';
import  indexView from 'modules/index/index.vue';
import accountView from 'modules/account/accountmgr.vue';
import  empView from 'modules/employee/employeemgr.vue';
import userView from 'modules/user/userMgr.vue';
import customView from 'modules/custom/customMgr.vue';
import saleAppend from "modules/sale/saleAppend.vue";

import saleMgr from 'modules/sale/saleMgr.vue';
import addSale from 'modules/sale/saleAdd.vue';
import saleView from 'modules/sale/sale.vue';
import saleDetail from "modules/sale/saleDetail.vue";
import subSaleDetail from "modules/sale/subSaleDetail.vue";

import purchase from 'modules/purchase/purchase.vue';
import purchaseOrder from 'modules/purchase/purchaseOrder.vue';
import purchaseDetail from 'modules/purchase/purchaseDetail.vue';

import prestore from 'modules/prestore/preStore.vue';
import prestoreView from 'modules/prestore/preStoreMgr.vue';
import prestoreDetail  from 'modules/prestore/preStoreDetail.vue';
import prestoreAdd from 'modules/prestore/preStoreAdd.vue';

import preValidate from 'modules/prestore/preValidate.vue';
import preValidateView from 'modules/prestore/prestoreValidate.vue';
import preValidateDetail from 'modules/prestore/prestoreValidateDetail.vue';

import spec from 'modules/spec/specBase.vue';
import specView from 'modules/spec/specMgr.vue';
import specApply from 'modules/spec/specApply.vue';

import buildCateryView from 'modules/basedata/buildCatery.vue';
import buildMgrView from 'modules/basedata/buildMgr.vue';
import buildPriceView from 'modules/basedata/buildPrice.vue';
import materialView from 'modules/basedata/material.vue';
import materialCateryView from 'modules/basedata/materialCatery.vue';
import supplierView from 'modules/basedata/supplier.vue';

// 报价模板
import priceDemoViewc from "modules/pricedemo/priceDemoc.vue";
import priceDemoViews from "modules/pricedemo/priceDemos.vue";
import priceTransView from "modules/pricedemo/priceTrans.vue";
import priceAddcView from "modules/pricedemo/priceAddc.vue";
import priceAddsView from "modules/pricedemo/priceAdds.vue";

// 调品规则
import materialRuleView from "modules/material/material.vue";

import tbView from 'modules/tbmgr/tbMgr.vue';
import urView from 'modules/urgent/urgentMgr.vue'

import loginView from 'modules/login/login.vue'
import fView from 'portalview/404.vue';
import fbView from 'portal/forbidden.vue';
export function routerStart(router) {
  router.map({
      '/': {
          component: index,
          // 在/foo下设置一个子路由
          subRoutes: {
                // 首页-----------------------------------------------------------------
                '/index': {
                  name:"index",
                  component: indexView
                },
                // 分站账户管理-----------------------------------------------------------------
                '/accountmgr': {
                  name:"accountmgr",
                  component: accountView
                },
                // 分站员工管理-----------------------------------------------------------------
                '/employee': {
                  name:"employee",
                  component: empView
                },
                // 客户管理---------------------------------------------------------------------
                '/custom': {
                  name:"custom",
                  component: customView
                },
                // 用户管理---------------------------------------------------------------------
                "/user":{
                  name:"user",
                  component:userView
                },
                // 销售下单管理------------------------------------------------------------------
                '/sale': {
                  name:"sale",
                  component: saleView,
                  subRoutes:{
                    "/":{
                      component: saleMgr
                    },
                    "addSale":{
                      component: addSale
                    },
                    "detail":{
                      component: saleDetail
                    },
                    "subdetail":{
                      component: subSaleDetail
                    },
                    "append":{
                      component: saleAppend
                    }
                  }
                },
                // 采购管理模块------------------------------------------------------------------------------------
                // 采购订单管理
                '/purchase': {
                  name:"purchase",
                  component: purchase,
                  subRoutes: {
                    "/":{
                      component: purchaseOrder
                    },
                    "purchasedetail":{
                      component: purchaseDetail
                    }
                  }
                },
                // 备货申请
                '/prestore': {
                  name:"prestore",
                  component: prestore,
                  subRoutes: {
                    "/":{
                      component: prestoreView
                    },
                    "detail":{
                      component: prestoreDetail
                    },
                    "add":{
                      component: prestoreAdd
                    }
                  }
                },
                // 备货审核
                '/prestorevalidate': {
                  name:"prestorevalidate",
                  component: preValidate,
                  subRoutes: {
                    "/":{
                      component: preValidateView
                    },
                    "detail":{
                      component: preValidateDetail
                    }
                  }
                },
                // 加急卡
                '/urgent': {
                  name:"urgent",
                  component: urView
                },
                // 基础数据模块------------------------------------------------------
                // 材料管理
                '/material': {
                  name:"material",
                  component: materialView
                },

                 // 材料分类管理
                '/materialCatery': {
                  name:"materialCatery",
                  component: materialCateryView
                },

                 // 供应商数据
                '/supplier': {
                  name:"supplier",
                  component: supplierView
                },

                 // 施工报价管理
                '/buildMgr': {
                  name:"buildMgr",
                  component: buildMgrView
                },

                 // 施工报价分类管理
                '/buildCatery': {
                  name:"buildCatery",
                  component: buildCateryView
                },

                 // 施工报价一口价对照表
                '/buildPrice': {
                  name:"buildPrice",
                  component: buildPriceView
                },
                // 定制品模块--------------------------------------------------------
                // 订制品设计申请管理
                '/specmgr': {
                  name:"specmgr",
                  component: spec,
                  subRoutes: {
                    "/":{
                      component: specView
                    },
                    "apply":{
                      component: specApply
                    }
                  }
                },
                // 报价模板-----------------------------------------------------------
                "/priceDemoc": {
                  name:"priceDemoc",
                  component:priceTransView,
                  subRoutes: {
                    "/":{
                      component: priceDemoViewc
                    },
                    "/priceAddc": {
                        component: priceAddcView
                    }
                  }
                },
                "/priceDemos": {
                  name:"priceDemos",
                  component:priceTransView,
                  subRoutes: {
                    "/":{
                      component: priceDemoViews
                    },
                    "/priceAdds": {
                        component: priceAddsView
                    }
                  }
                },
                // 调品规则-------------------------------------------------------
                "/material" :{
                   name:" material",
                   component: materialRuleView
                },
                // 报表模块--------------------------------------------------------
                '/tbmgr': {
                  name:"tbmgr",
                  component: tbView
                },
                // 权限不足-------------------------------------------------------
                '/forbidden': {
                  name:"tbmgr",
                  component: fbView
                },
          }
      },

      "/login" :{
        component: loginView
      },
      "*" :{
        component: fView
      }
  })
      // redirect
      router.redirect({
          "/": "/index"
      })

      router.beforeEach(function ({ to, next }) {next()
        //  if(Utils.getUserInfo() != "" || !!Utils.getUserInfo()) next()
        //  else if(to.path == "/login") next()
        //  else router.go({path:"/login"})
      })
}
