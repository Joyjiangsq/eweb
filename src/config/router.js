export function routerStart(router) {
      router.map({
          "/index": {
              name:"index",
              component: function(resovle) {require(['modules/index/index.vue'], resovle)},
          },

          "/accountmgr": {
              component: function(resovle) {require(['modules/account/accountmgr.vue'], resovle)},
          },

          // 开发文档
          "/demo":{
            component: function(resovle) {require(['modules/demo/demo.vue'], resovle)},
            subRoutes:{
              "/datepicker": {  component: function(resovle) {require(['modules/demo/datepicker.vue'], resovle)}},
              "/dialog": {  component: function(resovle) {require(['modules/demo/dialog.vue'], resovle)}},
              "/paginate": {  component: function(resovle) {require(['modules/demo/paginate.vue'], resovle)}},
              "/datatable": {  component: function(resovle) {require(['modules/demo/datatable.vue'], resovle)}},
              "/combobox": {  component: function(resovle) {require(['modules/demo/combobox.vue'], resovle)}},
              "/search": { name:"sdemo", component: function(resovle) {require(['modules/demo/search.vue'], resovle)}}
            }
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
      router.beforeEach((transition) => {
          transition.next();
      })
}
