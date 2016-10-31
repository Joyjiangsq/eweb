import Utils from "common/Utils";
export function routerStart(router) {
      router.map({
          "/":{
              component: function(resovle) {require(['portalview/index.vue'], resovle)},
              subRoutes:{
                // 首页
                "index": {
                    component: function(resovle) {require(['modules/index/index.vue'], resovle)},
                },
                // 分站账户管理
                "accountmgr": {
                    component: function(resovle) {require(['modules/account/accountmgr.vue'], resovle)},
                },

                // 分站员工管理
                "employee":{
                    component: function(resovle) {require(['modules/employee/employeemgr.vue'], resovle)},
                },

                // 用户管理
                "user":{
                    component: function(resovle) {require(['modules/user/userMgr.vue'], resovle)},
                },

                // 客户管理
                "custom":{
                    component: function(resovle) {require(['modules/custom/customMgr.vue'], resovle)},
                },

                // 销售下单管理
                "sale":{
                    component: function(resovle) {require(['modules/sale/sale.vue'], resovle)},
                    subRoutes: {
                      "/":{
                          component: function(resovle) {require(['modules/sale/saleMgr.vue'], resovle)},
                      },
                      "/addSale":{
                          component: function(resovle) {require(['modules/sale/saleAdd.vue'], resovle)},
                      },
                      "detail" :{
                        component: function(resovle) {require(["modules/sale/saleDetail.vue"], resovle)}
                      },
                      "subdetail" :{
                        component: function(resovle) {require(["modules/sale/subSaleDetail.vue"], resovle)}
                      }
                    }
                },

                // 采购订单管理
                "purchase":{
                    component: function(resovle) {require(['modules/purchase/purchaseOrder.vue'], resovle)},
                },

                // 备货管理
                "prestoremgr":{
                    component: function(resovle) {require(['modules/purchase/preStoreMgr.vue'], resovle)},
                },

                // 备货审核
                "prestorevalidate":{
                    component: function(resovle) {require(['modules/purchase/preStoreValidate.vue'], resovle)},
                },

                // 订制品设计申请管理
                "specapplydesignmgr":{
                    component: function(resovle) {require(['modules/spec/specApply.vue'], resovle)},
                },

                // 订制品设计管理
                "specdesignmgr":{
                    component: function(resovle) {require(['modules/spec/specMgr.vue'], resovle)},
                },

                // 加急卡管理
                "urgent":{
                    component: function(resovle) {require(['modules/urgent/urgentMgr.vue'], resovle)},
                },

                //开发文档
                "demo":{
                  component: function(resovle) {require(['modules/demo/demo.vue'], resovle)},
                  subRoutes:{
                    "/datepicker": {  component: function(resovle) {require(['modules/demo/datepicker.vue'], resovle)}},
                    "/dialog": {  component: function(resovle) {require(['modules/demo/dialog.vue'], resovle)}},
                    "/paginate": {  component: function(resovle) {require(['modules/demo/paginate.vue'], resovle)}},
                    "/datatable": {  component: function(resovle) {require(['modules/demo/datatable.vue'], resovle)}},
                    "/combobox": {  component: function(resovle) {require(['modules/demo/combobox.vue'], resovle)}},
                    "/search": { component: function(resovle) {require(['modules/demo/search.vue'], resovle)}},
                    "/form": {component: function(resovle) {require(['modules/demo/form.vue'], resovle)}},
                    "/tablesp": {component: function(resovle) {require(['modules/demo/tableSpec.vue'], resovle)}},
                    "/filetest": {component: function(resovle) {require(['modules/demo/filetest.vue'], resovle)}},
                    "/tab": {component: function(resovle) {require(['modules/demo/tabBar.vue'], resovle)}}
                  }
                }
              }
          },

          "/login": {
              component: function(resovle) {require(['modules/login/login.vue'], resovle)},
          },

          "*":{
            component: function(resovle) {require(['portalview/404.vue'], resovle)},
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
