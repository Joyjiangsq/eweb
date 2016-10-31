import Utils from "common/Utils";
import index from 'portalview/index.vue';
import  indexView from 'modules/index/index.vue';
import accountView from 'modules/account/accountmgr.vue';
import  empView from 'modules/employee/employeemgr.vue';
import userView from 'modules/user/userMgr.vue';

import customView from 'modules/custom/customMgr.vue';
import saleMgr from 'modules/sale/saleMgr.vue';
import addSale from 'modules/sale/saleAdd.vue';
import saleView from 'modules/sale/sale.vue';
import saleDetail from "modules/sale/saleDetail.vue";

import purchaseOrder from 'modules/purchase/purchaseOrder.vue';
import spViewA from 'modules/spec/specApply.vue';
import spViewb from 'modules/spec/specMgr.vue'
import loginView from 'modules/login/login.vue'
import urView from 'modules/urgent/urgentMgr.vue'
import fView from 'portalview/404.vue';
export function routerStart(router) {
  router.map({
      '/': {
          component: index,
          // 在/foo下设置一个子路由
          subRoutes: {
                '/index': {
                  component: indexView
                },
                '/accountmgr': {
                  component: accountView
                },
                '/employee': {
                  component: empView
                },
                '/custom': {
                  component: customView
                },
                "/user":{
                  component:userView
                },
                '/sale': {
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
                    }
                  }
                },
                '/purchase': {
                  component: purchaseOrder
                },
                '/specapplydesignmgr': {
                  component: spViewA
                },
                '/specdesignmgr': {
                  component: spViewb
                },
                'urgent':{
                  component: urView
                }
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
