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
                // 账户管理
                "accountmgr": {
                    component: function(resovle) {require(['modules/account/accountmgr.vue'], resovle)},
                },

                // 员工管理
                "employee":{
                    component: function(resovle) {require(['modules/employee/employeemgr.vue'], resovle)},
                },

                // 用户管理
                "user":{
                    component: function(resovle) {require(['modules/user/userMgr.vue'], resovle)},
                },

                // 下单管理
                "sale":{
                    component: function(resovle) {require(['modules/sale/saleMgr.vue'], resovle)},
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

      // global before
      // 3 options:
      // 1. return a boolean
      // 2. return a Promise that resolves to a boolean
      // 3. call transition.next() or transition.abort()
      router.beforeEach(function ({ to, next }) {
         if(Utils.getUserInfo() != "" || !!Utils.getUserInfo()) next()
         else if(to.path == "/login") next()
         else router.go({path:"/login"})
      })
}
