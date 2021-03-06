import Utils from "common/Utils";
export function routerStart(router) {
      router.map({
          "/":{
              component: function(resovle) {require(['portalview/index.vue'], resovle)},
              subRoutes:{
                // 首页
                "index": {
                    name:"index",
                    component: function(resovle) {require(['modules/index/index.vue'], resovle)},
                },
                // 分站账户管理
                "accountmgr": {
                    name:"accountmgr",
                    component: function(resovle) {require(['modules/account/accountmgr.vue'], resovle)},
                },

                // 分站员工管理
                "employee":{
                    name:"employee",
                    component: function(resovle) {require(['modules/employee/employeemgr.vue'], resovle)},
                },

                // 用户管理
                "user":{
                    name:"user",
                    component: function(resovle) {require(['modules/user/userMgr.vue'], resovle)},
                },

                // 客户管理
                "custom":{
                    name:"custom",
                    component: function(resovle) {require(['modules/custom/customMgr.vue'], resovle)},
                },

                // 销售下单管理
                "sale":{
                    name:"sale",
                    component: function(resovle) {require(['modules/sale/sale.vue'], resovle)},
                    subRoutes: {
                      "/":{
                          component: function(resovle) {require(['modules/sale/saleMgr.vue'], resovle)},
                      },
                      "addSale":{
                          component: function(resovle) {require(['modules/sale/saleAdd.vue'], resovle)},
                      },
                      "detail" :{
                        component: function(resovle) {require(["modules/sale/saleDetail.vue"], resovle)}
                      },
                      "subdetail" :{
                        component: function(resovle) {require(["modules/sale/subSaleDetail.vue"], resovle)}
                      },
                      "append" :{
                        component: function(resovle) {require(["modules/sale/saleAppend.vue"], resovle)}
                      }
                    }
                },

                // 采购订单管理
                "purchase":{
                    name:"purchase",
                    component: function(resovle) {require(['modules/purchase/purchase.vue'], resovle)},
                    subRoutes:{
                      "/":{
                          component: function(resovle) {require(['modules/purchase/purchaseOrder.vue'], resovle)},
                      },
                      "purchasedetail":{
                          component: function(resovle) {require(['modules/purchase/purchaseDetail.vue'], resovle)},
                      }
                    }
                },

                // 备货申请
                "prestore":{
                    name:"prestore",
                    component: function(resovle) {require(['modules/prestore/preStore.vue'], resovle)},
                    subRoutes:{
                      "/":{
                          component: function(resovle) {require(['modules/prestore/preStoreMgr.vue'], resovle)},
                      },
                      "detail":{
                          component: function(resovle) {require(['modules/prestore/preStoreDetail.vue'], resovle)},
                      },
                      "add":{
                          component: function(resovle) {require(['modules/prestore/preStoreAdd.vue'], resovle)},
                      }
                    }
                },
                // 备货审核
                "/prestorevalidate":{
                    name:"prestorevalidate",
                    component: function(resovle) {require(['modules/prestore/preValidate.vue'], resovle)},
                    subRoutes:{
                      "/":{
                          component: function(resovle) {require(['modules/prestore/prestoreValidate.vue'], resovle)},
                      },
                      "detail":{
                          component: function(resovle) {require(['modules/prestore/prestoreValidateDetail.vue'], resovle)},
                      }
                    }
                },
                // 订制品设计申请管理
                "specmgr":{
                    name:"specmgr",
                    component: function(resovle) {require(['modules/spec/specBase.vue'], resovle)},
                    subRoutes:{
                      "/":{
                          component: function(resovle) {require(['modules/spec/specMgr.vue'], resovle)},
                      },
                      "apply":{
                          component: function(resovle) {require(['modules/spec/specApply.vue'], resovle)},
                      }
                    }
                },

                // 加急卡管理
                "urgent":{
                    name:"urgent",
                    component: function(resovle) {require(['modules/urgent/urgentMgr.vue'], resovle)},
                },

                // 报表管理
                "tbmgr":{
                    name:"tbmgr",
                    component: function(resovle) {require(['modules/tbmgr/tbMgr.vue'], resovle)},
                },

                // 无权限页面
                "/forbidden" :{
                  component: function(resovle) {require(['portal/forbidden.vue'], resovle)},
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

      router.beforeEach(function ({ to, next }) {
         if(Utils.getUserInfo() != "" || !!Utils.getUserInfo()) next()
         else if(to.path == "/login") next()
         else router.go({path:"/login"})
      })
}
